// Medusa v2 storefront client for Chaubandi.
// Talks to the backend at VITE_MEDUSA_BACKEND_URL using the publishable key.
// Every function returns plain data (or the cart object) and throws on HTTP error
// so callers can fall back to static behavior when the backend is unreachable.

const BASE = import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000";
const PUBLISHABLE_KEY = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || "";

async function api(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": PUBLISHABLE_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let detail = "";
    try { detail = JSON.stringify(await res.json()); } catch { /* ignore */ }
    throw new Error(`Medusa ${method} ${path} → ${res.status} ${detail}`);
  }
  // 204 / empty
  if (res.status === 204) return null;
  return res.json();
}

// ─── Region ───
let _regionId = null;
export async function getRegionId() {
  if (_regionId) return _regionId;
  const { regions } = await api("/store/regions");
  const us = regions.find((r) => r.name === "United States") || regions[0];
  _regionId = us?.id || null;
  return _regionId;
}

// ─── Products ───
// Default card gradient, used when a product has no photography yet.
const DEFAULT_SWATCH = "linear-gradient(140deg,#2a1f2d,#4a2040 60%,#1a1412)";

// Maps a Medusa product into the shape App.jsx expects.
//
// Presentation fields come from the seeded metadata contract (see
// docs/API.md in the backend): `category` is the canonical handle,
// `style_no`, `pack_contains`, `can_can`, `style_tips`, `fit_tips` and
// `customizable` drive the PDP detail tabs.
//
// Ratings are deliberately NOT read from metadata: real ratings come from
// /store/products/:id/reviews and are null until a review is approved. A
// product with no reviews must render as "no reviews yet", never as a
// default star count.
function mapProduct(p) {
  const md = p.metadata || {};
  const variants = (p.variants || []).map((v) => ({ id: v.id, title: v.title }));
  const firstPrice = p.variants?.[0]?.calculated_price?.calculated_amount;

  // Real Medusa images first; fall back to metadata.images for the older
  // hand-curated products that stored local /Products/... paths there.
  const images = (p.images || []).map((img) => img.url).filter(Boolean);
  const mdImages = Array.isArray(md.images) ? md.images : [];

  return {
    id: p.id,
    productId: p.id,
    handle: p.handle,
    name: p.title,
    desc: p.description || "",
    price: typeof firstPrice === "number" ? firstPrice : Number(md.price) || 0,
    // Canonical category handle (e.g. "lehengas"); `cat` is the legacy
    // display-name field kept for the hand-curated products.
    category: md.category || null,
    cat: md.cat || null,
    occasions: Array.isArray(md.occasion) ? md.occasion : [],
    collectionHandle: p.collection?.handle || null,
    badge: md.badge || undefined,
    color: md.color || DEFAULT_SWATCH,
    images: images.length ? images : mdImages,
    isPlaceholder: md.placeholder === true,
    // PDP detail fields
    styleNo: md.style_no || null,
    fabric: md.fabric || null,
    work: md.work || null,
    packContains: md.pack_contains || null,
    canCan: md.can_can || null,
    styleTips: md.style_tips || null,
    fitTips: md.fit_tips || null,
    care: md.care || null,
    customizable: md.customizable === true,
    // Populated on demand by loadProductReviews(); null means "not loaded".
    rating: null,
    reviews: 0,
    sizes: variants.map((v) => v.title),
    variants,
  };
}

export async function listProducts() {
  const regionId = await getRegionId();
  const { products } = await api(
    `/store/products?limit=300&region_id=${regionId}&fields=+metadata,*variants.calculated_price,*images,*collection`
  );
  return products.map(mapProduct);
}

// ─── Categories & occasion collections ───
// The 10 canonical categories and 6 occasion collections are created by the
// backend seed; the storefront reads them rather than hardcoding a list, so
// adding a category is a backend-only change.
export async function listCategories() {
  const { product_categories } = await api(
    "/store/product-categories?limit=50&fields=id,name,handle,rank"
  );
  return (product_categories || [])
    .slice()
    .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
    .map((c) => ({ id: c.id, name: c.name, handle: c.handle }));
}

export async function listCollections() {
  const { collections } = await api("/store/collections?limit=50");
  return (collections || []).map((c) => ({
    id: c.id,
    title: c.title,
    handle: c.handle,
  }));
}

// ─── Product reviews ───
// Approved reviews only. `average` is null when there are none — callers must
// render "no reviews yet" rather than substituting a number.
export async function getProductReviews(productId) {
  return api(`/store/products/${productId}/reviews`);
}

export async function submitProductReview(productId, { customer_name, rating, title, body }) {
  return api(`/store/products/${productId}/reviews`, {
    method: "POST",
    body: { customer_name, rating, title, body },
  });
}

// ─── Cart ───
// Medusa returns the cart under different keys depending on the endpoint;
// normalize so callers always receive the cart object.
function asCart(res) {
  return res?.cart || res?.parent || res;
}

export async function createCart(email) {
  const region_id = await getRegionId();
  const body = { region_id };
  if (email) body.email = email;
  return asCart(await api("/store/carts", { method: "POST", body }));
}

export async function getCart(id) {
  return asCart(await api(`/store/carts/${id}`));
}

export async function addLineItem(cartId, variantId, quantity = 1) {
  return asCart(
    await api(`/store/carts/${cartId}/line-items`, {
      method: "POST",
      body: { variant_id: variantId, quantity },
    })
  );
}

export async function updateLineItem(cartId, lineId, quantity) {
  return asCart(
    await api(`/store/carts/${cartId}/line-items/${lineId}`, {
      method: "POST",
      body: { quantity },
    })
  );
}

export async function removeLineItem(cartId, lineId) {
  return asCart(
    await api(`/store/carts/${cartId}/line-items/${lineId}`, { method: "DELETE" })
  );
}

export async function updateCart(cartId, data) {
  return asCart(await api(`/store/carts/${cartId}`, { method: "POST", body: data }));
}

// ─── Checkout ───
export async function listShippingOptions(cartId) {
  const { shipping_options } = await api(
    `/store/shipping-options?cart_id=${cartId}`
  );
  return shipping_options;
}

export async function addShippingMethod(cartId, optionId) {
  return asCart(
    await api(`/store/carts/${cartId}/shipping-methods`, {
      method: "POST",
      body: { option_id: optionId },
    })
  );
}

export async function initPaymentSession(cartId, providerId = "pp_system_default") {
  const { payment_collection } = await api("/store/payment-collections", {
    method: "POST",
    body: { cart_id: cartId },
  });
  await api(`/store/payment-collections/${payment_collection.id}/payment-sessions`, {
    method: "POST",
    body: { provider_id: providerId },
  });
  return payment_collection;
}

export async function completeCart(cartId) {
  // → { type: "order", order } on success, or { type: "cart", error } on failure
  return api(`/store/carts/${cartId}/complete`, { method: "POST" });
}

// Rebuild the App's local cart array from a Medusa cart, mapping each line
// back to the loaded product for display fields (color gradient, images).
export function cartFromMedusa(mcart, products = []) {
  return (mcart?.items || []).map((li) => {
    const prod = products.find((p) => p.productId === li.product_id) || {};
    return {
      id: prod.id ?? li.product_id,
      productId: li.product_id,
      lineId: li.id,
      variantId: li.variant_id,
      name: li.product_title || prod.name || li.title,
      price: li.unit_price,
      size: li.variant_title || "",
      qty: li.quantity,
      color: prod.color,
      images: prod.images || [],
    };
  });
}

// ─── Email / messaging ───
// Newsletter signup + contact/custom-design messages. These hit public store
// routes that email the owner via the backend NOTIFICATION provider. Callers
// wrap them in try/catch so a missing backend never blocks the UI.
export async function subscribeNewsletter(email) {
  return api("/store/newsletter", { method: "POST", body: { email } });
}

export async function sendContactMessage(payload) {
  // payload: { name?, email, phone?, subject?, message, kind? }
  return api("/store/contact", { method: "POST", body: payload });
}

// Live Google rating + up to 5 featured reviews (cached server-side).
// Returns { configured, rating, total, googleUrl, reviews:[{author,text,...}] }.
export async function getGoogleReviews() {
  return api("/store/reviews");
}

// ─── Customer accounts ───
const TOKEN_KEY = "cb_customer_token";
export function getToken() {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}
export function setToken(token) {
  try { token ? localStorage.setItem(TOKEN_KEY, token) : localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
}

export async function registerCustomer({ email, password, first_name, last_name }) {
  const reg = await api("/auth/customer/emailpass/register", {
    method: "POST",
    body: { email, password },
  });
  // Create the customer profile using the registration token.
  await api("/store/customers", {
    method: "POST",
    body: { email, first_name, last_name },
    token: reg.token,
  });
  // Re-authenticate to get a token bound to the new customer actor.
  return loginCustomer({ email, password });
}

export async function loginCustomer({ email, password }) {
  const res = await api("/auth/customer/emailpass", {
    method: "POST",
    body: { email, password },
  });
  setToken(res.token);
  return res.token;
}

export function logoutCustomer() {
  setToken(null);
}

// Ask Medusa to start a password reset for this email. The backend emits an
// auth.password_reset event; the email with the reset link goes out once a
// notification subscriber + SendGrid creds are live.
export async function requestPasswordReset(email) {
  return api("/auth/customer/emailpass/reset-password", {
    method: "POST",
    body: { identifier: email },
  });
}

export async function getCustomer(token = getToken()) {
  if (!token) return null;
  const res = await api("/store/customers/me", { token });
  return res.customer;
}

export async function listCustomerOrders(token = getToken()) {
  if (!token) return [];
  const res = await api(
    "/store/orders?limit=50&order=-created_at&fields=id,display_id,total,currency_code,email,created_at,status,fulfillment_status,payment_status,*items",
    { token }
  );
  return res.orders || [];
}

// ─── Measurements (Lashkaraa field set) ───
// One chart per customer. Any subset of fields may be sent; omitted fields
// keep their stored value, so a single number can be saved on its own.
export const MEASUREMENT_FIELDS = [
  { key: "height", label: "Height", group: "general" },
  { key: "bust", label: "Bust", group: "upper" },
  { key: "above_waist", label: "Above Waist", group: "upper" },
  { key: "waist", label: "Waist", group: "upper" },
  { key: "hips", label: "Hips", group: "upper" },
  { key: "shoulder_width", label: "Shoulder Width", group: "upper" },
  { key: "armhole", label: "Armhole", group: "upper" },
  { key: "bicep", label: "Bicep", group: "upper" },
  { key: "sleeve_length", label: "Sleeve Length", group: "upper" },
  { key: "front_neck_depth", label: "Front Neck Depth", group: "upper" },
  { key: "back_neck_depth", label: "Back Neck Depth", group: "upper" },
  { key: "top_length", label: "Top Length", group: "upper" },
  { key: "bottom_length_skirt", label: "Skirt Length", group: "lower" },
  { key: "bottom_length_pant", label: "Pant Length", group: "lower" },
  { key: "thigh", label: "Thigh", group: "lower" },
  { key: "knee", label: "Knee", group: "lower" },
  { key: "ankle", label: "Ankle", group: "lower" },
];

export async function getMeasurements(token = getToken()) {
  if (!token) return null;
  const res = await api("/store/customers/me/measurements", { token });
  return res.measurement;
}

// Save (or update) the customer's measurements to their profile.
export async function saveMeasurements(data, token = getToken()) {
  if (!token) throw new Error("auth required");
  const res = await api("/store/customers/me/measurements", {
    method: "POST",
    body: data,
    token,
  });
  return res.measurement;
}

// ─── Custom-design inspiration ───
// Upload inspiration image files (multipart) for a logged-in customer.
// Returns an array of hosted URLs. Requires a customer token — the backend
// caps this at 5 images x 10MB and only accepts JPEG/PNG/WebP/HEIC.
export async function uploadInspirationImages(files, token = getToken()) {
  if (!token) throw new Error("auth required");
  const form = new FormData();
  for (const f of files) form.append("files", f);
  // Note: don't set Content-Type — the browser adds the multipart boundary.
  const res = await fetch(`${BASE}/store/uploads`, {
    method: "POST",
    headers: {
      "x-publishable-api-key": PUBLISHABLE_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });
  if (!res.ok) {
    let detail = "";
    try { detail = JSON.stringify(await res.json()); } catch { /* ignore */ }
    throw new Error(`Medusa POST /store/uploads → ${res.status} ${detail}`);
  }
  const { files: created } = await res.json();
  return (created || []).map((f) => f.url);
}

// Create a custom-design request. Creates a draft order in Medusa (visible in
// Admin → Orders) carrying the contact details, design specs and reference
// images, and emails Sushma.
//
// Public: no login required. A logged-in customer is linked automatically when
// a token is present.
// payload: { name, email, garment_type, phone?, occasion?, event_date?,
//            budget_range?, notes?, image_urls?: string[] }
export async function createCustomDesignRequest(payload, token = getToken()) {
  return api("/store/custom-design-requests", {
    method: "POST",
    body: payload,
    ...(token ? { token } : {}),
  });
}

// Legacy name, kept so older call sites keep working.
export const createInspirationRequest = createCustomDesignRequest;

// ─── Appointments ───
// Bookable days for a month, for greying out dates in the picker.
// month: "YYYY-MM" → { month, timezone, days: [{ date, available, ... }] }
export async function getAppointmentAvailability(month) {
  return api(`/store/appointments/availability?month=${month}`);
}

// Individual time slots for a date range.
export async function getAppointmentSlots(startDate, weeks = 4) {
  const qs = new URLSearchParams();
  if (startDate) qs.set("start_date", startDate);
  if (weeks) qs.set("weeks", String(weeks));
  const { slots } = await api(`/store/appointments/slots?${qs}`);
  return slots;
}

export async function bookAppointment({ requested_date, time_slot, notes }, token = getToken()) {
  if (!token) throw new Error("auth required");
  const res = await api("/store/appointments", {
    method: "POST",
    body: { requested_date, time_slot, notes },
    token,
  });
  return res.appointment;
}

export async function listMyAppointments(token = getToken()) {
  if (!token) return [];
  const res = await api("/store/appointments", { token });
  return res.appointments || [];
}

/**
 * Error thrown when the backend has no Stripe key configured. The booking is
 * still saved — only the fee can't be taken — so callers should treat this as
 * "booked, payment to follow" rather than a failure.
 */
export class PaymentsNotConfiguredError extends Error {
  constructor(message) {
    super(message || "Payments are not configured yet.");
    this.name = "PaymentsNotConfiguredError";
    this.code = "payments_not_configured";
  }
}

/**
 * Start the appointment fee payment.
 * Resolves to either { paid: true, appointment } when the backend captured it
 * outright, or { clientSecret, paymentIntentId } for the browser to confirm.
 * Throws PaymentsNotConfiguredError when no Stripe key is set.
 */
export async function payAppointmentFee(appointmentId, token = getToken()) {
  if (!token) throw new Error("auth required");
  const res = await fetch(`${BASE}/store/appointments/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": PUBLISHABLE_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ appointment_id: appointmentId }),
  });

  const data = await res.json().catch(() => ({}));
  if (res.status === 503 && data.code === "payments_not_configured") {
    throw new PaymentsNotConfiguredError(data.message);
  }
  if (!res.ok) {
    throw new Error(data.message || `Payment failed (${res.status})`);
  }
  if (data.success) return { paid: true, appointment: data.appointment };
  return { clientSecret: data.client_secret, paymentIntentId: data.payment_intent_id };
}

/** Verify a browser-confirmed PaymentIntent and mark the fee paid. */
export async function confirmAppointmentPayment(appointmentId, token = getToken()) {
  if (!token) throw new Error("auth required");
  const res = await api("/store/appointments/pay/confirm", {
    method: "POST",
    body: { appointment_id: appointmentId },
    token,
  });
  return res.appointment;
}

/** The fee shown in the UI, in whole dollars. Mirrors APPOINTMENT_FEE_CENTS. */
export const APPOINTMENT_FEE_USD = 10;

// Link the logged-in customer to their active cart so the order is tied to
// their account.
export async function associateCartCustomer(cartId, token = getToken()) {
  if (!token) return null;
  return asCart(
    await api(`/store/carts/${cartId}/customer`, { method: "POST", token })
  );
}

// Run the full address → shipping → payment → complete sequence.
// `deliveryMethod` is "ship" or "pickup"; returns the created order.
export async function placeOrder(cartId, form, deliveryMethod) {
  const isPickup = deliveryMethod === "pickup";
  const address = {
    first_name: form.firstName || "Guest",
    last_name: form.lastName || "Customer",
    address_1: isPickup ? "177 Massachusetts Ave" : form.address || "177 Massachusetts Ave",
    city: isPickup ? "Arlington" : form.city || "Arlington",
    province: isPickup ? "MA" : form.state || "MA",
    postal_code: isPickup ? "02474" : form.zip || "02474",
    country_code: "us",
    phone: form.phone || "",
  };

  await updateCart(cartId, {
    email: form.email || "guest@chaubandi.com",
    shipping_address: address,
    billing_address: address,
  });

  const options = await listShippingOptions(cartId);
  const chosen = isPickup
    ? options.find((o) => /pick ?up/i.test(o.name)) || options[0]
    : options.find((o) => !/pick ?up/i.test(o.name)) || options[0];
  if (!chosen) throw new Error("No shipping option available");
  await addShippingMethod(cartId, chosen.id);

  await initPaymentSession(cartId, "pp_system_default");

  const res = await completeCart(cartId);
  if (res.type !== "order") {
    throw new Error(res.error?.message || "Order could not be completed");
  }
  return res.order;
}
