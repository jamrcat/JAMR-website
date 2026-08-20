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

## Shopify checkout connection

The catalog is ready to redirect customers to Shopify product pages. Shopify
then handles product variants such as size, quantity, shipping, tax, and secure
payment.

To activate the buttons:

1. Open `assets/shopify-config.js`.
2. Set `storeUrl` to the final storefront domain, for example
   `https://base-running-science.myshopify.com` or the connected custom domain.
3. Make each `handle` match its Shopify product handle. A full Shopify product
   URL can be pasted into an item's `url` field when a direct override is easier.
4. Run `quarto render` so the updated configuration is copied to `_site`.

Until a valid HTTPS store URL is added, the catalog displays non-clickable
**Shopify checkout coming soon** buttons rather than sending visitors to a
broken page.

## Local pickup

The merch page includes a satellite Google Map and red place marker for the
pickup location at Zonactiva Kids, 151 Calle Federico Acosta, San Juan, Puerto
Rico 00918. Customers are instructed to bring all of the following before an
order is released:

- transaction or order number;
- name used for the purchase;
- digital or printed receipt; and
- valid photo identification.

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
