# 07 · Classic view

A fast, normal web page at `/classic/` with the same content as the room. It serves recruiters in a hurry, screen readers, search engines, and devices without WebGL. It must not load three.js.

## Layout (top to bottom)

1. **Header**: round photo, name, title, status chips (Open to work, Remote, Full-time). Buttons: "Download resume" (primary), "Email me", "LinkedIn", and "Explore the 3D room" (links to `/`).
2. **About**: the bio and the tagline.
3. **Numbers**: the four stats in a row (two by two on phones), each in its accent.
4. **Work**: the three work projects as case studies, each with Problem, What I built and Result, and the role it came from. No interactive demos here; a link "Try it in the 3D room" opens `/#project/<id>` once deep links exist (see doc 01, Later).
5. **Experience**: a vertical timeline of the three roles, newest first: company, title, years, duration and highlights. Show "Lighthouse 50 → 90" inside the Intellect role.
6. **Toolbox**: the nine skill groups with their tools as chips and "Where I used it" lines where present. **No ratings or progress bars.**
7. **Side projects**: a grid of six small cards with tags, features and a link if `url` is set.
8. **Contact**: one line inviting contact, plus Email, LinkedIn, GitHub and resume links.
9. **Footer**: "Designed and built by Mohini Chauhan" and a link to the source repo if it's public.

If the page was opened with `?reason=no-webgl`, show a small note at the top: "Your browser can't show the 3D room, so here's the classic version."

## Requirements

- Semantic HTML: one `h1`, ordered headings, `main`, `nav`, `section` with headings, lists for lists.
- Reuses colours and type from `tokens.css`. Light theme by default; dark theme via `prefers-color-scheme`.
- Responsive from 320 px up. Line length under 80 characters.
- Lighthouse 95+ in Performance, Accessibility, Best practices and SEO.
- Meta: title "Mohini Chauhan, Senior Software Engineer (Frontend)", description from `profile.tagline`, canonical URL, Open Graph and Twitter card tags with `og-image.png`.
- JSON-LD `Person` schema with name, jobTitle, image, sameAs (LinkedIn, GitHub).
- Print stylesheet so the page prints as a tidy resume.
