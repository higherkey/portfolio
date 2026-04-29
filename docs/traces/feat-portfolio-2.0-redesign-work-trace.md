# Portfolio 2.0 Redesign Work Trace
Branch: `feat/portfolio-2.0-redesign`

## 1. Planned Work

### TODO List
- [x] Establish directory structure for new routes (`/about/...`, `/portfolio/...`)
- [x] Set up Native MPA routing with `<script type="speculationrules">` for instant prefetching
- [x] Add View Transitions API meta tags for smooth page swaps
- [x] Refactor `index.html` into independent files (`/about/index.html`, etc.)
- [x] Update `style.css` and `script.js` to handle smooth FLIP animation for modal expansion
- [x] Implement centered modal UI for index pages
- [x] **Refinement: Modal System**
    - [x] Refactor to "Clone & Grow" approach (no text stretching)
    - [x] Ensure original cards remain in grid (stable layout)
    - [x] Implement focus trapping and ARIA dialog roles
- [x] **Refinement: Sidebar Navigation**
    - [x] Add sidebar toggle (Manual + Auto-collapse on project pages)
    - [x] Implement muted B&W palette for collapsed state
- [x] **Refinement: Content Metadata**
    - [x] Add GitHub Repo Source links to all project artifacts
- [ ] Design and implement remaining full-page layouts (Route 66, Express Zen, etc.)
- [ ] **Part 3: Content Updates (Tutoring & Dev Roles)**
    - [ ] Update Header roles (Tutoring & Software Development)
    - [ ] Update "Experience" section with new focused narrative
    - [ ] Refine meta tags and SEO for new focus
- [ ] **Part 4: Rebranding & Business Entity**
    - [ ] Choose company name (sole proprietorship)
    - [ ] Reorganize projects under the new company umbrella
    - [ ] Implement company-wide branding (logos, copyright, etc.)

### File List
- `index.html`: Refactor to support MPA structure.
- `style.css`: Add transition classes, centered modal styling, and View Transition tags.
- `script.js`: Update card interactivity to trigger modals (FLIP).
- `about/index.html` (NEW): Standalone About index page.
- `portfolio/index.html` (NEW): Standalone Portfolio index page.
- `portfolio/board-game-hub/index.html` (NEW): Dedicated project page.
- `portfolio/choose-who/index.html` (NEW): Dedicated project page.
- `portfolio/amys-bakes/index.html` (NEW): Dedicated project page.
- `portfolio/route-66-passport/index.html` (NEW): Dedicated project page.
- `portfolio/express-zen/index.html` (NEW): Dedicated project page.
- `portfolio/ai-rpg-system/index.html` (NEW): Dedicated project page.

### Rationale
To convert the single-page application into a multi-page architecture without sacrificing performance, allowing for dedicated project pages with rich content (screenshots, devblogs) while maintaining a snappy, Vanilla JS core.

## 2. In Progress Work
- Designing and implementing remaining project layouts (Route 66, Express Zen).

## 3. Completed Work
- [x] Refactored Modal system to "Clone & Grow" (no stretching, grid stability).
- [x] Implemented Focus Trap for modal accessibility.
- [x] Implemented Collapsible Sidebar with muted B&W palette.
- [x] Added auto-collapse logic for focused project detail viewing.
- [x] Added Repository Source links to all project artifacts and detail pages.
- [x] Establish directory structure for new routes.
- [x] Set up Native MPA routing with speculation rules.
- [x] Add View Transitions API meta tags.
- [x] Refactor index.html into Home, About, and Portfolio files.

## 4. Issues and Out of Scope
- **4a) Potential Blockers**: None currently identified.
- **4b) Opportunities**: None currently identified.
