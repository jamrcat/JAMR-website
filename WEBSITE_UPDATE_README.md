# Base Running Science website update

Updated 14 September 2026. This is the editable Quarto website project for review. It has not been published to the live Netlify website.

## What changed

- Rewrote the homepage around services, client needs and the independent BRS role.
- Added Services, Teams and academies, Player testing and training, Research and reporting, and Our framework pages.
- Retained the currently offered service codes, clear scope and travel/residential distinctions. Removed public prices across service and merchandise pages; fees are provided through tailored quotes.
- Updated About to reflect serving multiple organizations and individual athletes. Degree-award status is not assumed.
- Updated navigation and retained Projects as a useful legacy page. Notes and Updates pages and navigation links have been removed. Merch concept remains accessible from the footer.
- Corrected the foot-pod article title and the homepage article links. Added the Linear–Curvilinear Perspective first-page image and the founder's accompanying article text; featured the paper on the homepage. The full PDF is excluded. Readers use the external DOI link in the article's publication section.
- Removed the fixed scrolling graphic that crossed over text.
- Replaced exposed merchandise image paths with clearer forthcoming-image labels. Missing product photographs remain forthcoming; no product photos were invented.
- Added an enquiry message builder using existing LinkedIn and Instagram contacts. It prepares text locally; it does not send a message, store a lead or submit a form to a server.

## Open and render

1. Extract this ZIP into a new folder.
2. Open the included RStudio project, or open a terminal in the folder containing `_quarto.yml`.
3. With Quarto installed, run `quarto preview` to inspect the site.
4. Run `quarto render` to generate `_site`.
5. Check desktop and mobile navigation, article listings and images, and the enquiry copy button in the actual Quarto preview.
6. After approving the content, deploy the contents of `_site` using your existing Netlify workflow. Do not upload the source folder as a ready-built static website.

The existing `netlify.toml` publishes `_site`; it does not install Quarto or run a build command. If you use a Git-connected Netlify build, configure Quarto in that build environment and use `quarto render`, or continue rendering locally before deployment.

## Before public launch

Confirm preferred contact channels, availability and founder biography. Public prices are omitted; fees are agreed through a tailored quote. Quotes and the lawyer-reviewed service agreement determine the actual engagement. Confirm applicable privacy notices before adding lead storage, analytics or payment collection. The existing merchandise/Shopify configuration was not changed.

## Validation and limits

All 20 Quarto page front-matter blocks were parsed, the updated navigation targets were checked, and local links/assets referenced by the ten new or rewritten principal pages were checked. A complete Quarto render could not be completed in this workspace because its Deno runtime crashed. A separate Pandoc content preview was used for additional checks; it does not validate Quarto's generated navigation or listings. Review a real `quarto preview` before publishing.

The article commentary is dated 14 September 2026, the website update date; this is not a claim about the journal publication date. The existing article URL is retained. After rendering, redeploy the entire generated site so removed Notes/Updates pages do not linger in an older output folder.

The homepage again pairs the founder portrait with the logo, with a compact 10px gap on desktop and mobile.

Homepage copy explicitly describes testing, physical preparation and on-field training. Public text uses Base Running Science™ and base running as two words. Education offerings, the education page and course enquiry options have been removed because they are not yet available. Redeploy a clean full build to remove previously published pages.

Standalone one-hour and two-hour workshops are now offered on workshops.qmd, linked from Home, Services, Projects and navigation, with separate enquiry selections. Each package defines its agenda and materials; fees remain quote-only. Courses and ongoing education programmes remain unavailable.

Removed the I05 remote coaching package and all public references and enquiry options for remote player coaching. Remote workshops and agreed analysis remain available.
