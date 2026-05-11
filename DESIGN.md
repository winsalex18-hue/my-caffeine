# Design Brief

## Direction

Warm Commerce — accessible Arabic supermarket e-commerce with friendly, trustworthy retail aesthetic and clear product hierarchy.

## Tone

Welcoming retail environment: bright natural lighting, clean grid layout, professional yet approachable. Emerald green primary signals freshness and natural products.

## Differentiation

Strong product grid prominence with pricing hierarchy, warm accent palette, RTL-ready interface, cart clarity through warm gold CTAs.

## Color Palette

| Token      | OKLCH       | Role                        |
| ---------- | ----------- | --------------------------- |
| primary    | 0.58 0.14 142 | Emerald green, main brand   |
| secondary  | 0.72 0.12 68  | Warm gold, trust + warmth   |
| accent     | 0.60 0.14 200 | Teal, CTA highlights        |
| background | 0.99 0 0    | Clean light surface         |
| foreground | 0.12 0 0    | Dark text                   |
| card       | 1.0 0 0     | Product cards, white        |
| muted      | 0.92 0 0    | Subtle section dividers     |
| destructive| 0.55 0.22 25  | Error/remove states         |

## Typography

- Display: General Sans — headlines, product names, labels (geometric, RTL-friendly)
- Body: DM Sans — body text, descriptions, form input (narrow letterforms for Arabic)
- Scale: h1 2.25rem bold, h2 1.5rem 600, label 0.875rem 500, body 1rem 400

## Elevation & Depth

Product cards elevated via subtle shadows and 1px borders. Header/footer have gentle bottom/top borders. Three surface levels: background (muted), card (white), elevated popover (popover).

## Structural Zones

| Zone      | Background    | Border              | Notes                              |
| --------- | ------------- | ------------------- | ---------------------------------- |
| Header    | white (card)  | bottom 1px muted    | Logo, Arabic nav, RTL flex-row-reverse |
| Hero      | secondary/10  | —                   | Promotional banner with accent CTA |
| Content   | background    | —                   | Product grid, form sections        |
| Cart      | card          | 1px border          | Elevated sidebar/modal, total prominent |
| Footer    | muted/40      | top 1px border      | Contact info, light background    |

## Spacing & Rhythm

16px base grid, 24px section gaps, 12px card internal padding. Product cards: 16px image + 12px padding + text. Grid 3 cols tablet-to-desktop, 2 cols mobile.

## Component Patterns

- Buttons: Primary (emerald bg, white text, 8px radius), Secondary (gold bg, dark text), Accent (teal highlight, ghost style for neutral CTAs)
- Cards: 12px radius, white bg, subtle shadow, 1px border. Product card: image + title + price (large) + Add to Cart primary button
- Badges: Round pill shape (24px radius), muted bg, center-aligned text for quantity indicators

## Motion

- Entrance: fade-in 0.2s for cards, stagger 50ms between grid items
- Hover: opacity 85%, shadow lift (shadow-md) on cards, 0.3s transition-smooth
- Decorative: none — focus on clarity and commerce flow

## Constraints

- Light theme only (bright retail environment, no dark mode)
- No full-page gradients (cleanliness and legibility)
- RTL layout: all nav, labels, form flow — no hardcoded directions
- Emerald primary restricted to CTAs + header accent; secondary (gold) for trust highlights
- All text OKLCH token-based, no arbitrary color classes

## Signature Detail

Warm gold secondary color applied sparingly to checkout CTAs and success states, signaling trust and completion—reflecting retail trust imagery without heavy branding.
