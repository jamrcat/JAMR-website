BASE RUNNING SCIENCE — EMAIL UPDATE PATCH

MERCH CONCEPT LOCATION
----------------------
The Merch Concept is already part of the project:
- Source page: merch.qmd
- Built page: _site/merch.html
- Navbar link: _quarto.yml → website → navbar → left → Merch Concept

The screen recording also shows the deployed Merch Concept in the top navigation.

NEW EMAILS
----------
General inquiries:
info@jamrbaserunningscience.com

Quote requests:
quote@jamrbaserunningscience.com

HOW TO APPLY WITHOUT OVERWRITING YOUR CURRENT MERCH PAGE
---------------------------------------------------------
1. Replace your current contact.qmd with the contact.qmd in this patch.
2. Open your CURRENT _quarto.yml. Keep all of its current settings and Merch Concept navbar entry.
3. Merge the contents of quarto-footer-snippet.yml into the existing `website:` section.
   If `page-footer:` already exists, replace only that page-footer block.
4. Append styles-email-snippet.css to the bottom of your CURRENT styles.css.
5. Render the site in RStudio/Quarto.
6. Deploy the refreshed _site folder to Netlify.

IMPORTANT
---------
This is intentionally a PATCH rather than a full replacement website package, so it does not overwrite newer merch pricing, pickup information, Shopify work, or other changes already present on the live site.
