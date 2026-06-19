# Chaubandi Online Store — Proposal Review & Build-Kickoff Questionnaire

_20 Questions to lock scope, pricing & build inputs · For: Sushma (Founder) & Srii (Web & Digital Partner)  |  Meeting: 2026-06-20_

**Purpose.** This is no longer a 'what should we build' exercise - the proposal already commits to a custom headless store. The job of this meeting is to APPROVE scope and pricing, and hand over the concrete inputs needed to start building. Each question is either a DECISION to lock or an INPUT we need from Sushma.

## Proposal recap (what's already decided)
- Approach: custom HEADLESS store (Medusa.js + React, Railway/Vercel, Google Cloud, Stripe, SendGrid) - chosen over Shopify for live video, saved measurements & store tie-in.
- 4 layers: Foundation -> Signature (Live Video $10 + Saved Measurements) -> Phase-1 enhancements (inspiration upload, two-photo fit, store pickup) -> Future roadmap.
- Investment: $5,700 one-time ($4,000 build + $1,700 photo) - $1,800/mo retainer - $50-115/mo infra - 50/50 payment terms.
- Done-for-you: Srii runs digital (photo, social, ads, maintenance); Sushma runs store, orders, DMs, returns. Zero-spend launch plan.

## The 20 questions

### A. Decision & Scope Lock

**Q1. Do we approve the custom headless build (Medusa + React) over Shopify - any remaining reservations about upkeep or being the only one who can self-manage it?**
- _Why it matters:_ Slide 13 makes this a feature-driven choice; Shopify genuinely wins on hands-off upkeep. Locking this unblocks everything else.
- _DECISION: green-light the stack, or revisit Shopify for the foundation._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

**Q2. Is the launch scope exactly Foundation + 2 signature + 3 Phase-1 enhancements - or do we move the two-photo fit tool to a fast-follow since it's the only paid subscription?**
- _Why it matters:_ Everything else is ~$0 software; the measurement tool adds a recurring quote-based cost and accuracy risk. Trimming it lowers cost/risk without hurting the core moat.
- _DECISION: confirm the launch feature list and what (if anything) is fast-follow._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

**Q3. Do we approve pricing & terms: $5,700 build (50/50), $1,800/mo retainer, $50-115/mo infra paid directly?**
- _Why it matters:_ This is the proposal's core ask (Slides 26-32). Sign-off here is what starts the work.
- _DECISION: approve, and confirm the $2,850 deposit to begin._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

**Q4. What is the target launch date and is it tied to a wedding/festive season we must hit?**
- _Why it matters:_ A real deadline converts the 4-layer plan into a sequenced build and sets the pre-launch timeline (Slide 38).
- _INPUT: a target go-live date and any hard external deadline._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

### B. Catalog & Content Handover

**Q5. How many SKUs of current stock do we shoot & upload for launch, and how fast do new arrivals come in each week?**
- _Why it matters:_ The $1,700 photo line and $700/mo retainer are sized to this volume (Slides 26-28). It also sets a realistic launch catalog.
- _INPUT: rough count of current stock + weekly new-arrival rate._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

**Q6. Who provides pricing, inventory, categories and descriptions (and in what format), and what variant structure do products need - sizes XS-6XL, semi-stitched vs custom, fabric/colour, 'Free Size'?**
- _Why it matters:_ Catalog data is the single biggest dependency to make the store real (today it's all hardcoded placeholders), and the variants define the Medusa data model since ethnic wear mixes stock sizes with made-to-order.
- _INPUT: a handover format/owner + the real size/variant rules Sushma uses today._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

### C. Signature: Live Video Shopping

**Q7. Confirm the $10 booking mechanics: availability windows, which platform (WhatsApp / Zoom / Meet), and how Sushma's calendar + confirmations work.**
- _Why it matters:_ Slide 17 sets the concept; building a real booking flow needs concrete slots, tooling and confirmation logic (vs today's WhatsApp message).
- _INPUT/DECISION: days/hours, platform, calendar tool, confirmation method._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

**Q8. Is the $10 credited toward a purchase, and what's the no-show / reschedule / refund policy?**
- _Why it matters:_ These rules must be coded into the booking + payment flow and shown to customers up front.
- _DECISION: credit-back rule + cancellation policy._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

### D. Signature: Saved Measurements

**Q9. What is the exact set of measurement fields Sushma stitches from (the canonical list)?**
- _Why it matters:_ Saved Measurements (Slide 18) needs a precise schema to be reusable across orders and the custom-stitch flow.
- _INPUT: the full measurement field list + units._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

**Q10. How do we present consent and storage for body measurements and uploaded photos (privacy notice, retention, deletion)?**
- _Why it matters:_ Storing body data and inspiration photos carries trust/privacy duties; getting this right protects the brand.
- _DECISION: consent wording + retention/deletion policy._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

### E. Phase-1 Enhancements

**Q11. Two-photo fit tool: which vendor/subscription, who owns the 96-97% accuracy claim, and what is the free fallback - go/no-go for launch?**
- _Why it matters:_ Slide 20 flags this as the one real recurring cost with an accuracy claim; vendor choice and a fallback decide cost and liability.
- _DECISION: vendor + budget, or defer to fast-follow with manual measurements._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

**Q12. 'Design Your Dream Outfit': what fields do we collect, how does Sushma price/confirm the draft order, and what turnaround do we promise?**
- _Why it matters:_ Slide 19 says the request becomes a draft order; we need the form fields and an SLA so expectations are set before payment.
- _INPUT: request fields + a target response/turnaround time._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

**Q13. Store Pickup: what are pickup hours, the reserve-to-try-on flow, who marks an order ready, and how does in-store vs online stock stay in sync?**
- _Why it matters:_ Slide 21's BOPIS turns the store into an advantage but needs an operational flow and a single source of inventory truth.
- _INPUT/DECISION: pickup hours + readiness workflow + inventory rule._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

### F. Commerce Operations

**Q14. At launch, is it Stripe cards only - or also Apple/Google Pay, PayPal, Zelle - and do we ship US-only or internationally?**
- _Why it matters:_ Slide 22/30 commit to Stripe; payment breadth and shipping scope change checkout and tax/shipping logic.
- _DECISION: launch payment methods + shipping geography._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

**Q15. Confirm the rules to encode: sales tax (MA 6.25% + any other state nexus), shipping rates / free-ship threshold ($300?), and returns policy for stock vs custom.**
- _Why it matters:_ These are simulated today; they must be real and legally correct, and the custom 'no returns' rule must be explicit before payment (Slides 5, 42).
- _INPUT: tax states, shipping table, and the written returns policy._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

**Q16. What is the order-to-fulfilment workflow - how do orders reach Sushma, who triggers tracking emails (SendGrid), and what's automated vs manual?**
- _Why it matters:_ Sushma owns packing/shipping (Slide 35); automation level caps how many orders the site can take without breaking.
- _INPUT/DECISION: notification + tracking flow and what we automate first._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

### G. Accounts, Reviews & Trust

**Q17. Customer accounts at launch should hold orders, saved measurements, custom requests and a wishlist - confirm, and which Google Business profile do we pull reviews from?**
- _Why it matters:_ Slide 16 lists accounts + Google Reviews as foundation; we need the exact account scope and the verified Google place to connect.
- _INPUT/DECISION: account feature set + Google Business profile/URL._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

### H. Marketing & Launch Readiness

**Q18. Are the launch assets ready - in-store contact capture started, IG/FB access, email tool choice (Brevo/Mailchimp) - and do we confirm the five launch offers?**
- _Why it matters:_ The zero-spend launch (Slides 38-42) depends entirely on existing assets and the offer set; gaps here delay go-live momentum.
- _INPUT/DECISION: asset access + email tool owner + approve the 5 offers._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

### I. Roadmap & Risk

**Q19. Of the future roadmap (live events, rental, bridal group order, AI stylist, AI-search, 3D views), which is the FIRST Phase-2 follow-on after launch?**
- _Why it matters:_ Slide 23 keeps these uncommitted; naming the next one shapes how we build the foundation so we don't rebuild later.
- _DECISION: the single most likely next feature to design toward._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

**Q20. What is our plan if the 200K-followers-to-buyers conversion is slow in the first 30 days - what would trigger paid ads or a scope change?**
- _Why it matters:_ Slide 6's honest caveat is the central business risk; agreeing the trigger now keeps the launch calm and data-driven (Slide 41).
- _DECISION: the metric/threshold that triggers paid spend or a pivot._
- **Answer:** 
- **Owner:** ____________  **Priority:** [ ] Now  [ ] Next  [ ] Later

## Leave the meeting with
- 1. Approved scope + the launch feature list (and what is fast-follow).
- 2. Approved pricing & the $2,850 deposit to begin.
- 3. A target launch date.
- 4. A catalog-data + photography handover plan and date.
- 5. Decisions on the $10-fee mechanics, measurement schema, and the two-photo-tool go/no-go.
