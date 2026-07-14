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
// Maps a Medusa product into the shape App.jsx already expects, pulling
// presentation fields (cat/badge/color/images/rating/reviews) from metadata.
function mapProduct(p) {
  const md = p.metadata || {};
  const variants = (p.variants || []).map((v) => ({ id: v.id, title: v.title }));
  const firstPrice = p.variants?.[0]?.calculated_price?.calculated_amount;
  const mdImages = Array.isArray(md.images) ? md.images : [];
  return {
    id: p.id,
    productId: p.id,
    handle: p.handle,
    name: p.title,
    desc: p.description || "",
    price: typeof firstPrice === "number" ? firstPrice : Number(md.price) || 0,
    cat: md.cat || "All",
    badge: md.badge || undefined,
    color: md.color || "linear-gradient(140deg,#2a1f2d,#4a2040 60%,#1a1412)",
    images: mdImages,
    rating: typeof md.rating === "number" ? md.rating : Number(md.rating) || 4.8,
    reviews: typeof md.reviews === "number" ? md.reviews : Number(md.reviews) || 0,
    sizes: variants.map((v) => v.title),
    variants,
  };
}

export async function listProducts() {
  const regionId = await getRegionId();
  const { products } = await api(
    `/store/products?limit=100&region_id=${regionId}&fields=+metadata,*variants.calculated_price`
  );
  return products.map(mapProduct);
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

// Save (or update) the customer's measurements to their profile.
export async function saveMeasurements(data, token = getToken()) {
  if (!token) throw new Error("auth required");
  const res = await api("/store/measurements", { method: "POST", body: data, token });
  return res.measurement;
}

// ─── Custom-design inspiration ───
// Upload inspiration image files (multipart) for a logged-in customer.
// Returns an array of hosted URLs. Requires a customer token — the backend
// caps this at 3 images x 10MB and only accepts JPEG/PNG/WebP/HEIC.
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

// Create a custom-design inspiration request. Creates a draft order in Medusa
// (visible in Admin → Orders) carrying the reference image + design specs.
// Requires image_url and garment_type; requires a logged-in customer.
export async function createInspirationRequest(payload, token = getToken()) {
  if (!token) throw new Error("auth required");
  return api("/store/inspiration", { method: "POST", body: payload, token });
}

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
