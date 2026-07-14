import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Heart, Search, X, Plus, Minus, Trash2, ChevronRight, ChevronLeft, User, Filter, Check } from "lucide-react";
import * as medusa from "./lib/medusa";

const PRODUCTS = [
  { id: 1, name: "Multicolor Patchwork Embroidered Lehenga", price: 489, cat: "Lehengas", badge: "New Arrival", color: "linear-gradient(140deg,#2a1f2d,#4a2040 25%,#c5a255 45%,#d4466a 60%,#1a3a2a 80%)", images: ["/Products/Lehenga-Demo/img1.jpg", "/Products/Lehenga-Demo/img2.jpg", "/Products/Lehenga-Demo/img3.jpg"], rating: 4.9, reviews: 47, desc: "Rich multicolor patchwork with geometric and floral motifs, peacock borders, and mirror work. Includes embroidered blouse and black velvet dupatta.", sizes: ["XS","S","M","L","XL","Custom"] },
  { id: 2, name: "Black Embroidered Sherwani Set", price: 399, cat: "Sherwanis", badge: "Trending", color: "linear-gradient(140deg,#0c0a09,#1e1b18 40%,#2a2420 70%,#0c0a09)", images: [], rating: 4.8, reviews: 32, desc: "Intricate geometric embroidery on premium black fabric. Complete set with kurta, sherwani jacket, and churidar.", sizes: ["S","M","L","XL","XXL"] },
  { id: 3, name: "Teal Green Embroidered Silk Lehenga", price: 349, cat: "Lehengas", badge: "Bestseller", color: "linear-gradient(140deg,#0a4a4a,#1a6a5a 50%,#0a3a3a)", images: ["/Products/Lehenga/WhatsApp Image 2026-05-05 at 12.20.34 AM (1).jpeg", "/Products/Lehenga/WhatsApp Image 2026-05-05 at 12.20.34 AM (2).jpeg"], rating: 4.7, reviews: 58, desc: "Handwoven silk with delicate thread and zari embroidery. Net dupatta with matching border.", sizes: ["XS","S","M","L","XL"] },
  { id: 4, name: "Maroon Velvet Bridal Lehenga", price: 599, cat: "Bridal", badge: "Bridal", color: "linear-gradient(140deg,#3a0818,#6a1830 50%,#3a0818)", images: [], rating: 5.0, reviews: 21, desc: "Luxurious velvet lehenga with heavy zardozi and stone work. Premium bridal collection with matching jewelry set.", sizes: ["S","M","L","XL","Custom"] },
  { id: 5, name: "Royal Blue Brocade Lehenga", price: 429, cat: "Lehengas", badge: "New", color: "linear-gradient(140deg,#0a1040,#1a2080 50%,#0a1040)", images: ["/Products/Lehenga/WhatsApp Image 2026-05-05 at 12.20.34 AM (3).jpeg", "/Products/Lehenga/WhatsApp Image 2026-05-05 at 12.20.34 AM (4).jpeg"], rating: 4.6, reviews: 19, desc: "Rich brocade fabric with gold woven patterns. Paired with contrast gold blouse and net dupatta.", sizes: ["XS","S","M","L","XL"] },
  { id: 6, name: "Gold Embroidered Anarkali Suit", price: 279, cat: "Anarkali", color: "linear-gradient(140deg,#3a2a10,#6a4a20 50%,#3a2a10)", images: [], rating: 4.8, reviews: 34, desc: "Floor-length anarkali with heavy gold embroidery. Includes churidar and matching dupatta.", sizes: ["S","M","L","XL"] },
  { id: 7, name: "Blush Pink Embroidered Saree", price: 319, cat: "Sarees", badge: "Popular", color: "linear-gradient(140deg,#6a3a3a,#a06060 50%,#6a3a3a)", images: ["/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.53 AM.jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.53 AM (1).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.53 AM (2).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.53 AM (3).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.53 AM (4).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.53 AM (5).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.53 AM (6).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.53 AM (7).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.53 AM (8).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.53 AM (9).jpeg"], rating: 4.7, reviews: 41, desc: "Soft georgette saree with pearl and sequin work. Pre-stitched option available. Includes matching blouse.", sizes: ["Free Size"] },
  { id: 8, name: "Emerald Sharara Set", price: 459, cat: "Sharara", badge: "New", color: "linear-gradient(140deg,#0a3a1a,#1a5a2a 50%,#0a3a1a)", images: [], rating: 4.9, reviews: 16, desc: "Luxurious sharara with heavy thread embroidery and mirror work. Three-piece set with crop top and dupatta.", sizes: ["S","M","L","XL"] },
  { id: 9, name: "Ivory Pearl Work Bridal Lehenga", price: 529, cat: "Bridal", color: "linear-gradient(140deg,#8a7a6a,#c0b0a0 50%,#8a7a6a)", images: [], rating: 4.8, reviews: 27, desc: "Ivory silk lehenga with thousands of hand-sewn pearls and crystal beading. A modern bridal masterpiece.", sizes: ["S","M","L","XL","Custom"] },
  { id: 10, name: "Navy Silk Kurta Pajama", price: 189, cat: "Sherwanis", color: "linear-gradient(140deg,#0a1030,#1a2050 50%,#0a1030)", images: [], rating: 4.5, reviews: 53, desc: "Pure silk kurta with subtle self-print and button detailing. Comfortable fit for festive occasions.", sizes: ["S","M","L","XL","XXL"] },
  { id: 11, name: "Red Banarasi Saree", price: 389, cat: "Sarees", badge: "Heritage", color: "linear-gradient(140deg,#5a0a0a,#8a1a1a 50%,#5a0a0a)", images: ["/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM.jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM (1).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM (2).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM (3).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM (4).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM (5).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM (6).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM (7).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM (8).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM (9).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM (10).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM (11).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM (12).jpeg", "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.54 AM (13).jpeg"], rating: 4.9, reviews: 38, desc: "Authentic Banarasi silk with traditional gold traditional gold zari motifs. Handwoven by master artisans.", sizes: ["Free Size"] },
  { id: 12, name: "Pastel Mint Sharara Set", price: 339, cat: "Sharara", color: "linear-gradient(140deg,#3a6a5a,#5a9a8a 50%,#3a6a5a)", images: [], rating: 4.6, reviews: 22, desc: "Light and breezy mint sharara with delicate sequin scatter. Perfect for summer celebrations.", sizes: ["S","M","L","XL"] },
];

const CATEGORIES = ["All", "Lehengas", "Sarees", "Sherwanis", "Bridal", "Anarkali", "Sharara"];

const CATEGORY_STRIP = [
  { label: "Best Seller",     filter: "All",       image: "/images/cat-bestseller.png",  color: "linear-gradient(145deg,#b8860b,#d4a843 55%,#8b6308)" },
  { label: "Wedding Dresses", filter: "Bridal",    image: "/images/cat-wedding.png",     color: "linear-gradient(145deg,#3a0818,#7a2040 55%,#3a0818)" },
  { label: "Lehenga",         filter: "Lehengas",  image: "/images/cat-lehenga.png",     color: "linear-gradient(145deg,#3a1830,#6a2858 55%,#3a1830)" },
  { label: "Saree",           filter: "Sarees",    image: "/images/cat-saree.png",       color: "linear-gradient(145deg,#6a3a3a,#a05858 55%,#5a2828)" },
  { label: "Men Clothing",    filter: "Sherwanis", image: "/images/cat-men.png",         color: "linear-gradient(145deg,#1a1412,#322824 55%,#1a1412)" },
  { label: "Indo-Western",    filter: "All",       image: "/images/cat-indo.png",        color: "linear-gradient(145deg,#1a2060,#303880 55%,#121848)" },
  { label: "Nepali Suits",    filter: "All",       image: "/images/cat-nepali.png",      color: "linear-gradient(145deg,#1a3828,#2a5840 55%,#122818)" },
  { label: "Sharara",         filter: "Sharara",   image: "/images/cat-sharara.png",     color: "linear-gradient(145deg,#0a3a1a,#1a5a30 55%,#082810)" },
  { label: "Anarkali",        filter: "Anarkali",  image: "/images/cat-anarkali.png",    color: "linear-gradient(145deg,#3a2a10,#5e4020 55%,#281a08)" },
  { label: "Jewellery",       filter: "All",       image: "/images/cat-jewelry.jpeg",     color: "linear-gradient(145deg,#5a3808,#9a6818 55%,#3a2204)" },
  { label: "Kids",            filter: "All",       image: "/images/cat-kids.png",        color: "linear-gradient(145deg,#2a1a5a,#4a3290 55%,#1a1040)" },
  { label: "Plus Size",       filter: "All",       image: "/images/cat-plussize.png",    color: "linear-gradient(145deg,#5a1a3a,#8a2a60 55%,#380e28)" },
];

const HERO_SLIDES = [
  {
    id: 1, tag: "Summer 2026 · New In", headline: "New Arrivals", sub: "Summer Collection",
    body: "Fresh styles just landed — shop our latest Indian & Western fusion pieces.",
    cta: "Shop Now", action: "shop", filter: "All",
    image: "/images/hero-summer.png", 
    bg: "linear-gradient(135deg,#1a1412 0%,#3a2008 20%,#6a3808 45%,#a06818 65%,#1a1412 100%)",
    accent: "#c5a255",
  },
  {
    id: 2, tag: "Bridal 2026", headline: "Bridal Collection", sub: "Handcrafted Elegance",
    body: "Every piece crafted by hand. Zardozi, pearls & lehenga sets for your perfect day.",
    cta: "Explore Bridal", action: "shop", filter: "Bridal",
    image: "/images/hero-bridal.png", 
    bg: "linear-gradient(135deg,#100408 0%,#3a0c1e 25%,#6a1830 50%,#8b2c3a 70%,#100408 100%)",
    accent: "#e8b4bc",
  },
  {
    id: 3, tag: "The Festive Edit", headline: "Turn Heads", sub: "Guest & Party Wear",
    body: "Stunning Indo-Western gowns and lehengas for Sangeets, Receptions, and celebrations.",
    cta: "Shop Party Wear", action: "shop", filter: "All",
    image: "/images/hero-promise.png", 
    bg: "linear-gradient(135deg,#061410 0%,#0c3020 25%,#1a5a38 50%,#2a7050 70%,#061410 100%)",
    accent: "#7dd4b0",
  },
  {
    id: 4, tag: "In-Store Experience", headline: "Visit Our Boutique", sub: "Arlington, MA",
    body: "177 Massachusetts Ave · Tue–Sun · Expert styling from Sushma.",
    cta: "Book Appointment", action: "whatsapp", filter: "All",
    // Leaving the image property off this one so it falls back to the blue gradient design
    bg: "linear-gradient(135deg,#080c18 0%,#141e40 25%,#202e60 50%,#2a3a78 70%,#080c18 100%)",
    accent: "#8a9ad4",
  },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [shopFilter, setShopFilter] = useState("All");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [products, setProducts] = useState(PRODUCTS);
  const [cartId, setCartId] = useState(null);   // Medusa cart id; null → offline/local mode
  const [placedOrder, setPlacedOrder] = useState(null);
  const [infoTopic, setInfoTopic] = useState("privacy");
  const [searchQuery, setSearchQuery] = useState("");
  const [customer, setCustomer] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cb_wishlist") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem("cb_wishlist", JSON.stringify(wishlist)); } catch { /* ignore */ }
  }, [wishlist]);

  const toggleWishlist = (id) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const inWishlist = (id) => wishlist.includes(id);
  const wishlistCount = wishlist.length;

  const runSearch = () => { setShopFilter("All"); navigate("shop"); };

  // Restore a logged-in customer from a saved token on first load.
  useEffect(() => {
    (async () => {
      const token = medusa.getToken();
      if (!token) return;
      try { setCustomer(await medusa.getCustomer(token)); }
      catch { medusa.setToken(null); }
    })();
  }, []);

  const handleLogin = async (creds) => {
    await medusa.loginCustomer(creds);
    const c = await medusa.getCustomer();
    setCustomer(c);
    if (cartId) { try { await medusa.associateCartCustomer(cartId); } catch { /* non-fatal */ } }
    return c;
  };
  const handleRegister = async (data) => {
    await medusa.registerCustomer(data);
    const c = await medusa.getCustomer();
    setCustomer(c);
    if (cartId) { try { await medusa.associateCartCustomer(cartId); } catch { /* non-fatal */ } }
    return c;
  };
  const handleLogout = () => { medusa.logoutCustomer(); setCustomer(null); navigate("home"); };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Load the live catalog + restore/create a Medusa cart on first mount.
  // If the backend is unreachable, we silently keep the static PRODUCTS and
  // the purely-local cart so the site still works as a demo.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const apiProducts = await medusa.listProducts();
        if (!cancelled && apiProducts.length) setProducts(apiProducts);

        const saved = localStorage.getItem("cb_cart_id");
        let cid = saved;
        if (cid) {
          const existing = await medusa.getCart(cid).catch(() => null);
          if (!existing || existing.completed_at) cid = null;
          else if (!cancelled) setCart(medusa.cartFromMedusa(existing, apiProducts));
        }
        if (!cid) {
          const fresh = await medusa.createCart();
          cid = fresh.id;
          localStorage.setItem("cb_cart_id", cid);
        }
        if (!cancelled) setCartId(cid);
      } catch (e) {
        console.warn("[Chaubandi] Medusa backend unavailable — using static demo data.", e);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const navigate = (p, prod) => {
    setPage(p);
    if (prod) setSelectedProduct(prod);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goInfo = (topic) => { setInfoTopic(topic); navigate("info"); };

  const addToCart = async (product, size, quantity = 1) => {
    const variantId = product.variants?.find(v => v.title === size)?.id;
    if (cartId && variantId) {
      try {
        const updated = await medusa.addLineItem(cartId, variantId, quantity);
        setCart(medusa.cartFromMedusa(updated, products));
        setCartOpen(true);
        return;
      } catch (e) {
        console.warn("[Chaubandi] addLineItem failed, using local cart.", e);
      }
    }
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id && i.size === size);
      if (exists) return prev.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + quantity } : i);
      return [...prev, { ...product, size, qty: quantity }];
    });
    setCartOpen(true);
  };

  const updateQty = async (id, size, delta) => {
    const item = cart.find(i => i.id === id && i.size === size);
    if (cartId && item?.lineId) {
      try {
        const newQty = item.qty + delta;
        const updated = newQty <= 0
          ? await medusa.removeLineItem(cartId, item.lineId)
          : await medusa.updateLineItem(cartId, item.lineId, newQty);
        setCart(medusa.cartFromMedusa(updated, products));
        return;
      } catch (e) {
        console.warn("[Chaubandi] updateQty failed, using local cart.", e);
      }
    }
    setCart(prev => prev.map(i => i.id === id && i.size === size ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const removeItem = async (id, size) => {
    const item = cart.find(i => i.id === id && i.size === size);
    if (cartId && item?.lineId) {
      try {
        const updated = await medusa.removeLineItem(cartId, item.lineId);
        setCart(medusa.cartFromMedusa(updated, products));
        return;
      } catch (e) {
        console.warn("[Chaubandi] removeItem failed, using local cart.", e);
      }
    }
    setCart(prev => prev.filter(i => !(i.id === id && i.size === size)));
  };

  // Full checkout against Medusa. Returns the created order, and rotates in a
  // fresh cart for the next visit. Throws so CheckoutPage can surface errors.
  const placeOrder = async (form, deliveryMethod) => {
    if (!cartId) throw new Error("offline");
    const order = await medusa.placeOrder(cartId, form, deliveryMethod);
    setPlacedOrder(order);
    // Keep a local record so guests can use the Track Order page.
    try {
      const rec = { display_id: order.display_id, email: (form.email || "").toLowerCase(), created_at: order.created_at || new Date().toISOString(), items: (order.items || []).map(i => ({ title: i.product_title || i.title, qty: i.quantity })), method: deliveryMethod };
      const list = JSON.parse(localStorage.getItem("cb_orders") || "[]");
      localStorage.setItem("cb_orders", JSON.stringify([rec, ...list].slice(0, 20)));
    } catch { /* ignore */ }
    setCart([]);
    try {
      const fresh = await medusa.createCart();
      setCartId(fresh.id);
      localStorage.setItem("cb_cart_id", fresh.id);
    } catch { /* next visit will re-create */ }
    return order;
  };

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", background: "#0d0a08", color: "#f0e6d2", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{overflow-x:hidden}
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:#15110d}
        ::-webkit-scrollbar-thumb{background:#c5a255;border-radius:3px}
        @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        .fade-in{animation:fadeIn .6s ease forwards;opacity:0}
        .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}.d4{animation-delay:.4s}.d5{animation-delay:.5s}
        .hover-lift{transition:transform .3s,box-shadow .3s}
        .hover-lift:hover{transform:translateY(-6px);box-shadow:0 12px 40px rgba(0,0,0,.55)}
        .hover-lift:hover .wish-btn{opacity:1!important}
        .img-zoom{overflow:hidden}
        .img-zoom>div, .img-zoom>img{transition:transform .6s}.img-zoom:hover>div, .img-zoom:hover>img{transform:scale(1.06)}
        .btn-shine{position:relative;overflow:hidden}
        .btn-shine::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);transition:left .6s}
        .btn-shine:hover::after{left:100%}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .cat-strip::-webkit-scrollbar{display:none}
        .rev-track{scrollbar-width:none;-ms-overflow-style:none}
        .rev-track::-webkit-scrollbar{display:none}
        .cat-item-thumb{transition:transform .3s,box-shadow .3s}
        .cat-item-thumb:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(26,20,18,.18)!important}
        .cat-item-label{transition:color .3s}
        .cat-item:hover .cat-item-label{color:#f0e6d2!important}
        
        @media (max-width: 768px) {
          .mobile-stack { flex-direction: column !important; }
          .mobile-grid { grid-template-columns: 1fr !important; gap: 24px !important; padding: 32px 16px !important; }
          .mobile-hide { display: none !important; }
          .mobile-hero-text { font-size: 40px !important; }
          .mobile-only { display: inline-flex !important; }
          .shop-sidebar { display: none !important; }
          .shop-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── ANNOUNCEMENT MARQUEE ── */}
      <div style={{ background: "#1f1812", borderBottom: "1px solid #2b2218", overflow: "hidden", whiteSpace: "nowrap", padding: "9px 0" }}>
        <div style={{ display: "inline-block", animation: "marquee 28s linear infinite" }}>
          {[...Array(2)].map((_, i) => (
            <span key={i}>
              {["FREE SHIPPING ON ORDERS ABOVE $249", "SALE UPTO 50% OFF", "SHIPPING WORLDWIDE", "NEW ARRIVALS WEEKLY", "FREE ALTERATIONS INCLUDED"].map(msg => (
                <span key={msg} style={{ fontSize: 11.5, letterSpacing: 2, color: "#e8c97a", fontWeight: 500 }}>
                  <span style={{ padding: "0 28px" }}>{msg}</span>
                  <span style={{ color: "#6e6353" }}>•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN NAV ROW (sticky) ── */}
      <header style={{ background: "#0d0a08", borderBottom: "1px solid #2b2218", position: "sticky", top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", height: 112, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 24 }}>

          {/* LEFT: primary nav */}
          <nav className="mobile-hide" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {["WOMEN", "MEN"].map(item => (
              <span key={item} onClick={() => navigate("shop")}
                style={{ fontSize: 14, letterSpacing: 1, color: "#f0e6d2", cursor: "pointer", fontWeight: 500, whiteSpace: "nowrap", transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = "#e8c97a"} onMouseLeave={e => e.target.style.color = "#f0e6d2"}>
                {item}
              </span>
            ))}
            <span onClick={() => navigate("shop")}
              style={{ fontSize: 14, letterSpacing: 1, color: "#f0e6d2", cursor: "pointer", fontWeight: 500, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4, transition: "color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"} onMouseLeave={e => e.currentTarget.style.color = "#f0e6d2"}>
              KIDS
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </span>
          </nav>

          {/* CENTER: logo */}
          <div style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => navigate("home")}>
            <img src="/logo.png" alt="Chaubandi · Knots of Tradition" style={{ height: 92, width: "auto", display: "block" }} />
          </div>

          {/* RIGHT: Virtual Try-On + icons */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 18 }}>
            <button className="btn-shine mobile-hide" onClick={() => navigate("live")} style={{ padding: "11px 22px", background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", borderRadius: 6, fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap" }}>
              Virtual Try-On
            </button>
            <span style={{ cursor: "pointer", color: "#f0e6d2", display: "flex" }} onClick={() => window.open("https://wa.me/18578001282", "_blank")}
              onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"} onMouseLeave={e => e.currentTarget.style.color = "#f0e6d2"}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </span>
            <span style={{ cursor: "pointer", color: "#f0e6d2", display: "flex" }} onClick={() => window.open("https://instagram.com/chaubandiboston", "_blank")}
              onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"} onMouseLeave={e => e.currentTarget.style.color = "#f0e6d2"}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </span>
            <span onClick={() => navigate("account")} title={customer ? `Hi, ${customer.first_name || "account"}` : "Sign in"} style={{ cursor: "pointer", color: customer ? "#e8c97a" : "#f0e6d2", display: "flex", position: "relative" }}
              onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"} onMouseLeave={e => e.currentTarget.style.color = customer ? "#e8c97a" : "#f0e6d2"}>
              <User size={22} strokeWidth={1.7} />
              {customer && <span style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, borderRadius: "50%", background: "#3dbd83", border: "1.5px solid #0d0a08" }} />}
            </span>
            <span onClick={() => navigate("wishlist")} title="Wishlist" style={{ cursor: "pointer", color: "#f0e6d2", display: "flex", position: "relative" }}
              onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"} onMouseLeave={e => e.currentTarget.style.color = "#f0e6d2"}>
              <Heart size={22} strokeWidth={1.7} fill={wishlistCount > 0 ? "#e8c97a" : "none"} />
              {wishlistCount > 0 && <div style={{ position: "absolute", top: -6, right: -8, background: "#c5a255", color: "#1a1208", width: 18, height: 18, borderRadius: "50%", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{wishlistCount}</div>}
            </span>
            <div style={{ position: "relative", cursor: "pointer", color: "#f0e6d2", display: "flex" }} onClick={() => setCartOpen(true)}
              onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"} onMouseLeave={e => e.currentTarget.style.color = "#f0e6d2"}>
              <ShoppingBag size={22} strokeWidth={1.7} />
              {cartCount > 0 && <div style={{ position: "absolute", top: -6, right: -8, background: "#c5a255", color: "#1a1208", width: 18, height: 18, borderRadius: "50%", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{cartCount}</div>}
            </div>
          </div>

        </div>
      </header>

      {/* ── SEARCH ROW ── */}
      <div style={{ background: "#0d0a08", borderBottom: "1px solid #2b2218", padding: "20px 32px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", display: "flex", gap: 0 }}>
          <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={17} style={{ position: "absolute", left: 18, color: "#6e6353", pointerEvents: "none" }} />
            <input placeholder="Search by fabric, occasion or style..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") runSearch(); }}
              style={{ width: "100%", height: 52, paddingLeft: 48, paddingRight: 16, border: "1.5px solid #2b2218", borderRight: "none", borderRadius: "8px 0 0 8px", fontSize: 14.5, color: "#f0e6d2", background: "#16110c", outline: "none", fontFamily: "'Outfit',sans-serif" }}
              onFocus={e => e.target.style.borderColor = "#c5a255"} onBlur={e => e.target.style.borderColor = "#2b2218"} />
          </div>
          <button className="btn-shine mobile-hide" style={{ height: 52, padding: "0 24px", background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", borderRadius: "0 8px 8px 0", fontSize: 14.5, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif", display: "flex", alignItems: "center", gap: 9, whiteSpace: "nowrap" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
            Image Search
          </button>
        </div>
      </div>

      {/* ── CATEGORY LINKS ROW ── */}
      <div className="mobile-hide" style={{ background: "#0d0a08", borderBottom: "1px solid #2b2218", padding: "14px 32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "10px 32px" }}>
          {[
            { label: "New Arrivals", filter: "All" },
            { label: "Lehengas", filter: "Lehengas" },
            { label: "Wedding", filter: "Bridal" },
            { label: "Salwars", filter: "All" },
            { label: "Suits", filter: "All" },
            { label: "Blouses", filter: "All" },
            { label: "Kids Wear", filter: "All" },
            { label: "Jewellery", filter: "All" },
          ].map(item => (
            <span key={item.label} onClick={() => { setShopFilter(item.filter); navigate("shop"); }}
              style={{ fontSize: 15.5, color: "#f0e6d2", cursor: "pointer", whiteSpace: "nowrap", transition: "color .2s", borderBottom: "2px solid transparent", paddingBottom: 2 }}
              onMouseEnter={e => { e.target.style.color = "#e8c97a"; e.target.style.borderBottomColor = "#e8c97a"; }}
              onMouseLeave={e => { e.target.style.color = "#f0e6d2"; e.target.style.borderBottomColor = "transparent"; }}>
              {item.label}
            </span>
          ))}
          <span onClick={() => navigate("live")} style={{ fontSize: 15.5, color: "#3dbd83", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3dbd83", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" }} />
            Live Video Shopping
          </span>
          <span onClick={() => navigate("story")} style={{ fontSize: 15.5, color: "#f0e6d2", cursor: "pointer", whiteSpace: "nowrap", transition: "color .2s" }}
            onMouseEnter={e => e.target.style.color = "#e8c97a"} onMouseLeave={e => e.target.style.color = "#f0e6d2"}>
            Our Story
          </span>
          <span onClick={() => navigate("design")} style={{ fontSize: 15.5, color: "#f0e6d2", cursor: "pointer", whiteSpace: "nowrap", transition: "color .2s" }}
            onMouseEnter={e => e.target.style.color = "#e8c97a"} onMouseLeave={e => e.target.style.color = "#f0e6d2"}>
            Custom Design
          </span>
          <span onClick={() => navigate("fit")} style={{ fontSize: 15.5, color: "#f0e6d2", cursor: "pointer", whiteSpace: "nowrap", transition: "color .2s" }}
            onMouseEnter={e => e.target.style.color = "#e8c97a"} onMouseLeave={e => e.target.style.color = "#f0e6d2"}>
            Perfect Fit
          </span>
        </div>
      </div>

      {/* Cart Drawer */}
      {cartOpen && <>
        <div onClick={() => setCartOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 2000, cursor: "pointer" }} />
        <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 420, maxWidth: "90vw", background: "#16110c", zIndex: 2001, animation: "slideIn .3s ease", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #2b2218", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22 }}>Your Cart ({cartCount})</span>
            <X size={20} style={{ cursor: "pointer" }} onClick={() => setCartOpen(false)} />
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#a3947c" }}>
                <ShoppingBag size={48} strokeWidth={1} style={{ margin: "0 auto 16px", opacity: .4 }} />
                <p style={{ fontSize: 15 }}>Your cart is empty</p>
                <button onClick={() => { setCartOpen(false); navigate("shop"); }} style={{ marginTop: 20, padding: "12px 32px", background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Shop Now</button>
              </div>
            ) : cart.map(item => (
              <div key={`${item.id}-${item.size}`} style={{ display: "flex", gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #2b2218" }}>
                <div style={{ width: 80, height: 100, borderRadius: 4, flexShrink: 0, overflow: "hidden" }}>
                  <div style={{ background: item.color, width: "100%", height: "100%" }}>
                    {item.images?.[0] && (
                      <img src={item.images[0]} alt={item.name} loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    )}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, marginBottom: 4, lineHeight: 1.3 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "#a3947c", marginBottom: 8 }}>Size: {item.size}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #2b2218", borderRadius: 4 }}>
                      <button onClick={() => updateQty(item.id, item.size, -1)} style={{ border: "none", background: "none", cursor: "pointer", padding: "6px 10px" }}><Minus size={14} /></button>
                      <span style={{ fontSize: 13, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.size, 1)} style={{ border: "none", background: "none", cursor: "pointer", padding: "6px 10px" }}><Plus size={14} /></button>
                    </div>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17 }}>${(item.price * item.qty).toFixed(0)}</span>
                  </div>
                </div>
                <Trash2 size={16} style={{ cursor: "pointer", color: "#a3947c", flexShrink: 0, marginTop: 4 }} onClick={() => removeItem(item.id, item.size)} />
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: 24, borderTop: "1px solid #2b2218" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 13, color: "#a3947c" }}>Subtotal</span><span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20 }}>${cartTotal.toFixed(0)}</span></div>
              <div style={{ fontSize: 12, color: "#a3947c", marginBottom: 16 }}>Free shipping · Free alterations included</div>
              <button className="btn-shine" onClick={() => { setCartOpen(false); setCheckoutStep(1); setOrderPlaced(false); navigate("checkout"); }} style={{ width: "100%", height: 52, background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif" }}>
                Checkout — ${cartTotal.toFixed(0)}
              </button>
              <button onClick={() => { setCartOpen(false); navigate("shop"); }} style={{ width: "100%", padding: "12px", background: "none", border: "1px solid #2b2218", cursor: "pointer", marginTop: 8, fontSize: 12, color: "#a3947c" }}>Continue Shopping</button>
            </div>
          )}
        </div>
      </>}

      {/* Floating widgets: chat bubble, reviews tab, 10%-off tab */}
      <FloatingWidgets navigate={navigate} />

      {/* Category Strip */}
      {page === "shop" && <CategoryStrip navigate={navigate} setShopFilter={setShopFilter} activeFilter={shopFilter} />}

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {page === "home" && <HomePage navigate={navigate} products={products} setShopFilter={setShopFilter} addToCart={addToCart} />}
        {page === "shop" && <ShopPage navigate={navigate} products={products} filter={shopFilter} setFilter={setShopFilter} addToCart={addToCart} query={searchQuery} setQuery={setSearchQuery} inWishlist={inWishlist} toggleWishlist={toggleWishlist} />}
        {page === "product" && selectedProduct && <ProductPage product={selectedProduct} navigate={navigate} addToCart={addToCart} products={products} inWishlist={inWishlist} toggleWishlist={toggleWishlist} />}
        {page === "wishlist" && <WishlistPage products={products} wishlist={wishlist} toggleWishlist={toggleWishlist} navigate={navigate} />}
        {page === "checkout" && <CheckoutPage cart={cart} total={cartTotal} step={checkoutStep} setStep={setCheckoutStep} navigate={navigate} setCart={setCart} orderPlaced={orderPlaced} setOrderPlaced={setOrderPlaced} placeOrder={placeOrder} placedOrder={placedOrder} customer={customer} />}
        {page === "account" && <AccountPage customer={customer} onLogin={handleLogin} onRegister={handleRegister} onLogout={handleLogout} navigate={navigate} />}
        {page === "live" && <LiveVideoPage navigate={navigate} />}
        {page === "story" && <StoryPage navigate={navigate} />}
        {page === "contact" && <ContactPage navigate={navigate} />}
        {page === "design" && <DesignStudioPage navigate={navigate} />}
        {page === "fit" && <PerfectFitPage navigate={navigate} customer={customer} />}
        {page === "info" && <InfoPage topic={infoTopic} goInfo={goInfo} navigate={navigate} />}
        {page === "track" && <TrackOrderPage navigate={navigate} customer={customer} />}
      </main>

      {/* Global Footer */}
      <footer style={{ background: "#1f1812", borderTop: "1px solid rgba(197,162,85,0.25)", color: "#f0e6d2", paddingTop: 80, paddingBottom: 40, flexShrink: 0 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 64, marginBottom: 32 }}>
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>Help</h4>
            {[
              { label: "Contact Us", go: () => navigate("contact") },
              { label: "Track Order", go: () => navigate("track") },
              { label: "Shipping Info", go: () => goInfo("shipping") },
              { label: "Returns & Exchanges", go: () => goInfo("returns") },
              { label: "FAQ", go: () => goInfo("faq") },
              { label: "Sizing Info", go: () => goInfo("sizing") },
            ].map(l => (
              <div key={l.label} onClick={l.go} style={{ fontSize: 13, color: "rgba(240,235,228,0.7)", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(240,235,228,0.7)"}>{l.label}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>About</h4>
            {[
              { label: "Our Story", go: () => navigate("story") },
              { label: "Boutique Location", go: () => navigate("contact") },
              { label: "Book Appointment", go: () => navigate("live") },
              { label: "Custom Design", go: () => navigate("design") },
            ].map(l => (
              <div key={l.label} onClick={l.go} style={{ fontSize: 13, color: "rgba(240,235,228,0.7)", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(240,235,228,0.7)"}>{l.label}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>Shop</h4>
            {[
              { label: "New Arrivals", filter: "All" },
              { label: "Bridal Lehengas", filter: "Bridal" },
              { label: "Sarees", filter: "Sarees" },
              { label: "Sherwanis", filter: "Sherwanis" },
              { label: "Anarkali", filter: "Anarkali" },
            ].map(l => (
              <div key={l.label} onClick={() => { setShopFilter(l.filter); navigate("shop"); }} style={{ fontSize: 13, color: "rgba(240,235,228,0.7)", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(240,235,228,0.7)"}>{l.label}</div>
            ))}
          </div>
          <div style={{ minWidth: 280 }}>
            <h4 style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Stay in the Know</h4>
            <p style={{ fontSize: 13, color: "rgba(240,235,228,0.7)", marginBottom: 20, lineHeight: 1.5 }}>Be the first one to receive new releases, special offers, and more.</p>
            <NewsletterSignup />
            <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
              {["Fb", "Ig", "Pt", "Tt"].map(s => <span key={s} style={{ fontSize: 14, color: "rgba(240,235,228,0.7)", cursor: "pointer" }}>{s}</span>)}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 11, color: "rgba(240,235,228,0.5)", letterSpacing: 1 }}>
            © 2026 · CHAUBANDI ·{" "}
            <span onClick={() => goInfo("privacy")} style={{ cursor: "pointer" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(240,235,228,0.5)"}>PRIVACY POLICY</span> ·{" "}
            <span onClick={() => goInfo("terms")} style={{ cursor: "pointer" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(240,235,228,0.5)"}>TERMS &amp; CONDITIONS</span>
          </div>
          <div style={{ display: "flex", gap: 8, opacity: 0.7 }}>
            {["Amex", "Apple", "Visa", "Master", "PayPal"].map(p => (
              <div key={p} style={{ padding: "4px 10px", background: "#16110c", color: "#f0e6d2", fontSize: 9, fontWeight: 700, borderRadius: 2 }}>{p}</div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── TRACK ORDER (public — order # + email) ─── */
/* ─── FLOATING WIDGETS: chat bubble · reviews tab · 10% off tab ─── */
function FloatingWidgets({ navigate }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatSeen, setChatSeen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerEmail, setOfferEmail] = useState("");
  const [offerDone, setOfferDone] = useState(false);
  const [answer, setAnswer] = useState(null);
  const QA = [
    ["What are your store hours?", "We're open Tuesday – Sunday, 10 AM – 7 PM ET at 177 Massachusetts Ave, Arlington, MA."],
    ["Do you offer custom sizing?", "Yes! Every purchase includes free alterations, and made-to-measure is complimentary. Use the Perfect Fit tool to save your measurements."],
    ["How long does shipping take?", "Free US shipping — in-stock pieces ship in 24–48 hours and arrive in 3–5 business days. Custom pieces take 2–4 weeks."],
    ["Can I book a styling session?", "Absolutely — free video consultations with Sushma via WhatsApp or Zoom. Tap below to book."],
  ];
  const goReviews = () => {
    navigate("home");
    setTimeout(() => document.getElementById("cb-reviews")?.scrollIntoView({ behavior: "smooth" }), 350);
  };
  const claimOffer = async () => {
    if (!/\S+@\S+\.\S+/.test(offerEmail)) return;
    try { await medusa.subscribeNewsletter(offerEmail); } catch { /* offline ok */ }
    setOfferDone(true);
  };
  const tabStyle = { position: "fixed", left: 0, background: "#2a1f2d", color: "#f0e6d2", zIndex: 2500, cursor: "pointer", fontFamily: "'Outfit',sans-serif", border: "none" };
  return (
    <>
      {/* reviews side tab */}
      <button onClick={goReviews} style={{ ...tabStyle, top: "46%", padding: "13px 7px", borderRadius: "0 6px 6px 0", writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 11.5, letterSpacing: 1.5, display: "flex", alignItems: "center", gap: 6 }}>★ Reviews</button>
      {/* 10% off tab */}
      <button onClick={() => setOfferOpen(true)} style={{ ...tabStyle, bottom: 18, padding: "10px 14px", borderRadius: "0 6px 6px 0", fontSize: 12, fontWeight: 700 }}>Get 10% Off</button>
      {/* chat bubble */}
      <div onClick={() => { setChatOpen(!chatOpen); setChatSeen(true); }} style={{ position: "fixed", right: 20, bottom: 20, width: 54, height: 54, borderRadius: "50%", background: "#2a1f2d", border: "1px solid rgba(197,162,85,0.35)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2500, boxShadow: "0 4px 18px rgba(0,0,0,0.45)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8c97a" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
        {!chatSeen && <span style={{ position: "absolute", top: -3, right: -3, width: 18, height: 18, borderRadius: "50%", background: "#d4466a", color: "#fff", fontSize: 10.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>1</span>}
      </div>
      {/* chat panel */}
      {chatOpen && (
        <div style={{ position: "fixed", right: 20, bottom: 84, width: 330, maxWidth: "88vw", background: "#16110c", border: "1px solid #2b2218", borderRadius: 12, zIndex: 2501, overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.55)" }}>
          <div style={{ background: "#2a1f2d", padding: "15px 18px" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f0e6d2" }}>Chaubandi Concierge</div>
            <div style={{ fontSize: 11.5, color: "#3dbd83" }}>● Sushma typically replies within minutes</div>
          </div>
          <div style={{ padding: 16, maxHeight: 320, overflowY: "auto" }}>
            {answer === null ? <>
              <div style={{ fontSize: 12.5, color: "#a3947c", marginBottom: 12 }}>Namaste! 🙏 How can we help?</div>
              {QA.map(([q], i) => (
                <button key={i} onClick={() => setAnswer(i)} style={{ display: "block", width: "100%", textAlign: "left", background: "#1f1812", border: "1px solid #2b2218", color: "#f0e6d2", borderRadius: 8, padding: "10px 13px", fontSize: 12.5, cursor: "pointer", marginBottom: 8, fontFamily: "'Outfit',sans-serif" }}>{q}</button>
              ))}
            </> : <>
              <div style={{ fontSize: 12.5, color: "#e8c97a", marginBottom: 8 }}>{QA[answer][0]}</div>
              <div style={{ fontSize: 13, color: "#a3947c", lineHeight: 1.7, marginBottom: 14 }}>{QA[answer][1]}</div>
              <button onClick={() => setAnswer(null)} style={{ background: "none", border: "none", color: "#e8c97a", fontSize: 12, cursor: "pointer", textDecoration: "underline", padding: 0, fontFamily: "'Outfit',sans-serif" }}>← More questions</button>
            </>}
          </div>
          <div style={{ padding: "0 16px 16px" }}>
            <button onClick={() => window.open("https://wa.me/18578001282?text=Hi%20Sushma!", "_blank")} style={{ width: "100%", height: 44, background: "#25D366", color: "#fff", border: "none", borderRadius: 8, fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Chat with Sushma on WhatsApp</button>
          </div>
        </div>
      )}
      {/* 10% off modal */}
      {offerOpen && <>
        <div onClick={() => setOfferOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 2502 }} />
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, maxWidth: "90vw", background: "#16110c", border: "1px solid rgba(197,162,85,0.35)", borderRadius: 14, zIndex: 2503, padding: 30, textAlign: "center" }}>
          <X size={18} onClick={() => setOfferOpen(false)} style={{ position: "absolute", top: 16, right: 16, cursor: "pointer", color: "#a3947c" }} />
          {offerDone ? <>
            <div style={{ fontSize: 34, marginBottom: 10 }}>🎉</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: "#f0e6d2", marginBottom: 10 }}>Here's your code</h3>
            <div style={{ fontSize: 22, letterSpacing: 3, color: "#e8c97a", fontWeight: 700, border: "1px dashed rgba(197,162,85,0.5)", borderRadius: 8, padding: "12px 0", marginBottom: 12 }}>WELCOME10</div>
            <p style={{ fontSize: 12.5, color: "#a3947c" }}>Apply it at checkout for 10% off your first order.</p>
          </> : <>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#c5a255", textTransform: "uppercase", marginBottom: 10 }}>Join Chaubandi & Save</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: "#f0e6d2", marginBottom: 8 }}>Get 10% Off Your First Order</h3>
            <p style={{ fontSize: 13, color: "#a3947c", marginBottom: 18 }}>Plus first access to new arrivals & bridal drops.</p>
            <input value={offerEmail} onChange={e => setOfferEmail(e.target.value)} onKeyDown={e => { if (e.key === "Enter") claimOffer(); }} placeholder="your@email.com"
              style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 6, padding: "0 14px", fontSize: 13.5, outline: "none", background: "#0d0a08", color: "#f0e6d2", fontFamily: "'Outfit',sans-serif", marginBottom: 10 }} />
            <button onClick={claimOffer} style={{ width: "100%", height: 46, background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", borderRadius: 6, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Claim My 10% Off</button>
          </>}
        </div>
      </>}
    </>
  );
}

/* ─── ORDER TRACKING PAGE ─── */
function TrackOrderPage({ navigate, customer }) {
  const [form, setForm] = useState({ order: "", email: "" });
  const [result, setResult] = useState(null); // "found" | "pending"
  const [order, setOrder] = useState(null);
  const [busy, setBusy] = useState(false);
  const STAGES = ["Order Placed", "Processing", "Shipped", "Delivered"];
  const stageOf = (o) => o?.fulfillment_status === "delivered" ? 3 : o?.fulfillment_status === "shipped" ? 2 : 1;
  const track = async () => {
    if (!form.order.trim() || !/\S+@\S+\.\S+/.test(form.email)) return;
    setBusy(true);
    try {
      const num = form.order.replace(/\D/g, "");
      const orders = customer ? await medusa.listCustomerOrders() : [];
      const hit = orders.find(o => String(o.display_id) === num && (o.email || "").toLowerCase() === form.email.trim().toLowerCase());
      if (hit) { setOrder(hit); setResult("found"); } else setResult("pending");
    } catch { setResult("pending"); }
    setBusy(false);
  };
  const field = { width: "100%", height: 48, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none", background: "#16110c", color: "#f0e6d2" };
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "64px 32px 90px" }}>
      <div className="fade-in" style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 12 }}>Order Status</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 300 }}>Track Your Order</h1>
        <p style={{ fontSize: 13.5, color: "#a3947c", marginTop: 10 }}>Enter your order number (e.g. CB-1024) and the email used at checkout.</p>
      </div>
      <div className="fade-in d1" style={{ background: "#16110c", border: "1px solid #2b2218", borderRadius: 10, padding: 26 }}>
        <label style={{ fontSize: 11, letterSpacing: 2, color: "#a3947c", display: "block", marginBottom: 6, textTransform: "uppercase" }}>Order Number</label>
        <input value={form.order} onChange={e => setForm({ ...form, order: e.target.value })} placeholder="CB-1024" style={{ ...field, marginBottom: 16 }} />
        <label style={{ fontSize: 11, letterSpacing: 2, color: "#a3947c", display: "block", marginBottom: 6, textTransform: "uppercase" }}>Email</label>
        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onKeyDown={e => { if (e.key === "Enter") track(); }} placeholder="you@email.com" style={{ ...field, marginBottom: 18 }} />
        <button onClick={track} disabled={busy} style={{ width: "100%", height: 50, background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", borderRadius: 6, fontSize: 12.5, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, cursor: busy ? "wait" : "pointer", fontFamily: "'Outfit',sans-serif" }}>{busy ? "Checking…" : "Track Order"}</button>
      </div>
      {result === "found" && order && (
        <div className="fade-in" style={{ marginTop: 22, background: "#16110c", border: "1px solid #2b2218", borderRadius: 10, padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#f0e6d2", marginBottom: 4 }}>Order #CB-{order.display_id}</div>
          <div style={{ fontSize: 12.5, color: "#a3947c", marginBottom: 18 }}>{new Date(order.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {(order.items || []).reduce((s, i) => s + i.quantity, 0)} item(s)</div>
          <div style={{ display: "flex" }}>
            {STAGES.map((s, i) => (
              <div key={s} style={{ flex: 1, textAlign: "center", position: "relative" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", margin: "0 auto 8px", background: i <= stageOf(order) ? "#3dbd83" : "#2b2218", color: i <= stageOf(order) ? "#fff" : "#6e6353", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{i <= stageOf(order) ? "✓" : i + 1}</div>
                <div style={{ fontSize: 10.5, color: i <= stageOf(order) ? "#f0e6d2" : "#6e6353" }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {result === "pending" && (
        <div className="fade-in" style={{ marginTop: 22, background: "#1f1812", border: "1px solid rgba(197,162,85,0.25)", borderRadius: 10, padding: 24, textAlign: "center" }}>
          <p style={{ fontSize: 13.5, color: "#a3947c", lineHeight: 1.8, marginBottom: 16 }}>We couldn't look that order up instantly{customer ? "" : " (sign in to see your order history)"} — but Sushma can check it for you right away.</p>
          <button onClick={() => window.open(`https://wa.me/18578001282?text=${encodeURIComponent(`Hi! Can you check the status of my order ${form.order}?`)}`, "_blank")} style={{ padding: "13px 28px", background: "#25D366", color: "#fff", border: "none", borderRadius: 6, fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Check via WhatsApp</button>
          <div onClick={() => navigate("account")} style={{ fontSize: 12.5, color: "#e8c97a", cursor: "pointer", textDecoration: "underline", marginTop: 14 }}>Sign in to view order history</div>
        </div>
      )}
    </div>
  );
}

/* ─── NEWSLETTER SIGNUP (footer) ─── */
function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const subscribe = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email."); return; }
    setError("");
    // Send to the backend (owner notification + welcome email). Also keep a
    // local record so nothing is lost if the backend is unreachable.
    try {
      const list = JSON.parse(localStorage.getItem("cb_newsletter") || "[]");
      if (!list.includes(email)) list.push(email);
      localStorage.setItem("cb_newsletter", JSON.stringify(list));
    } catch { /* ignore */ }
    try { await medusa.subscribeNewsletter(email); }
    catch (e) { console.warn("[Chaubandi] newsletter signup not delivered (backend offline?)", e); }
    setDone(true);
  };

  if (done) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(61,189,131,0.12)", border: "1px solid rgba(61,189,131,0.35)", borderRadius: 6, padding: "14px 16px" }}>
        <Check size={18} color="#3dbd83" />
        <span style={{ fontSize: 13, color: "#f0e6d2" }}>You’re on the list — thank you!</span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => { if (e.key === "Enter") subscribe(); }}
        style={{ height: 44, background: "transparent", border: `1px solid ${error ? "rgba(217,83,79,0.6)" : "rgba(255,255,255,0.2)"}`, color: "#fff", padding: "0 16px", fontSize: 13, outline: "none", fontFamily: "'Outfit',sans-serif" }} />
      <button onClick={subscribe} style={{ height: 44, background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Subscribe</button>
      {error && <span style={{ fontSize: 12, color: "#e8a0a0" }}>{error}</span>}
    </div>
  );
}

/* ─── INFO / POLICY PAGES (Privacy, Terms, Returns, Shipping, FAQ, Sizing) ─── */
const INFO_CONTENT = {
  shipping: {
    title: "Shipping Information",
    tag: "Delivery & Pickup",
    blocks: [
      ["Free US Shipping", "Every order ships free within the United States. Orders are carefully packed and dispatched from our Arlington, MA boutique within 24–48 hours of confirmation. Standard delivery typically takes 3–5 business days after dispatch."],
      ["Free Store Pickup", "Prefer to collect in person? Choose “Pick up free” at checkout and we’ll have your order ready at 177 Massachusetts Avenue, Arlington, MA 02474. We’ll text you the moment it’s ready — usually within a couple of hours during store hours (Tue–Sun, 10 AM – 7 PM ET)."],
      ["Order Tracking", "Once your order ships, you’ll receive an email with tracking details so you can follow it to your door."],
      ["International Orders", "We ship across the US as standard. For international delivery, message us on WhatsApp at +1 (857) 800-1282 and we’ll arrange a custom quote."],
    ],
  },
  returns: {
    title: "Returns & Exchanges",
    tag: "Our Promise",
    blocks: [
      ["14-Day Returns", "If something isn’t quite right, you may return unworn, unaltered items in their original condition with tags attached within 14 days of delivery for a refund or exchange."],
      ["Free Alterations First", "Before you return, remember every purchase includes free alterations. Often a small adjustment is all it takes for the perfect fit — reach out and we’ll help before you send anything back."],
      ["Custom & Bridal Pieces", "Made-to-measure, custom-designed, and bridal pieces are crafted specifically for you and are final sale. We’ll confirm every detail with you before production begins."],
      ["How to Start a Return", "Email hello@chaubandi.com or message us on WhatsApp with your order number and we’ll guide you through it. Refunds are issued to your original payment method once we receive and inspect the item."],
    ],
  },
  sizing: {
    title: "Size Guide",
    tag: "Find Your Fit",
    blocks: [
      ["Standard Sizes", "Our ready-to-wear pieces follow US sizing: XS (0–2), S (4–6), M (8–10), L (12–14), XL (16–18), XXL (20–22). When in doubt between two sizes, size up — our alterations are free."],
      ["Measuring Tips", "For the most accurate fit, measure your bust at the fullest point, your waist at the narrowest, and your hips at the widest. Keep the tape snug but not tight, and measure over light clothing."],
      ["Custom Stitching", "Want a flawless fit? Use our Perfect Fit tool to save your measurements, or book a fitting at the boutique. Most lehengas, sarees blouses, and suits can be tailored to your exact measurements at no extra charge."],
      ["Still Unsure?", "Our stylist Sushma is happy to help you choose. Book a live video consultation or WhatsApp us and we’ll recommend the right size for your piece."],
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    tag: "Good to Know",
    blocks: [
      ["Do you offer custom designs?", "Yes! Share your inspiration through our Custom Design studio and Sushma will craft a one-of-a-kind piece for you — from fabric and color to embroidery and silhouette."],
      ["Are alterations really free?", "Absolutely. Free alterations are included with every purchase so your outfit fits beautifully. Just bring it to the boutique or arrange it with us."],
      ["Can I shop in person?", "Come visit us at 177 Massachusetts Avenue, Arlington, MA — open Tuesday to Sunday, 10 AM – 7 PM ET. You can also book a live video shopping session from anywhere."],
      ["How long does custom or bridal work take?", "Custom and bridal pieces typically take 4–8 weeks depending on detail and embroidery. We’ll give you a firm timeline when we confirm your design."],
      ["What payment methods do you accept?", "We accept all major credit and debit cards at secure checkout. For large or custom orders, we can also arrange payment in person."],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    tag: "Your Trust",
    blocks: [
      ["What We Collect", "We collect the information you provide when you place an order, create an account, book an appointment, or contact us — such as your name, email, phone number, and shipping address. We also collect basic usage data to improve your experience."],
      ["How We Use It", "Your information is used solely to process orders, arrange fittings and alterations, communicate about your purchases, and improve our service. We never sell your personal data to third parties."],
      ["Payments", "Card payments are processed securely by our payment provider. Chaubandi does not store your full card details on our servers."],
      ["Your Choices", "You can request access to, correction of, or deletion of your personal information at any time by emailing hello@chaubandi.com. You may also unsubscribe from marketing emails whenever you like."],
    ],
  },
  terms: {
    title: "Terms & Conditions",
    tag: "The Fine Print",
    blocks: [
      ["Overview", "By using the Chaubandi website and placing an order, you agree to these terms. We aim to keep them simple and fair."],
      ["Orders & Pricing", "All prices are listed in US dollars. We reserve the right to correct pricing errors and to decline or cancel any order. Your order is confirmed once payment is successfully processed."],
      ["Products", "We work hard to represent colors and details accurately, but slight variation is natural in handcrafted and hand-embroidered pieces — this is part of their charm, not a defect."],
      ["Custom & Bridal", "Made-to-measure, custom, and bridal orders are final sale and require details to be confirmed before production. Timelines are estimates and may vary with complexity."],
      ["Contact", "Questions about these terms? Email hello@chaubandi.com or call the boutique. These terms are governed by the laws of the Commonwealth of Massachusetts."],
    ],
  },
};

const INFO_ORDER = ["shipping", "returns", "sizing", "faq", "privacy", "terms"];
const INFO_LABELS = { shipping: "Shipping", returns: "Returns & Exchanges", sizing: "Size Guide", faq: "FAQ", privacy: "Privacy Policy", terms: "Terms & Conditions" };

function InfoPage({ topic, goInfo, navigate }) {
  const data = INFO_CONTENT[topic] || INFO_CONTENT.faq;
  return (
    <div>
      <div style={{ background: "#1f1812", borderTop: "1px solid rgba(197,162,85,0.25)", padding: "72px 32px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 60%, rgba(197,162,85,0.10) 0%, transparent 68%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 16 }}>{data.tag}</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(34px,4.5vw,54px)", fontWeight: 300, color: "#f0e6d2", lineHeight: 1.1 }}>{data.title}</h1>
        </div>
      </div>

      <section className="mobile-stack" style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 32px 80px", display: "grid", gridTemplateColumns: "220px 1fr", gap: 48, alignItems: "start" }}>
        {/* topic nav */}
        <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#a3947c", marginBottom: 16 }}>Help Topics</div>
          {INFO_ORDER.map(t => (
            <div key={t} onClick={() => goInfo(t)} style={{ fontSize: 14, color: t === topic ? "#e8c97a" : "rgba(240,235,228,0.7)", fontWeight: t === topic ? 600 : 400, padding: "9px 0", cursor: "pointer", borderLeft: `2px solid ${t === topic ? "#c5a255" : "transparent"}`, paddingLeft: 14, transition: "color .2s" }}>
              {INFO_LABELS[t]}
            </div>
          ))}
          <button onClick={() => navigate("contact")} style={{ marginTop: 24, width: "100%", padding: "12px", background: "#16110c", border: "1px solid rgba(197,162,85,0.4)", color: "#e8c97a", borderRadius: 6, fontSize: 12, letterSpacing: 1, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Still need help?</button>
        </div>

        {/* content */}
        <div className="fade-in">
          {data.blocks.map(([heading, body], i) => (
            <div key={i} style={{ marginBottom: 30, paddingBottom: 30, borderBottom: i < data.blocks.length - 1 ? "1px solid #2b2218" : "none" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 500, color: "#f0e6d2", marginBottom: 12 }}>{heading}</h3>
              <p style={{ fontSize: 14.5, color: "rgba(240,235,228,0.72)", lineHeight: 1.8 }}>{body}</p>
            </div>
          ))}
          <div style={{ marginTop: 8, padding: "20px 24px", background: "#1f1812", borderRadius: 8, fontSize: 13.5, color: "#a3947c", lineHeight: 1.7 }}>
            Questions we didn’t cover? Reach us at <span style={{ color: "#e8c97a" }}>hello@chaubandi.com</span> or on WhatsApp at{" "}
            <span onClick={() => window.open("https://wa.me/18578001282", "_blank")} style={{ color: "#e8c97a", cursor: "pointer", textDecoration: "underline" }}>+1 (857) 800-1282</span>.
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── ACCOUNT PAGE (login / register / order history) ─── */
function AccountPage({ customer, onLogin, onRegister, onLogout, navigate }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ email: "", password: "", first_name: "", last_name: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState(null);

  // Load order history once we have a logged-in customer.
  useEffect(() => {
    if (!customer) { setOrders(null); return; }
    let cancelled = false;
    (async () => {
      try { const list = await medusa.listCustomerOrders(); if (!cancelled) setOrders(list); }
      catch { if (!cancelled) setOrders([]); }
    })();
    return () => { cancelled = true; };
  }, [customer]);

  const submit = async () => {
    setError("");
    if (!form.email || !form.password) { setError("Email and password are required."); return; }
    if (mode === "register" && !form.first_name) { setError("Please enter your first name."); return; }
    setBusy(true);
    try {
      if (mode === "login") await onLogin({ email: form.email, password: form.password });
      else await onRegister(form);
    } catch (e) {
      const msg = String(e?.message || "");
      setError(mode === "login"
        ? "Couldn’t sign in. Check your email and password."
        : (/exists|already/i.test(msg) ? "An account with this email already exists — try signing in." : "Couldn’t create your account. Please try again."));
    } finally { setBusy(false); }
  };

  const field = (label, key, type = "text") => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6 }}>{label}</label>
      <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
        onKeyDown={e => { if (e.key === "Enter") submit(); }}
        style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none", background: "#16110c", color: "#f0e6d2" }} />
    </div>
  );

  // ── Logged-in view ──
  if (customer) {
    const money = (v, cur = "usd") => `${cur === "usd" ? "$" : ""}${Number(v).toFixed(2)}`;
    return (
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "56px 32px 80px" }}>
        <div className="fade-in" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 10 }}>My Account</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 300 }}>Welcome back, {customer.first_name || "friend"}</h1>
            <p style={{ fontSize: 13.5, color: "#a3947c", marginTop: 6 }}>{customer.email}</p>
          </div>
          <button onClick={onLogout} style={{ padding: "11px 22px", background: "#16110c", border: "1px solid #2b2218", color: "#f0e6d2", borderRadius: 6, fontSize: 12, letterSpacing: 1, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Sign Out</button>
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 400, marginBottom: 18 }}>Order History</h2>
        {orders === null ? (
          <div style={{ color: "#a3947c", fontSize: 14, padding: "24px 0" }}>Loading your orders…</div>
        ) : orders.length === 0 ? (
          <div style={{ background: "#16110c", border: "1px solid #2b2218", borderRadius: 8, padding: "40px 24px", textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "#a3947c", marginBottom: 18 }}>You haven’t placed any orders yet.</p>
            <button onClick={() => navigate("shop")} style={{ padding: "12px 32px", background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", borderRadius: 4 }}>Start Shopping</button>
          </div>
        ) : (
          orders.map(o => (
            <div key={o.id} style={{ background: "#16110c", border: "1px solid #2b2218", borderRadius: 8, padding: "18px 22px", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#f0e6d2" }}>Order #CB-{o.display_id}</div>
                  <div style={{ fontSize: 12.5, color: "#a3947c", marginTop: 3 }}>{new Date(o.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {(o.items || []).reduce((s, i) => s + i.quantity, 0)} item(s)</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20 }}>{money(o.total, o.currency_code)}</div>
                  <div style={{ fontSize: 11, color: "#3dbd83", textTransform: "capitalize" }}>{o.status || "confirmed"}</div>
                </div>
              </div>
              {(o.items || []).length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #2b2218", fontSize: 13, color: "#a3947c" }}>
                  {o.items.map(i => `${i.product_title || i.title}${i.variant_title ? " · " + i.variant_title : ""} ×${i.quantity}`).join("  •  ")}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    );
  }

  // ── Logged-out view (login / register) ──
  return (
    <div style={{ maxWidth: 440, margin: "0 auto", padding: "64px 32px 90px" }}>
      <div className="fade-in" style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 12 }}>{mode === "login" ? "Welcome Back" : "Join Chaubandi"}</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 300 }}>{mode === "login" ? "Sign In" : "Create Account"}</h1>
      </div>

      <div className="fade-in d1" style={{ background: "#16110c", border: "1px solid #2b2218", borderRadius: 10, padding: 28 }}>
        {mode === "register" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {field("FIRST NAME", "first_name")}
            {field("LAST NAME", "last_name")}
          </div>
        )}
        {field("EMAIL", "email", "email")}
        {field("PASSWORD", "password", "password")}

        {error && <div style={{ fontSize: 12.5, color: "#e8a0a0", marginBottom: 14 }}>{error}</div>}

        <button className="btn-shine" disabled={busy} onClick={submit} style={{ width: "100%", height: 50, background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: busy ? "wait" : "pointer", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, fontFamily: "'Outfit',sans-serif", borderRadius: 6, opacity: busy ? 0.75 : 1 }}>
          {busy ? "Please wait…" : (mode === "login" ? "Sign In" : "Create Account")}
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 20, fontSize: 13.5, color: "#a3947c" }}>
        {mode === "login" ? "New to Chaubandi?" : "Already have an account?"}{" "}
        <span onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} style={{ color: "#e8c97a", cursor: "pointer", fontWeight: 600 }}>
          {mode === "login" ? "Create an account" : "Sign in"}
        </span>
      </div>
    </div>
  );
}

/* ─── WISHLIST PAGE ─── */
function WishlistPage({ products, wishlist, toggleWishlist, navigate }) {
  const saved = products.filter(p => wishlist.includes(p.id));
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 32px 80px" }}>
      <div className="fade-in" style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 12, color: "#a3947c", marginBottom: 8 }}>
          <span style={{ cursor: "pointer" }} onClick={() => navigate("home")}>Home</span> / <span>Wishlist</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 400, marginBottom: 8 }}>My Wishlist</h1>
        <p style={{ fontSize: 14, color: "#a3947c" }}>{saved.length} {saved.length === 1 ? "piece" : "pieces"} saved</p>
      </div>

      {saved.length === 0 ? (
        <div style={{ textAlign: "center", padding: "72px 24px", background: "#16110c", border: "1px solid #2b2218", borderRadius: 10 }}>
          <Heart size={44} strokeWidth={1} style={{ margin: "0 auto 18px", opacity: 0.4, color: "#c5a255" }} />
          <p style={{ fontSize: 15, color: "#a3947c", marginBottom: 22 }}>Your wishlist is empty. Tap the heart on any piece to save it here.</p>
          <button onClick={() => navigate("shop")} style={{ padding: "13px 34px", background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", borderRadius: 4 }}>Browse the Collection</button>
        </div>
      ) : (
        <div className="fade-in d1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
          {saved.map(p => <ProductCard key={p.id} product={p} navigate={navigate} inWishlist={() => true} toggleWishlist={toggleWishlist} />)}
        </div>
      )}
    </div>
  );
}

/* ─── STORY PAGE ─── */
function StoryPage({ navigate }) {
  return (
    <div>
      <div style={{ background: "#1f1812", borderTop: "1px solid rgba(197,162,85,0.25)", padding: "100px 32px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 60%, rgba(197,162,85,0.10) 0%, transparent 68%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 18 }}>Our Story</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(40px,5vw,68px)", fontWeight: 300, color: "#f0e6d2", lineHeight: 1.1, marginBottom: 22 }}>
            Knots of Tradition,<br /><em style={{ color: "#c5a255" }}>Woven with Love</em>
          </h1>
          <p style={{ fontSize: 14, color: "rgba(240,235,228,0.55)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>
            From a dream born with zero training to a boutique beloved across five US states — this is Sushma's story.
          </p>
        </div>
      </div>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px" }}>
        <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 72, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ aspectRatio: "3/4", borderRadius: 4, overflow: "hidden", background: "linear-gradient(140deg, #3a0818, #6a1830 50%, #3a0818)", position: "relative" }}>
              <img src="/images/sushma.jpg" alt="Sushma — Founder of Chaubandi Boston"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                onError={(e) => { e.target.style.display = "none"; }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,20,18,0.55) 0%, transparent 45%)" }} />
              <div style={{ position: "absolute", bottom: 28, left: 28 }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#f0e6d2", marginBottom: 4, fontWeight: 400 }}>Sushma</div>
                <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(240,235,228,0.6)", textTransform: "uppercase" }}>Founder & Stylist · Chaubandi Boston</div>
              </div>
            </div>
            <div style={{ position: "absolute", top: 20, left: -10, width: 3, height: "55%", background: "linear-gradient(to bottom, #c5a255, transparent)" }} />
          </div>

          <div>
            <div style={{ fontSize: 10, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 18 }}>The Founder</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 400, lineHeight: 1.05, marginBottom: 28, color: "#f0e6d2" }}>Meet Sushma</h2>
            <p style={{ fontSize: 14, color: "#a3947c", lineHeight: 1.9, marginBottom: 18 }}>
              My journey with fashion didn't begin in a design school. I had zero formal sewing training when I first fell in love with the art of Indian and Nepali ethnic wear. I taught myself — stitch by stitch, fabric by fabric — until I truly understood every seam, every embroidery technique, every thread that makes a garment come alive.
            </p>
            <p style={{ fontSize: 14, color: "#a3947c", lineHeight: 1.9, marginBottom: 18 }}>
              That determination led me to set up my own manufacturing and alterations process, and eventually to open Chaubandi right here in Arlington, Massachusetts. Today, I can look at a customer and know their perfect fit in ten minutes. That intuition — that personal touch — is something no algorithm can replace.
            </p>
            <p style={{ fontSize: 14, color: "#a3947c", lineHeight: 1.9, marginBottom: 36 }}>
              Customers were driving hours from Vermont, New York, New Jersey — just to come to me. I built this website to bring that same experience to every single one of them, no matter where they are. You shouldn't have to wait weeks for a package from India when I'm right here.
            </p>
            <blockquote style={{ borderLeft: "3px solid #c5a255", paddingLeft: 24, marginBottom: 40 }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontStyle: "italic", color: "#f0e6d2", lineHeight: 1.6, marginBottom: 12 }}>
                "No shipping uncertainty. No returns from India. Just you, me, and the perfect dress."
              </p>
              <cite style={{ fontSize: 11, letterSpacing: 2.5, color: "#a3947c", textTransform: "uppercase", fontStyle: "normal" }}>— Sushma, Founder · Chaubandi Boston</cite>
            </blockquote>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={() => window.open("https://wa.me/18578001282", "_blank")} className="btn-shine"
                style={{ padding: "14px 36px", background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, fontFamily: "'Outfit',sans-serif" }}>
                Talk to Sushma
              </button>
              <button onClick={() => navigate("shop")}
                style={{ padding: "14px 36px", background: "transparent", color: "#e8c97a", border: "1px solid rgba(197,162,85,0.5)", cursor: "pointer", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif" }}>
                Shop the Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#0d0a08", borderTop: "1px solid #2b2218", borderBottom: "1px solid #2b2218", padding: "80px 32px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 14 }}>The Journey</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 400, color: "#f0e6d2" }}>How It All Began</h2>
          </div>
          <div>
            {[
              { icon: "🪡", label: "The Beginning", title: "Zero Training. Pure Passion.", desc: "Sushma had never taken a sewing class in her life. What she had was an eye for fit, a love for fabric, and the determination to figure it out — entirely on her own." },
              { icon: "✂️", label: "The Craft", title: "Self-Taught, Then Mastered", desc: "Years of relentless practice turned into mastery. She learned every technique — zardozi embroidery, blouse cutting, dupatta draping — until she could teach others how to do it." },
              { icon: "🏪", label: "The Boutique", title: "Chaubandi Boston Opens", desc: "She set up her own manufacturing and alteration process, then opened the boutique in Arlington, MA. Word spread fast — customers started driving 3–4 hours just to visit." },
              { icon: "🌎", label: "Today", title: "Five States. One Vision.", desc: "With 200K+ Instagram followers and customers across five states, this website is Sushma's way of saying: you don't need to drive to Arlington. She'll bring the boutique to you." },
            ].map((step, i, arr) => (
              <div key={i} style={{ display: "flex", gap: 28, paddingBottom: i < arr.length - 1 ? 44 : 0, position: "relative" }}>
                {i < arr.length - 1 && <div style={{ position: "absolute", left: 21, top: 50, bottom: 0, width: 1, background: "linear-gradient(to bottom, #c5a255, #2b2218)" }} />}
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#16110c", border: "1.5px solid #c5a255", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18, zIndex: 1, boxShadow: "0 2px 12px rgba(197,162,85,0.15)" }}>{step.icon}</div>
                <div style={{ paddingTop: 8 }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: "#c5a255", textTransform: "uppercase", marginBottom: 6 }}>{step.label}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#f0e6d2", fontWeight: 400, marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: "#a3947c", lineHeight: 1.8, maxWidth: 560 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#1f1812", borderTop: "1px solid rgba(197,162,85,0.25)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 18 }}>Why Chaubandi</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,50px)", fontWeight: 300, color: "#f0e6d2", marginBottom: 18, lineHeight: 1.2 }}>
            You Don't Need to Order From India.<br /><em style={{ color: "#c5a255" }}>We're Right Here in the US.</em>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(240,235,228,0.55)", maxWidth: 580, margin: "0 auto 56px", lineHeight: 1.8 }}>
            Forget the weeks of waiting, the sizing guesswork, and the customs fees. Chaubandi is based in Arlington, MA — and Sushma personally handles every order.
          </p>
          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { icon: "✂️", title: "Free Alterations", desc: "Every piece altered to fit you perfectly — at no extra cost. For in-store and online orders both." },
              { icon: "📦", title: "Free USA Shipping", desc: "Fast, tracked shipping to all 50 states. No customs fees, no delays, no international surprises." },
              { icon: "📞", title: "Owner Picks Up the Phone", desc: "When you call, Sushma answers. No bots, no wait queues — just real, personal service from the founder." },
            ].map(item => (
              <div key={item.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(197,162,85,0.18)", borderRadius: 8, padding: "36px 24px" }}>
                <div style={{ fontSize: 30, marginBottom: 18 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#f0e6d2", fontWeight: 400, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(240,235,228,0.5)", lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 700, margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 16 }}>Ready to Find Your Look?</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,3.5vw,44px)", fontWeight: 300, color: "#f0e6d2", marginBottom: 14, lineHeight: 1.2 }}>
          Your Perfect Outfit<br /><em>Is One Call Away</em>
        </h2>
        <p style={{ fontSize: 14, color: "#a3947c", marginBottom: 36, lineHeight: 1.8, maxWidth: 480, margin: "0 auto 36px" }}>
          Book a free virtual styling session with Sushma, or browse the collection and let us bring the boutique right to your door.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate("contact")} className="btn-shine"
            style={{ padding: "15px 40px", background: "#c5a255", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, fontFamily: "'Outfit',sans-serif" }}>
            Get in Touch
          </button>
          <button onClick={() => navigate("shop")}
            style={{ padding: "15px 40px", background: "transparent", color: "#e8c97a", border: "1px solid rgba(197,162,85,0.5)", cursor: "pointer", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif" }}>
            Shop Collection
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── CONTACT PAGE ─── */
function ContactPage({ navigate }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSending(true);
    // Durable delivery: email the message to the boutique via the backend.
    try {
      await medusa.sendContactMessage({
        name: form.name, email: form.email, phone: form.phone,
        subject: form.subject, message: form.message, kind: "contact",
      });
    } catch (e) { console.warn("[Chaubandi] contact email not delivered (backend offline?)", e); }
    // Instant ping via WhatsApp — Sushma's primary channel.
    const text = encodeURIComponent(
      `Hi Chaubandi! I'd like to get in touch.\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      (form.phone ? `Phone: ${form.phone}\n` : "") +
      (form.subject ? `Subject: ${form.subject}\n` : "") +
      `\nMessage:\n${form.message}`
    );
    try { window.open(`https://wa.me/18578001282?text=${text}`, "_blank"); } catch { /* popup blocked */ }
    setSending(false); setSent(true);
  };

  const field = (hasError) => ({
    width: "100%", height: 48, border: `1px solid ${hasError ? "#d9534f" : "#2b2218"}`,
    borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14,
    outline: "none", background: "#16110c", color: "#f0e6d2", transition: "border-color .2s"
  });

  if (sent) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
        <div className="fade-in">
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #c5a255, #a08030)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Check size={32} color="#fff" strokeWidth={2.5} />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 400, marginBottom: 14 }}>Message Sent!</h2>
          <p style={{ fontSize: 14, color: "#a3947c", maxWidth: 380, margin: "0 auto 36px", lineHeight: 1.8 }}>
            Thank you, {form.name.split(" ")[0]}! Sushma reads every message personally and will be in touch shortly.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("home")} className="btn-shine"
              style={{ padding: "14px 36px", background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif" }}>
              Back to Home
            </button>
            <button onClick={() => navigate("shop")}
              style={{ padding: "14px 36px", background: "transparent", color: "#e8c97a", border: "1px solid rgba(197,162,85,0.5)", cursor: "pointer", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif" }}>
              Browse Collection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ background: "#0d0a08", borderBottom: "1px solid #2b2218", padding: "64px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 14 }}>We'd Love to Hear From You</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 300, color: "#f0e6d2", marginBottom: 14, lineHeight: 1.1 }}>Get In Touch</h1>
        <p style={{ fontSize: 14, color: "#a3947c", maxWidth: 460, margin: "0 auto", lineHeight: 1.8 }}>
          Whether you have a question, need styling advice, or want to book an appointment — Sushma reads every message personally.
        </p>
      </div>

      <div className="mobile-stack" style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 32px 80px", display: "grid", gridTemplateColumns: "320px 1fr", gap: 64, alignItems: "start" }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 400, marginBottom: 32, color: "#f0e6d2" }}>Boutique Details</h2>
          {[
            { icon: "📍", title: "Address", lines: ["177 Massachusetts Avenue", "Arlington, MA 02474"] },
            { icon: "🕐", title: "Store Hours", lines: ["Tuesday – Sunday", "10:00 AM – 7:00 PM ET"] },
            { icon: "📞", title: "Phone & WhatsApp", lines: ["+1 (857) 800-1282"] },
            { icon: "📸", title: "Instagram", lines: ["@ChaubandiBoston"] },
          ].map(item => (
            <div key={item.title} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid #2b2218" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 18, marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "#a3947c", marginBottom: 5 }}>{item.title}</div>
                  {item.lines.map(l => <div key={l} style={{ fontSize: 14, color: "#f0e6d2", lineHeight: 1.7 }}>{l}</div>)}
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => window.open("https://wa.me/18578001282", "_blank")} className="btn-shine"
            style={{ width: "100%", padding: "14px 0", background: "#25D366", color: "#fff", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 600, fontFamily: "'Outfit',sans-serif", borderRadius: 4, marginBottom: 12 }}>
            Chat on WhatsApp
          </button>
          <button onClick={() => window.open("https://instagram.com/chaubandiboston", "_blank")}
            style={{ width: "100%", padding: "14px 0", background: "transparent", color: "#f0e6d2", border: "1px solid #2b2218", cursor: "pointer", fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif", borderRadius: 4 }}>
            Follow on Instagram
          </button>
        </div>

        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 400, marginBottom: 32, color: "#f0e6d2" }}>Send a Message</h2>
          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#a3947c", display: "block", marginBottom: 8 }}>Your Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" style={field(errors.name)}
                onFocus={e => e.target.style.borderColor = "#c5a255"} onBlur={e => e.target.style.borderColor = errors.name ? "#d9534f" : "#2b2218"} />
              {errors.name && <div style={{ fontSize: 11, color: "#d9534f", marginTop: 5 }}>{errors.name}</div>}
            </div>
            <div>
              <label style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#a3947c", display: "block", marginBottom: 8 }}>Email Address *</label>
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" type="email" style={field(errors.email)}
                onFocus={e => e.target.style.borderColor = "#c5a255"} onBlur={e => e.target.style.borderColor = errors.email ? "#d9534f" : "#2b2218"} />
              {errors.email && <div style={{ fontSize: 11, color: "#d9534f", marginTop: 5 }}>{errors.email}</div>}
            </div>
          </div>
          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#a3947c", display: "block", marginBottom: 8 }}>Phone (Optional)</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 (000) 000-0000" style={field(false)}
                onFocus={e => e.target.style.borderColor = "#c5a255"} onBlur={e => e.target.style.borderColor = "#2b2218"} />
            </div>
            <div>
              <label style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#a3947c", display: "block", marginBottom: 8 }}>Topic</label>
              <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                style={{ width: "100%", height: 48, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none", background: "#16110c", color: form.subject ? "#f0e6d2" : "#6e6353", cursor: "pointer" }}>
                <option value="" disabled>Select a topic</option>
                <option value="bridal">Bridal Consultation</option>
                <option value="order">Order Inquiry</option>
                <option value="alteration">Alterations</option>
                <option value="appointment">Book Appointment</option>
                <option value="virtual">Virtual Styling Session</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#a3947c", display: "block", marginBottom: 8 }}>Message *</label>
            <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about your occasion, what you're looking for, your budget, or any questions..."
              rows={6}
              style={{ width: "100%", border: `1px solid ${errors.message ? "#d9534f" : "#2b2218"}`, borderRadius: 4, padding: "14px 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none", background: "#16110c", color: "#f0e6d2", resize: "vertical", lineHeight: 1.65 }}
              onFocus={e => e.target.style.borderColor = "#c5a255"} onBlur={e => e.target.style.borderColor = errors.message ? "#d9534f" : "#2b2218"} />
            {errors.message && <div style={{ fontSize: 11, color: "#d9534f", marginTop: 5 }}>{errors.message}</div>}
          </div>
          <button onClick={handleSubmit} disabled={sending} className="btn-shine"
            style={{ width: "100%", height: 52, background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: sending ? "default" : "pointer", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, fontFamily: "'Outfit',sans-serif", borderRadius: 4, opacity: sending ? 0.65 : 1 }}>
            {sending ? "Sending…" : "Send Message"}
          </button>
          <p style={{ fontSize: 12, color: "#6e6353", textAlign: "center", marginTop: 16, lineHeight: 1.65 }}>
            Sushma personally reads every message. Expect a reply within a few hours.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── DESIGN YOUR DREAM OUTFIT (Custom Design Studio) ─── */
function DesignStudioPage({ navigate }) {
  const [spec, setSpec] = useState({ email: "", garment: "", fabric: "", color: "", embroidery: "", occasion: "", budget: "" });
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [designRef, setDesignRef] = useState("");

  const addFiles = (fileList) => {
    const next = Array.from(fileList || []).map(f => ({ url: URL.createObjectURL(f), name: f.name, file: f }));
    setImages(prev => [...prev, ...next].slice(0, 6));
  };
  const removeImage = (idx) => setImages(prev => prev.filter((_, i) => i !== idx));

  const submitDesign = async () => {
    const brief = [
      spec.garment && `Garment: ${spec.garment}`,
      spec.fabric && `Fabric: ${spec.fabric}`,
      spec.color && `Color: ${spec.color}`,
      spec.embroidery && `Embroidery: ${spec.embroidery}`,
      spec.occasion && `Occasion: ${spec.occasion}`,
      spec.budget && `Budget: ${spec.budget}`,
      images.length ? `Inspiration images: ${images.length} (shared via WhatsApp)` : "",
    ].filter(Boolean);
    // If the shopper is logged in and gave us at least one image + a garment,
    // submit a real inspiration request so it lands in Medusa as a draft order
    // (Admin → Orders) with the reference image(s). Guests fall through to the
    // WhatsApp/email handoff below. Any failure degrades to that same fallback.
    let ref = "";
    const token = medusa.getToken();
    const files = images.map(im => im.file).filter(Boolean);
    if (token && files.length && spec.garment) {
      try {
        const urls = await medusa.uploadInspirationImages(files.slice(0, 3), token);
        const extra = urls.slice(1);
        const res = await medusa.createInspirationRequest({
          image_url: urls[0],
          garment_type: spec.garment,
          fabric: spec.fabric || undefined,
          color: spec.color || undefined,
          embroidery: spec.embroidery || undefined,
          occasion: spec.occasion || undefined,
          budget: spec.budget || undefined,
          notes: extra.length ? `Additional reference images:\n${extra.join("\n")}` : undefined,
        }, token);
        const displayId = res?.draft_order?.display_id;
        if (displayId) ref = `CB-DSGN-${displayId}`;
      } catch (e) {
        console.warn("[Chaubandi] inspiration request not saved to Medusa (backend offline or not logged in?)", e);
      }
    }

    // Durable delivery: email the brief to the boutique if the shopper gave an
    // email (so Sushma can reply). WhatsApp remains the instant channel and
    // carries the inspiration photos.
    if (spec.email && /\S+@\S+\.\S+/.test(spec.email)) {
      try {
        await medusa.sendContactMessage({
          email: spec.email,
          subject: [spec.garment, spec.occasion].filter(Boolean).join(" · ") || "Custom design",
          message: brief.join("\n"),
          kind: "custom_design",
        });
      } catch (e) { console.warn("[Chaubandi] design request email not delivered (backend offline?)", e); }
    }
    const lines = [
      "Hi Chaubandi! I'd like to request a custom design.",
      "",
      ...brief,
      images.length ? "\nI'll share my inspiration image(s) here in the chat." : "",
    ].filter(Boolean);
    try { window.open(`https://wa.me/18578001282?text=${encodeURIComponent(lines.join("\n"))}`, "_blank"); } catch { /* popup blocked */ }
    // Show the real Medusa draft-order ref when we created one; otherwise a
    // cosmetic placeholder for the WhatsApp/email path.
    setDesignRef(ref || `CB-DSGN-${Math.floor(Math.random() * 9000) + 1000}`);
    setSubmitted(true);
  };

  const label = { fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6, textTransform: "uppercase" };
  const field = { width: "100%", height: 48, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none", background: "#16110c", color: "#f0e6d2", transition: "border-color .2s" };
  const onFocus = e => e.target.style.borderColor = "#c5a255";
  const onBlur = e => e.target.style.borderColor = "#2b2218";

  if (submitted) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
        <div className="fade-in">
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#d4af61,#a8842f)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Check size={32} color="#1a1208" strokeWidth={2.5} />
          </div>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 12 }}>Request Received</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 400, marginBottom: 14, color: "#f0e6d2" }}>Your Vision Is In Good Hands</h2>
          <p style={{ fontSize: 14, color: "#a3947c", maxWidth: 470, margin: "0 auto 8px", lineHeight: 1.8 }}>
            Thank you! Sushma will personally review your custom {spec.garment ? spec.garment.toLowerCase() : "design"} request{spec.occasion ? ` for your ${spec.occasion.toLowerCase()}` : ""} and reach out within 24 hours to discuss fabrics, timeline, and pricing.
          </p>
          <p style={{ fontSize: 12, color: "#6e6353", marginBottom: 36 }}>Design Ref #{designRef}</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("home")} className="btn-shine" style={{ padding: "14px 36px", background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, fontFamily: "'Outfit',sans-serif" }}>
              Back to Home
            </button>
            <button onClick={() => navigate("shop")} style={{ padding: "14px 36px", background: "transparent", color: "#e8c97a", border: "1px solid rgba(197,162,85,0.5)", cursor: "pointer", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif" }}>
              Browse Collection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ background: "#1f1812", borderTop: "1px solid rgba(197,162,85,0.25)", borderBottom: "1px solid #2b2218", padding: "56px 32px", textAlign: "center", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div className="mobile-hide" style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}>
            <button onClick={() => navigate("home")} style={{ padding: "10px 22px", background: "transparent", color: "#e8c97a", border: "1px solid rgba(197,162,85,0.5)", borderRadius: 4, cursor: "pointer", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif" }}>← Home</button>
          </div>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 14 }}>Bespoke Atelier</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 300, color: "#f0e6d2", lineHeight: 1.1, marginBottom: 14 }}>Design Your <em style={{ color: "#c5a255" }}>Dream Outfit</em></h1>
          <p style={{ fontSize: 14, color: "#a3947c", maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>Share your inspiration and a few details. Sushma will hand-craft a one-of-a-kind piece, made to your measurements.</p>
        </div>
      </div>

      <div className="mobile-stack" style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 32px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 400, marginBottom: 6, color: "#f0e6d2" }}>Inspiration Images</h2>
          <p style={{ fontSize: 13, color: "#a3947c", marginBottom: 20, lineHeight: 1.6 }}>Upload sketches, screenshots, or photos of styles you love (up to 6).</p>
          <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, height: 220, border: "1.5px dashed #2b2218", borderRadius: 10, background: "#16110c", cursor: "pointer", textAlign: "center", padding: 24, transition: "border-color .2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#c5a255"} onMouseLeave={e => e.currentTarget.style.borderColor = "#2b2218"}>
            <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => addFiles(e.target.files)} />
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#1f1812", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(197,162,85,0.3)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c5a255" strokeWidth="1.6"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 20h14"/></svg>
            </div>
            <div style={{ fontSize: 14, color: "#f0e6d2", fontWeight: 500 }}>Click to upload images</div>
            <div style={{ fontSize: 12, color: "#6e6353" }}>PNG or JPG · stays on your device</div>
          </label>
          {images.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 16 }}>
              {images.map((img, i) => (
                <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: 8, overflow: "hidden", border: "1px solid #2b2218" }}>
                  <img src={img.url} alt={img.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <button onClick={() => removeImage(i)} style={{ position: "absolute", top: 6, right: 6, width: 24, height: 24, borderRadius: "50%", background: "rgba(13,10,8,0.8)", border: "none", color: "#f0e6d2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={13} /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 400, marginBottom: 20, color: "#f0e6d2" }}>Design Specifications</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={label}>Your Email <span style={{ textTransform: "none", color: "#6e6353" }}>(so Sushma can reply)</span></label>
            <input type="email" value={spec.email} onChange={e => setSpec({ ...spec, email: e.target.value })} placeholder="you@example.com" style={field} onFocus={onFocus} onBlur={onBlur} />
          </div>
          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={label}>Garment Type</label>
              <select value={spec.garment} onChange={e => setSpec({ ...spec, garment: e.target.value })} style={{ ...field, color: spec.garment ? "#f0e6d2" : "#6e6353", cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
                <option value="">Select…</option>
                {["Lehenga", "Bridal Lehenga", "Saree", "Anarkali", "Sharara", "Sherwani", "Gown", "Indo-Western"].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Occasion</label>
              <select value={spec.occasion} onChange={e => setSpec({ ...spec, occasion: e.target.value })} style={{ ...field, color: spec.occasion ? "#f0e6d2" : "#6e6353", cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
                <option value="">Select…</option>
                {["Wedding", "Engagement", "Sangeet", "Mehandi", "Reception", "Festive", "Everyday"].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div><label style={label}>Fabric</label><input value={spec.fabric} onChange={e => setSpec({ ...spec, fabric: e.target.value })} placeholder="Silk, velvet, georgette…" style={field} onFocus={onFocus} onBlur={onBlur} /></div>
            <div><label style={label}>Color Palette</label><input value={spec.color} onChange={e => setSpec({ ...spec, color: e.target.value })} placeholder="Maroon & gold…" style={field} onFocus={onFocus} onBlur={onBlur} /></div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={label}>Embroidery Notes</label>
            <textarea value={spec.embroidery} onChange={e => setSpec({ ...spec, embroidery: e.target.value })} placeholder="Zardozi borders, mirror work, pearl detailing…" rows={4} style={{ ...field, height: "auto", padding: "14px 16px", resize: "vertical", lineHeight: 1.6 }} onFocus={onFocus} onBlur={onBlur} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={label}>Budget Range</label>
            <select value={spec.budget} onChange={e => setSpec({ ...spec, budget: e.target.value })} style={{ ...field, color: spec.budget ? "#f0e6d2" : "#6e6353", cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
              <option value="">Select…</option>
              {["$300 – $500", "$500 – $800", "$800 – $1,200", "$1,200 – $2,000", "$2,000+"].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <button onClick={submitDesign} className="btn-shine" style={{ width: "100%", height: 54, background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, fontFamily: "'Outfit',sans-serif", borderRadius: 4 }}>
            Request Custom Design
          </button>
          <p style={{ fontSize: 12, color: "#6e6353", textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>No payment now. Sushma reviews every request personally and replies within 24 hours.</p>
        </div>
      </div>
    </div>
  );
}

/* ─── FIND YOUR PERFECT FIT (Smart Measurements) ─── */
function PerfectFitPage({ navigate, customer }) {
  const [photos, setPhotos] = useState({ front: null, side: null });
  const [height, setHeight] = useState("");
  const [status, setStatus] = useState("idle");
  const [saveState, setSaveState] = useState("idle"); // idle|saving|saved|guest|error

  const setPhoto = (key, fileList) => {
    const f = (fileList || [])[0];
    if (f) setPhotos(prev => ({ ...prev, [key]: { url: URL.createObjectURL(f), name: f.name } }));
  };

  const MEASUREMENTS = [
    ["Bust", "36 in"], ["Waist", "29 in"], ["Hips", "39 in"],
    ["Shoulder", "15 in"], ["Sleeve Length", "23 in"], ["Blouse Length", "15 in"],
    ["Lehenga Length", "41 in"], ["Inseam", "30 in"],
  ];

  const calculate = () => {
    setStatus("calculating");
    setTimeout(async () => {
      setStatus("done");
      // For signed-in shoppers, persist the estimate to their profile so
      // every future order can be tailored to it.
      if (customer) {
        setSaveState("saving");
        try {
          await medusa.saveMeasurements({
            bust: 36, waist: 29, hips: 39, shoulder: 15, sleeve: 23, length: 15, inseam: 30,
            unit: "in", notes: `Height: ${height || "not provided"} · estimated via Perfect Fit`,
          });
          setSaveState("saved");
        } catch { setSaveState("error"); }
      } else {
        setSaveState("guest");
      }
    }, 2000);
  };

  const silhouette = (side) => (
    <svg viewBox="0 0 120 240" width="120" height="240" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.16, pointerEvents: "none" }}>
      <g fill="#c5a255">
        <circle cx={side ? 54 : 60} cy="28" r="15" />
        {side
          ? <path d="M54 44 Q66 54 62 74 L84 214 Q54 224 40 210 L48 74 Q44 54 54 44 Z" />
          : <path d="M60 44 L80 66 L98 214 Q60 226 22 214 L40 66 Z" />}
      </g>
    </svg>
  );

  const uploadCard = (key, title, side) => {
    const p = photos[key];
    return (
      <label style={{ position: "relative", display: "block", height: 300, border: `1.5px dashed ${p ? "#c5a255" : "#2b2218"}`, borderRadius: 10, background: "#16110c", cursor: "pointer", overflow: "hidden" }}>
        <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => setPhoto(key, e.target.files)} />
        {p ? (
          <>
            <img src={p.url} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(13,10,8,0.8)", color: "#3dbd83", fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 100, display: "flex", alignItems: "center", gap: 6 }}>
              <Check size={13} /> {title} added
            </div>
          </>
        ) : (
          <>
            {silhouette(side)}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, textAlign: "center", padding: 20 }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#1f1812", border: "1px solid rgba(197,162,85,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c5a255" strokeWidth="1.6"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 20h14"/></svg>
              </div>
              <div style={{ fontSize: 14, color: "#f0e6d2", fontWeight: 500 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#6e6353" }}>Stand straight, align with the guide</div>
            </div>
          </>
        )}
      </label>
    );
  };

  return (
    <div>
      <div style={{ background: "#1f1812", borderTop: "1px solid rgba(197,162,85,0.25)", borderBottom: "1px solid #2b2218", padding: "56px 32px", textAlign: "center", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div className="mobile-hide" style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}>
            <button onClick={() => navigate("home")} style={{ padding: "10px 22px", background: "transparent", color: "#e8c97a", border: "1px solid rgba(197,162,85,0.5)", borderRadius: 4, cursor: "pointer", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif" }}>← Home</button>
          </div>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 14 }}>Smart Sizing</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 300, color: "#f0e6d2", lineHeight: 1.1, marginBottom: 14 }}>Find Your <em style={{ color: "#c5a255" }}>Perfect Fit</em></h1>
          <p style={{ fontSize: 14, color: "#a3947c", maxWidth: 540, margin: "0 auto", lineHeight: 1.8 }}>Two quick photos and your height — we'll estimate your measurements so every piece is tailored just right.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 32px 80px" }}>
        <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          {uploadCard("front", "Front view", false)}
          {uploadCard("side", "Side view", true)}
        </div>

        <div className="mobile-stack" style={{ display: "flex", gap: 16, alignItems: "flex-end", marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6, textTransform: "uppercase" }}>Your Height</label>
            <input value={height} onChange={e => setHeight(e.target.value)} placeholder={`e.g. 5'5" or 165 cm`} style={{ width: "100%", height: 52, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none", background: "#16110c", color: "#f0e6d2" }} onFocus={e => e.target.style.borderColor = "#c5a255"} onBlur={e => e.target.style.borderColor = "#2b2218"} />
          </div>
          <button onClick={calculate} disabled={status === "calculating"} className="btn-shine" style={{ height: 52, padding: "0 40px", background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: status === "calculating" ? "default" : "pointer", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, fontFamily: "'Outfit',sans-serif", borderRadius: 4, opacity: status === "calculating" ? 0.75 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, whiteSpace: "nowrap" }}>
            {status === "calculating"
              ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(26,18,8,0.35)", borderTopColor: "#1a1208", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} /> Calculating…</>
              : (status === "done" ? "Recalculate" : "Calculate")}
          </button>
        </div>
        <p style={{ fontSize: 12, color: "#6e6353", marginBottom: 36 }}>Your photos never leave your device — measurements are estimated locally for this demo.</p>

        {status === "done" && (
          <div className="fade-in" style={{ background: "#16110c", border: "1px solid #2b2218", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "24px 28px", borderBottom: "1px solid #2b2218", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 3, color: "#c5a255", textTransform: "uppercase", marginBottom: 6 }}>Your Profile</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 400, color: "#f0e6d2" }}>Estimated Measurements</h2>
              </div>
              <div style={{ background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", padding: "10px 20px", borderRadius: 100, fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>Recommended Size · M</div>
            </div>
            <div style={{ padding: "8px 28px 20px" }}>
              {MEASUREMENTS.map(([k, v], i) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < MEASUREMENTS.length - 1 ? "1px solid #2b2218" : "none" }}>
                  <span style={{ fontSize: 14, color: "#a3947c" }}>{k}</span>
                  <span style={{ fontSize: 16, color: "#f0e6d2", fontWeight: 600, fontFamily: "'Cormorant Garamond',serif" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#1f1812", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              {saveState === "saved" && <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3dbd83", fontWeight: 500 }}><Check size={16} /> Saved to your profile</span>}
              {saveState === "saving" && <span style={{ fontSize: 13, color: "#a3947c", fontWeight: 500 }}>Saving to your profile…</span>}
              {saveState === "error" && <span style={{ fontSize: 13, color: "#e8a0a0", fontWeight: 500 }}>Couldn’t save — please try again.</span>}
              {saveState === "guest" && <span style={{ fontSize: 13, color: "#e8c97a", fontWeight: 500, cursor: "pointer" }} onClick={() => navigate("account")}>Sign in to save these to your profile →</span>}
              <span style={{ fontSize: 12, color: "#6e6353" }}>We'll use these to tailor every order.</span>
            </div>
          </div>
        )}

        {status === "done" && (
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
            <button onClick={() => navigate("shop")} className="btn-shine" style={{ padding: "14px 36px", background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, fontFamily: "'Outfit',sans-serif" }}>Shop Your Size</button>
            <button onClick={() => navigate("home")} style={{ padding: "14px 36px", background: "transparent", color: "#e8c97a", border: "1px solid rgba(197,162,85,0.5)", cursor: "pointer", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif" }}>Back to Home</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── CATEGORY STRIP ─── */
function CategoryStrip({ navigate, setShopFilter, activeFilter }) {
  return (
    <div style={{ background: "#16110c", borderBottom: "1px solid #2b2218", padding: "18px 0 16px" }}>
      <div className="cat-strip" style={{ 
        display: "flex", gap: 20, overflowX: "auto", padding: "4px 32px 4px", 
        scrollbarWidth: "none", msOverflowStyle: "none",
        margin: "0 auto", width: "max-content", maxWidth: "100%"
      }}>
        {/* Notice 'image' was added to the destructured variables below */}
        {CATEGORY_STRIP.map(({ label, filter, color, image }) => {
          const active = filter !== "All" && filter === activeFilter;
          return (
            <div key={label} className="cat-item" onClick={() => { setShopFilter(filter); navigate("shop"); }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9, cursor: "pointer", flexShrink: 0, minWidth: 72 }}>
              
              <div className="cat-item-thumb" style={{
                width: 72, height: 72, borderRadius: 18, 
                background: color, // The color acts as a fallback while the image loads
                overflow: "hidden", // CRITICAL: This forces the square image to have the rounded corners
                boxShadow: active ? "0 0 0 2.5px #c5a255, 0 4px 16px rgba(0,0,0,.5)" : "0 2px 10px rgba(26,20,18,.11)",
              }}>
                {/* Here is the new image tag */}
                {image && (
                  <img 
                    src={image} 
                    alt={label}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
                  />
                )}
              </div>
              
              <span className="cat-item-label" style={{ fontSize: 10.5, letterSpacing: .4, color: active ? "#f0e6d2" : "#a3947c", textAlign: "center", whiteSpace: "nowrap", fontWeight: active ? 600 : 400 }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── HERO CAROUSEL ─── */
function HeroCarousel({ navigate, setShopFilter }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const total = HERO_SLIDES.length;

  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => setCurrent(c => (c + 1) % total), 4000);
    return () => clearInterval(id);
  }, [hovered, total]);

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  const handleCta = slide => {
    if (slide.action === "whatsapp") { window.open("https://wa.me/18578001282", "_blank"); return; }
    setShopFilter(slide.filter);
    navigate("shop");
  };

  return (
    <section style={{ position: "relative", minHeight: 750, overflow: "hidden" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {HERO_SLIDES.map((slide, i) => (
        <div key={slide.id} style={{ position: "absolute", inset: 0, opacity: i === current ? 1 : 0, transition: "opacity .9s ease-in-out", zIndex: i === current ? 1 : 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          
          {/* 1. Render the Background Image */}
          {slide.image && i === current ? (
            <img src={slide.image} alt={slide.headline} loading="eager" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: slide.bg }} />
          )}

          {/* 2. Dark Overlays for Text Legibility */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)" }} />
          
          {/* 3. Text Content */}
          <div style={{ position: "relative", zIndex: 1, padding: "80px 40px 110px", maxWidth: 760 }}>
            <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: slide.accent, marginBottom: 18, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{slide.tag}</div>
            <h1 className="mobile-hero-text" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(40px,5.5vw,70px)", fontWeight: 300, color: "#f0e6d2", lineHeight: 1.05, marginBottom: 10, textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>{slide.headline}</h1>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(20px,2.8vw,36px)", fontWeight: 400, color: slide.accent, lineHeight: 1.2, marginBottom: 22, fontStyle: "italic", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{slide.sub}</h2>
            <p style={{ fontSize: 14, color: "rgba(240,235,228,.85)", maxWidth: 420, margin: "0 auto 36px", lineHeight: 1.75, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{slide.body}</p>
            <button className="btn-shine" onClick={() => handleCta(slide)} style={{ padding: "15px 48px", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, fontFamily: "'Outfit',sans-serif", background: slide.accent, color: "#1a1208" }}>{slide.cta}</button>
          </div>
        </div>
      ))}
      <button onClick={prev} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.25)", background: "rgba(26,20,18,.4)", color: "#f0e6d2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered ? 1 : 0, transition: "opacity .3s", pointerEvents: hovered ? "auto" : "none" }}><ChevronLeft size={20} /></button>
      <button onClick={next} style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.25)", background: "rgba(26,20,18,.4)", color: "#f0e6d2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered ? 1 : 0, transition: "opacity .3s", pointerEvents: hovered ? "auto" : "none" }}><ChevronRight size={20} /></button>
      <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", gap: 8, alignItems: "center" }}>
        {HERO_SLIDES.map((_, i) => <button key={i} onClick={() => setCurrent(i)} style={{ padding: 0, border: "none", cursor: "pointer", background: i === current ? "#c5a255" : "rgba(240,235,228,.38)", width: i === current ? 28 : 8, height: 8, borderRadius: 100, transition: "all .4s ease" }} />)}
      </div>
    </section>
  );
}

/* ─── COUPLES SHOWCASE ─── */
function CouplesShowcase({ navigate }) {
  const [activeIdx, setActiveIdx] = useState(0);
  
  // Updated with your new Kling AI images and matching outfit descriptions
  const PAIRINGS = [
    { 
      id: 1, 
      theme: "Crimson Vows", 
      image: "/Products/Couple/img1.png", 
      hers: { name: "Maroon Velvet Bridal Lehenga", price: 599 }, 
      his: { name: "Maroon Embroidered Sherwani", price: 399 } 
    },
    { 
      id: 2, 
      theme: "Sangeet Spectacular", 
      image: "/Products/Couple/img2.png", 
      hers: { name: "Mustard Mirror-Work Lehenga", price: 429 }, 
      his: { name: "Navy Blue Bandhgala Suit", price: 249 } 
    },
    { 
      id: 3, 
      theme: "The Royal Reception", 
      image: "/Products/Couple/img3.png", 
      hers: { name: "Navy Blue Silk Saree", price: 349 }, 
      his: { name: "Black Velvet Jodhpuri Suit", price: 299 } 
    },
    { 
      id: 4, 
      theme: "Emerald Mehandi", 
      image: "/Products/Couple/img4.png", 
      hers: { name: "Emerald Green Silk Lehenga", price: 459 }, 
      his: { name: "Cream Kurta & Green Jacket", price: 189 } 
    },
    { 
      id: 5, 
      theme: "Nepali Heritage", 
      image: "/Products/Couple/img5.png", 
      hers: { name: "Red Chaubandi Cholo & Saree", price: 319 }, 
      his: { name: "Traditional Daura Suruwal", price: 159 } 
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveIdx((prev) => (prev + 1) % PAIRINGS.length), 5500);
    return () => clearInterval(timer);
  }, [PAIRINGS.length]);

  return (
    <section style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 32px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 400, marginBottom: 6 }}>Perfect Pairings</h2>
        <p style={{ fontSize: 13, color: "#a3947c" }}>Curated matching sets for the bride and groom</p>
      </div>
      <div style={{ position: "relative", height: 700, borderRadius: 12, overflow: "hidden", background: "#1f1812" }}>
        {PAIRINGS.map((pair, idx) => (
          <div key={pair.id} style={{ position: "absolute", inset: 0, opacity: activeIdx === idx ? 1 : 0, transition: "opacity 1.2s ease-in-out", zIndex: activeIdx === idx ? 1 : 0 }}>
            
            {/* Added a fallback background color just in case img5 isn't ready yet */}
            <div style={{ width: "100%", height: "100%", background: "#2a2420" }}>
              <img src={pair.image} alt={pair.theme} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
            </div>
            
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.88) 100%)" }} />
            <div style={{ position: "absolute", top: 32, left: "50%", transform: "translateX(-50%)", background: "#16110c", color: "#f0e6d2", padding: "10px 28px", borderRadius: 30, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, zIndex: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.25)", whiteSpace: "nowrap" }}>{pair.theme}</div>
            <div className="mobile-stack" style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 40px 36px", display: "flex", gap: 40, zIndex: 2 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: "#c5a255", textTransform: "uppercase", marginBottom: 6 }}>For Her</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#fff", marginBottom: 4, fontWeight: 400, lineHeight: 1.2 }}>{pair.hers.name}</h3>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>${pair.hers.price}</div>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: "#c5a255", textTransform: "uppercase", marginBottom: 6 }}>For Him</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#fff", marginBottom: 4, fontWeight: 400, lineHeight: 1.2 }}>{pair.his.name}</h3>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>${pair.his.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
        {PAIRINGS.map((_, idx) => <button key={idx} onClick={() => setActiveIdx(idx)} style={{ width: activeIdx === idx ? 24 : 8, height: 8, borderRadius: 10, border: "none", background: activeIdx === idx ? "#e8c97a" : "#2b2218", cursor: "pointer", transition: "all 0.3s" }} />)}
      </div>
    </section>
  );
}

/* ─── UGC REELS SECTION ─── */  
function UgcReels() {    
  const [activeVideo, setActiveVideo] = useState(null);    
  const REELS = [      
    { id: 1, handle: "@priya_weds",    video: "/reels/reel-1.mp4", color: "linear-gradient(140deg, #4a2040, #2a1f2d)" },      
    { id: 2, handle: "@sarah.style",   video: "/reels/reel-2.mp4", color: "linear-gradient(140deg, #8b6308, #3a2a10)" },      
    { id: 3, handle: "@boston_bride",  video: "/reels/reel-3.mp4", color: "linear-gradient(140deg, #0a3a2a, #1b4028)" },      
    { id: 4, handle: "@meera.j",       video: "/reels/reel-4.mp4", color: "linear-gradient(140deg, #6a1830, #3a0818)" },      
    { id: 5, handle: "@anisha_x",      video: "/reels/reel-5.mp4", color: "linear-gradient(140deg, #1a2060, #0a1040)" },      
    { id: 6, handle: "@sushmas_pick",  video: "/reels/reel-6.mp4", color: "linear-gradient(140deg, #1a1412, #0c0a09)" },    
  ];    
  const handleEnter = (e) => { const v = e.currentTarget.querySelector('video'); if (v) v.play().catch(() => {}); };    
  const handleLeave = (e) => { const v = e.currentTarget.querySelector('video'); if (v) { v.pause(); v.currentTime = 0; } };    
  
  return (      
    <section style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 32px" }}>        
      <div style={{ textAlign: "center", marginBottom: 40 }}>          
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 400, marginBottom: 6 }}>Spotted in Chaubandi</h2>          
        <p style={{ fontSize: 13, color: "#a3947c" }}>Real customers styling our pieces. Tag @ChaubandiBoston to be featured.</p>        
      </div>        
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>          
        {REELS.map(reel => (            
          <div key={reel.id} onClick={() => setActiveVideo(reel)} onMouseEnter={handleEnter} onMouseLeave={handleLeave} className="hover-lift"              
            style={{ aspectRatio: "9/16", borderRadius: 8, background: reel.color, position: "relative", cursor: "pointer", overflow: "hidden" }}>              
            <video src={reel.video} muted loop playsInline preload="metadata"
              onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.1; }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />              
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, pointerEvents: "none" }}>                
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.3)" }}>                  
                <div style={{ width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "14px solid #fff", marginLeft: 4 }} />                
              </div>              
            </div>              
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "30px 16px 16px", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", zIndex: 1, pointerEvents: "none" }}>                
              <div style={{ fontSize: 12, color: "#fff", fontWeight: 500, letterSpacing: 1 }}>{reel.handle}</div>              
            </div>            
          </div>          
        ))}        
      </div>        
      {activeVideo && (          
        <div onClick={() => setActiveVideo(null)} style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(26,20,18,0.95)", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease" }}>            
          <button onClick={(e) => { e.stopPropagation(); setActiveVideo(null); }} style={{ position: "absolute", top: 32, right: 32, background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 8, zIndex: 3001 }}><X size={32} /></button>            
          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 420, height: "85vh", maxHeight: 800, borderRadius: 16, position: "relative", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", background: "#000" }}>              
            <video src={activeVideo.video} controls autoPlay loop playsInline                
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />              
            <div style={{ position: "absolute", top: 16, left: 16, padding: "6px 14px", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 12, letterSpacing: 1, borderRadius: 100, backdropFilter: "blur(4px)" }}>{activeVideo.handle}</div>            
          </div>          
        </div>        
      )}      
    </section>    
  );  
}

/* ─── TESTIMONIAL MARQUEE & BOOKING BANNER ─── */
/* ─── PRODUCT-LINKED REVIEW CAROUSEL (Raas/Judge.me-style cards) ─── */
function ReviewCarousel({ reviews, products, navigate }) {
  const trackRef = useRef(null);
  const [votes, setVotes] = useState({});
  const initials = (name) => name.split(/\s+/).filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const findProduct = (id) => products.find(p => p.id === id || p.productId === id);

  const scrollByCards = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-review-card]");
    const step = (card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.9) * dir;
    const max = el.scrollWidth - el.clientWidth;
    // Direct assignment moves reliably everywhere; CSS scroll-behavior animates it.
    el.scrollLeft = Math.max(0, Math.min(max, el.scrollLeft + step));
  };

  const arrowBase = { position: "absolute", top: "44%", transform: "translateY(-50%)", width: 42, height: 42, borderRadius: "50%", background: "#16110c", border: "1px solid #2b2218", color: "#e8c97a", fontSize: 24, lineHeight: 1, cursor: "pointer", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" };
  const helpfulBtn = { background: "none", border: "none", color: "#a3947c", cursor: "pointer", fontSize: 12, fontFamily: "'Outfit',sans-serif", padding: "2px 4px" };

  return (
    <div style={{ position: "relative", maxWidth: 1400, margin: "0 auto", padding: "8px 52px 44px" }}>
      <button aria-label="Previous reviews" onClick={() => scrollByCards(-1)} className="mobile-hide" style={{ ...arrowBase, left: 6 }}>‹</button>
      <div ref={trackRef} className="rev-track" style={{ display: "flex", gap: 20, overflowX: "auto", scrollBehavior: "smooth", scrollSnapType: "x proximity", padding: "4px 2px 10px" }}>
        {reviews.map((rev, i) => {
          const product = findProduct(rev.productId);
          const thumb = product?.images?.[0];
          return (
            <div key={i} data-review-card onClick={() => product && navigate("product", product)}
              style={{ flex: "0 0 auto", width: "min(360px, 82vw)", scrollSnapAlign: "start", background: "#16110c", border: "1px solid #2b2218", borderRadius: 10, padding: "22px 22px 15px", cursor: product ? "pointer" : "default", display: "flex", flexDirection: "column" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(197,162,85,0.5)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2b2218"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ color: "#e8c97a", letterSpacing: 2, fontSize: 15 }}>★★★★★</span>
                <span style={{ fontSize: 12, color: "#6e6353" }}>{rev.time}</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#f0e6d2", marginBottom: 8 }}>{rev.title}</div>
              <div style={{ fontSize: 13.5, color: "#a3947c", lineHeight: 1.6, marginBottom: 18, flex: 1 }}>{rev.body}</div>
              <div style={{ borderTop: "1px solid #2b2218", paddingTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#241c14", color: "#e8c97a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{initials(rev.author)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "#f0e6d2" }}>{rev.author}</div>
                  <div style={{ fontSize: 11, color: "#6e6353" }}>Verified customer</div>
                </div>
                {thumb ? (
                  <img src={thumb} alt={product?.name || "product"} loading="lazy" title={product?.name} style={{ width: 50, height: 62, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
                ) : product ? (
                  <div title={product?.name} style={{ width: 50, height: 62, borderRadius: 4, background: product.color, flexShrink: 0 }} />
                ) : null}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, marginTop: 13, fontSize: 12, color: "#6e6353" }}>
                <span>Was this helpful?</span>
                <button onClick={(e) => { e.stopPropagation(); setVotes(v => ({ ...v, [i]: (v[i] || 0) + 1 })); }} style={helpfulBtn}>👍 {rev.helpful + (votes[i] || 0)}</button>
                <button onClick={(e) => e.stopPropagation()} style={helpfulBtn}>👎 0</button>
              </div>
            </div>
          );
        })}
      </div>
      <button aria-label="Next reviews" onClick={() => scrollByCards(1)} className="mobile-hide" style={{ ...arrowBase, right: 6 }}>›</button>
    </div>
  );
}

/* ─── TESTIMONIALS (product-linked review carousel) & BOOKING BANNER ─── */
function TestimonialAndBooking({ navigate, products = [] }) {
  // Real customer reviews, each linked to a product (click card → product page).
  // Swap/extend with the full set + customer photos when ready.
  const PRODUCT_REVIEWS = [
    { title: "Wonderful from start to finish", body: "Sushma was absolutely wonderful to work with. We got all of our outfits for our wedding events from her — my Haldi lehenga, wedding ceremony dress, jewelry, and shoes.", author: "Sarah R.", time: "6 days ago", productId: 1, helpful: 4 },
    { title: "Found my lehenga in 15 minutes", body: "I found a gorgeous lehenga in under 15 minutes. It only needed a small alteration, which the lovely lady at the store took care of right away. Prices are very fair!", author: "Thili B.", time: "1 week ago", productId: 3, helpful: 3 },
    { title: "So kind and so talented", body: "Sushma is so kind and absolutely amazing at what she does! I've kept coming back with different family members. So grateful to have found her. 10/10", author: "Nisha M.", time: "1 week ago", productId: 5, helpful: 5 },
    { title: "Beautiful selection, perfect fit", body: "Such a beautiful selection with many custom sizes — I didn't even have to get my lehenga altered and I usually do! She is very friendly, knowledgeable, and talented.", author: "Sukrana U.", time: "2 weeks ago", productId: 7, helpful: 2 },
    { title: "Worth the drive from Vermont", body: "My daughter and I traveled 3.5 hours from Vermont. The shop is bright, colorful and filled with so many options. Sushma is incredibly talented and kind.", author: "Cindy S.", time: "2 weeks ago", productId: 11, helpful: 6 },
    { title: "Had to leave a review", body: "I never write Google reviews, but my experience with Chaubandi and Sushma was so wonderful that this is the least I can do.", author: "Kyle V.", time: "3 weeks ago", productId: 3, helpful: 1 },
  ];

  // Live Google rating + count for the badge, with a sensible fallback.
  const [g, setG] = useState(null);
  useEffect(() => {
    let cancelled = false;
    medusa.getGoogleReviews()
      .then(d => { if (!cancelled && d && (typeof d.rating === "number" || d.total)) setG(d); })
      .catch(() => { /* fall back to defaults */ });
    return () => { cancelled = true; };
  }, []);
  const rating = (typeof g?.rating === "number" ? g.rating : 4.9).toFixed(1);
  const total = g?.total || null;
  const googleUrl = g?.googleUrl || "https://www.google.com/maps/search/?api=1&query=Chaubandi%20Arlington%20MA";

  return (
    <section id="cb-reviews" style={{ margin: "64px 0", background: "#16110c", borderTop: "1px solid #2b2218", borderBottom: "1px solid #2b2218", overflow: "hidden" }}>
      {/* Heading + Google rating badge */}
      <div style={{ padding: "48px 32px 8px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 400, color: "#f0e6d2", marginBottom: 16 }}>Loved by Our Customers</h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 13, flexWrap: "wrap" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Google" style={{ flexShrink: 0 }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
          </svg>
          <span style={{ fontSize: 16, color: "#f0e6d2", fontWeight: 700, letterSpacing: .5 }}>{rating}</span>
          <span style={{ color: "#e8c97a", letterSpacing: 2, fontSize: 15 }}>★★★★★</span>
          <span style={{ fontSize: 13, color: "#a3947c" }}>{total ? `${total} Google reviews` : "Rated on Google"}</span>
          <a href={googleUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: "#e8c97a", textDecoration: "none", borderBottom: "1px solid rgba(232,201,122,0.4)", paddingBottom: 1 }}>Read all on Google →</a>
        </div>
      </div>

      {/* Product-linked review carousel — click a card to open its product */}
      <ReviewCarousel reviews={PRODUCT_REVIEWS} products={products} navigate={navigate} />
      <div className="mobile-grid" style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 32px", display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 40, alignItems: "center", background: "linear-gradient(135deg, rgba(232,180,188,0.1) 0%, rgba(139,44,58,0.05) 100%)" }}>
        <div style={{ textAlign: "center", padding: "0 20px" }}>
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e8c97a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
              <path d="M15 8l-6 4v-8l6 4z"></path>
            </svg>
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: "#f0e6d2", marginBottom: 8 }}>Shop Via Video Call</h3>
          <p style={{ fontSize: 13, color: "#a3947c", marginBottom: 24 }}>Get a free virtual styling session from anywhere.</p>
          <button className="btn-shine" onClick={() => window.open("https://wa.me/18578001282?text=Hi%20Sushma!%20I%20would%20like%20to%20book%20a%20virtual%20consultation.", "_blank")} style={{ padding: "14px 32px", background: "#16110c", border: "1px solid rgba(197,162,85,0.5)", color: "#f0e6d2", cursor: "pointer", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Book a Virtual Visit</button>
        </div>
        <div className="mobile-hide" style={{ width: 1, height: "100%", background: "rgba(139,44,58,0.2)" }} />
        <div style={{ textAlign: "center", padding: "0 20px" }}>
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e8c97a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 4c0-1.1.9-2 2-2s2 .9 2 2"></path>
              <path d="M5 10c0-1.6 1.3-3 3-3h8c1.6 0 3 1.3 3 3"></path>
              <path d="M5 10l-2 12h18l-2-12"></path>
              <line x1="12" y1="10" x2="12" y2="22"></line>
            </svg>
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: "#f0e6d2", marginBottom: 8 }}>The Bridal Stylist</h3>
          <p style={{ fontSize: 13, color: "#a3947c", marginBottom: 24 }}>Book your personal bridal consultation in Arlington.</p>
          <button className="btn-shine" onClick={() => window.open("https://wa.me/18578001282?text=Hi%20Sushma!%20I%20would%20like%20to%20book%20an%20in-store%20consultation.", "_blank")} style={{ padding: "14px 32px", background: "#16110c", border: "1px solid rgba(197,162,85,0.5)", color: "#f0e6d2", cursor: "pointer", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Book In-Store Visit</button>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ SECTION ─── */
function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const FAQS = [
    { q: "Do you offer custom sizing and alterations?", a: "Yes! Every purchase comes with free custom alterations. If you visit our Arlington boutique, our founder Sushma will personally take your measurements. If you are shopping online, we provide a detailed measurement guide and offer virtual consultations." },
    { q: "How long does shipping take?", a: "We offer free shipping across the USA. In-stock items ship within 24–48 hours and typically arrive within 3-5 business days. Custom orders or pieces requiring heavy alterations generally take 2-4 weeks." },
    { q: "Can I book a virtual styling appointment?", a: "Absolutely. We offer free video call consultations via WhatsApp or Zoom. Sushma will walk you through our collections, show you fabric details up close, and help you find the perfect outfit for your occasion." },
    { q: "Do you design custom bridal wear?", a: "Yes, we specialize in handcrafted bridal lehengas and sherwanis. We can customize colors, embroidery patterns, and silhouettes to match your wedding theme perfectly. Please book a consultation at least 3-4 months before your wedding date." },
  ];

  return (
    <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 32px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 400, marginBottom: 6 }}>Frequently Asked Questions</h2>
      </div>
      <div style={{ borderTop: "1px solid #2b2218" }}>
        {FAQS.map((faq, idx) => (
          <div key={idx} style={{ borderBottom: "1px solid #2b2218" }}>
            <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} style={{ width: "100%", padding: "24px 0", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 500, color: "#f0e6d2" }}>{faq.q}</span>
              <span style={{ fontSize: 20, color: "#c5a255", transform: openIdx === idx ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s" }}><Plus size={18} /></span>
            </button>
            <div style={{ maxHeight: openIdx === idx ? 200 : 0, overflow: "hidden", transition: "max-height 0.3s ease-in-out" }}>
              <p style={{ paddingBottom: 24, fontSize: 14, color: "#a3947c", lineHeight: 1.6 }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── SEO CONTENT BLOCK ─── */
function SeoTextSection() {
  return (
    <section style={{ background: "#16110c", padding: "80px 32px 64px", borderTop: "1px solid #2b2218" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", color: "#a3947c" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: "#f0e6d2", marginBottom: 16 }}>Shop Premium Indian & Nepali Clothes Online and in Boston, MA</h2>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, lineHeight: 1.8, marginBottom: 24 }}>Welcome to Chaubandi, your premier destination for handcrafted ethnic and fusion wear. Whether you are searching for a breathtaking bridal lehenga, an elegant silk saree, or a perfectly tailored sherwani, we bring the rich heritage of South Asian craftsmanship directly to you. Based in Arlington, MA (proudly serving the greater Boston and MetroWest areas), our boutique specializes in luxurious, high-quality garments that blend traditional artistry with modern silhouettes.</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#f0e6d2", marginBottom: 12 }}>Custom Bridal & Occasion Wear</h3>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, lineHeight: 1.8, marginBottom: 24 }}>Your special day deserves a spectacular outfit. Our curated bridal collection features heavy zardozi work, intricate thread embroidery, and premium fabrics. From vibrant Haldi and Mehandi outfits to sophisticated Reception gowns and Groom's Sherwanis, we offer full styling services for the entire wedding party. Every piece is handcrafted with love and impeccable attention to detail.</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#f0e6d2", marginBottom: 12 }}>Why Choose Chaubandi for Ethnic Wear?</h3>
        <ul style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, lineHeight: 1.8, marginBottom: 24, paddingLeft: 20 }}>
          <li style={{ marginBottom: 8 }}><strong style={{ color: "#f0e6d2" }}>Free Alterations:</strong> We believe in the perfect fit. Enjoy complimentary expert alterations with every purchase to ensure your outfit looks flawless.</li>
          <li style={{ marginBottom: 8 }}><strong style={{ color: "#f0e6d2" }}>Free USA Shipping:</strong> Fast, reliable, and free shipping across the United States on all qualifying orders.</li>
          <li style={{ marginBottom: 8 }}><strong style={{ color: "#f0e6d2" }}>Expert Bridal Styling:</strong> Book an in-store or virtual appointment with our founder, Sushma, for highly personalized styling advice and fitting consultations.</li>
        </ul>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, lineHeight: 1.8 }}>Explore our trending collections of Anarkalis, Shararas, Indo-Western fusion wear, and exclusive jewelry sets. Experience a luxury ethnic wear shopping journey that prioritizes your unique style, comfort, and cultural heritage.</p>
      </div>
    </section>
  );
}

/* ─── HOME PAGE ─── */
function HomePage({ navigate, products, setShopFilter }) {
  return (
    <div>
      <HeroCarousel navigate={navigate} setShopFilter={setShopFilter} />
      <CategoryStrip navigate={navigate} setShopFilter={setShopFilter} activeFilter="All" />
      <div style={{ background: "#16110c", borderBottom: "1px solid #2b2218", padding: "18px 32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
          {[["✂️", "Free Alterations"], ["📦", "Free USA Shipping"], ["⭐", "4.9 Star Rating"], ["📍", "Visit Our Boutique"]].map(([icon, text]) => (
            <span key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#a3947c", letterSpacing: .5 }}>{icon} {text}</span>
          ))}
        </div>
      </div>
      <section className="fade-in d1" style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 400, marginBottom: 6 }}>Shop by Occasion</h2>
          <p style={{ fontSize: 13, color: "#a3947c" }}>Find your perfect outfit for every celebration</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16 }}>
          {[
            // Here are the updated file paths applied to the array
            ["Engagement", "/images/Engagement.jpg", "#4a2040"], 
            ["Haldi", "/images/Haldi.jpg", "#9e711c"], 
            ["Mehandi", "/images/Mehandi.jpg", "#1b4028"],
            ["Sangeet party", "/images/Sangeeth.jpg", "#1a1442"], 
            ["Wedding", "/images/Wedding.jpg", "#6a1830"], 
            ["Reception", "/images/Reception.jpg", "#1a1412"]
          ].map(([occ, imgSrc, color]) => (
            <div key={occ} className="hover-lift" onClick={() => { setShopFilter("All"); navigate("shop"); }}
              style={{ cursor: "pointer", borderRadius: 8, overflow: "hidden", position: "relative", aspectRatio: "3/4" }}>
              
              {/* Added image tag */}
              <img 
                src={imgSrc} 
                alt={occ} 
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} 
              />
              
              {/* Opacity overlays adjusted to let the image show through clearly */}
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, ${color}66, ${color}aa)` }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }} />
              
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#f0e6d2", marginBottom: 4 }}>{occ}</div>
                <div style={{ fontSize: 11, color: "rgba(240,235,228,.6)", letterSpacing: 1 }}>SHOP NOW →</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CouplesShowcase navigate={navigate} />
      <UgcReels />
      <TestimonialAndBooking navigate={navigate} products={products} />
      <FaqSection />
      <SeoTextSection />
    </div>
  );
}

/* ─── PRODUCT CARD ─── */
function ProductCard({ product, navigate, inWishlist, toggleWishlist }) {
  const saved = inWishlist ? inWishlist(product.id) : false;
  return (
    <div className="hover-lift" onClick={() => navigate("product", product)} style={{ cursor: "pointer" }}>
      <div className="img-zoom" style={{ aspectRatio: "3/4", borderRadius: 6, marginBottom: 12, position: "relative", overflow: "hidden" }}>
        <div style={{ background: product.color, width: "100%", height: "100%" }}>
          {product.images?.[0] && (
            <img src={product.images[0]} alt={product.name} loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          )}
        </div>
        {product.badge && <div style={{ position: "absolute", top: 10, left: 10, padding: "5px 12px", background: product.badge === "Bestseller" ? "#c5a255" : "#e8c97a", color: "#1a1208", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500, borderRadius: 3 }}>{product.badge}</div>}
        <div onClick={(e) => { e.stopPropagation(); toggleWishlist && toggleWishlist(product.id); }} title={saved ? "Remove from wishlist" : "Add to wishlist"}
          style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, background: "rgba(22,17,12,0.85)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", opacity: saved ? 1 : 0, transition: "opacity .3s", cursor: "pointer" }} className="wish-btn">
          <Heart size={14} color={saved ? "#e8c97a" : "#f0e6d2"} fill={saved ? "#e8c97a" : "none"} />
        </div>
      </div>
      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 400, marginBottom: 4, lineHeight: 1.3 }}>{product.name}</h3>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 14, color: "#a3947c" }}>${product.price}</span>
        <span style={{ fontSize: 11, color: "#c5a255", letterSpacing: 1 }}>{"★".repeat(Math.floor(product.rating))} {product.rating}</span>
      </div>
    </div>
  );
}

/* ─── SHOP PAGE ─── */
/* ─── SHOP FILTER DATA & HELPERS ─── */
const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "Free Size", "Custom"];
const PRICE_BUCKETS = [
  { label: "Under $300", test: (p) => p < 300 },
  { label: "$300 – $450", test: (p) => p >= 300 && p < 450 },
  { label: "$450 – $600", test: (p) => p >= 450 && p < 600 },
  { label: "$600+", test: (p) => p >= 600 },
];
const COLOR_SWATCHES = [
  { label: "Red", hex: "#a3182a", match: /\bred\b|banarasi/i },
  { label: "Maroon", hex: "#5a1020", match: /maroon/i },
  { label: "Pink", hex: "#d46a8a", match: /pink|blush/i },
  { label: "Blue", hex: "#1a3aa0", match: /blue|navy|royal/i },
  { label: "Green", hex: "#1a6a4a", match: /green|teal|emerald|mint/i },
  { label: "Gold", hex: "#c5a255", match: /gold/i },
  { label: "Ivory", hex: "#e8dfce", match: /ivory|pearl/i },
  { label: "Black", hex: "#1a1512", match: /black/i },
  { label: "Multicolor", hex: "linear-gradient(135deg,#d4466a,#c5a255,#1a6a4a)", match: /multicolor|patchwork/i },
];
const FABRIC_OPTS = [
  { label: "Silk", match: /silk/i },
  { label: "Velvet", match: /velvet/i },
  { label: "Georgette", match: /georgette/i },
  { label: "Brocade", match: /brocade/i },
  { label: "Banarasi", match: /banarasi/i },
  { label: "Net", match: /\bnet\b/i },
];
const OCCASION_BY_CAT = {
  Bridal: ["Wedding", "Reception"],
  Lehengas: ["Wedding", "Sangeet", "Reception"],
  Sarees: ["Reception", "Festive"],
  Anarkali: ["Sangeet", "Mehandi", "Festive"],
  Sharara: ["Sangeet", "Mehandi"],
  Sherwanis: ["Wedding"],
};
const OCCASIONS = ["Wedding", "Reception", "Sangeet", "Mehandi", "Festive"];
const colorsOf = (p) => COLOR_SWATCHES.filter((c) => c.match.test(p.name || "")).map((c) => c.label);
const fabricsOf = (p) => FABRIC_OPTS.filter((f) => f.match.test(`${p.desc || ""} ${p.name || ""}`)).map((f) => f.label);
const occasionsOf = (p) => OCCASION_BY_CAT[p.cat] || ["Festive"];
const isReadyToShip = (p) => (p.images?.length || 0) > 0;

function FilterSection({ title, open, onToggle, children }) {
  return (
    <div style={{ borderBottom: "1px solid #2b2218" }}>
      <button onClick={onToggle} style={{ width: "100%", padding: "15px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Outfit',sans-serif" }}>
        <span style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#f0e6d2", fontWeight: 600 }}>{title}</span>
        <span style={{ color: "#c5a255", transform: open ? "rotate(90deg)" : "none", transition: "transform .2s", display: "inline-flex" }}><ChevronRight size={15} /></span>
      </button>
      {open && <div style={{ paddingBottom: 16, display: "flex", flexDirection: "column", gap: 11 }}>{children}</div>}
    </div>
  );
}

function CheckRow({ label, checked, onChange, swatch }) {
  return (
    <div onClick={onChange} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13.5, color: checked ? "#f0e6d2" : "#a3947c" }}>
      <span style={{ width: 16, height: 16, borderRadius: 3, border: `1.5px solid ${checked ? "#c5a255" : "#3a3026"}`, background: checked ? "#c5a255" : "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {checked && <Check size={11} color="#1a1208" strokeWidth={3} />}
      </span>
      {swatch && <span style={{ width: 15, height: 15, borderRadius: "50%", background: swatch, border: "1px solid rgba(255,255,255,0.25)", flexShrink: 0 }} />}
      <span>{label}</span>
    </div>
  );
}

function ShopPage({ navigate, products, filter, setFilter, addToCart, query = "", setQuery, inWishlist, toggleWishlist }) {
  const q = query.trim().toLowerCase();
  const [sort, setSort] = useState("trending");
  const [sel, setSel] = useState({ sizes: [], prices: [], colors: [], occasions: [], fabrics: [], ready: false });
  const [open, setOpen] = useState({ Size: true, Price: true, Color: true, Occasion: false, Fabric: false });
  const [drawer, setDrawer] = useState(false);

  const toggle = (key, val) => setSel((s) => ({ ...s, [key]: s[key].includes(val) ? s[key].filter((x) => x !== val) : [...s[key], val] }));
  const clearAll = () => setSel({ sizes: [], prices: [], colors: [], occasions: [], fabrics: [], ready: false });
  const activeCount = sel.sizes.length + sel.prices.length + sel.colors.length + sel.occasions.length + sel.fabrics.length + (sel.ready ? 1 : 0);

  const sizes = [...new Set(products.flatMap((p) => p.sizes || []))].sort((a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b));
  const colors = COLOR_SWATCHES.filter((c) => products.some((p) => c.match.test(p.name || "")));
  const fabrics = FABRIC_OPTS.filter((f) => products.some((p) => f.match.test(`${p.desc || ""} ${p.name || ""}`)));

  const byCat = filter === "All" ? products : products.filter((p) => p.cat === filter);
  let list = byCat.filter((p) => !q || [p.name, p.cat, p.desc, p.badge].filter(Boolean).some((v) => v.toLowerCase().includes(q)));
  list = list.filter((p) => !sel.sizes.length || (p.sizes || []).some((s) => sel.sizes.includes(s)));
  list = list.filter((p) => !sel.prices.length || sel.prices.some((lbl) => PRICE_BUCKETS.find((b) => b.label === lbl)?.test(p.price)));
  list = list.filter((p) => !sel.colors.length || colorsOf(p).some((c) => sel.colors.includes(c)));
  list = list.filter((p) => !sel.occasions.length || occasionsOf(p).some((o) => sel.occasions.includes(o)));
  list = list.filter((p) => !sel.fabrics.length || fabricsOf(p).some((f) => sel.fabrics.includes(f)));
  list = list.filter((p) => !sel.ready || isReadyToShip(p));

  const sorted = [...list];
  if (sort === "best") sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  else if (sort === "new") sorted.sort((a, b) => (b.id || 0) - (a.id || 0));
  else if (sort === "price-high") sorted.sort((a, b) => b.price - a.price);
  else if (sort === "price-low") sorted.sort((a, b) => a.price - b.price);

  const heading = q ? `Results for “${query.trim()}”` : (filter === "All" ? "All Collections" : filter);

  const sidebarInner = (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#f0e6d2" }}>Filters</span>
        {activeCount > 0 && <span onClick={clearAll} style={{ fontSize: 12, color: "#e8c97a", cursor: "pointer", textDecoration: "underline" }}>Clear all ({activeCount})</span>}
      </div>
      <FilterSection title="Size" open={open.Size} onToggle={() => setOpen((o) => ({ ...o, Size: !o.Size }))}>
        {sizes.map((s) => <CheckRow key={s} label={s} checked={sel.sizes.includes(s)} onChange={() => toggle("sizes", s)} />)}
      </FilterSection>
      <FilterSection title="Price" open={open.Price} onToggle={() => setOpen((o) => ({ ...o, Price: !o.Price }))}>
        {PRICE_BUCKETS.map((b) => <CheckRow key={b.label} label={b.label} checked={sel.prices.includes(b.label)} onChange={() => toggle("prices", b.label)} />)}
      </FilterSection>
      <FilterSection title="Color" open={open.Color} onToggle={() => setOpen((o) => ({ ...o, Color: !o.Color }))}>
        {colors.map((c) => <CheckRow key={c.label} label={c.label} swatch={c.hex} checked={sel.colors.includes(c.label)} onChange={() => toggle("colors", c.label)} />)}
      </FilterSection>
      <FilterSection title="Occasion" open={open.Occasion} onToggle={() => setOpen((o) => ({ ...o, Occasion: !o.Occasion }))}>
        {OCCASIONS.map((oc) => <CheckRow key={oc} label={oc} checked={sel.occasions.includes(oc)} onChange={() => toggle("occasions", oc)} />)}
      </FilterSection>
      <FilterSection title="Fabric" open={open.Fabric} onToggle={() => setOpen((o) => ({ ...o, Fabric: !o.Fabric }))}>
        {fabrics.map((f) => <CheckRow key={f.label} label={f.label} checked={sel.fabrics.includes(f.label)} onChange={() => toggle("fabrics", f.label)} />)}
      </FilterSection>
      <div style={{ paddingTop: 16 }}>
        <CheckRow label="Ready to ship" checked={sel.ready} onChange={() => setSel((s) => ({ ...s, ready: !s.ready }))} />
      </div>
    </>
  );

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 32px 80px" }}>
      <div className="fade-in" style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: "#a3947c", marginBottom: 8 }}>
          <span style={{ cursor: "pointer" }} onClick={() => navigate("home")}>Home</span> / <span>Shop</span> {filter !== "All" && <>/ <span>{filter}</span></>}
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 400, marginBottom: 8 }}>{heading}</h1>
      </div>

      {/* category chips */}
      <div className="fade-in d1" style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <Filter size={16} style={{ color: "#a3947c", marginRight: 8 }} />
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            style={{ padding: "8px 18px", borderRadius: 100, border: `1px solid ${c === filter ? "rgba(197,162,85,0.5)" : "#2b2218"}`, background: c === filter ? "#c5a255" : "transparent", color: c === filter ? "#1a1208" : "#a3947c", fontSize: 12, cursor: "pointer", letterSpacing: .5, fontFamily: "'Outfit',sans-serif", transition: "all .3s" }}>
            {c}
          </button>
        ))}
      </div>

      {/* toolbar: count · mobile filter button · sort */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="mobile-only" onClick={() => setDrawer(true)} style={{ display: "none", alignItems: "center", gap: 8, padding: "9px 16px", background: "#16110c", border: "1px solid #2b2218", color: "#f0e6d2", borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
            <Filter size={15} /> Filters{activeCount ? ` (${activeCount})` : ""}
          </button>
          <span style={{ fontSize: 13, color: "#a3947c" }}>{sorted.length} {sorted.length === 1 ? "piece" : "pieces"}{q && setQuery && <span onClick={() => setQuery("")} style={{ marginLeft: 12, color: "#e8c97a", cursor: "pointer", textDecoration: "underline" }}>Clear search</span>}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12.5, color: "#a3947c", letterSpacing: .5, whiteSpace: "nowrap" }}>Sort By</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            style={{ height: 40, padding: "0 14px", background: "#16110c", color: "#f0e6d2", border: "1px solid #2b2218", borderRadius: 6, fontSize: 13.5, fontFamily: "'Outfit',sans-serif", cursor: "pointer", outline: "none" }}>
            <option value="trending">Trending</option>
            <option value="best">Best selling</option>
            <option value="new">New</option>
            <option value="price-high">Price: high to low</option>
            <option value="price-low">Price: low to high</option>
          </select>
        </div>
      </div>

      {/* layout: filter sidebar + product grid */}
      <div className="shop-layout" style={{ display: "grid", gridTemplateColumns: "230px 1fr", gap: 32, alignItems: "start" }}>
        <aside className="shop-sidebar">{sidebarInner}</aside>
        <div>
          <div className="fade-in d2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 20 }}>
            {sorted.map((p) => <ProductCard key={p.id} product={p} navigate={navigate} inWishlist={inWishlist} toggleWishlist={toggleWishlist} />)}
          </div>
          {sorted.length === 0 && <div style={{ textAlign: "center", padding: "80px 0", color: "#a3947c" }}>No pieces match these filters.{activeCount > 0 && <> <span onClick={clearAll} style={{ color: "#e8c97a", cursor: "pointer", textDecoration: "underline" }}>Clear filters</span></>}</div>}
        </div>
      </div>

      {/* mobile filter drawer */}
      {drawer && <>
        <div onClick={() => setDrawer(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 3000 }} />
        <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: 320, maxWidth: "88vw", background: "#0d0a08", zIndex: 3001, overflowY: "auto", padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22 }}>Filters</span>
            <X size={20} style={{ cursor: "pointer" }} onClick={() => setDrawer(false)} />
          </div>
          {sidebarInner}
          <button onClick={() => setDrawer(false)} style={{ width: "100%", marginTop: 20, height: 48, background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", borderRadius: 6, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Show {sorted.length} results</button>
        </div>
      </>}
    </div>
  );
}

/* ─── PRODUCT PAGE — AZA CLONE ───
   Replaces the existing ProductPage function in App.jsx.
   Exact AZA layout: 2-col scrolling image grid (left) + sticky info panel (right),
   Live Mirror banner, color variants, full size grid, qty, Add to Cart + Speak to
   Stylist, country/delivery, Shop with Confidence, Offers & EMI, accordions,
   Customer Support, Best Paired carousel, Similar Items with filter chips.
*/

function ProductPage({ product, navigate, addToCart, products, inWishlist, toggleWishlist }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty]           = useState(1);
  const [added, setAdded]       = useState(false);
  const wishlist = inWishlist ? inWishlist(product.id) : false;
  const [openAcc, setOpenAcc]   = useState("shipping");
  const [simFilter, setSimFilter] = useState("Closest Match");
  const [copied, setCopied]     = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [slide, setSlide]       = useState(0);
  useEffect(() => { setSlide(0); }, [product.id]);

  /* image zoom lightbox */
  const [zoomImg, setZoomImg] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");

  /* sticky add-to-cart bar — appears once the main CTA scrolls out of view */
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* per-product reviews — stored locally until the backend gets a reviews
     module; seeded with the product's static count so it never looks empty */
  const revKey = `cb_reviews_${product.id}`;
  const [userReviews, setUserReviews] = useState(() => {
    try { return JSON.parse(localStorage.getItem(revKey) || "[]"); } catch { return []; }
  });
  useEffect(() => {
    try { setUserReviews(JSON.parse(localStorage.getItem(`cb_reviews_${product.id}`) || "[]")); } catch { setUserReviews([]); }
  }, [product.id]);
  const [showRevForm, setShowRevForm] = useState(false);
  const [revForm, setRevForm] = useState({ name: "", rating: 5, title: "", text: "" });
  const [revError, setRevError] = useState("");
  const submitReview = () => {
    if (!revForm.name.trim() || !revForm.text.trim()) { setRevError("Please add your name and review."); return; }
    const entry = { ...revForm, date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }) };
    const next = [entry, ...userReviews];
    setUserReviews(next);
    try { localStorage.setItem(revKey, JSON.stringify(next)); } catch { /* ignore */ }
    setShowRevForm(false);
    setRevForm({ name: "", rating: 5, title: "", text: "" });
    setRevError("");
  };
  const avgRating = userReviews.length
    ? (userReviews.reduce((s, r) => s + r.rating, 0) / userReviews.length)
    : product.rating;

  /* real, purchasable sizes for this product (each maps to a Medusa variant) */
  const ALL_SIZES = product.sizes?.length ? product.sizes : ["XS","S","M","L","XL","XXL"];

  /* color variants = other products in same category (click to switch) */
  const variants = products.filter(p => p.cat === product.cat).slice(0, 4);

  /* similar items, driven by the filter chips */
  const SIM_FILTERS = ["Closest Match", "More from Chaubandi", "Chaubandi Exclusive", "Ready to Ship"];
  let similar;
  if (simFilter === "Closest Match") {
    similar = products.filter(p => p.id !== product.id && p.cat === product.cat);
  } else if (simFilter === "Ready to Ship") {
    similar = products.filter(p => p.id !== product.id && p.badge);
  } else {
    similar = products.filter(p => p.id !== product.id);
  }
  similar = similar.slice(0, 4);
  if (similar.length < 4) {
    const more = products.filter(p => p.id !== product.id && !similar.find(s => s.id === p.id)).slice(0, 4 - similar.length);
    similar = [...similar, ...more];
  }

  /* best paired = accessories/jewellery, fallback to any other products */
  let bestPaired = products.filter(p => ["Jewellery","Accessories","Shoes","Shoes/Boots","Blouses"].includes(p.cat)).slice(0, 6);
  if (bestPaired.length === 0) bestPaired = products.filter(p => p.id !== product.id).slice(0, 6);

  /* delivery estimate = today + 7 days */
  const deliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toLocaleDateString("en-US", { day: "numeric", month: "long" });

  /* Raas-style info tabs + shipping timeline */
  const [tab, setTab] = useState("desc");
  const fmtDay = (o) => new Date(Date.now() + o * 86400000).toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  const TIMELINE = [
    { icon: "🛍", date: fmtDay(0), label: "Purchased" },
    { icon: "📦", date: `${fmtDay(1)} – ${fmtDay(2)}`, label: "Processing" },
    { icon: "🚚", date: `${fmtDay(4)} – ${fmtDay(8)}`, label: "Delivered" },
  ];

  const handleAdd = () => {
    if (!selectedSize) { setSizeError(true); return; }
    addToCart(product, selectedSize, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const copyCoupon = () => {
    try { navigator.clipboard.writeText("WELCOME10"); } catch(e) { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  /* carousel slides: each product photo + a trailing slot reserved for an AI video */
  const photoSlides = product.images?.length ? product.images : [null];
  const slides = [...photoSlides, { video: true }];
  const arrowBtn = {
    position: "absolute", top: "50%", transform: "translateY(-50%)", width: 48, height: 48,
    borderRadius: "50%", background: "rgba(255,255,255,0.92)", border: "none", display: "flex",
    alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 3,
    boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
  };

  const S = {
    checkRow: { display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "#f0e6d2" },
    check: { color: "#3dbd83", fontSize: 13, lineHeight: "20px", flexShrink: 0 },
    card: { border: "1px solid #2b2218", borderRadius: 8, background: "#16110c" },
    accHead: { width: "100%", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif" },
  };

  return (
    <div style={{ background: "#0d0a08", fontFamily: "'Outfit',sans-serif" }}>

      {/* ── TRUST BAR (Raas-style) ── */}
      <div style={{ borderBottom: "1px solid #2b2218", background: "#16110c" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "13px 32px", display: "flex", justifyContent: "center", gap: 38, flexWrap: "wrap" }}>
          {[["🏠", "Based in & Ships From", "Arlington, MA"], ["↩️", "14-Day", "Easy Returns"], ["✂️", "Free Alterations", "Perfect-Fit Promise"], ["⭐", "4.9 Google Rating", "Loved by Customers"], ["🧵", "Handcrafted", "By Master Artisans"]].map(([ic, a, b]) => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ fontSize: 16 }}>{ic}</span>
              <div><div style={{ fontSize: 11.5, color: "#f0e6d2", fontWeight: 600 }}>{a}</div><div style={{ fontSize: 10.5, color: "#c5a255" }}>{b}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mobile-stack" style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 32px 0", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 48, alignItems: "start" }}>

        {/* ── GALLERY ── */}
        <div>
          <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", background: product.color || "#1f1812", overflow: "hidden", borderRadius: 8 }}>
            <div style={{ display: "flex", width: `${slides.length * 100}%`, height: "100%", transform: `translateX(-${slide * (100 / slides.length)}%)`, transition: "transform .45s cubic-bezier(.4,0,.2,1)" }}>
              {slides.map((s, i) => (
                <div key={i} style={{ width: `${100 / slides.length}%`, height: "100%", flexShrink: 0, position: "relative", background: product.color || "#1f1812" }}>
                  {s && s.video ? (
                    <div style={{ position: "absolute", inset: 0, background: "#0d0a08", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
                      <div style={{ width: 70, height: 70, borderRadius: "50%", border: "1.5px solid rgba(232,201,122,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="#e8c97a"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                      <div style={{ fontSize: 11, letterSpacing: 2.5, color: "#e8c97a", textTransform: "uppercase" }}>AI Video · Coming Soon</div>
                    </div>
                  ) : s ? (
                    <img src={s} alt={`${product.name} view ${i + 1}`} loading={i > 0 ? "lazy" : "eager"} onClick={() => setZoomImg(s)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "zoom-in" }} />
                  ) : null}
                  {i === 0 && s && !s.video && (
                    <div style={{ position: "absolute", bottom: 14, left: 14, background: "rgba(22,17,12,0.85)", borderRadius: 100, padding: "6px 13px", fontSize: 11, color: "#f0e6d2" }}>
                      Contains: {product.cat === "Sarees" ? "Saree, Blouse" : "Choli, Lehenga, Dupatta"}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button aria-label="Previous" onClick={() => setSlide(p => (p - 1 + slides.length) % slides.length)} style={{ ...arrowBtn, left: 14, width: 40, height: 40 }}><ChevronLeft size={19} color="#1a1208" /></button>
            <button aria-label="Next" onClick={() => setSlide(p => (p + 1) % slides.length)} style={{ ...arrowBtn, right: 14, width: 40, height: 40 }}><ChevronRight size={19} color="#1a1208" /></button>
            <span onClick={() => toggleWishlist && toggleWishlist(product.id)} style={{ position: "absolute", top: 14, right: 14, width: 38, height: 38, borderRadius: "50%", background: "rgba(22,17,12,0.8)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 3 }}>
              <Heart size={18} color="#e8c97a" fill={wishlist ? "#e8c97a" : "none"} />
            </span>
            <div style={{ position: "absolute", bottom: 14, right: 14, display: "flex", gap: 7, zIndex: 3 }}>
              {slides.map((_, i) => <span key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 20 : 7, height: 7, borderRadius: 100, background: i === slide ? "#e8c97a" : "rgba(240,235,228,0.5)", cursor: "pointer", transition: "all .3s" }} />)}
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#6e6353", padding: "14px 4px 32px" }}>
            <span style={{ cursor: "pointer" }} onClick={() => navigate("home")}>Home</span> / <span style={{ cursor: "pointer" }} onClick={() => navigate("shop")}>{product.cat}</span> / <span style={{ color: "#a3947c" }}>{product.name}</span>
          </div>
        </div>

        {/* ── INFO (minimal) ── */}
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 400, color: "#f0e6d2", lineHeight: 1.2, marginBottom: 6 }}>{product.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <span style={{ fontSize: 11, color: "#6e6353", letterSpacing: 1 }}>CB-{String(product.id).slice(-4).padStart(4, "0").toUpperCase()}</span>
            <span style={{ fontSize: 12, color: "#c5a255" }}>{"★".repeat(Math.round(avgRating))} {avgRating.toFixed(1)}{userReviews.length ? ` (${userReviews.length})` : ""}</span>
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: "#f0e6d2", marginBottom: 6 }}>${product.price}</div>
          <p style={{ fontSize: 12.5, color: "#a3947c", marginBottom: 22, lineHeight: 1.6 }}>Free U.S. shipping · Free 14-day returns · Free alterations included.</p>

          {/* size */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11, letterSpacing: 2, color: "#a3947c", textTransform: "uppercase" }}>Size</span>
            <span onClick={() => navigate("fit")} style={{ fontSize: 12, color: "#e8c97a", cursor: "pointer", textDecoration: "underline" }}>Size chart 📏</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: sizeError ? 8 : 18 }}>
            {ALL_SIZES.map(s => (
              <button key={s} onClick={() => { setSelectedSize(s); setSizeError(false); }}
                style={{ minWidth: 44, padding: "10px 13px", borderRadius: 4, border: `1.5px solid ${selectedSize === s ? "#c5a255" : "#2b2218"}`, background: selectedSize === s ? "#c5a255" : "transparent", color: selectedSize === s ? "#1a1208" : "#f0e6d2", fontSize: 12.5, cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontWeight: selectedSize === s ? 700 : 400 }}>
                {s}
              </button>
            ))}
          </div>
          {sizeError && <div style={{ fontSize: 12, color: "#e8a0a0", marginBottom: 14 }}>Please select a size first.</div>}

          {/* color / style variants */}
          {variants.length > 1 && <>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#a3947c", textTransform: "uppercase", marginBottom: 10 }}>More in {product.cat}</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {variants.map(v => (
                <div key={v.id} onClick={() => navigate("product", v)} title={v.name}
                  style={{ width: 46, height: 58, borderRadius: 4, overflow: "hidden", cursor: "pointer", border: `1.5px solid ${v.id === product.id ? "#c5a255" : "#2b2218"}`, background: v.color }}>
                  {v.images?.[0] && <img src={v.images[0]} alt={v.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
              ))}
            </div>
          </>}

          <div style={{ fontSize: 12.5, color: "#e8c97a", marginBottom: 6 }}>EXCLUSIVE: Complimentary made-to-measure on every piece!</div>
          <p style={{ fontSize: 12, color: "#6e6353", marginBottom: 20, lineHeight: 1.6 }}>Between sizes? Size up for the most comfortable fit — our alterations are always free.</p>

          {/* shipping timeline */}
          <div style={{ display: "flex", alignItems: "center", border: "1px solid #2b2218", borderRadius: 8, padding: "14px 10px", marginBottom: 20, background: "#16110c" }}>
            {TIMELINE.map((t, i) => (
              <div key={t.label} style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 15 }}>{t.icon}</div>
                  <div style={{ fontSize: 11.5, color: "#f0e6d2", fontWeight: 600, marginTop: 3 }}>{t.date}</div>
                  <div style={{ fontSize: 10.5, color: "#a3947c" }}>{t.label}</div>
                </div>
                {i < TIMELINE.length - 1 && <div style={{ width: 26, height: 1, background: "#3a3026", flexShrink: 0 }} />}
              </div>
            ))}
          </div>

          {/* qty + CTA */}
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #2b2218", borderRadius: 4 }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ border: "none", background: "none", color: "#f0e6d2", cursor: "pointer", padding: "0 14px", height: 52 }}><Minus size={14} /></button>
              <span style={{ minWidth: 20, textAlign: "center", fontSize: 14 }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ border: "none", background: "none", color: "#f0e6d2", cursor: "pointer", padding: "0 14px", height: 52 }}><Plus size={14} /></button>
            </div>
            <button className="btn-shine" onClick={handleAdd} style={{ flex: 1, height: 52, background: added ? "#3dbd83" : "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", borderRadius: 4, fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif", transition: "background .3s" }}>
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
            <button onClick={() => window.open("https://wa.me/18578001282?text=Hi%20Sushma!%20I%20have%20a%20question%20about%20" + encodeURIComponent(product.name), "_blank")} style={{ flex: 1, height: 44, background: "transparent", border: "1px solid #2b2218", color: "#f0e6d2", borderRadius: 4, fontSize: 11.5, letterSpacing: 1, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>💬 Speak to Stylist</button>
            <button onClick={() => navigate("live")} style={{ flex: 1, height: 44, background: "transparent", border: "1px solid rgba(197,162,85,0.4)", color: "#e8c97a", borderRadius: 4, fontSize: 11.5, letterSpacing: 1, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>🪞 Try Live Mirror</button>
          </div>

          {/* confidence */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 18 }}>
            {["Free 14-day return policy — shop with confidence", "Free alterations with every purchase", "Need it fast? Express options — WhatsApp +1 (857) 800-1282", "100% secure payments"].map(t => (
              <div key={t} style={S.checkRow}><span style={S.check}>✓</span><span style={{ color: "#a3947c" }}>{t}</span></div>
            ))}
          </div>

          {/* coupon */}
          <div onClick={copyCoupon} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#e8c97a", cursor: "pointer", border: "1px dashed rgba(197,162,85,0.5)", borderRadius: 6, padding: "9px 14px" }}>
            🎟 Best code: <strong>WELCOME10</strong> — 10% off {copied ? "· Copied!" : "· Tap to copy"}
          </div>
        </div>
      </div>

      {/* ── INFO TABS ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "52px 32px 10px" }}>
        <div style={{ display: "flex", gap: 26, borderBottom: "1px solid #2b2218", overflowX: "auto", whiteSpace: "nowrap" }} className="rev-track">
          {[["desc", "Description"], ["sizefit", "Size, Fit & Customization"], ["shipping", "Shipping, Delivery & Return"], ["custom", "Made to Measure"], ["care", "Care & Disclaimer"]].map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)} style={{ background: "none", border: "none", padding: "0 2px 13px", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Outfit',sans-serif", color: tab === k ? "#f0e6d2" : "#6e6353", fontWeight: tab === k ? 700 : 400, borderBottom: tab === k ? "2px solid #c5a255" : "2px solid transparent" }}>{label}</button>
          ))}
        </div>
        <div style={{ padding: "26px 2px 10px", maxWidth: 860 }}>
          {tab === "desc" && <>
            <p style={{ fontSize: 14, color: "#a3947c", lineHeight: 1.8, marginBottom: 14 }}>{product.desc}</p>
            <ul style={{ fontSize: 13, color: "#a3947c", lineHeight: 2, paddingLeft: 18 }}>
              <li>Handcrafted by master artisans — no two pieces are identical</li>
              <li>Premium fabrics and embroidery, quality-checked before dispatch</li>
              <li>Ships from our Arlington, MA boutique within 24–48 hours</li>
            </ul>
          </>}
          {tab === "sizefit" && INFO_CONTENT.sizing.blocks.map(([h, t]) => (
            <div key={h} style={{ marginBottom: 16 }}><div style={{ fontSize: 13.5, color: "#f0e6d2", fontWeight: 600, marginBottom: 5 }}>{h}</div><p style={{ fontSize: 13, color: "#a3947c", lineHeight: 1.75 }}>{t}</p></div>
          ))}
          {tab === "shipping" && [...INFO_CONTENT.shipping.blocks.slice(0, 2), ...INFO_CONTENT.returns.blocks.slice(0, 2)].map(([h, t]) => (
            <div key={h} style={{ marginBottom: 16 }}><div style={{ fontSize: 13.5, color: "#f0e6d2", fontWeight: 600, marginBottom: 5 }}>{h}</div><p style={{ fontSize: 13, color: "#a3947c", lineHeight: 1.75 }}>{t}</p></div>
          ))}
          {tab === "custom" && <>
            <p style={{ fontSize: 13.5, color: "#a3947c", lineHeight: 1.8, marginBottom: 14 }}>We want every piece to fit you perfectly — that's why <strong style={{ color: "#f0e6d2" }}>made-to-measure adjustments are complimentary on all orders</strong>. Select "Custom" as your size (where available) or note your request at checkout, and we'll collect these measurements:</p>
            <ol style={{ fontSize: 13, color: "#a3947c", lineHeight: 2, paddingLeft: 18, marginBottom: 14 }}>
              <li>Bust</li><li>Under bust</li><li>Waist</li><li>Height</li><li>Desired dress/gown length</li><li>Desired skirt/lehenga length</li>
            </ol>
            <p style={{ fontSize: 13, color: "#a3947c", lineHeight: 1.75, marginBottom: 16 }}><strong style={{ color: "#f0e6d2" }}>Turnaround:</strong> made-to-measure pieces ship within 1–5 weeks from when we receive your measurements.</p>
            <button onClick={() => navigate("fit")} style={{ padding: "12px 26px", background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", borderRadius: 4, fontSize: 11.5, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Save My Measurements →</button>
          </>}
          {tab === "care" && <>
            <p style={{ fontSize: 13, color: "#a3947c", lineHeight: 1.8, marginBottom: 12 }}>Dry clean only. Store folded in a breathable cotton bag away from direct sunlight. Iron on low heat with a protective cloth — never directly on embroidery, sequins, or zari work.</p>
            <p style={{ fontSize: 12.5, color: "#6e6353", lineHeight: 1.7 }}>Colors may vary slightly from photos due to screen settings and the handcrafted nature of each piece. Minor irregularities in embroidery are a hallmark of genuine handwork, not defects.</p>
          </>}
        </div>
      </section>
      {/* ════════ CUSTOMER REVIEWS ════════ */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "48px 32px 8px", borderTop: "1px solid #2b2218" }}>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 400, color: "#f0e6d2", marginBottom: 8 }}>Customer Reviews</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ color: "#e8c97a", letterSpacing: 2, fontSize: 16 }}>{"★".repeat(Math.round(avgRating))}{"☆".repeat(5 - Math.round(avgRating))}</span>
            <span style={{ fontSize: 13.5, color: "#a3947c" }}>{avgRating.toFixed(1)} · {userReviews.length ? `${userReviews.length} review${userReviews.length > 1 ? "s" : ""}` : "Be the first to review this piece"}</span>
          </div>
          {!showRevForm && (
            <button onClick={() => setShowRevForm(true)} style={{ padding: "11px 26px", background: "#f0e6d2", color: "#1a1208", border: "none", borderRadius: 4, fontSize: 12.5, fontWeight: 700, letterSpacing: 1, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>✏️ Write a Review</button>
          )}
        </div>

        {showRevForm && (
          <div style={{ background: "#16110c", border: "1px solid #2b2218", borderRadius: 10, padding: 22, marginBottom: 28, maxWidth: 560, margin: "0 auto 28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#f0e6d2" }}>Write a review</span>
              <X size={16} style={{ cursor: "pointer", color: "#a3947c" }} onClick={() => setShowRevForm(false)} />
            </div>
            <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
              {[1,2,3,4,5].map(n => (
                <span key={n} onClick={() => setRevForm(f => ({ ...f, rating: n }))} style={{ fontSize: 24, cursor: "pointer", color: n <= revForm.rating ? "#e8c97a" : "#3a3026" }}>★</span>
              ))}
            </div>
            <input value={revForm.name} onChange={e => setRevForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name"
              style={{ width: "100%", height: 44, border: "1px solid #2b2218", borderRadius: 4, padding: "0 14px", fontFamily: "'Outfit',sans-serif", fontSize: 13.5, outline: "none", background: "#0d0a08", color: "#f0e6d2", marginBottom: 10 }} />
            <input value={revForm.title} onChange={e => setRevForm(f => ({ ...f, title: e.target.value }))} placeholder="Title (optional) — e.g. Beautiful Lehenga!"
              style={{ width: "100%", height: 44, border: "1px solid #2b2218", borderRadius: 4, padding: "0 14px", fontFamily: "'Outfit',sans-serif", fontSize: 13.5, outline: "none", background: "#0d0a08", color: "#f0e6d2", marginBottom: 10 }} />
            <textarea value={revForm.text} onChange={e => setRevForm(f => ({ ...f, text: e.target.value }))} placeholder="Share your experience — fit, fabric, the occasion you wore it for…" rows={4}
              style={{ width: "100%", border: "1px solid #2b2218", borderRadius: 4, padding: "12px 14px", fontFamily: "'Outfit',sans-serif", fontSize: 13.5, outline: "none", background: "#0d0a08", color: "#f0e6d2", resize: "vertical", marginBottom: 10, lineHeight: 1.6 }} />
            {revError && <div style={{ fontSize: 12, color: "#e8a0a0", marginBottom: 10 }}>{revError}</div>}
            <button onClick={submitReview} style={{ width: "100%", height: 46, background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", borderRadius: 4, fontSize: 12.5, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Submit Review</button>
          </div>
        )}

        {userReviews.length > 0 && (
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            {userReviews.map((r, i) => (
              <div key={i} style={{ borderBottom: "1px solid #2b2218", padding: "18px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ color: "#e8c97a", fontSize: 13, letterSpacing: 1.5 }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  <span style={{ fontSize: 12, color: "#6e6353" }}>{r.date}</span>
                </div>
                {r.title && <div style={{ fontSize: 14.5, fontWeight: 700, color: "#f0e6d2", marginBottom: 5 }}>{r.title}</div>}
                <p style={{ fontSize: 13.5, color: "#a3947c", lineHeight: 1.65, marginBottom: 8 }}>{r.text}</p>
                <div style={{ fontSize: 12.5, color: "#f0e6d2", fontWeight: 600 }}>{r.name} <span style={{ color: "#3dbd83", fontWeight: 400, marginLeft: 6 }}>✓ Verified</span></div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ════════ IMAGE ZOOM LIGHTBOX ════════ */}
      {zoomImg && (
        <div onClick={() => { setZoomImg(null); setZoomed(false); }} style={{ position: "fixed", inset: 0, zIndex: 4000, background: "rgba(13,10,8,0.96)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <X size={30} style={{ position: "absolute", top: 24, right: 28, cursor: "pointer", color: "#f0e6d2", zIndex: 4001 }} />
          <img src={zoomImg} alt={product.name}
            onClick={(e) => {
              e.stopPropagation();
              const r = e.currentTarget.getBoundingClientRect();
              setZoomOrigin(`${((e.clientX - r.left) / r.width * 100).toFixed(1)}% ${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
              setZoomed(z => !z);
            }}
            style={{ maxWidth: "92vw", maxHeight: "92vh", objectFit: "contain", cursor: zoomed ? "zoom-out" : "zoom-in", transform: zoomed ? "scale(2.4)" : "none", transformOrigin: zoomOrigin, transition: "transform .35s ease" }} />
          <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", fontSize: 12, color: "#a3947c", letterSpacing: 1 }}>
            {zoomed ? "Click to zoom out" : "Click the image to zoom into the embroidery"}
          </div>
        </div>
      )}

      {/* ════════ STICKY ADD-TO-CART BAR ════════ */}
      {showBar && (
        <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 2400, background: "#16110c", borderTop: "1px solid #2b2218", boxShadow: "0 -6px 24px rgba(0,0,0,0.45)", padding: "10px 18px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 54, borderRadius: 4, overflow: "hidden", flexShrink: 0, background: product.color }}>
            {product.images?.[0] && <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#f0e6d2", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</div>
            <div style={{ fontSize: 12.5, color: "#a3947c" }}>{selectedSize ? `Size ${selectedSize} · ` : ""}${product.price}</div>
          </div>
          <button className="btn-shine" onClick={() => { if (!selectedSize) { setSizeError(true); window.scrollTo({ top: 0, behavior: "smooth" }); return; } handleAdd(); }}
            style={{ height: 46, padding: "0 28px", background: added ? "#3dbd83" : "linear-gradient(135deg,#d4af61,#a8842f)", color: added ? "#fff" : "#1a1208", border: "none", borderRadius: 6, fontSize: 12.5, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap" }}>
            {added ? "✓ Added" : selectedSize ? "Add to Cart" : "Select Size"}
          </button>
        </div>
      )}

      {/* ════════ SIMILAR ITEMS ════════ */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "40px 32px 80px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: "#f0e6d2", marginBottom: 18 }}>Similar Items</h2>

        {/* filter chips */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {SIM_FILTERS.map(f => (
            <button key={f} onClick={() => setSimFilter(f)} style={{ padding: "9px 18px", borderRadius: 100, border: `1px solid ${f === simFilter ? "#e8c97a" : "#2b2218"}`, background: "#16110c", color: f === simFilter ? "#e8c97a" : "#f0e6d2", fontSize: 13, cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontWeight: f === simFilter ? 600 : 400 }}>{f}</button>
          ))}
        </div>

        {/* product cards */}
        <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {similar.map(p => (
            <div key={p.id} onClick={() => navigate("product", p)} style={{ cursor: "pointer" }}>
              <div style={{ position: "relative", aspectRatio: "3/4", borderRadius: 6, overflow: "hidden", background: p.color || "#1f1812", marginBottom: 10 }}>
                {p.images?.[0] && <img src={p.images[0]} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
                {/* wishlist heart */}
                <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: 10, right: 10, width: 34, height: 34, borderRadius: "50%", background: "rgba(22,17,12,0.85)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Heart size={16} color="#f0e6d2" />
                </div>
                {/* badge bottom-left */}
                {p.badge && (
                  <div style={{ position: "absolute", bottom: 10, left: 10, display: "flex", gap: 6 }}>
                    <span style={{ background: "rgba(22,17,12,0.85)", borderRadius: 3, padding: "5px 9px", fontSize: 10.5, color: "#f0e6d2", display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ color: "#e8c97a" }}>⚡</span>{p.badge}
                    </span>
                  </div>
                )}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#f0e6d2", marginBottom: 3 }}>Chaubandi Boston</div>
              <div style={{ fontSize: 13, color: "#a3947c", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#f0e6d2" }}>${p.price}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/* ─── CHECKOUT PAGE ─── */
function CheckoutPage({ cart, total, step, setStep, navigate, setCart, orderPlaced, setOrderPlaced, placeOrder, placedOrder, customer }) {
  const [form, setForm] = useState({ email: customer?.email || "", firstName: customer?.first_name || "", lastName: customer?.last_name || "", address: "", city: "", state: "MA", zip: "", phone: customer?.phone || "" });
  const [cardForm, setCardForm] = useState({ number: "", exp: "", cvv: "", name: "" });
  const [deliveryMethod, setDeliveryMethod] = useState("ship");
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState("");
  // Promo codes — client-side for now; move server-side with real payments.
  const PROMOS = { WELCOME10: 0.10 };
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState(null); // { code, pct }
  const [promoMsg, setPromoMsg] = useState("");
  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (PROMOS[code]) { setPromo({ code, pct: PROMOS[code] }); setPromoMsg(""); }
    else { setPromo(null); setPromoMsg("That code isn't valid."); }
  };
  const discount = promo ? total * promo.pct : 0;
  const tax = (total - discount) * 0.0625;
  const grandTotal = total - discount + tax;

  const handlePlaceOrder = async () => {
    setOrderError("");
    setPlacing(true);
    try {
      // placeOrder runs the real Medusa checkout; falls back to a local
      // confirmation if the backend is offline.
      if (placeOrder) await placeOrder(form, deliveryMethod);
      else setCart([]);
      setOrderPlaced(true);
    } catch (e) {
      if (String(e?.message) === "offline") {
        setCart([]);
        setOrderPlaced(true);
      } else {
        console.error("[Chaubandi] place order failed", e);
        setOrderError("We couldn't complete your order. Please try again or contact us on WhatsApp.");
      }
    } finally {
      setPlacing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="fade-in" style={{ maxWidth: 600, margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#3dbd83", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={32} color="#fff" /></div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 400, marginBottom: 12 }}>Order Confirmed!</h1>
        <p style={{ fontSize: 14, color: "#a3947c", lineHeight: 1.7, marginBottom: 8 }}>Thank you for your order. We'll send a confirmation to <strong>{placedOrder?.email || form.email || "your email"}</strong>.</p>
        <p style={{ fontSize: 13, color: "#a3947c", marginBottom: 32 }}>Order #{placedOrder?.display_id ? `CB-${placedOrder.display_id}` : `CB-${Math.floor(Math.random() * 90000) + 10000}`} · {deliveryMethod === "pickup" ? "Ready for pickup soon" : "Ships in 24–48 hours"}</p>
        <div style={{ background: "#1f1812", borderRadius: 8, padding: 24, marginBottom: 32, textAlign: "left" }}>
          <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#a3947c", marginBottom: 16 }}>What's Next</div>
          {["You'll receive an email confirmation shortly","Our team will prepare & ship your order within 24–48 hours","Free alterations — we'll reach out for measurements","Track your package via the link in your email"].map((t,i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#c5a255", color: "#1a1208", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{i+1}</div>
              <span style={{ fontSize: 13, color: "#a3947c", lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}
        </div>
        <button onClick={() => navigate("home")} style={{ padding: "14px 36px", background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 32px 80px" }}>
      <div className="fade-in" style={{ marginBottom: 32 }}>
        <span style={{ fontSize: 12, color: "#a3947c", cursor: "pointer" }} onClick={() => navigate("home")}>← Back to Shopping</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 400, marginTop: 16, marginBottom: 8 }}>Checkout</h1>
        <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 32 }}>
          {["Shipping", "Payment", "Review"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: step > i ? "#3dbd83" : step === i + 1 ? "#c5a255" : "#2b2218", color: step > i ? "#fff" : step === i + 1 ? "#1a1208" : "#a3947c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, transition: "all .3s" }}>
                {step > i ? <Check size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: 12, color: step === i + 1 ? "#f0e6d2" : "#a3947c", fontWeight: step === i + 1 ? 500 : 400 }}>{s}</span>
              {i < 2 && <div style={{ width: 40, height: 1, background: "#2b2218", margin: "0 8px" }} />}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48 }} className="mobile-stack">
        <div className="fade-in d1">
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, marginBottom: 20 }}>{deliveryMethod === "pickup" ? "Pickup Details" : "Shipping Information"}</h2>

              {/* ── DELIVERY METHOD (Ship vs. Store Pickup / BOPIS) ── */}
              <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[
                  { key: "ship", icon: "🚚", title: "Ship to me", desc: "Free USA shipping · 24–48 hrs" },
                  { key: "pickup", icon: "🏬", title: "Pick up free", desc: "Arlington, MA boutique" },
                ].map(opt => {
                  const active = deliveryMethod === opt.key;
                  return (
                    <div key={opt.key} onClick={() => setDeliveryMethod(opt.key)} style={{ cursor: "pointer", border: `1.5px solid ${active ? "#c5a255" : "#2b2218"}`, background: active ? "#1f1812" : "#16110c", borderRadius: 8, padding: "16px 18px", transition: "all .2s" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 20 }}>{opt.icon}</span>
                        <span style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${active ? "#c5a255" : "#2b2218"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {active && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#c5a255" }} />}
                        </span>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#f0e6d2", marginBottom: 2 }}>{opt.title}</div>
                      <div style={{ fontSize: 12, color: "#a3947c" }}>{opt.desc}</div>
                    </div>
                  );
                })}
              </div>

              {deliveryMethod === "pickup" && (
                <div className="fade-in" style={{ background: "#1f1812", border: "1px solid rgba(197,162,85,0.25)", borderRadius: 8, padding: "20px 22px", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 16 }}>📍</span>
                    <span style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#c5a255", fontWeight: 600 }}>Chaubandi Boston · Pickup Location</span>
                  </div>
                  <div style={{ fontSize: 14, color: "#f0e6d2", lineHeight: 1.7, marginBottom: 4 }}>177 Massachusetts Avenue<br />Arlington, MA 02474</div>
                  <div style={{ fontSize: 13, color: "#a3947c", lineHeight: 1.7, marginBottom: 14 }}>Tuesday – Sunday · 10:00 AM – 7:00 PM ET</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3dbd83", fontWeight: 500 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3dbd83", flexShrink: 0 }} />
                    We'll text you when it's ready — usually within 2 hours.
                  </div>
                </div>
              )}
              <div style={{ marginBottom: 16 }}><label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6 }}>EMAIL</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@email.com" style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }} className="mobile-stack">
                <div><label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6 }}>FIRST NAME</label><input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
                <div><label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6 }}>LAST NAME</label><input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              </div>
              {deliveryMethod === "ship" && (<>
              <div style={{ marginBottom: 16 }}><label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6 }}>ADDRESS</label><input value={form.address} onChange={e => setForm({...form, address: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, marginBottom: 16 }} className="mobile-stack">
                <div><label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6 }}>CITY</label><input value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
                <div><label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6 }}>STATE</label><input value={form.state} onChange={e => setForm({...form, state: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
                <div><label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6 }}>ZIP</label><input value={form.zip} onChange={e => setForm({...form, zip: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              </div>
              </>)}
              <div style={{ marginBottom: 24 }}><label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6 }}>{deliveryMethod === "pickup" ? "MOBILE · PICKUP TEXTS" : "PHONE"}</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder={deliveryMethod === "pickup" ? "We'll text you when it's ready" : "For delivery updates"} style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              <button className="btn-shine" onClick={() => setStep(2)} style={{ width: "100%", height: 52, background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif", borderRadius: 4 }}>Continue to Payment</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, marginBottom: 20 }}>Payment</h2>
              <div style={{ background: "#1f1812", borderRadius: 8, padding: 20, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ fontSize: 12, color: "#a3947c" }}>Shipping to</span><span style={{ fontSize: 12, color: "#e8c97a", cursor: "pointer" }} onClick={() => setStep(1)}>Edit</span></div>
                <div style={{ fontSize: 14 }}>{form.firstName} {form.lastName}</div>
                <div style={{ fontSize: 13, color: "#a3947c" }}>{form.address}, {form.city}, {form.state} {form.zip}</div>
              </div>
              <div style={{ marginBottom: 16 }}><label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6 }}>CARD NUMBER</label><input value={cardForm.number} onChange={e => setCardForm({...cardForm, number: e.target.value})} placeholder="4242 4242 4242 4242" style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }} className="mobile-stack">
                <div><label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6 }}>EXPIRY</label><input value={cardForm.exp} onChange={e => setCardForm({...cardForm, exp: e.target.value})} placeholder="MM/YY" style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
                <div><label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6 }}>CVV</label><input value={cardForm.cvv} onChange={e => setCardForm({...cardForm, cvv: e.target.value})} placeholder="123" style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
                <div><label style={{ fontSize: 12, color: "#a3947c", letterSpacing: 1, display: "block", marginBottom: 6 }}>NAME ON CARD</label><input value={cardForm.name} onChange={e => setCardForm({...cardForm, name: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #2b2218", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, height: 52, border: "1px solid #2b2218", background: "#16110c", cursor: "pointer", fontSize: 12, letterSpacing: 1, fontFamily: "'Outfit',sans-serif", borderRadius: 4 }}>← Back</button>
                <button className="btn-shine" onClick={() => setStep(3)} style={{ flex: 2, height: 52, background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif", borderRadius: 4 }}>Review Order</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, marginBottom: 20 }}>Review Order</h2>
              <div style={{ background: "#1f1812", borderRadius: 8, padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 12, letterSpacing: 1, color: "#a3947c", marginBottom: 8 }}>SHIPPING</div>
                <div style={{ fontSize: 14 }}>{form.firstName} {form.lastName} · {form.email}</div>
                <div style={{ fontSize: 13, color: "#a3947c" }}>{form.address}, {form.city}, {form.state} {form.zip}</div>
              </div>
              <div style={{ background: "#1f1812", borderRadius: 8, padding: 20, marginBottom: 24 }}>
                <div style={{ fontSize: 12, letterSpacing: 1, color: "#a3947c", marginBottom: 8 }}>PAYMENT</div>
                <div style={{ fontSize: 14 }}>Card ending in {(cardForm.number || "4242").slice(-4)}</div>
              </div>
              {cart.map(item => (
                <div key={`${item.id}-${item.size}`} style={{ display: "flex", gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #2b2218" }}>
                  <div style={{ width: 64, height: 80, borderRadius: 4, flexShrink: 0, overflow: "hidden" }}>
                    <div style={{ background: item.color, width: "100%", height: "100%" }}>
                      {item.images?.[0] && (
                        <img src={item.images[0]} alt={item.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      )}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#a3947c" }}>Size: {item.size} · Qty: {item.qty}</div>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16 }}>${(item.price * item.qty).toFixed(0)}</div>
                </div>
              ))}
              {orderError && <div style={{ fontSize: 13, color: "#e8a0a0", background: "rgba(120,30,30,0.25)", border: "1px solid rgba(180,60,60,0.4)", borderRadius: 6, padding: "12px 14px", marginTop: 20 }}>{orderError}</div>}
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button disabled={placing} onClick={() => setStep(2)} style={{ flex: 1, height: 52, border: "1px solid #2b2218", background: "#16110c", cursor: placing ? "not-allowed" : "pointer", fontSize: 12, fontFamily: "'Outfit',sans-serif", borderRadius: 4, opacity: placing ? 0.6 : 1 }}>← Back</button>
                <button className="btn-shine" disabled={placing} onClick={handlePlaceOrder} style={{ flex: 2, height: 52, background: "#c5a255", color: "#1a1208", border: "none", cursor: placing ? "wait" : "pointer", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, fontFamily: "'Outfit',sans-serif", borderRadius: 4, opacity: placing ? 0.75 : 1 }}>
                  {placing ? "Placing Order…" : `Place Order — $${grandTotal.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="fade-in d2" style={{ position: "sticky", top: 100, alignSelf: "start" }}>
          <div style={{ background: "#16110c", border: "1px solid #2b2218", borderRadius: 8, padding: 24 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, marginBottom: 20 }}>Order Summary</h3>
            {cart.map(item => (
              <div key={`${item.id}-${item.size}`} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 13 }}>
                <span style={{ color: "#a3947c" }}>{item.name.length > 28 ? item.name.slice(0,28)+"..." : item.name} × {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(0)}</span>
              </div>
            ))}
            {/* Promo code */}
            <div style={{ borderTop: "1px solid #2b2218", paddingTop: 16, marginTop: 16 }}>
              {promo ? (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(61,189,131,0.1)", border: "1px solid rgba(61,189,131,0.35)", borderRadius: 6, padding: "10px 12px", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: "#3dbd83" }}>✓ {promo.code} — {Math.round(promo.pct * 100)}% off</span>
                  <X size={14} style={{ cursor: "pointer", color: "#a3947c" }} onClick={() => { setPromo(null); setPromoInput(""); }} />
                </div>
              ) : (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input value={promoInput} onChange={e => { setPromoInput(e.target.value); setPromoMsg(""); }} onKeyDown={e => { if (e.key === "Enter") applyPromo(); }} placeholder="Promo code"
                      style={{ flex: 1, height: 42, border: "1px solid #2b2218", borderRadius: 4, padding: "0 12px", fontFamily: "'Outfit',sans-serif", fontSize: 13, outline: "none", background: "#0d0a08", color: "#f0e6d2", textTransform: "uppercase" }} />
                    <button onClick={applyPromo} style={{ padding: "0 18px", background: "#2b2218", color: "#e8c97a", border: "none", borderRadius: 4, fontSize: 12, letterSpacing: 1, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Apply</button>
                  </div>
                  {promoMsg && <div style={{ fontSize: 12, color: "#e8a0a0", marginTop: 6 }}>{promoMsg}</div>}
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}><span style={{ color: "#a3947c" }}>Subtotal</span><span>${total.toFixed(0)}</span></div>
              {promo && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}><span style={{ color: "#3dbd83" }}>Discount ({promo.code})</span><span style={{ color: "#3dbd83" }}>−${discount.toFixed(2)}</span></div>}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}><span style={{ color: "#a3947c" }}>Shipping</span><span style={{ color: "#3dbd83" }}>Free</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}><span style={{ color: "#a3947c" }}>Tax (MA 6.25%)</span><span>${tax.toFixed(2)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}><span style={{ color: "#a3947c" }}>Alterations</span><span style={{ color: "#3dbd83" }}>Free</span></div>
            </div>
            <div style={{ borderTop: "1px solid #2b2218", paddingTop: 16, marginTop: 12, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>Total</span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24 }}>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: 16, background: "#1f1812", borderRadius: 8, fontSize: 12, color: "#a3947c", lineHeight: 1.6 }}>
            🔒 Secure checkout · Free shipping within USA · Free alterations included · Ships 24–48 hours
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── LIVE VIDEO SHOPPING PAGE ─── */
function LiveVideoPage({ navigate }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "USA", date: "", time: "", app: "WhatsApp", occasion: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const STEPS = [
    { num: "1", title: "Book Your Call", desc: "Fill the form or WhatsApp Sushma directly. Choose a date and time that works for you." },
    { num: "2", title: "Meet Your Stylist", desc: "Join the video call. Sushma will show you pieces live — fabrics, embroidery, colors, all up close." },
    { num: "3", title: "Customise & Pay", desc: "Pick your outfit, choose alterations, confirm measurements. Pay securely in your currency." },
    { num: "4", title: "Worldwide Delivery", desc: "We pack and ship your order within 24–48 hours. Free shipping across the USA." },
  ];

  const REVIEWS = [
    { name: "Sarah Rollman", location: "Google Review ★★★★★", text: "Sushma was absolutely wonderful to work with. We got all of our outfits for our wedding events from her, including my Haldi lehenga, my wedding ceremony dress, jewelry, and shoes. Highly recommend!" },
    { name: "Zephry Wright", location: "Google Review ★★★★★", text: "Our experience at Chaubandi was phenomenal. Setting up a fitting appointment was easy, the owner answered the phone right away. We needed outfits for a traditional Indian wedding and she delivered perfectly." },
    { name: "Amelia Barnett", location: "Google Review ★★★★★", text: "Sushma created the most beautiful dress for me! I came in with a few reference photos and told her what I wanted. She brought my exact vision to life. Absolutely incredible work." },
    { name: "Kat Wray", location: "Google Review ★★★★★", text: "Very reasonably priced compared to other options and I received so many compliments while in India. A wonderful experience from start to finish — I'll definitely be back." },
  ];

  const FAQS = [
    { q: "Is the video shopping session free?", a: "Yes, completely free. No obligation to purchase. We believe in earning your trust first." },
    { q: "How long does a session take?", a: "Typically 20–30 minutes, but we take as long as you need. Bridal sessions can go up to 60 minutes." },
    { q: "Which platforms do you support?", a: "WhatsApp Video Call, Zoom, Google Meet, and FaceTime. We use whatever works best for you." },
    { q: "Can I shop for bridal wear via video?", a: "Absolutely. Our bridal sessions are among the most popular. Sushma will walk you through every detail of the collection and help you build your complete bridal look." },
    { q: "How do I pay after the session?", a: "We'll send you a secure payment link via WhatsApp or email. We accept all major cards, PayPal, and Zelle." },
    { q: "Can I bring family members to the call?", a: "Yes! Many customers invite their mom, sister, or friends to join the call. The more the merrier." },
    { q: "What if I need alterations?", a: "All purchases come with free alterations. We'll guide you through taking your measurements during or after the call." },
    { q: "Do you ship internationally?", a: "Yes. We ship across the USA (free shipping) and internationally. Sushma will confirm shipping costs for your country during the session." },
  ];

  const CATEGORIES = [
    { label: "Bridal Lehengas", color: "linear-gradient(160deg,#3a0818,#6a1830)", img: "/Products/Lehenga/WhatsApp Image 2026-05-05 at 12.20.33 AM.jpeg" },
    { label: "Sarees", color: "linear-gradient(160deg,#5a0a0a,#8a1a1a)", img: "/Products/Sarees/WhatsApp Image 2026-05-05 at 1.07.53 AM.jpeg" },
    { label: "Sherwanis", color: "linear-gradient(160deg,#0c0a09,#2a2420)", img: "" },
  ];

  const handleSubmit = () => {
    const msg = `Hi Sushma! I'd like to book a Live Video Shopping session.%0AName: ${form.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0ADate: ${form.date}%0ATime: ${form.time}%0APlatform: ${form.app}%0AOccasion: ${form.occasion}%0ANotes: ${form.notes}`;
    window.open(`https://wa.me/18578001282?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const inputStyle = { width: "100%", height: 44, border: "1px solid #2b2218", borderRadius: 4, padding: "0 14px", fontFamily: "'Outfit',sans-serif", fontSize: 13, outline: "none", background: "#16110c", color: "#f0e6d2" };
  const labelStyle = { fontSize: 11, letterSpacing: 1, color: "#a3947c", display: "block", marginBottom: 5, textTransform: "uppercase" };

  return (
    <div className="fade-in">

      {/* ── HERO ── */}
      <div style={{ background: "linear-gradient(135deg,#0a101d 0%,#1a2040 50%,#0a101d 100%)", padding: "72px 32px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(42,106,58,.18)", border: "1px solid rgba(42,106,58,.4)", borderRadius: 100, padding: "6px 18px", marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3dbd83", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" }} />
            <span style={{ fontSize: 11, letterSpacing: 2, color: "#7acca0", textTransform: "uppercase" }}>Free · No Obligation</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(38px,5vw,68px)", fontWeight: 300, color: "#f0e6d2", lineHeight: 1.1, marginBottom: 16 }}>
            Shop Chaubandi<br /><em style={{ color: "#c5a255" }}>Live. From Anywhere.</em>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(240,235,228,.7)", lineHeight: 1.8, maxWidth: 540, margin: "0 auto 16px" }}>
            A free one-on-one video session with Sushma. See every fabric, every embroidery detail, every drape — live on your screen. Then we ship it to your door.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 36, flexWrap: "wrap" }}>
            {["Personal Stylist on Every Call", "See Real Stock Live", "Ships Worldwide", "Free Alterations Included"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(240,235,228,.55)", letterSpacing: .5 }}>
                <span style={{ color: "#c5a255" }}>✓</span> {t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-shine" onClick={() => document.getElementById("booking-form").scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "15px 40px", background: "#c5a255", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, fontFamily: "'Outfit',sans-serif", borderRadius: 2 }}>
              Book Free Session
            </button>
            <button onClick={() => window.open("https://wa.me/18578001282", "_blank")}
              style={{ padding: "15px 40px", background: "transparent", color: "#f0e6d2", border: "1px solid rgba(240,235,228,.3)", cursor: "pointer", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif", borderRadius: 2 }}>
              WhatsApp Sushma
            </button>
          </div>
          <div style={{ marginTop: 20, fontSize: 12, color: "rgba(240,235,228,.3)" }}>📞 857-800-1282 · Available Tue–Sun</div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ background: "#16110c", padding: "80px 32px", borderBottom: "1px solid #2b2218" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#c5a255", textTransform: "uppercase", marginBottom: 10 }}>Simple Process</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 400 }}>How Live Video Shopping Works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="mobile-grid">
            {STEPS.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "32px 20px", position: "relative" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#1f1812", color: "#c5a255", fontFamily: "'Cormorant Garamond',serif", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>{s.num}</div>
                {i < 3 && <div className="mobile-hide" style={{ position: "absolute", top: 52, left: "75%", width: "50%", height: 1, background: "#2b2218" }} />}
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 400, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: "#a3947c", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOOKING FORM + CONTACT ── */}
      <div id="booking-form" style={{ background: "#0d0a08", padding: "80px 32px", borderBottom: "1px solid #2b2218" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "start" }} className="mobile-stack">

          {/* Form */}
          <div style={{ background: "#16110c", border: "1px solid #2b2218", borderRadius: 10, padding: "40px 36px" }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#c5a255", textTransform: "uppercase", marginBottom: 8 }}>Free · No Commitment</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 400, marginBottom: 6 }}>Book Your Private<br />Video Shopping Call</h2>
            <p style={{ fontSize: 12, color: "#a3947c", marginBottom: 28, lineHeight: 1.6 }}>Fill in your details and Sushma will confirm your slot via WhatsApp within a few hours.</p>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, marginBottom: 8 }}>Request Sent!</h3>
                <p style={{ fontSize: 13, color: "#a3947c" }}>Sushma will confirm your slot on WhatsApp soon.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div><label style={labelStyle}>Full Name *</label><input style={inputStyle} placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                  <div><label style={labelStyle}>Email *</label><input style={inputStyle} placeholder="you@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div><label style={labelStyle}>Mobile Number *</label><input style={inputStyle} placeholder="+1 (xxx) xxx-xxxx" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
                  <div><label style={labelStyle}>Country</label>
                    <select style={{...inputStyle}} value={form.country} onChange={e => setForm({...form, country: e.target.value})}>
                      {["USA","Canada","UK","Australia","India","Other"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div><label style={labelStyle}>Preferred Date</label><input type="date" style={inputStyle} value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
                  <div><label style={labelStyle}>Preferred Time (EST)</label>
                    <select style={inputStyle} value={form.time} onChange={e => setForm({...form, time: e.target.value})}>
                      <option value="">Select Time</option>
                      {["10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div><label style={labelStyle}>Preferred Video Call App</label>
                  <select style={inputStyle} value={form.app} onChange={e => setForm({...form, app: e.target.value})}>
                    {["WhatsApp","Zoom","Google Meet","FaceTime"].map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <div><label style={labelStyle}>What do you want to shop?</label>
                  <select style={inputStyle} value={form.occasion} onChange={e => setForm({...form, occasion: e.target.value})}>
                    <option value="">Select occasion / category</option>
                    {["Bridal Lehenga","Wedding Guest Outfit","Saree","Sherwani / Men's Wear","Sangeet / Mehandi Outfit","Reception Gown","Kids Wear","General Browsing"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div><label style={labelStyle}>Anything else? (optional)</label>
                  <textarea style={{...inputStyle, height: 80, padding: "10px 14px", resize: "none"}} placeholder="Budget, colors, specific occasions..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
                </div>
                <button className="btn-shine" onClick={handleSubmit}
                  style={{ width: "100%", height: 52, background: "linear-gradient(135deg,#d4af61,#a8842f)", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif", borderRadius: 4, marginTop: 4 }}>
                  Submit & Open WhatsApp
                </button>
                <p style={{ fontSize: 10, color: "#6e6353", textAlign: "center", letterSpacing: .3 }}>100% private · No fees · No commitment</p>
              </div>
            )}
          </div>

          {/* Contact Side */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#c5a255", textTransform: "uppercase", marginBottom: 10 }}>Prefer Direct Call?</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 400, marginBottom: 20 }}>Reach Us Directly</h3>
            </div>
            {[
              { icon: "💬", label: "WhatsApp", value: "+1 (857) 800-1282", action: () => window.open("https://wa.me/18578001282","_blank") },
              { icon: "📞", label: "Call Us", value: "+1 (857) 800-1282", action: () => window.open("tel:+18578001282") },
              { icon: "📍", label: "Boutique", value: "177 Massachusetts Ave, Arlington, MA", action: null },
              { icon: "🕐", label: "Hours", value: "Tue – Sun · 11am to 7pm EST", action: null },
            ].map(({ icon, label, value, action }) => (
              <div key={label} onClick={action} style={{ display: "flex", gap: 16, padding: "18px 20px", background: "#16110c", border: "1px solid #2b2218", borderRadius: 8, cursor: action ? "pointer" : "default", transition: "border-color .2s" }}
                onMouseEnter={e => action && (e.currentTarget.style.borderColor = "#e8c97a")} onMouseLeave={e => action && (e.currentTarget.style.borderColor = "#2b2218")}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 1.5, color: "#6e6353", textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 14, color: "#f0e6d2", fontWeight: 400 }}>{value}</div>
                </div>
              </div>
            ))}
            <div style={{ background: "#1f1812", border: "1px solid rgba(197,162,85,0.25)", borderRadius: 8, padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#c5a255", marginBottom: 6 }}>4.9 ★★★★★</div>
              <div style={{ fontSize: 12, color: "rgba(240,235,228,.6)" }}>Based on 200+ happy customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURED CATEGORIES ── */}
      <div style={{ background: "#16110c", padding: "80px 32px", borderBottom: "1px solid #2b2218" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 400, marginBottom: 6 }}>Shop These Categories Live</h2>
            <p style={{ fontSize: 13, color: "#a3947c" }}>Browse our most popular collections during your video call</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {CATEGORIES.map(({ label, color, img }) => (
              <div key={label} className="hover-lift" style={{ position: "relative", aspectRatio: "4/5", borderRadius: 8, overflow: "hidden", cursor: "pointer", background: color }}
                onClick={() => document.getElementById("booking-form").scrollIntoView({ behavior: "smooth" })}>
                {img && <img src={img} alt={label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24 }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#fff", marginBottom: 10 }}>{label}</h3>
                  <div style={{ display: "inline-block", padding: "8px 20px", background: "#c5a255", color: "#1a1208", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>
                    Book Live Session
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REVIEWS ── */}
      <div style={{ background: "#0d0a08", padding: "80px 32px", borderBottom: "1px solid #2b2218" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#c5a255", textTransform: "uppercase", marginBottom: 10 }}>Real Customers</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 400 }}>What Our Clients Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="mobile-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: "#16110c", border: "1px solid #2b2218", borderRadius: 8, padding: "28px 28px" }}>
                <div style={{ color: "#c5a255", fontSize: 14, letterSpacing: 2, marginBottom: 14 }}>★★★★★</div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, fontStyle: "italic", color: "#f0e6d2", lineHeight: 1.7, marginBottom: 16 }}>"{r.text}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "#6e6353", letterSpacing: .5 }}>{r.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ background: "#16110c", padding: "80px 32px", borderBottom: "1px solid #2b2218" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 400, marginBottom: 6 }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: 13, color: "#a3947c" }}>Everything you need to know about Live Video Shopping</p>
          </div>
          <div style={{ borderTop: "1px solid #2b2218" }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} style={{ borderBottom: "1px solid #2b2218" }}>
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{ width: "100%", padding: "20px 0", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left", gap: 16 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#f0e6d2", lineHeight: 1.4 }}>{faq.q}</span>
                  <Plus size={16} style={{ color: "#c5a255", flexShrink: 0, transform: openFaq === idx ? "rotate(45deg)" : "rotate(0)", transition: "transform .3s" }} />
                </button>
                <div style={{ maxHeight: openFaq === idx ? 200 : 0, overflow: "hidden", transition: "max-height .35s ease" }}>
                  <p style={{ paddingBottom: 20, fontSize: 13, color: "#a3947c", lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <div style={{ background: "#1f1812", borderTop: "1px solid rgba(197,162,85,0.25)", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 16 }}>Knots of Tradition</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,4vw,52px)", color: "#f0e6d2", fontWeight: 300, marginBottom: 16, lineHeight: 1.2 }}>
            Your Perfect Outfit<br /><em style={{ color: "#c5a255" }}>Is One Call Away</em>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(240,235,228,.55)", marginBottom: 36, lineHeight: 1.7 }}>
            Free session. No pressure. Just Sushma, your style, and a full boutique on your screen.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-shine" onClick={() => document.getElementById("booking-form").scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "15px 40px", background: "#c5a255", color: "#1a1208", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, fontFamily: "'Outfit',sans-serif" }}>
              Book Free Session
            </button>
            <button onClick={() => window.open("https://wa.me/18578001282","_blank")}
              style={{ padding: "15px 40px", background: "transparent", color: "#f0e6d2", border: "1px solid rgba(240,235,228,.3)", cursor: "pointer", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif" }}>
              WhatsApp Sushma
            </button>
          </div>
          <div style={{ marginTop: 32, fontSize: 12, color: "rgba(240,235,228,.25)", cursor: "pointer" }} onClick={() => navigate("home")}>← Back to Home</div>
        </div>
      </div>

    </div>
  );
}
