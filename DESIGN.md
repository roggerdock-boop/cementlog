# Design Brief

## Direction

CementHub — A professional knowledge platform for cement industry engineers with clean, authoritative, minimal design prioritizing information clarity and professional credibility.

## Tone

Industrial minimalism with precision engineering rigor — no ornament, maximum clarity and professional authority.

## Differentiation

Structured article card hierarchy with visible metadata (category, author, date) and geometric typography creates trust and scanability for technical audiences.

## Color Palette

| Token              | OKLCH         | Role                              |
| ------------------ | ------------- | --------------------------------- |
| background         | 0.98 0.008 230 | Primary content surface, warm off-white |
| foreground         | 0.18 0.015 230 | Main text, high contrast          |
| card               | 1.0 0.004 230  | Article card, content blocks      |
| primary            | 0.42 0.14 240 | Links, interactive, accents (ocean blue) |
| accent             | 0.6 0.15 170  | Category badges, highlights       |
| muted              | 0.94 0.01 230 | Disabled states, subtle text      |
| border             | 0.9 0.008 230 | Card edges, dividers              |

## Typography

- Display: Space Grotesk — geometric precision for headings, clear authority
- Body: General Sans — clean readability for articles and UI text
- Scale: hero `text-6xl font-bold tracking-tight`, h2 `text-3xl font-semibold`, labels `text-xs font-semibold uppercase tracking-wider`, body `text-base leading-relaxed`

## Elevation & Depth

Flat, borderless design with minimal shadows; cards use subtle border on light background and card backgrounds for depth distinction. No skeuomorphism.

## Structural Zones

| Zone      | Background              | Border                       | Notes                           |
| --------- | ----------------------- | ---------------------------- | ------------------------------- |
| Header    | `bg-background`         | `border-b border-border`     | Nav, logo, minimal styling      |
| Content   | Alternates `bg-background` and `bg-card` | None        | Article cards on card bg, sections on background |
| Footer    | `bg-muted/30`           | `border-t border-border`     | Minimal footer info             |

## Spacing & Rhythm

Generous whitespace: sections 8-12rem apart, card padding 1.5rem, compact microcopy at 0.5rem–1rem. Content breathes.

## Component Patterns

- Buttons: Primary `bg-primary text-primary-foreground rounded-md px-4 py-2.5 font-semibold` with hover darken (0.05), secondary `border border-border` outline
- Cards: `rounded-md border border-border bg-card` with subtle hover elevation (scale 1.02)
- Badges: Category badges `bg-accent/20 text-accent px-3 py-1 rounded-sm text-xs font-semibold uppercase`
- Article metadata: Author + date in `text-xs text-muted-foreground`, category badge prominent

## Motion

- Entrance: fade-in 300ms on page load
- Hover: card scale 1.02 with 200ms ease
- Decorative: subtle fade on image load

## Constraints

- No gradients, no animations beyond hover/focus states
- Minimum contrast ratio AA+ (verified OKLCH tuning)
- Radii: 4px–6px only (no 12px+ roundness)
- Density: spacious, not compact

## Signature Detail

Category badges with muted teal accent (`bg-accent/20`) signal technical domain and break the monochrome monotony while maintaining professional restraint.
