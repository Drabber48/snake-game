# Snake Game - Cover Art Design

**Date:** 2026-08-02
**Deliverable:** Single standalone SVG file `snake-cover.svg` in the project root, used as an itch.io cover image.

## Requirements

- Standalone SVG - no external CSS, fonts, images, or resources referenced. All gradients, glows, and effects inline.
- 1024x1024 square viewport.
- No gameplay imagery: no snake, no score text, no UI elements, no other text.
- Title "SNAKE GAME" centered.
- Neon cyberpunk style matching the game's default theme: dark navy background (#050510-ish), cyan accent (#22d3ee / #00ffff), red apple (#ff3333).

## Composition

1. **Background:** Dark radial gradient (near-black navy center glow fading to deep navy edges) plus a very subtle cyan grid pattern (opacity ~0.03-0.05) for texture.
2. **Light streaks:** 4-6 soft cyan speed-line streaks radiating behind the title for motion energy.
3. **Title:** "SNAKE GAME" in large bold sans-serif (Arial Black / Impact fallback stack), centered, filled with a cyan gradient, with a soft cyan glow (feathered drop-shadow) and a subtle white highlight top edge. Two-line layout optional (SNAKE / GAME) or single line - whichever fits at 1024 wide.
4. **Apple:** Large glossy red apple to the right of / overlapping the title area, with:
   - Red radial gradient body + darker rim
   - Glossy white highlight ellipse
   - Brown stem + green leaf
   - Red outer glow (feathered halo)
5. **Particles:** Scattered cyan/white dots in varying sizes/opacities plus a few 4-point star glints (diamond paths) around the composition.

## Palette

- Background: `#050510` -> `#0a0a1e` radial
- Grid lines: `rgba(34, 211, 238, 0.04)`
- Title glow: cyan `#22d3ee`, text gradient `#7ff3ff` -> `#0891b2`
- Streaks: `rgba(34, 211, 238, 0.15-0.35)`
- Apple: `#ff3333` -> `#b91c1c`, highlight `#ffffff`, leaf `#22c55e`, stem `#713f12`
- Particles: `#ffffff` and `#22d3ee`

## Out of scope

No snake imagery, no scoreboard/UI, no buttons, no additional text, no animation (static image).
