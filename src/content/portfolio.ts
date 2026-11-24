/**
 * Single source of truth for every word and number on the site.
 *
 * Both the 3D control room and the Classic view read from this file.
 * Never hard-code content in components. If something is missing, add it here.
 *
 * Lines marked `TODO(mohini)` must be confirmed before launch.
 * See docs/11-open-questions.md for the full list.
 */

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

/** Hex colour, e.g. "#FF7A59". Must exist in docs/12-design-tokens.md. */
export type Hex = `#${string}`;

export interface Profile {
  name: string;
  title: string;
  bio: string;
  /** One-line positioning used in the intro and page meta description. */
  tagline: string;
  photo: { src: string; alt: string };
  availability: { open: boolean; label: string; modes: string[] };
}

export interface Links {
  email: string;
  linkedin: string;
  github: string;
  resumePdf: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  accent: Hex;
}

export interface Role {
  id: string;
  company: string;
  title: string;
  /** ISO year-month, e.g. "2023-03". */
  start: string;
  /** ISO year-month, or null for the current role. */
  end: string | null;
  /** Shown on the badge and in panels, e.g. "2023 to now". */
  yearsLabel: string;
  /** Shown in panels, e.g. "3 years 8 months". */
  durationLabel: string;
  accent: Hex;
  /** Dark text colour to use on top of `accent`. */
  onAccent: Hex;
  highlights: string[];
  /** IDs from `workProjects` that were built in this role. */
  workProjectIds: string[];
}

export interface DemoAction {
  id: string;
  label: string;
  /** Label to show after the action toggles on, if it is a toggle. */
  toggledLabel?: string;
  /** Status message shown after the action. */
  status: string;
  /** Status message when toggled back off, if it is a toggle. */
  toggledOffStatus?: string;
  /** Interim message while the action is running, if any. */
  pendingStatus?: string;
}

export interface WorkProject {
  id: 'video-package' | 'provider-onboarding' | 'pr-checks';
  /** Title used in panels and the Classic view. */
  title: string;
  /** Short name used in tooltips, chips and the hotspot menu. */
  shortName: string;
  roleId: string;
  accent: Hex;
  /** Darker version of the accent for buttons and tags on light panels. */
  accentStrong: Hex;
  problem: string;
  built: string;
  result: string;
  /** Interactive demo actions shown in the project panel. */
  actions: DemoAction[];
  /** Note shown under any sample data in the demo. */
  sampleDataNote?: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  tools: string[];
  /** Where Mohini used this group. Shown as "Where I used it". */
  usedIn: string[];
  accent: Hex;
}

export interface SideProject {
  id: string;
  name: string;
  tags: string[];
  features: string[];
  /** Live URL or repo. TODO(mohini): fill in. */
  url: string | null;
  accent: Hex;
  onAccent: Hex;
}

export interface TourStep {
  /** Camera yaw in radians. Positive turns left. */
  yaw: number;
  /** Camera pitch. Positive looks up. */
  pitch: number;
  text: string;
}

/* ------------------------------------------------------------------ */
/* Content                                                            */
/* ------------------------------------------------------------------ */

export const profile: Profile = {
  name: 'Mohini Chauhan',
  title: 'Senior Software Engineer (Frontend)',
  bio: 'I build scalable, high-performance and accessible web interfaces, turning complex requirements into clean, production-ready UI with modern JavaScript frameworks.',
  tagline: 'I build the tools product teams build on: shared packages, automation and checks that make everyone faster.',
  photo: {
    // TODO(mohini): replace with an original square photo, at least 512 × 512 px.
    src: `${import.meta.env.BASE_URL}images/mohini-photo.jpg`,
    alt: 'Mohini Chauhan',
  },
  availability: { open: true, label: 'Open to work', modes: ['Remote', 'Full-time'] },
};

export const links: Links = {
  email: 'mailto:TODO@example.com', // TODO(mohini)
  linkedin: 'https://www.linkedin.com/in/TODO', // TODO(mohini)
  github: 'https://github.com/mohini-chauhan', // TODO(mohini): confirm
  resumePdf: `${import.meta.env.BASE_URL}resume/mohini-chauhan-resume.pdf`,
};

export const stats: Stat[] = [
  // TODO(mohini): the timeline starts in early 2019, so "7+" may now be accurate.
  { id: 'years', value: '6+', label: 'years of experience', accent: '#F5C04A' },
  { id: 'users', value: '100K+', label: 'users served', accent: '#F07A7A' },
  { id: 'apps', value: '20+', label: 'apps built', accent: '#5CC9BA' },
  { id: 'led', value: '5+', label: 'people led', accent: '#B28CFF' },
];

export const roles: Role[] = [
  {
    id: 'it-company',
    company: 'IT company', // TODO(mohini): real company name, or keep it anonymous
    title: 'Frontend Developer',
    start: '2019-01', // TODO(mohini): confirm
    end: '2021-10', // TODO(mohini): confirm
    yearsLabel: '2019 to 2021',
    durationLabel: 'About 3 years',
    accent: '#F5C04A',
    onAccent: '#3A2A00',
    highlights: [
      'Built 20+ responsive apps with cross-browser performance',
      'Apps served 50K+ daily users with 99.9% uptime',
      'Built a 40+ component library that made dev cycles 60% faster',
    ],
    workProjectIds: [],
  },
  {
    id: 'hcl',
    company: 'HCL Technologies',
    title: 'Software Engineer',
    start: '2021-10', // TODO(mohini): confirm
    end: '2023-03', // TODO(mohini): confirm
    yearsLabel: '2021 to 2023',
    durationLabel: '1 year 5 months',
    accent: '#F07A7A',
    onAccent: '#FFFFFF',
    highlights: [
      'Migrated 3 legacy codebases to React',
      'Mentored 5 junior developers',
      'Cut code review cycles by 40%',
    ],
    workProjectIds: [],
  },
  {
    id: 'intellect',
    company: 'Intellect',
    title: 'Senior Software Engineer',
    start: '2023-03', // TODO(mohini): confirm
    end: null,
    yearsLabel: '2023 to now',
    durationLabel: '3 years 8 months',
    accent: '#5CC9BA',
    onAccent: '#063A33',
    highlights: [
      'Tech lead for 2 to 3 projects serving 100K+ users',
      'Raised the Lighthouse score from 50 to 90',
      'Ship 15+ enterprise features a year',
    ],
    // TODO(mohini): confirm all three work projects were built at Intellect.
    workProjectIds: ['video-package', 'provider-onboarding', 'pr-checks'],
  },
];

export const workProjects: WorkProject[] = [
  {
    id: 'video-package',
    title: 'One hook for every video SDK',
    shortName: 'Video and chat package',
    roleId: 'intellect',
    accent: '#FF7A59',
    accentStrong: '#E0552F',
    problem:
      'Apps used several video SDKs, each with its own factory methods. Call code was copied across repos, call states and errors were handled differently everywhere, and adding video to a new app took about a month.',
    built:
      'A private GitHub package that puts every SDK behind one hook. Apps pass a few props, and the hook picks the SDK and runs the whole session: lifecycle, error handling, screen share, recording and a network test. I did the same for chat.',
    result: 'About a month → a few weeks',
    actions: [
      {
        id: 'switch-provider',
        label: 'Switch provider',
        status: 'Switched to Provider {provider}. The call stayed connected and the app code didn’t change.',
      },
      {
        id: 'drop-network',
        label: 'Drop the network',
        pendingStatus: 'Network lost. The hook keeps the room and retries…',
        status: 'Reconnected to the same room. Nobody had to rejoin.',
      },
    ],
  },
  {
    id: 'provider-onboarding',
    title: 'Provider onboarding that runs itself',
    shortName: 'Provider onboarding',
    roleId: 'intellect',
    accent: '#3FCF9E',
    accentStrong: '#2FB386',
    problem:
      'Bringing a new provider onto the platform was a manual job for the team. Every step waited on a person, and it took around 45 days.',
    built:
      'I automated the whole onboarding flow, so the steps that used to wait on people now run on their own.',
    result: '45 days → 15 days',
    actions: [
      {
        id: 'toggle-automation',
        label: 'Automate onboarding',
        toggledLabel: 'Back to manual',
        status: 'Automated. The provider moves through every step on its own and goes live in 15 days.',
        toggledOffStatus: 'Manual again. Watch it wait at every step.',
      },
    ],
  },
  {
    id: 'pr-checks',
    title: 'A check on every pull request',
    shortName: 'PR checks',
    roleId: 'intellect',
    accent: '#7C8CFF',
    accentStrong: '#5C6CF0',
    problem:
      'Nothing checked bundle size or unused assets automatically, so problems were easy to miss in review.',
    built:
      'Scripts that run whenever a PR is raised. They measure bundle size, find unused assets and flag problems before anyone starts reviewing.',
    result: 'Every PR, checked automatically',
    actions: [
      { id: 'send-clean-pr', label: 'Send a clean PR', status: 'A clean PR is on its way to the gate.' },
      {
        id: 'send-big-pr',
        label: 'Send a PR with a big bundle',
        status: 'Watch the gate: this one grew the bundle by 42 KB.',
      },
    ],
    sampleDataNote: 'PR numbers and sizes in this demo are sample data.',
  },
];

export const skillGroups: SkillGroup[] = [
  { id: 'styling', name: 'Styling', tools: ['Tailwind CSS', 'Sass/SCSS', 'CSS3', 'Framer Motion', 'CVA', 'CLSX'], usedIn: [], accent: '#F07A7A' },
  {
    id: 'components',
    name: 'Component design',
    tools: ['React', 'TypeScript', 'JSX/TSX', 'Ant Design', 'HTML5'],
    usedIn: ['A 40+ component library at my first company'],
    accent: '#F5C04A',
  },
  {
    id: 'performance',
    name: 'Performance',
    tools: ['React.memo', 'Code splitting', 'Lazy loading', 'Image optimization'],
    usedIn: ['Lighthouse score raised from 50 to 90 at Intellect', 'Bundle size checks on every pull request'],
    accent: '#7FD3B0',
  },
  {
    id: 'state',
    name: 'State management',
    tools: ['React hooks', 'Custom hooks', 'Context API', 'Redux'],
    usedIn: ['One hook that runs the whole video session lifecycle'],
    accent: '#5CC9BA',
  },
  { id: 'build', name: 'Build tools', tools: ['Vite', 'Webpack', 'npm/yarn'], usedIn: ['Bundle size checks on every pull request'], accent: '#C98BF0' },
  {
    id: 'version-control',
    name: 'Version control',
    tools: ['Git', 'GitHub', 'GitHub Actions'],
    usedIn: ['A private GitHub package for video and chat', 'Scripts that run when a pull request is raised'],
    accent: '#F5C04A',
  },
  { id: 'testing', name: 'Testing', tools: ['Jest', 'React Testing Library'], usedIn: [], accent: '#8E6CF0' },
  { id: 'dataviz', name: 'Data visualization', tools: ['Chart.js', 'React Chart.js 2'], usedIn: [], accent: '#6BB8E0' },
];

export const sideProjects: SideProject[] = [
  { id: 'unikaksha', name: 'Unikaksha', tags: ['React', 'Firebase', 'Tailwind CSS'], features: ['Authentication', 'Real-time database', 'Responsive UI'], url: null, accent: '#F5C04A', onAccent: '#3A2A00' },
  { id: 'smarter-code', name: 'Smarter Code', tags: ['React', 'Firebase', 'CSS3'], features: ['Mobile-first design', 'Animation', 'User sign-in'], url: null, accent: '#F07A7A', onAccent: '#FFFFFF' },
  { id: 'hiking-explorer', name: 'Hiking Explorer', tags: ['React', 'Netlify'], features: ['Image gallery', 'Mobile-first design', 'Fast loading'], url: null, accent: '#5CC9BA', onAccent: '#063A33' },
  { id: 'skiddos', name: 'Skiddos', tags: ['React', 'Netlify', 'Animation'], features: ['Mobile-first design', 'Interactive', 'Accessible'], url: null, accent: '#8E6CF0', onAccent: '#FFFFFF' },
  { id: 'library-manager', name: 'Library Manager', tags: ['React', 'Firebase', 'Material UI'], features: ['Create, edit and delete books', 'Search and filter', 'Mobile-first design'], url: null, accent: '#7FD3B0', onAccent: '#0E3B2A' },
  { id: 'virtual-kitchen', name: 'Virtual Kitchen', tags: ['HTML5', 'CSS3', 'JavaScript'], features: ['3D CSS', 'Interactive', 'Creative UI'], url: null, accent: '#6BB8E0', onAccent: '#08324A' },
];

export const lighthouse = { before: 50, after: 90, roleId: 'intellect' } as const;

export const tour: TourStep[] = [
  { yaw: 0, pitch: 0.02, text: 'These three screens are my biggest work projects at Intellect. Click one any time to step inside it.' },
  { yaw: -1.02, pitch: 0.12, text: 'My career, one badge per company: IT company, HCL Technologies and Intellect. Click a badge for the highlights from that role.' },
  { yaw: 0.82, pitch: 0.02, text: 'My toolbox. Each lit unit is a group of skills. Click one to see the tools and where I used them.' },
  { yaw: 1.22, pitch: -0.2, text: 'Side projects from before, on the shelf under the window. Click a box to read about it.' },
  { yaw: -0.12, pitch: -0.2, text: 'My desk: my numbers, the Lighthouse dial, a photo, a resume printer, the phone for the scenic route and the yellow button to say hello.' },
  { yaw: 0, pitch: 0.34, text: 'And yes, I’m open to work: remote and full-time. That’s the tour. Look around and click anything.' },
];

/** Copy for the intro card, hints and other fixed UI text. */
export const ui = {
  intro: {
    heading: 'Welcome to my control room.',
    body: 'This is my portfolio as a 3D room. Everything in it is something I’ve built or done. Look around and click anything that lights up.',
    map: [
      { colour: '#FF7A59', label: 'Big screens:', text: 'my three biggest work projects. Click one to step inside.' },
      { colour: '#5CC9BA', label: 'Badges on the right wall:', text: 'my career, one badge per company.' },
      { colour: '#C98BF0', label: 'Rack on the left:', text: 'my toolbox, grouped by skill.' },
      { colour: '#F5C04A', label: 'Shelf under the window:', text: 'side projects.' },
      { colour: '#7FD3B0', label: 'Desk:', text: 'my numbers, my resume printer and the yellow hello button.' },
      { colour: '#7CF0FF', label: 'Desk phone:', text: 'fly a video call through my career.' },
    ],
    primary: 'Show me around',
    secondary: 'I’ll explore myself',
    footnote: 'Look around by moving your mouse, or drag on a phone. Prefer a normal page? Use Classic view.',
  },
  hint: {
    mouse: 'Move your mouse to look around. Click anything that lights up.',
    touch: 'Drag to look around. Tap anything that lights up.',
    diorama: 'Drag to look around the model',
  },
  areas: [
    { id: 'projects', label: 'Projects' },
    { id: 'career', label: 'Career' },
    { id: 'toolbox', label: 'Toolbox' },
    { id: 'side', label: 'Side projects' },
    { id: 'desk', label: 'Desk' },
  ],
  back: 'Back to the control room',
  classicView: 'Classic view',
  tourNext: 'Next',
  tourDone: 'Done',
  tourExit: 'Explore on my own',
  contact: {
    heading: 'Thanks for stopping by.',
    body: 'If you’d like to talk about a role or a project, I’d love to hear from you. I’m open to remote, full-time work.',
  },
  phone: {
    heading: 'Fly a call through my career',
    body: 'You become a video call on its way to me. You’ll fly through the three companies I’ve worked at, in order, and stop at my three biggest projects. It takes about two minutes.',
    primary: 'Pick up and fly',
    secondary: 'Stay here',
  },
  resume: {
    heading: 'Printing your copy',
    body: 'One page with my roles, projects and skills.',
    primary: 'Download resume',
  },
} as const;
