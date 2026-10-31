# SITE REDESIGN BRIEF — ZYNA Healthcare Apparel

> **For the AI editing this site.** Read this whole file before touching any code.
> The site already exists at `https://scrubsite.vercel.app/#/` and already has working 3D. **Do not rebuild it. Do not replace the 3D stack. Restyle, re-copy and re-choreograph it.**
> Goal: make it feel like a **premium, expensive, editorial brand** — not a template AI/SaaS/e-commerce site.

---

## 0. Ground rules (non-negotiable)

1. **Keep what works.** Keep the existing framework, router (hash routing `#/`), build setup, and the existing 3D scene/model/loader. Change visuals, copy, layout, motion, and camera/lighting/materials only.
2. **Audit first, then edit.** Before changing anything, list the repo's files, identify: framework, 3D library (three.js / R3F / etc.), where each route/section lives, where copy lives, where global styles/tokens live. Write a 10-line summary of what you found, then proceed.
3. **One change set at a time.** Order of work is in §10. After each step the site must still build and run.
4. **Never invent facts.** Every number, claim and name on the site must come from §3 (Source of Truth). If something is not in §3, leave it out or use a neutral placeholder and flag it in your final report.
5. **Fix the brand name.** The live site's `<title>` and meta say **"ZYNEX"**. The investor deck says **"ZYNA"**. Use **ZYNA** everywhere (title, meta, OG tags, nav, footer, copy) unless the owner says otherwise. Flag this in your report.
6. **Performance and accessibility are part of "premium".** Target: 3D loads without a blank screen, no layout shift, 60fps on a mid laptop, readable on mobile, respects `prefers-reduced-motion`.

---

## 1. What "expensive" means here (and what it does not)

### Do
- **Restraint.** Few colors, few type sizes, lots of empty space. Luxury = confidence to leave things out.
- **Editorial layout.** Asymmetric grids, oversized serif headlines, small tracked-out uppercase labels, thin hairline rules, numbered sections (`01 — The Problem`). Think printed magazine / fashion house / medical journal, not a landing-page kit.
- **The garment is the hero.** The 3D scrub is the main character. Everything else supports it.
- **Slow, deliberate motion.** Long easings (600–1200 ms), scroll-linked camera moves, one idea per scroll beat.
- **Real proof, quietly stated.** Big numbers, small source lines. Let the data carry authority.
- **Tactile detail.** Subtle film grain, fabric-weave macro textures, fine borders, precise alignment.

### Do NOT (the "usual AI site" tells)
- ❌ Purple/blue/pink gradient hero, glowing blobs, neon glows
- ❌ Glassmorphism cards everywhere, heavy drop shadows, rounded-2xl card grids
- ❌ Emoji or generic icon-in-a-circle feature grids ("⚡ Fast", "🛡 Secure")
- ❌ Centered hero + "Get Started" + three equal cards + testimonial carousel
- ❌ Stock-style words: "revolutionary", "cutting-edge", "seamless", "unlock", "elevate", "game-changing"
- ❌ A shopping-cart / product-grid / "Add to cart" feel. **This is a brand and investor/institution site, not a storefront.** No cart icon, no price tags in a grid, no star ratings, no discount badges.
- ❌ Bouncy/spring animations, confetti, cursor-trail gimmicks, auto-playing carousels
- ❌ Inter/Roboto/system-ui as the display face; default Tailwind palette

---

## 2. Brand & design system

Brand tokens come from the investor deck. Implement them as CSS variables (or the project's token system) in **one place** and use them everywhere.

### 2.1 Color

| Token | Hex | Use |
|---|---|---|
| `--ink-deep` | `#092E29` | Darkest background, footer, 3D scene vignette |
| `--forest` | `#0E4B43` | **Primary brand surface** (deck's signature green) |
| `--bone` | `#F4EFE6` | Primary light background (warm off-white, never pure `#fff`) |
| `--paper` | `#FBF8F2` | Raised light surface |
| `--ink` | `#17221F` | Text on light |
| `--mist` | `#E8F0EE` | Pale green tint for quiet panels |
| `--ember` | `#E86A33` | **Single accent.** Use sparingly: one underline, one number, one CTA per viewport |
| `--sage` | `#6FA79B` | Secondary labels on dark |
| `--hairline` | `rgba(23,34,31,.14)` on light / `rgba(244,239,230,.16)` on dark | Rules and borders |

Rules:
- Alternate **dark forest sections** and **bone sections** for rhythm. Never more than two consecutive sections of the same tone.
- Ember orange appears **at most once or twice per screen**. It is a signal, not a theme.
- No gradients except a very soft radial vignette behind the 3D model (forest → ink-deep).
- Contrast: body text ≥ 4.5:1. Check ember-on-forest and sage-on-forest for small text; if they fail, use bone.

### 2.2 Typography

Deck uses a serif display (Cambria) over a clean humanist sans (Calibri/Lato-style). Upgrade to web fonts with the same character:

- **Display:** a high-contrast editorial serif — preferred **"Fraunces"** (soft, optical-size axis) or **"Cormorant Garamond"** / **"Playfair Display"** as fallbacks. Weight 500–600, tight tracking (`-0.02em`), large (clamp 56px → 140px on hero).
- **Body / UI:** **"Inter Tight"**, **"Manrope"** or **"Lato"** — 16–18px, line-height 1.6.
- **Eyebrow / labels:** same sans, 11–12px, uppercase, `letter-spacing: .22em`, ember or sage.
- **Numerals:** use serif display for big stats; enable `font-variant-numeric: lining-nums tabular-nums`.
- Max 2 families, max 3 weights. Self-host or `font-display: swap`; preload the display font.
- Wordmark: **ZYNA** set in the display serif, bold, wide tracking (`.18em`), no logo mark clutter. (The deck pairs it with a small orange circle + white tee icon; use that only as a tiny favicon / loading mark, not in the nav.)

### 2.3 Layout

- 12-column grid, generous gutters, max content width ~1280px, but let the 3D canvas and headlines **bleed full-width**.
- Section padding: `clamp(96px, 14vh, 200px)` vertical.
- Use **asymmetry**: headline on cols 1–7, supporting text on cols 9–12; or number far left, content far right.
- Hairline rules between sections and between rows in lists/tables instead of boxes and shadows.
- Corner radius: **0–4px**. Sharp = expensive. (Pills only for tiny tags if at all.)
- Mobile: single column, 16–24px gutters, no horizontal scroll, 3D canvas becomes a sticky or full-bleed hero with reduced DPR.

### 2.4 Motion language

- Easing: `cubic-bezier(.22,.8,.2,1)` (long ease-out). Durations 600–1200ms. Stagger 60–90ms.
- Text reveals: line-by-line mask/slide-up, never fade-in-bounce.
- Numbers count up once on entering viewport (stats only), 1.2s, ease-out.
- Scroll-linked: use the 3D camera as the storytelling device (see §5). Smooth scroll (Lenis or equivalent) only if it doesn't fight the 3D scroll logic already in the project.
- Hover: opacity/underline-draw/slight translate (≤4px). No scaling cards.
- Respect `prefers-reduced-motion`: swap scroll-driven camera for static poses, remove parallax and count-ups.
- Add a quiet **loading sequence**: forest background, ZYNA wordmark, thin ember progress line, then reveal the garment. No spinners.

---

## 3. SOURCE OF TRUTH — content from the investor deck

Use this copy and these numbers. Do not alter figures. Where marked ⚠, see §9.

### 3.1 Identity
- **Name:** ZYNA
- **Category line:** Design-first healthcare apparel
- **Tagline:** *Designing the Future of Healthcare Apparel*
- **Positioning:** Built around real clinical workflows — validated by healthcare professionals, engineered for the 3 million who wear scrubs every day.
- **Closing line:** Design-first healthcare apparel built around real clinical workflows.
- **Contact:** hello@ZYNA.in · www.ZYNA.in ⚠ (confirm real domain/email)

### 3.2 The Problem
- **Headline:** Scrubs are worn 10–14 hours a day. Most still fail the people wearing them.
- Four failures (each = headline + one line):
  1. **Poor breathability** — Heat trapped through 12-hour shifts
  2. **Limited mobility** — No stretch during high-movement care
  3. **Weak durability** — Fabric fades and thins within months
  4. **Poor pocket utility** — Tools crammed into badly placed pockets
- **Field evidence** (source line: *Knya Vitals 2025 — 10,000+ medical professionals surveyed*) ⚠:
  - **83%** report emotional or mental fatigue from work
  - **70%** of medical professionals don't feel safe doing their job
  - **<60 min** a day is all 1 in 3 get for family, rest, or life outside work
  - **−10 yrs** average lifespan lost by an Indian doctor vs. general public
- **Closing line:** Their clothing should support them — not become another source of discomfort.

### 3.3 Market gap
- **Headline:** Doctors already buy premium scrubs. They still want more from them.
- Avg. satisfaction with current scrubs: **5.6 / 10**
- What they keep asking for (% of respondents, multi-select, **n = 1004**):
  - Easy wash / low maintenance — **52%**
  - High breathability — **51%**
  - Wrinkle-free fabric — **42%**
  - Lightweight build — **42%**
  - Sweat resistance — **40%**
  - Anti-odor protection — **38%**
- Source line: *ZYNA Scrub Survey, n = 1004 medical professionals (multi-select)*
- ⚠ The deck's "Market Validated" card has a missing percentage (it says "of surveyed … already named Knya …" with no number). **Do not show that claim on the site** unless the owner supplies the figure. Also do not name a competitor ("Knya") in public marketing copy.

### 3.4 Customer validation
- **Headline:** We listened first. Then we designed.
- Sub: Primary research across doctors, residents, interns and medical students — before a single design decision was made.
- **1004** healthcare professionals surveyed
- Respondent mix: Medical students **79%** · Doctors **16%** · Residents/Interns **3%** · Other (vet/surgeon) **2%**
- Top complaints with current scrubs: Fades after washing **34%** · Rough/uncomfortable material **30%** · Too hot/not breathable **27%** · Stitch quality **24%** · Hard to maintain/wrinkles **21%** · No stretch/tight fit **21%** · Size inconsistency **19%** · Soaked with sweat easily **17%**
- **82%** reported at least one active complaint · Avg. comfort **3.1/5** · Avg. durability **3.0/5**

### 3.5 Design philosophy
- **Headline:** We are design-first, fabric-next.
- Sub: Anyone can source fabric. Very few understand how healthcare professionals actually work.
- **Guiding question:** "How can we improve a doctor's everyday workflow?"
- **Pull-quote:** "We don't need futuristic tech. We need enough hands on the floor and someone who'll listen when we say we're drowning." — Dr Akshat Juneja, Pediatrics Resident *(cited in Knya Vitals 2025)* ⚠ (confirm permission to quote; otherwise omit or paraphrase without name)

### 3.6 Product engineering — complaint → solution map
(Survey % = share citing the problem. This is the most important section for the 3D model; see §5.)

| Complaint | % citing | ZYNA solution | 3D hotspot location |
|---|---|---|---|
| Fading after washing | 34% | Durability engineered up to 90 washes ⚠ | Fabric surface / color swatch |
| Rough, uncomfortable fabric | 30% | **92% polyester + 8% spandex** knit blend (site meta: 200–220 GSM) | Fabric macro close-up |
| Heat, poor breathability | 27% | **Mesh shoulder ventilation panels** | Shoulders / upper back |
| No stretch during movement | 21% | **4-way stretch** construction | Arms raised / torso twist pose |
| Gets soaked with sweat | 17% | **Moisture-wicking, quick-dry** fabric | Chest/back |
| Hard to maintain / wrinkles | 21% | Performance polyester blend (wrinkle-free finish) | Whole garment |
| Poor pocket utility | 15% | **8 pockets, 14 compartments** | Torso + trouser pockets |
| Hygiene at work | 75%† | **Antimicrobial treatment** | Fabric surface |

† 75% = share of respondents who said antimicrobial protection is *required*.
Site also lists: **fluid-repellent** ⚠ (not in the deck — keep only if the owner confirms), **Navy Blue** colorway.

### 3.7 Manufacturing strategy
- **Headline:** We don't want to become a textile manufacturer. We want to become India's leading healthcare apparel company — by partnering with one.
- **Partner:** Sulochana Mills — manufacturing & textile partner
- Partner strengths: Textile expertise · Vertical integration · Quality control · Scalability · Sustainable textile capability · Reduced execution risk
- **ZYNA focuses on:** Design (clinical-workflow-first decisions) · Product (engineering fixes for real complaints) · Brand (owning the relationship with medicos) · Customer (direct feedback loop with the field)

### 3.8 Market opportunity
- **Headline:** A large market. A deliberately small first step.
- **TAM:** ≈ ₹800–900 Cr — all healthcare professionals in India (≈ 3,000,000)
- **SAM:** ≈ ₹140 Cr — hospitals, medical & dental colleges, private institutions (≈ 500,000)
- **SOM, Year 1:** ≈ ₹66–96 Lakhs — 10–20 launch institutions · ≈ 3,000 professionals · ≈ 6,000 scrubs
- Note: Market penetration < 1% — Year 1 is about validation, not domination.

### 3.9 Business model (three phases)
1. **Institutional sales (B2B)** — Direct partnerships with hospitals & medical colleges, where trust is built at scale.
2. **Direct-to-consumer** — Individual medicos buy directly, carrying the brand loyalty built in Phase 1.
3. **Healthcare apparel ecosystem** — Expanding across categories and touchpoints in a medico's working life.

### 3.10 Unit economics
- Total cost per unit: **₹600**
- Selling price: **₹1,100–₹1,300** core range · up to **₹1,600** premium collection
- Gross margin at ₹1,200 average: **50%** (≈ ₹600 gross profit per unit, before CAC & overhead)
- Note: margins improve as production scales.
- ⚠ Decide with the owner whether unit economics belong on the **public** site or only in an investor-only view (see §9).

### 3.11 Team
- **Core team:** Madannpriyan Nepolean (Engineer) · Aswath Vishnu (Biotechnology Engineer) · Akshay K (Healthcare Professional)
- **Advisor:** Mr. Rufus Shakin — Operations & Quality Manager, SRM MCRCH (clinical operations & hospital systems)
- **Strategic contributors:** Mr. Suresh Rao, Sr. General Manager, Swither Division, Sulochana Mills (manufacturing & textile inputs) · Mr. Surendar, Manager, Innovation & Incubation (innovation ecosystem inputs) · Mr. Shivakumar K, Director, RS Foundation
- ⚠ Slide text order is jumbled in the source file (Akshay K and Shivakumar K appear detached from their roles). Treat the above as best reading and confirm with the owner before publishing names.

### 3.12 Why ZYNA
**Headline:** Not another scrub company. A design-first healthcare apparel company. Our edge isn't fabric — it's everything around it:
Customer understanding (1004 primary interviews, not assumptions) · Product design (every feature traced to a named complaint) · Clinical validation (grounded in workflow, not aesthetics alone) · Institutional partnerships (trust built where medicos already are) · Scalable manufacturing (Sulochana Mills removes execution risk) · Brand (owning the relationship with the wearer)

### 3.13 What we need
**Headline:** We're not just seeking investment. We're seeking strategic support. Access is more valuable to us right now.
Institutional purchase orders · Hospital introductions · Pilot opportunities · Industry mentorship · Legal & IP support · Branding guidance · Investment readiness · Strategic partnerships

### 3.14 Final CTA
**Let's build the future of healthcare apparel together.** → hello@ZYNA.in

---

## 4. Page architecture (single long-scroll, hash routes preserved)

Keep the existing router. If the site is one page with scroll sections, keep that. If it has several `#/` routes, map them as below. The order of the scroll narrative:

| # | Section | Tone | Role |
|---|---|---|---|
| — | **Loader** | forest | Wordmark + progress line |
| — | **Nav** (fixed, minimal) | transparent → bone on scroll | `ZYNA` left · 4 text links center/right (Problem, Product, Model, Contact) · one outlined CTA "Partner with us" |
| 00 | **Hero** | forest | Full-bleed 3D scrub, oversized headline |
| 01 | **The Problem** | bone | Four failures + field-evidence stats |
| 02 | **We Listened First** | forest | 1004 survey, respondent mix, top complaints |
| 03 | **The Product** *(3D centerpiece)* | forest → ink-deep | Complaint → solution hotspots on the garment |
| 04 | **Design-First** | bone | Philosophy + quote |
| 05 | **How We Build** | bone/mist | Sulochana Mills partnership |
| 06 | **The Opportunity** | forest | TAM / SAM / SOM |
| 07 | **The Model** | bone | 3 phases (+ unit economics if approved) |
| 08 | **The People** | bone | Team & advisors |
| 09 | **Partner With Us** | ink-deep | What we need + contact |
| — | **Footer** | ink-deep | Wordmark, email, tiny legal line |

Sections 06–07 (market size, unit economics) are investor-grade. If the owner wants a clean public brand site, move them behind an **"Investors"** route (`#/investors`) and keep the main scroll to 00–05, 08–09. Default: **keep a single "Opportunity" strip on the main page, put detailed economics on `#/investors`.**

---

## 5. The 3D experience — direction

The 3D exists. **Do not swap the engine or the model.** Improve how it's lit, staged and moved.

### 5.1 Stage and look
- Background: deep forest → ink-deep soft radial vignette. **No visible floor grid, no HDRI skybox showing, no rainbow reflections.**
- Lighting: one large soft key light (warm-neutral), a cool rim light from behind, low ambient. Think **product photography in a dark studio**.
- Add a soft contact shadow / ground shadow so the garment feels grounded.
- Materials: matte fabric — high roughness, subtle sheen, fine normal map or weave texture if available. Avoid plastic-looking specular. Navy Blue base colorway (per the site meta).
- Tone mapping: ACES/Filmic, slight vignette and very light film grain overlay (CSS or post-processing, ≤ 4% opacity).
- Cap pixel ratio at 2 (1.5 on mobile). Lazy-load the model; show the loader until the first frame renders. Compress model (Draco/Meshopt) if not already.

### 5.2 Scroll-driven camera (the storytelling device)
Pin the canvas (`position: sticky` / ScrollTrigger pin) through the Product section and move the camera between named poses. Each pose pairs with one complaint → solution beat from the table in §3.6:

1. **Hero:** slow 3/4 view, garment gently turning (≤ 6°/s), headline over/around it.
2. **Fabric macro:** camera pushes into the weave → "92% polyester + 8% spandex · moisture-wicking · antimicrobial".
3. **Shoulders:** camera lifts to upper back → "Mesh shoulder ventilation panels".
4. **Stretch:** garment (or rig) flexes/rotates, arms raised → "4-way stretch".
5. **Pockets:** camera drops to torso and trouser pockets, pockets highlighted → "8 pockets, 14 compartments".
6. **Full turnaround:** pull back, full 360° → "Engineered up to 90 washes" ⚠ (only if the claim is cleared).

Implementation notes:
- Hotspots = thin ember **dot + hairline leader + small label**, not boxes. Appear with the beat, fade out after.
- Each beat's text block sits in a single column away from the garment, with: eyebrow (`27% cite heat`), serif headline (`Mesh shoulder ventilation panels`), one sentence.
- Interpolate camera with damping (lerp/spring-free, no overshoot).
- Provide keyboard/skip-link and a "Skip 3D" path for reduced-motion / low-power devices (static image sequence or 2–3 poses).
- Fallback if WebGL fails: a still, high-quality render image per beat.

### 5.3 Hero composition
- Headline (serif, huge, left-aligned, 2–3 lines): **"Designing the future of healthcare apparel."**
- Eyebrow above: `DESIGN-FIRST HEALTHCARE APPAREL`
- One sentence below: *Built around real clinical workflows — validated by healthcare professionals, engineered for the 3 million who wear scrubs every day.*
- One quiet CTA: `Explore the garment ↓` (text link with arrow, not a filled button) + secondary `Partner with us`.
- Small bottom row: `n = 1004 clinicians surveyed` · `8 pockets · 14 compartments` · `4-way stretch`. Hairline-separated, tiny.
- Do **not** show prices or a buy button.

---

## 6. Section-by-section edit instructions

For each section: layout → copy source → special treatment.

**01 The Problem (bone).** Left: huge serif headline (§3.2). Right: the four failures as a numbered list with hairline dividers (`01 Poor breathability — Heat trapped through 12-hour shifts`). Below, full-width stat band: four huge serif numbers (83% · 70% · <60 min · −10 yrs) with tiny captions and the source line. Count-up on entry. No icons, no cards.

**02 We Listened First (forest).** Left: giant `1004` with caption. Beside it, a **thin-line** donut or a single stacked horizontal bar for the respondent mix. Right: horizontal bar chart of top complaints — thin bars (6–8px), ember for the top one, bone/sage for the rest, labels in small caps. Animated on scroll. Follow chart rules: direct labels, no gridlines or legends clutter, tabular numerals. Source line in italic small text.

**03 The Product (forest → ink-deep, pinned 3D).** See §5.2. This replaces any feature-card grid. After the pinned sequence, show a compact **complaint → fix table** (hairline rows, 3 columns: complaint · % citing · fix) as the "spec sheet".

**04 Design-First (bone).** Centered-left large serif statement: *"We are design-first, fabric-next."* Under it, the guiding question in italics. Pull-quote in large serif italic with name/role small — only if cleared (§9).

**05 How We Build (mist).** Two-column: left statement ("We don't want to become a textile manufacturer — we want to become India's leading healthcare apparel company, by partnering with one."). Right: partner block "Sulochana Mills" with the six strengths as a clean two-column list. Below: four short items (Design · Product · Brand · Customer) in a single row with hairline separators.

**06 The Opportunity (forest).** Three **concentric circles** (TAM ⊃ SAM ⊃ SOM) drawn with 1px lines, labeled, with values. Concentric thin circles echo the deck's circle motif. Below: *"Year 1 is about validation, not domination."* Respect the numbers exactly.

**07 The Model (bone).** Three phases laid out as a horizontal timeline with a thin line and numbered nodes (`I`, `II`, `III`). Unit economics (if shown): one large `50%` gross margin with a minimal cost-vs-price bar (₹600 cost vs ₹1,100–1,300 price). No pie charts.

**08 The People (bone).** Names set in serif, role in small sans, one line each. **No stock avatars, no circle headshots with initials.** Use real photos only if supplied, otherwise typographic list. Group: Core team / Advisor / Strategic contributors.

**09 Partner With Us (ink-deep).** Headline from §3.13. Eight asks as a 2×4 typographic grid with hairlines. Large mail link `hello@ZYNA.in`. One outlined CTA. No form unless one already exists and works.

**Footer.** Wordmark, one-line descriptor, email, `© 2026 ZYNA`. Nothing else.

---

## 7. Copy style guide

- Voice: calm, precise, clinical-meets-editorial. Short sentences. Confident, not salesy.
- Headlines: sentence case or title case consistently (deck uses title case in headlines — pick sentence case for web and apply everywhere).
- Numbers over adjectives. If a claim has no number or source, soften or cut it.
- Keep eyebrows in the `01 · THE PROBLEM` style from the deck, rendered as `01 — The Problem`.
- Banned words: revolutionary, cutting-edge, seamless, unlock, elevate, game-changing, next-gen, synergy, world-class, "AI-powered".
- Indian formats: ₹, Cr, Lakhs (as in the deck). Use `1,100` Indian grouping where it matters (₹1,100).

---

## 8. Technical requirements & QA checklist

**Meta / SEO**
- `<title>`: `ZYNA — Design-First Healthcare Apparel`
- Meta description (≤ 155 chars): `Scrubs engineered from 1,004 clinician surveys. 4-way stretch, mesh ventilation, antimicrobial finish, 8 pockets. Built for 12-hour shifts.` ⚠ (antimicrobial wording per §9)
- Update OG/Twitter tags to match; generate a proper OG image (forest background, wordmark, garment render).
- Favicon: small ember circle + tee mark from the deck.

**Quality gates before you say "done"**
- [ ] `npm run build` (or equivalent) succeeds; no console errors
- [ ] Lighthouse: Performance ≥ 80 desktop, Accessibility ≥ 95
- [ ] 3D: first frame < 3s on broadband; DPR capped; model compressed
- [ ] Works at 360px, 768px, 1440px, 1920px; no horizontal scroll
- [ ] `prefers-reduced-motion` honored; keyboard navigable; visible focus ring (ember, 2px)
- [ ] All text from §3 verbatim in numbers; zero invented stats
- [ ] Brand name is **ZYNA** everywhere (search the repo for `ZYNEX`, `Zynex`)
- [ ] No leftover template copy, lorem ipsum, "Add to cart", cart icon, star ratings
- [ ] Alt text on non-decorative images; `aria-label` on the canvas describing the garment
- [ ] Color tokens centralized; no hard-coded stray hex values

---

## 9. Open questions — flag these in your final report, don't guess

1. **ZYNEX vs ZYNA.** Live site says ZYNEX, deck says ZYNA. Default to ZYNA.
2. **"Engineered up to 90 washes."** The deck itself notes: *"Mention only if supported by supplier testing."* Do not state it as fact unless confirmed; otherwise write "Built for repeated industrial washing" or drop it.
3. **Antimicrobial & fluid-repellent claims.** Deck cites 75% of respondents *want* antimicrobial treatment (that is demand, not proof of efficacy). Site also says fluid-repellent, which the deck doesn't. Keep both only with supplier/lab backing; otherwise phrase as design intent.
4. **Knya Vitals 2025 stats** (83%, 70%, <60 min, −10 yrs) are third-party. Keep the source line visible. Do not name competitor brand "Knya" in marketing copy beyond the citation.
5. **The "Market Validated" card** on the deck has a missing percentage — omit.
6. **Doctor quote** — confirm permission to use the name.
7. **Unit economics & TAM/SAM/SOM** — public site or investors-only route?
8. **Team names/roles** — deck text is jumbled; confirm before publishing.
9. **Domain/email** `www.ZYNA.in`, `hello@ZYNA.in` — confirm these are live.
10. Do real garment photos or renders exist? If yes, use them for OG image, mobile fallback and macro textures. If not, generate stills from the existing 3D scene.

---

## 10. Execution order for the AI

1. **Audit** the repo → write the 10-line summary (stack, 3D lib, routes, where copy/styles live).
2. **Tokens:** add color, type, spacing, motion tokens (§2). Replace global styles. Load fonts.
3. **Brand pass:** rename ZYNEX → ZYNA; update meta/OG/favicon.
4. **Layout shell:** nav, footer, section scaffolding, grid, hairlines, light/dark rhythm.
5. **Copy pass:** drop in §3 content section by section (§6).
6. **3D pass:** restage lighting, background, materials, camera poses; wire scroll beats and hotspots (§5).
7. **Data visuals:** survey charts, stat band, TAM/SAM/SOM circles (§6, 01/02/06).
8. **Motion pass:** reveals, count-ups, loader; reduced-motion fallbacks.
9. **Responsive + a11y + perf pass** (§8).
10. **Final report:** list what changed, what you didn't touch, and every ⚠ item from §9 that still needs an owner decision.

**Reminder:** when in doubt, remove something. The site should feel like a quiet, confident, well-funded brand — not like it's trying to impress.
