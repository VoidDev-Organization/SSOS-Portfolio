# SSOS Third Edition Website (React + Vite)
Run: `npm install` then `npm run dev` (build: `npm run build`).

## Where to edit content — `src/data.js`
- **Next event:** `EVENTS` → entry `ssos-3`: `title`, `description`, `startDate`, `endDate` (ISO with UTC offset, e.g. `2026-12-01T18:00:00+02:00`), `timezone`, `location`.
- **Ticket link:** `ticketUrl` of that event. While `null`, the CTA shows "Access link coming soon" (not clickable).
- **Add a new event:** copy an `EVENTS` entry with a new `id`/`slug`. The nearest future one becomes the countdown; finished ones move to the archive automatically (optionally add cards in `SHOW`).
- **Sponsor links:** `SPONSORS` → `websiteUrl` (logo stays non-clickable while `null`). New logos go in `src/assets/sponsors/`.
- **VoidDev link / social / contact:** `CONFIG`. **Owl messages:** `OWL`.
- Test states without touching real dates: add `?demo=upcoming`, `?demo=live` or `?demo=ended` to the URL.
- Colours and spacing: CSS variables at the top of `src/styles.css`.

## Project structure
```
src/
├─ main.jsx · App.jsx            entry + routing (hash-based project pages)
├─ assets/                       images (index.js exports them as `A`)
├─ data/                         content only: events, projects (categories + cards), sponsors, owl, site
├─ utils/                        events (state logic), env, storage, scroll
├─ styles/                       tokens.css (design tokens) · base.css (reset, typography)
├─ components/
│  ├─ ui/                        Button, Card, Reveal, CountUp, LogoGrid (shared primitives)
│  └─ layout/                    Header, Footer, NavLink
├─ features/
│  ├─ event/                     EventModule, CountdownRings
│  ├─ projects/                  ProjectCard, utils
│  └─ owl/                       OwlGuide
├─ sections/                     Hero, Event, About, Impact, Projects, Sponsors
└─ pages/                        Home, ProjectDetail
```
Each component keeps its own `.css` file next to it; responsive rules live with the component they affect.
