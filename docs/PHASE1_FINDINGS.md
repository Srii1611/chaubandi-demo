# Chaubandi — Phase 1 Findings (Locked)

_Date: 2026-06-19 · Source of truth: `src/App.jsx` (single-file React app) + repo assets._

## 1. What the site is today
- **Brand:** Chaubandi · "Knots of Tradition" — premium Indian & Nepali ethnic wear boutique.
- **Owner / stylist:** Sushma. **Boutique:** 177 Massachusetts Ave, Arlington, MA 02474.
- **Contact:** Phone/WhatsApp +1 (857) 800-1282 · Instagram @ChaubandiBoston.
- **Stack:** Vite + React 19, `lucide-react` icons, Google Fonts (Cormorant Garamond + Outfit). Dark boutique theme (`#0d0a08` charcoal + `#c5a255` gold).
- **Architecture:** Entire site is one ~1,970-line component file (`src/App.jsx`). Client-side `page` state for routing. **No backend** — all data hardcoded, all state in-memory.

## 2. Pages / sections
1. **Home** — hero carousel (4 slides), category strip, Shop by Occasion (Engagement/Haldi/Mehandi/Sangeet/Wedding/Reception), Perfect Pairings couples showcase (5 sets), UGC reels (6 videos), testimonial marquee + booking banners, FAQ, SEO text block.
2. **Shop** — product grid + category filter chips (All, Lehengas, Sarees, Sherwanis, Bridal, Anarkali, Sharara).
3. **Product** — AZA.com-style clone: 2-col image grid, sticky info panel, color variants, sizes XS–6XL, qty, Add to Cart, Speak to Stylist, delivery estimate, Offers & EMI (coupon WELCOME10), accordions, Best Paired + Similar Items.
4. **Checkout** — 3 steps (Shipping → Payment → Review), MA 6.25% tax, simulated order confirmation.
5. **Live Video Shopping** — booking form that opens a prefilled WhatsApp message; how-it-works, categories, reviews, FAQ.
6. **Story** — Sushma's founder narrative + timeline.
7. **Contact** — validated contact form (simulated send) + boutique details.

## 3. Catalog
- **12 hardcoded products** (IDs 1–12), price range **$159–$599**.
- Only **Lehengas (4) and Sarees (2)** have real photos; the rest fall back to CSS gradient swatches (`images: []`).

## 4. Key gaps / things flagged
- **"Virtual Try-On" / "Live Mirror"** buttons are not AR — they route to the Live Video Shopping booking page.
- **No real commerce backend:** cart, checkout, payments, contact form, and order numbers are all simulated.
- Reviews, ratings, and follower counts are hardcoded.
- Store-hours inconsistency: header (11am–7pm) vs contact page (10am–7pm).
- Stray empty files in repo root (`type`, `(type`) look accidental.
- Deployed URL returned **HTTP 403** (likely Vercel Deployment Protection) — could not view the live site; findings are from source.

## 5. Implication for Phase 2
The current site is an excellent **high-fidelity marketing prototype** but is not transactional. Phase 2 is about deciding which capabilities become *real* (commerce, customization, try-on, bookings) and on what platform — the subject of the attached discovery questionnaire.
</content>
</invoke>
