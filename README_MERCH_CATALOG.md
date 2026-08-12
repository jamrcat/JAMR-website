# Base Running Merch Concept — integrated website catalog

The merch concept is now integrated into the Quarto website.

## What changed

- Added `merch.qmd` as the source catalog page.
- Added **Merch Concept** to `_quarto.yml` navigation.
- Added a merch teaser to `index.qmd`.
- Added the catalog styling to `styles.css`.
- Added the already-built `_site/merch.html` and updated built navigation so the current Netlify publish folder can show the page immediately.

## Product photos

Place the four final product images in `assets/merch/` using exactly these filenames:

- `short-sleeve.jpg`
- `long-sleeve.jpg`
- `hoodie.jpg`
- `training-shorts.jpg`

The catalog detects those files automatically. Until they are present, clean photo placeholders are shown.

If you deploy the prebuilt `_site` folder without running Quarto locally, also copy the same four image files into `_site/assets/merch/`. If you run `quarto render`, Quarto will copy the source assets into `_site` for you.

## Current prices

- Short Sleeve — $35
- Long Sleeve — $45
- Sleeveless Hoodie — $54
- Training Shorts — $34

## Current research-inspired sets

1. Curvilinear Ability Set — $66
2. Linear–Curvilinear Set — $75
3. Inside–Outside Mechanics Set — $84
4. The Need for Speed Set — $76
5. GPS Diagnostics Set — $85
6. IMU Foot-Pod Set — $94
7. Segment-Specific Analysis Set — $105
8. Functional Asymmetry Set — $114
9. Velocity–Time Profile Set — $123
10. New Perspectives Set — $124
11. Training the Curve Complete Set — $152
