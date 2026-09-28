# Base Running Science Store — setup notes

The new `store.qmd` is a lightweight storefront for the four BRS apparel pieces and thesis-inspired sets.

## What works now
- Product cards and size selection (Medium / Large / XL)
- Cart stored in the customer's browser
- Bundle additions
- Order subtotal
- Shipping choice (USPS quote after order or local pickup)
- Payment-method choice (ATH Móvil / PayPal / Cash pickup)
- Netlify Forms order capture
- Confirmation page
- No card/bank information is collected by the site

## Before going live
1. In Netlify, confirm Forms are enabled and deploy the rendered site.
2. Add the business ATH Móvil payment instructions to the confirmation workflow/email.
3. Add your PayPal merchant payment link to the confirmation workflow/email.
4. Replace/refresh product photos in `assets/store/` whenever final catalog photos are ready.
5. Confirm your actual stock by size. The current website does not automatically synchronize inventory across customers.

## Important limitation
This is intentionally a lightweight checkout, not a payment processor. It does not store card numbers and it does not automatically decrement a central inventory database. Those features require a hosted payment provider and a persistent backend/database.
