import { describe, expect, it } from 'vitest';
import * as content from './portfolio';
import { roles, sideProjects, skillGroups, stats, tour, workProjects } from './portfolio';

type Visit = (path: string, key: string, value: unknown) => void;

/** Calls `visit` for every value in `node`, with a dotted path like `roles.0.accent`. */
function walk(node: unknown, path: string, key: string, visit: Visit): void {
  visit(path, key, node);
  if (Array.isArray(node)) {
    node.forEach((child, i) => walk(child, `${path}.${i}`, String(i), visit));
  } else if (node !== null && typeof node === 'object') {
    for (const [k, child] of Object.entries(node)) walk(child, `${path}.${k}`, k, visit);
  }
}

function everyString(): { path: string; key: string; value: string }[] {
  const found: { path: string; key: string; value: string }[] = [];
  for (const [name, value] of Object.entries(content)) {
    walk(value, name, name, (path, key, v) => {
      if (typeof v === 'string') found.push({ path, key, value: v });
    });
  }
  return found;
}

const COLOUR_KEYS = new Set(['accent', 'onAccent', 'accentStrong', 'colour']);

describe('portfolio content', () => {
  it('has unique ids in every collection', () => {
    for (const list of [stats, roles, workProjects, skillGroups, sideProjects]) {
      const ids = list.map((item) => item.id);
      expect(new Set(ids).size, ids.join(', ')).toBe(ids.length);
    }
  });

  it('links every role to real work projects', () => {
    const projectIds = new Set<string>(workProjects.map((p) => p.id));
    for (const role of roles) {
      for (const id of role.workProjectIds) expect(projectIds, `${role.id} → ${id}`).toContain(id);
    }
  });

  it('links every work project to a real role', () => {
    const roleIds = new Set(roles.map((r) => r.id));
    for (const project of workProjects) {
      expect(roleIds, `${project.id} → ${project.roleId}`).toContain(project.roleId);
    }
  });

  it('has no empty strings', () => {
    const empty = everyString().filter((s) => s.value.trim() === '').map((s) => s.path);
    expect(empty).toEqual([]);
  });

  it('uses valid hex for every colour', () => {
    const bad = everyString()
      .filter((s) => COLOUR_KEYS.has(s.key) && !/^#[0-9A-F]{6}$/i.test(s.value))
      .map((s) => `${s.path} = ${s.value}`);
    expect(bad).toEqual([]);
  });

  it('has six tour steps', () => {
    expect(tour).toHaveLength(6);
  });

  it('reports TODO values', () => {
    const todos = everyString()
      .filter((s) => s.value.includes('TODO'))
      .map((s) => s.path);
    if (process.env.LAUNCH === '1') {
      expect(todos, 'TODO values must be filled in before launch').toEqual([]);
    } else if (todos.length > 0) {
      console.warn(`Content still has TODO values:\n  ${todos.join('\n  ')}`);
    }
  });
});
