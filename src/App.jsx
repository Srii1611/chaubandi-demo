import { useState, useEffect } from "react";
import { ShoppingBag, Heart, Search, X, Plus, Minus, Trash2, ChevronRight, ChevronLeft, User, Filter, Check } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Multicolor Patchwork Embroidered Lehenga", price: 489, cat: "Lehengas", badge: "New Arrival", color: "linear-gradient(140deg,#2a1f2d,#4a2040 25%,#c5a255 45%,#d4466a 60%,#1a3a2a 80%)", images: ["/Products/Lehenga/WhatsApp Image 2026-05-05 at 12.20.33 AM.jpeg", "/Products/Lehenga/WhatsApp Image 2026-05-05 at 12.20.34 AM.jpeg"], rating: 4.9, reviews: 47, desc: "Rich multicolor patchwork with geometric and floral motifs, peacock borders, and mirror work. Includes embroidered blouse and black velvet dupatta.", sizes: ["XS","S","M","L","XL","Custom"] },
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

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const navigate = (p, prod) => {
    setPage(p);
    if (prod) setSelectedProduct(prod);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product, size) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id && i.size === size);
      if (exists) return prev.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, size, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, size, delta) => {
    setCart(prev => prev.map(i => i.id === id && i.size === size ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const removeItem = (id, size) => setCart(prev => prev.filter(i => !(i.id === id && i.size === size)));

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", background: "#faf8f5", color: "#1a1412", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{overflow-x:hidden}
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:#f0ebe4}
        ::-webkit-scrollbar-thumb{background:#c5a255;border-radius:3px}
        @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        .fade-in{animation:fadeIn .6s ease forwards;opacity:0}
        .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}.d4{animation-delay:.4s}.d5{animation-delay:.5s}
        .hover-lift{transition:transform .3s,box-shadow .3s}
        .hover-lift:hover{transform:translateY(-6px);box-shadow:0 12px 40px rgba(26,20,18,.1)}
        .img-zoom{overflow:hidden}
        .img-zoom>div, .img-zoom>img{transition:transform .6s}.img-zoom:hover>div, .img-zoom:hover>img{transform:scale(1.06)}
        .btn-shine{position:relative;overflow:hidden}
        .btn-shine::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);transition:left .6s}
        .btn-shine:hover::after{left:100%}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .cat-strip::-webkit-scrollbar{display:none}
        .cat-item-thumb{transition:transform .3s,box-shadow .3s}
        .cat-item-thumb:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(26,20,18,.18)!important}
        .cat-item-label{transition:color .3s}
        .cat-item:hover .cat-item-label{color:#1a1412!important}
        
        @media (max-width: 768px) {
          .mobile-stack { flex-direction: column !important; }
          .mobile-grid { grid-template-columns: 1fr !important; gap: 24px !important; padding: 32px 16px !important; }
          .mobile-hide { display: none !important; }
          .mobile-hero-text { font-size: 40px !important; }
        }
      `}</style>

      {/* Announcement Marquee */}
      <div style={{ background: "#1a1412", overflow: "hidden", padding: "11px 0", whiteSpace: "nowrap", flexShrink: 0 }}>
        <div style={{ display: "inline-flex", animation: "marquee 35s linear infinite" }}>
          {[0, 1].map(i => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", fontFamily: "'Outfit',sans-serif", color: "#e8d9a8", fontSize: 13, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              <span style={{ padding: "0 32px" }}>FREE SHIPPING ON ORDERS ABOVE $249</span>
              <span>•</span>
              <span style={{ padding: "0 32px" }}>SALE UPTO 50% OFF</span>
              <span>•</span>
              <span style={{ padding: "0 32px" }}>SHIPPING WORLDWIDE</span>
              <span>•</span>
              <span style={{ padding: "0 32px" }}>NEW ARRIVALS WEEKLY</span>
              <span style={{ padding: "0 32px" }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e2ddd6", flexShrink: 0, position: "sticky", top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 8px 0 0", height: 180, display: "flex", alignItems: "center", gap: 28 }}>

          {/* Logo — LEFT, flush */}
          <div style={{ cursor: "pointer", flexShrink: 0, height: "100%", display: "flex", alignItems: "center" }} onClick={() => navigate("home")}>
            <img src="/logo.png" alt="Chaubandi · Knots of Tradition" style={{ height: 180, width: "auto", display: "block" }} />
          </div>

          {/* Nav — beside logo */}
          <nav className="mobile-hide" style={{ display: "flex", alignItems: "center", gap: 26, flexShrink: 0 }}>
            {["WOMEN", "MEN", "KIDS", "ACCESSORIES", "ABOUT US"].map(item => (
              <span key={item} onClick={() => navigate("shop")}
                style={{ fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", color: "#7a6e64", cursor: "pointer", fontWeight: 400, transition: "color .3s", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.target.style.color = "#1a1412"} onMouseLeave={e => e.target.style.color = "#7a6e64"}>
                {item}
              </span>
            ))}
            <span onClick={() => navigate("live")} style={{ fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", color: "#2a6a3a", cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2a6a3a", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" }} />
              LIVE VIDEO SHOPPING
            </span>
            <span onClick={() => navigate("shop")} style={{ fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", color: "#8b2c3a", cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap" }}>
              SALE
            </span>
          </nav>

          {/* Search — wide, center */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", position: "relative" }} className="mobile-hide">
            <Search size={16} style={{ position: "absolute", left: 16, color: "#b0a89e", pointerEvents: "none" }} />
            <input placeholder="What are you looking for?" style={{ width: "100%", height: 48, paddingLeft: 44, paddingRight: 16, border: "1.5px solid #e2ddd6", borderRadius: 6, fontSize: 13, color: "#1a1412", background: "#faf8f5", outline: "none", fontFamily: "'Outfit',sans-serif", letterSpacing: .3 }}
              onFocus={e => e.target.style.borderColor = "#8b2c3a"} onBlur={e => e.target.style.borderColor = "#e2ddd6"} />
          </div>

          {/* Icons — RIGHT */}
          <div style={{ display: "flex", alignItems: "center", gap: 22, flexShrink: 0, paddingRight: 16 }}>
            <div style={{ cursor: "pointer", color: "#7a6e64" }} onClick={() => window.open("https://wa.me/18578001282", "_blank")} className="mobile-hide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div style={{ cursor: "pointer", color: "#7a6e64" }} onClick={() => window.open("https://instagram.com/chaubandiboston", "_blank")} className="mobile-hide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </div>
            <User size={24} style={{ cursor: "pointer", color: "#7a6e64" }} />
            <Heart size={24} style={{ cursor: "pointer", color: "#7a6e64" }} />
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setCartOpen(true)}>
              <ShoppingBag size={24} color="#7a6e64" />
              {cartCount > 0 && <div style={{ position: "absolute", top: -6, right: -8, background: "#8b2c3a", color: "#fff", width: 18, height: 18, borderRadius: "50%", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>{cartCount}</div>}
            </div>
          </div>

        </div>
      </header>

      {/* Cart Drawer */}
      {cartOpen && <>
        <div onClick={() => setCartOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 2000, cursor: "pointer" }} />
        <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 420, maxWidth: "90vw", background: "#fff", zIndex: 2001, animation: "slideIn .3s ease", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2ddd6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22 }}>Your Cart ({cartCount})</span>
            <X size={20} style={{ cursor: "pointer" }} onClick={() => setCartOpen(false)} />
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#7a6e64" }}>
                <ShoppingBag size={48} strokeWidth={1} style={{ margin: "0 auto 16px", opacity: .4 }} />
                <p style={{ fontSize: 15 }}>Your cart is empty</p>
                <button onClick={() => { setCartOpen(false); navigate("shop"); }} style={{ marginTop: 20, padding: "12px 32px", background: "#1a1412", color: "#fff", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Shop Now</button>
              </div>
            ) : cart.map(item => (
              <div key={`${item.id}-${item.size}`} style={{ display: "flex", gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #f0ebe4" }}>
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
                  <div style={{ fontSize: 12, color: "#7a6e64", marginBottom: 8 }}>Size: {item.size}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #e2ddd6", borderRadius: 4 }}>
                      <button onClick={() => updateQty(item.id, item.size, -1)} style={{ border: "none", background: "none", cursor: "pointer", padding: "6px 10px" }}><Minus size={14} /></button>
                      <span style={{ fontSize: 13, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.size, 1)} style={{ border: "none", background: "none", cursor: "pointer", padding: "6px 10px" }}><Plus size={14} /></button>
                    </div>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17 }}>${(item.price * item.qty).toFixed(0)}</span>
                  </div>
                </div>
                <Trash2 size={16} style={{ cursor: "pointer", color: "#7a6e64", flexShrink: 0, marginTop: 4 }} onClick={() => removeItem(item.id, item.size)} />
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: 24, borderTop: "1px solid #e2ddd6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 13, color: "#7a6e64" }}>Subtotal</span><span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20 }}>${cartTotal.toFixed(0)}</span></div>
              <div style={{ fontSize: 12, color: "#7a6e64", marginBottom: 16 }}>Free shipping · Free alterations included</div>
              <button className="btn-shine" onClick={() => { setCartOpen(false); setCheckoutStep(1); setOrderPlaced(false); navigate("checkout"); }} style={{ width: "100%", height: 52, background: "#1a1412", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif" }}>
                Checkout — ${cartTotal.toFixed(0)}
              </button>
              <button onClick={() => { setCartOpen(false); navigate("shop"); }} style={{ width: "100%", padding: "12px", background: "none", border: "1px solid #e2ddd6", cursor: "pointer", marginTop: 8, fontSize: 12, color: "#7a6e64" }}>Continue Shopping</button>
            </div>
          )}
        </div>
      </>}

      {/* Category Strip */}
      {(page === "home" || page === "shop") && <CategoryStrip navigate={navigate} setShopFilter={setShopFilter} activeFilter={shopFilter} />}

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {page === "home" && <HomePage navigate={navigate} products={PRODUCTS} setShopFilter={setShopFilter} addToCart={addToCart} />}
        {page === "shop" && <ShopPage navigate={navigate} products={PRODUCTS} filter={shopFilter} setFilter={setShopFilter} addToCart={addToCart} />}
        {page === "product" && selectedProduct && <ProductPage product={selectedProduct} navigate={navigate} addToCart={addToCart} products={PRODUCTS} />}
        {page === "checkout" && <CheckoutPage cart={cart} total={cartTotal} step={checkoutStep} setStep={setCheckoutStep} navigate={navigate} setCart={setCart} orderPlaced={orderPlaced} setOrderPlaced={setOrderPlaced} />}
        {page === "live" && <LiveVideoPage navigate={navigate} />}
      </main>

      {/* Global Footer */}
      <footer style={{ background: "#0a101d", color: "#f0ebe4", paddingTop: 80, paddingBottom: 40, flexShrink: 0 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 64, marginBottom: 32 }}>
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>Help</h4>
            {["Contact Us", "Shipping Info", "Returns & Exchanges", "FAQ", "Sizing Info"].map(l => (
              <div key={l} style={{ fontSize: 13, color: "rgba(240,235,228,0.7)", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(240,235,228,0.7)"}>{l}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>About</h4>
            {["Our Story", "Boutique Location", "Book Appointment", "Reviews"].map(l => (
              <div key={l} style={{ fontSize: 13, color: "rgba(240,235,228,0.7)", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(240,235,228,0.7)"}>{l}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>Shop</h4>
            {["New Arrivals", "Bridal Lehengas", "Sarees", "Sherwanis", "Jewelry"].map(l => (
              <div key={l} onClick={() => navigate("shop")} style={{ fontSize: 13, color: "rgba(240,235,228,0.7)", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(240,235,228,0.7)"}>{l}</div>
            ))}
          </div>
          <div style={{ minWidth: 280 }}>
            <h4 style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Stay in the Know</h4>
            <p style={{ fontSize: 13, color: "rgba(240,235,228,0.7)", marginBottom: 20, lineHeight: 1.5 }}>Be the first one to receive new releases, special offers, and more.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input placeholder="E-mail" style={{ height: 44, background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "0 16px", fontSize: 13, outline: "none", fontFamily: "'Outfit',sans-serif" }} />
              <button style={{ height: 44, background: "#f0ebe4", color: "#0a101d", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Subscribe</button>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
              {["Fb", "Ig", "Pt", "Tt"].map(s => <span key={s} style={{ fontSize: 14, color: "rgba(240,235,228,0.7)", cursor: "pointer" }}>{s}</span>)}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 11, color: "rgba(240,235,228,0.5)", letterSpacing: 1 }}>© 2026 · CHAUBANDI · PRIVACY POLICY · TERMS & CONDITIONS</div>
          <div style={{ display: "flex", gap: 8, opacity: 0.7 }}>
            {["Amex", "Apple", "Visa", "Master", "PayPal"].map(p => (
              <div key={p} style={{ padding: "4px 10px", background: "#fff", color: "#1a1412", fontSize: 9, fontWeight: 700, borderRadius: 2 }}>{p}</div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── CATEGORY STRIP ─── */
function CategoryStrip({ navigate, setShopFilter, activeFilter }) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e2ddd6", padding: "18px 0 16px" }}>
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
                boxShadow: active ? "0 0 0 2.5px #8b2c3a, 0 4px 16px rgba(26,20,18,.14)" : "0 2px 10px rgba(26,20,18,.11)",
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
              
              <span className="cat-item-label" style={{ fontSize: 10.5, letterSpacing: .4, color: active ? "#1a1412" : "#7a6e64", textAlign: "center", whiteSpace: "nowrap", fontWeight: active ? 600 : 400 }}>
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
            <h1 className="mobile-hero-text" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(40px,5.5vw,70px)", fontWeight: 300, color: "#f0ebe4", lineHeight: 1.05, marginBottom: 10, textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>{slide.headline}</h1>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(20px,2.8vw,36px)", fontWeight: 400, color: slide.accent, lineHeight: 1.2, marginBottom: 22, fontStyle: "italic", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{slide.sub}</h2>
            <p style={{ fontSize: 14, color: "rgba(240,235,228,.85)", maxWidth: 420, margin: "0 auto 36px", lineHeight: 1.75, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{slide.body}</p>
            <button className="btn-shine" onClick={() => handleCta(slide)} style={{ padding: "15px 48px", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, fontFamily: "'Outfit',sans-serif", background: slide.accent, color: "#1a1412" }}>{slide.cta}</button>
          </div>
        </div>
      ))}
      <button onClick={prev} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.25)", background: "rgba(26,20,18,.4)", color: "#f0ebe4", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered ? 1 : 0, transition: "opacity .3s", pointerEvents: hovered ? "auto" : "none" }}><ChevronLeft size={20} /></button>
      <button onClick={next} style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.25)", background: "rgba(26,20,18,.4)", color: "#f0ebe4", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered ? 1 : 0, transition: "opacity .3s", pointerEvents: hovered ? "auto" : "none" }}><ChevronRight size={20} /></button>
      <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", gap: 8, alignItems: "center" }}>
        {HERO_SLIDES.map((_, i) => <button key={i} onClick={() => setCurrent(i)} style={{ padding: 0, border: "none", cursor: "pointer", background: i === current ? "#f0ebe4" : "rgba(240,235,228,.38)", width: i === current ? 28 : 8, height: 8, borderRadius: 100, transition: "all .4s ease" }} />)}
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
        <p style={{ fontSize: 13, color: "#7a6e64" }}>Curated matching sets for the bride and groom</p>
      </div>
      <div style={{ position: "relative", height: 700, borderRadius: 12, overflow: "hidden", background: "#1a1412" }}>
        {PAIRINGS.map((pair, idx) => (
          <div key={pair.id} style={{ position: "absolute", inset: 0, opacity: activeIdx === idx ? 1 : 0, transition: "opacity 1.2s ease-in-out", zIndex: activeIdx === idx ? 1 : 0 }}>
            
            {/* Added a fallback background color just in case img5 isn't ready yet */}
            <div style={{ width: "100%", height: "100%", background: "#2a2420" }}>
              <img src={pair.image} alt={pair.theme} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
            </div>
            
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.88) 100%)" }} />
            <div style={{ position: "absolute", top: 32, left: "50%", transform: "translateX(-50%)", background: "#fff", color: "#1a1412", padding: "10px 28px", borderRadius: 30, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, zIndex: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.25)", whiteSpace: "nowrap" }}>{pair.theme}</div>
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
        {PAIRINGS.map((_, idx) => <button key={idx} onClick={() => setActiveIdx(idx)} style={{ width: activeIdx === idx ? 24 : 8, height: 8, borderRadius: 10, border: "none", background: activeIdx === idx ? "#8b2c3a" : "#e2ddd6", cursor: "pointer", transition: "all 0.3s" }} />)}
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
        <p style={{ fontSize: 13, color: "#7a6e64" }}>Real customers styling our pieces. Tag @ChaubandiBoston to be featured.</p>        
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
function TestimonialAndBooking() {
  const REVIEWS = [
    { text: "Absolutely stunning. The embroidery detail is incredible.", author: "Priya M." },
    { text: "Sushma understood exactly what I wanted for my wedding.", author: "Meera J." },
    { text: "Best lehenga I own. Never seen anything like it in Boston.", author: "Sneha K." },
    { text: "Lightweight and comfortable all evening. Free alterations was a huge bonus!", author: "Anisha R." },
    { text: "The patchwork design is unique. Warm boutique experience.", author: "Kavya T." }
  ];

  return (
    <section style={{ margin: "64px 0", background: "#fff", borderTop: "1px solid #e2ddd6", borderBottom: "1px solid #e2ddd6", overflow: "hidden" }}>
      <div style={{ padding: "32px 0", background: "#faf8f5", borderBottom: "1px solid #e2ddd6", display: "flex", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-flex", animation: "marquee 40s linear infinite" }}>
          {[...REVIEWS, ...REVIEWS].map((rev, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "0 48px" }}>
              <div style={{ color: "#c5a255", letterSpacing: 2, fontSize: 14 }}>★★★★★</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontStyle: "italic", color: "#1a1412" }}>"{rev.text}"</div>
              <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#8b2c3a", fontWeight: 500 }}>— {rev.author}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mobile-grid" style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 32px", display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 40, alignItems: "center", background: "linear-gradient(135deg, rgba(232,180,188,0.1) 0%, rgba(139,44,58,0.05) 100%)" }}>
        <div style={{ textAlign: "center", padding: "0 20px" }}>
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8b2c3a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
              <path d="M15 8l-6 4v-8l6 4z"></path>
            </svg>
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: "#1a1412", marginBottom: 8 }}>Shop Via Video Call</h3>
          <p style={{ fontSize: 13, color: "#7a6e64", marginBottom: 24 }}>Get a free virtual styling session from anywhere.</p>
          <button className="btn-shine" onClick={() => window.open("https://wa.me/18578001282?text=Hi%20Sushma!%20I%20would%20like%20to%20book%20a%20virtual%20consultation.", "_blank")} style={{ padding: "14px 32px", background: "#fff", border: "1px solid #1a1412", color: "#1a1412", cursor: "pointer", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Book a Virtual Visit</button>
        </div>
        <div className="mobile-hide" style={{ width: 1, height: "100%", background: "rgba(139,44,58,0.2)" }} />
        <div style={{ textAlign: "center", padding: "0 20px" }}>
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8b2c3a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 4c0-1.1.9-2 2-2s2 .9 2 2"></path>
              <path d="M5 10c0-1.6 1.3-3 3-3h8c1.6 0 3 1.3 3 3"></path>
              <path d="M5 10l-2 12h18l-2-12"></path>
              <line x1="12" y1="10" x2="12" y2="22"></line>
            </svg>
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: "#1a1412", marginBottom: 8 }}>The Bridal Stylist</h3>
          <p style={{ fontSize: 13, color: "#7a6e64", marginBottom: 24 }}>Book your personal bridal consultation in Arlington.</p>
          <button className="btn-shine" onClick={() => window.open("https://wa.me/18578001282?text=Hi%20Sushma!%20I%20would%20like%20to%20book%20an%20in-store%20consultation.", "_blank")} style={{ padding: "14px 32px", background: "#fff", border: "1px solid #1a1412", color: "#1a1412", cursor: "pointer", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Book In-Store Visit</button>
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
      <div style={{ borderTop: "1px solid #e2ddd6" }}>
        {FAQS.map((faq, idx) => (
          <div key={idx} style={{ borderBottom: "1px solid #e2ddd6" }}>
            <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} style={{ width: "100%", padding: "24px 0", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 500, color: "#1a1412" }}>{faq.q}</span>
              <span style={{ fontSize: 20, color: "#c5a255", transform: openIdx === idx ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s" }}><Plus size={18} /></span>
            </button>
            <div style={{ maxHeight: openIdx === idx ? 200 : 0, overflow: "hidden", transition: "max-height 0.3s ease-in-out" }}>
              <p style={{ paddingBottom: 24, fontSize: 14, color: "#7a6e64", lineHeight: 1.6 }}>{faq.a}</p>
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
    <section style={{ background: "#fff", padding: "80px 32px 64px", borderTop: "1px solid #e2ddd6" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", color: "#7a6e64" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: "#1a1412", marginBottom: 16 }}>Shop Premium Indian & Nepali Clothes Online and in Boston, MA</h2>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, lineHeight: 1.8, marginBottom: 24 }}>Welcome to Chaubandi, your premier destination for handcrafted ethnic and fusion wear. Whether you are searching for a breathtaking bridal lehenga, an elegant silk saree, or a perfectly tailored sherwani, we bring the rich heritage of South Asian craftsmanship directly to you. Based in Arlington, MA (proudly serving the greater Boston and MetroWest areas), our boutique specializes in luxurious, high-quality garments that blend traditional artistry with modern silhouettes.</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#1a1412", marginBottom: 12 }}>Custom Bridal & Occasion Wear</h3>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, lineHeight: 1.8, marginBottom: 24 }}>Your special day deserves a spectacular outfit. Our curated bridal collection features heavy zardozi work, intricate thread embroidery, and premium fabrics. From vibrant Haldi and Mehandi outfits to sophisticated Reception gowns and Groom's Sherwanis, we offer full styling services for the entire wedding party. Every piece is handcrafted with love and impeccable attention to detail.</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#1a1412", marginBottom: 12 }}>Why Choose Chaubandi for Ethnic Wear?</h3>
        <ul style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, lineHeight: 1.8, marginBottom: 24, paddingLeft: 20 }}>
          <li style={{ marginBottom: 8 }}><strong style={{ color: "#1a1412" }}>Free Alterations:</strong> We believe in the perfect fit. Enjoy complimentary expert alterations with every purchase to ensure your outfit looks flawless.</li>
          <li style={{ marginBottom: 8 }}><strong style={{ color: "#1a1412" }}>Free USA Shipping:</strong> Fast, reliable, and free shipping across the United States on all qualifying orders.</li>
          <li style={{ marginBottom: 8 }}><strong style={{ color: "#1a1412" }}>Expert Bridal Styling:</strong> Book an in-store or virtual appointment with our founder, Sushma, for highly personalized styling advice and fitting consultations.</li>
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
      <div style={{ background: "#fff", borderBottom: "1px solid #e2ddd6", padding: "18px 32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
          {[["✂️", "Free Alterations"], ["📦", "Free USA Shipping"], ["⭐", "4.9 Star Rating"], ["📍", "Visit Our Boutique"]].map(([icon, text]) => (
            <span key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#7a6e64", letterSpacing: .5 }}>{icon} {text}</span>
          ))}
        </div>
      </div>
      <section className="fade-in d1" style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 400, marginBottom: 6 }}>Shop by Occasion</h2>
          <p style={{ fontSize: 13, color: "#7a6e64" }}>Find your perfect outfit for every celebration</p>
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
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#f0ebe4", marginBottom: 4 }}>{occ}</div>
                <div style={{ fontSize: 11, color: "rgba(240,235,228,.6)", letterSpacing: 1 }}>SHOP NOW →</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CouplesShowcase navigate={navigate} />
      <UgcReels />
      <TestimonialAndBooking />
      <FaqSection />
      <SeoTextSection />
    </div>
  );
}

/* ─── PRODUCT CARD ─── */
function ProductCard({ product, navigate }) {
  return (
    <div className="hover-lift" onClick={() => navigate("product", product)} style={{ cursor: "pointer" }}>
      <div className="img-zoom" style={{ aspectRatio: "3/4", borderRadius: 6, marginBottom: 12, position: "relative", overflow: "hidden" }}>
        <div style={{ background: product.color, width: "100%", height: "100%" }}>
          {product.images?.[0] && (
            <img src={product.images[0]} alt={product.name} loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          )}
        </div>
        {product.badge && <div style={{ position: "absolute", top: 10, left: 10, padding: "5px 12px", background: product.badge === "Bestseller" ? "#c5a255" : "#8b2c3a", color: product.badge === "Bestseller" ? "#1a1412" : "#fff", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500, borderRadius: 3 }}>{product.badge}</div>}
        <div style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, background: "rgba(255,255,255,.85)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity .3s" }} className="wish-btn">
          <Heart size={14} />
        </div>
      </div>
      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 400, marginBottom: 4, lineHeight: 1.3 }}>{product.name}</h3>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 14, color: "#7a6e64" }}>${product.price}</span>
        <span style={{ fontSize: 11, color: "#c5a255", letterSpacing: 1 }}>{"★".repeat(Math.floor(product.rating))} {product.rating}</span>
      </div>
    </div>
  );
}

/* ─── SHOP PAGE ─── */
function ShopPage({ navigate, products, filter, setFilter, addToCart }) {
  const filtered = filter === "All" ? products : products.filter(p => p.cat === filter);
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 32px 80px" }}>
      <div className="fade-in" style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 12, color: "#7a6e64", marginBottom: 8 }}>
          <span style={{ cursor: "pointer" }} onClick={() => navigate("home")}>Home</span> / <span>Shop</span> {filter !== "All" && <>/ <span>{filter}</span></>}
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 400, marginBottom: 8 }}>{filter === "All" ? "All Collections" : filter}</h1>
        <p style={{ fontSize: 14, color: "#7a6e64" }}>{filtered.length} pieces · Handcrafted with love</p>
      </div>
      <div className="fade-in d1" style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap", alignItems: "center" }}>
        <Filter size={16} style={{ color: "#7a6e64", marginRight: 8 }} />
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            style={{ padding: "8px 18px", borderRadius: 100, border: `1px solid ${c === filter ? "#1a1412" : "#e2ddd6"}`, background: c === filter ? "#1a1412" : "transparent", color: c === filter ? "#fff" : "#7a6e64", fontSize: 12, cursor: "pointer", letterSpacing: .5, fontFamily: "'Outfit',sans-serif", transition: "all .3s" }}>
            {c}
          </button>
        ))}
      </div>
      <div className="fade-in d2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
        {filtered.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
      </div>
      {filtered.length === 0 && <div style={{ textAlign: "center", padding: "80px 0", color: "#7a6e64" }}>No products in this category yet. Check back soon!</div>}
    </div>
  );
}

/* ─── PRODUCT PAGE ─── */
function ProductPage({ product, navigate, addToCart, products }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[2] || product.sizes?.[0]);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState("details");
  const [activeImg, setActiveImg] = useState(0);
  const related = products.filter(p => p.id !== product.id && p.cat === product.cat).slice(0, 4);
  if (related.length < 4) {
    const more = products.filter(p => p.id !== product.id && !related.find(r => r.id === p.id)).slice(0, 4 - related.length);
    related.push(...more);
  }

  const handleAdd = () => {
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 32px 80px" }}>
        <div className="fade-in" style={{ fontSize: 12, color: "#7a6e64", marginBottom: 24 }}>
          <span style={{ cursor: "pointer" }} onClick={() => navigate("home")}>Home</span> / <span style={{ cursor: "pointer" }} onClick={() => navigate("shop")}>Shop</span> / <span style={{ cursor: "pointer" }} onClick={() => { navigate("shop"); }}>{product.cat}</span> / <span style={{ color: "#1a1412" }}>{product.name}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="mobile-stack">
          <div className="fade-in d1">
            <div style={{ aspectRatio: "3/4", borderRadius: 8, overflow: "hidden", marginBottom: 12, position: "relative", cursor: "zoom-in" }}>
              <div style={{ background: product.color, width: "100%", height: "100%" }}>
                {product.images?.[activeImg] && (
                  <img src={product.images[activeImg]} alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                )}
              </div>
              {product.badge && <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 8 }}>
                <span style={{ padding: "7px 16px", background: "#8b2c3a", color: "#fff", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase" }}>{product.badge}</span>
                <span style={{ padding: "7px 16px", background: "#c5a255", color: "#1a1412", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase" }}>Handmade</span>
              </div>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {product.images.map((src, i) => (
                <div key={i} onClick={() => setActiveImg(i)} style={{ aspectRatio: 1, borderRadius: 6, background: product.color, opacity: i === activeImg ? 1 : .7, border: i === activeImg ? "2px solid #8b2c3a" : "2px solid transparent", cursor: "pointer", overflow: "hidden" }}>
                  <img src={src} alt={`${product.name} view ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          </div>
          <div className="fade-in d2">
            <div style={{ fontSize: 12, color: "#7a6e64", letterSpacing: 2, marginBottom: 8 }}>STYLE: CB-{product.cat.toUpperCase().slice(0,3)}-{product.id.toString().padStart(4,"0")}</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 400, lineHeight: 1.15, marginBottom: 16 }}>{product.name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ color: "#c5a255", fontSize: 14, letterSpacing: 2 }}>{"★".repeat(Math.floor(product.rating))}</span>
              <span style={{ fontSize: 13, color: "#7a6e64" }}>{product.rating} · {product.reviews} Reviews</span>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, marginBottom: 6 }}>${product.price}</div>
            <div style={{ fontSize: 13, color: "#7a6e64", marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid #e2ddd6" }}>Free alterations · Free shipping · Ships 24–48hrs</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500, color: "#7a6e64" }}>Size</span>
              <span style={{ fontSize: 12, color: "#8b2c3a", cursor: "pointer" }}>Size Guide</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  style={{ minWidth: 50, height: 44, padding: "0 16px", border: `1.5px solid ${s === selectedSize ? "#1a1412" : "#e2ddd6"}`, background: s === selectedSize ? "#1a1412" : "#fff", color: s === selectedSize ? "#fff" : "#7a6e64", cursor: "pointer", fontSize: 12, borderRadius: 4, fontFamily: "'Outfit',sans-serif", transition: "all .2s" }}>
                  {s}
                </button>
              ))}
            </div>
            <div style={{ background: "#f3efe9", borderRadius: 6, padding: "14px 18px", fontSize: 13, color: "#7a6e64", marginBottom: 24, borderLeft: "3px solid #8b2c3a" }}>
              <strong style={{ color: "#1a1412" }}>Blouse Padding:</strong> Included. Custom stitching with every purchase.
            </div>
            <button className="btn-shine" onClick={handleAdd}
              style={{ width: "100%", height: 54, border: "none", cursor: "pointer", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif", background: added ? "#2a6a3a" : "#1a1412", color: "#fff", marginBottom: 10, transition: "background .3s", borderRadius: 4 }}>
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
            <button onClick={() => window.open("https://wa.me/18578001282?text=Hi%20Sushma!%20I%20am%20interested%20in%20the%20" + encodeURIComponent(product.name), "_blank")}
              style={{ width: "100%", height: 48, border: "1px solid #e2ddd6", background: "#fff", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#1a1412", borderRadius: 4, fontFamily: "'Outfit',sans-serif", marginBottom: 24 }}>
              💬 WhatsApp / Text — 857-800-1282
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 28 }}>
              {[["⏱","Ships 24–48h"],["📦","Free Shipping"],["✂️","Free Alterations"],["📍","Arlington, MA"]].map(([i,t]) => (
                <div key={t} style={{ padding: "12px 14px", background: "#f3efe9", borderRadius: 6, fontSize: 12, color: "#7a6e64", display: "flex", alignItems: "center", gap: 8 }}>{i} {t}</div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
              {["details","fabric","care"].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  style={{ padding: "10px 20px", borderRadius: 100, border: `1px solid ${t === tab ? "#1a1412" : "#e2ddd6"}`, background: t === tab ? "#1a1412" : "#fff", color: t === tab ? "#fff" : "#7a6e64", fontSize: 11, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Outfit',sans-serif" }}>
                  {t === "details" ? "Details" : t === "fabric" ? "Fabric & Fit" : "Care"}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.8, color: "#7a6e64", marginBottom: 28 }}>
              {tab === "details" && <p>{product.desc}</p>}
              {tab === "fabric" && <p>Premium fabric with heavy embroidery, sequins, and zari work. Semi-stitched blouse for custom fitting. Cancan layering for volume. Approx 3.2kg total set weight.</p>}
              {tab === "care" && <p>Dry clean only. Store in breathable garment bag. Avoid direct sunlight. Iron on low heat with cloth barrier — never directly on embroidery.</p>}
            </div>
            <div style={{ paddingTop: 20, borderTop: "1px solid #e2ddd6", display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[["💬","WhatsApp"],["📞","Call"],["✉️","Email"],["📸","Instagram"]].map(([i,t]) => (
                <span key={t} style={{ padding: "8px 16px", border: "1px solid #e2ddd6", borderRadius: 100, fontSize: 12, color: "#7a6e64", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>{i} {t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <section style={{ background: "#fff", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 400, marginBottom: 32, textAlign: "center" }}>You May Also Like</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 20 }}>
            {related.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── CHECKOUT PAGE ─── */
function CheckoutPage({ cart, total, step, setStep, navigate, setCart, orderPlaced, setOrderPlaced }) {
  const [form, setForm] = useState({ email: "", firstName: "", lastName: "", address: "", city: "", state: "MA", zip: "", phone: "" });
  const [cardForm, setCardForm] = useState({ number: "", exp: "", cvv: "", name: "" });
  const tax = total * 0.0625;
  const grandTotal = total + tax;

  if (orderPlaced) {
    return (
      <div className="fade-in" style={{ maxWidth: 600, margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#2a6a3a", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={32} color="#fff" /></div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 400, marginBottom: 12 }}>Order Confirmed!</h1>
        <p style={{ fontSize: 14, color: "#7a6e64", lineHeight: 1.7, marginBottom: 8 }}>Thank you for your order. We'll send a confirmation to <strong>{form.email || "your email"}</strong>.</p>
        <p style={{ fontSize: 13, color: "#7a6e64", marginBottom: 32 }}>Order #CB-{Math.floor(Math.random() * 90000) + 10000} · Ships in 24–48 hours</p>
        <div style={{ background: "#f3efe9", borderRadius: 8, padding: 24, marginBottom: 32, textAlign: "left" }}>
          <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#7a6e64", marginBottom: 16 }}>What's Next</div>
          {["You'll receive an email confirmation shortly","Our team will prepare & ship your order within 24–48 hours","Free alterations — we'll reach out for measurements","Track your package via the link in your email"].map((t,i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#c5a255", color: "#1a1412", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{i+1}</div>
              <span style={{ fontSize: 13, color: "#7a6e64", lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}
        </div>
        <button onClick={() => navigate("home")} style={{ padding: "14px 36px", background: "#1a1412", color: "#fff", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 32px 80px" }}>
      <div className="fade-in" style={{ marginBottom: 32 }}>
        <span style={{ fontSize: 12, color: "#7a6e64", cursor: "pointer" }} onClick={() => navigate("home")}>← Back to Shopping</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 400, marginTop: 16, marginBottom: 8 }}>Checkout</h1>
        <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 32 }}>
          {["Shipping", "Payment", "Review"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: step > i ? "#2a6a3a" : step === i + 1 ? "#1a1412" : "#e2ddd6", color: step > i || step === i + 1 ? "#fff" : "#7a6e64", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, transition: "all .3s" }}>
                {step > i ? <Check size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: 12, color: step === i + 1 ? "#1a1412" : "#7a6e64", fontWeight: step === i + 1 ? 500 : 400 }}>{s}</span>
              {i < 2 && <div style={{ width: 40, height: 1, background: "#e2ddd6", margin: "0 8px" }} />}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48 }} className="mobile-stack">
        <div className="fade-in d1">
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, marginBottom: 20 }}>Shipping Information</h2>
              <div style={{ marginBottom: 16 }}><label style={{ fontSize: 12, color: "#7a6e64", letterSpacing: 1, display: "block", marginBottom: 6 }}>EMAIL</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@email.com" style={{ width: "100%", height: 46, border: "1px solid #e2ddd6", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }} className="mobile-stack">
                <div><label style={{ fontSize: 12, color: "#7a6e64", letterSpacing: 1, display: "block", marginBottom: 6 }}>FIRST NAME</label><input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #e2ddd6", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
                <div><label style={{ fontSize: 12, color: "#7a6e64", letterSpacing: 1, display: "block", marginBottom: 6 }}>LAST NAME</label><input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #e2ddd6", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              </div>
              <div style={{ marginBottom: 16 }}><label style={{ fontSize: 12, color: "#7a6e64", letterSpacing: 1, display: "block", marginBottom: 6 }}>ADDRESS</label><input value={form.address} onChange={e => setForm({...form, address: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #e2ddd6", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, marginBottom: 16 }} className="mobile-stack">
                <div><label style={{ fontSize: 12, color: "#7a6e64", letterSpacing: 1, display: "block", marginBottom: 6 }}>CITY</label><input value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #e2ddd6", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
                <div><label style={{ fontSize: 12, color: "#7a6e64", letterSpacing: 1, display: "block", marginBottom: 6 }}>STATE</label><input value={form.state} onChange={e => setForm({...form, state: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #e2ddd6", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
                <div><label style={{ fontSize: 12, color: "#7a6e64", letterSpacing: 1, display: "block", marginBottom: 6 }}>ZIP</label><input value={form.zip} onChange={e => setForm({...form, zip: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #e2ddd6", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              </div>
              <div style={{ marginBottom: 24 }}><label style={{ fontSize: 12, color: "#7a6e64", letterSpacing: 1, display: "block", marginBottom: 6 }}>PHONE</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="For delivery updates" style={{ width: "100%", height: 46, border: "1px solid #e2ddd6", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              <button className="btn-shine" onClick={() => setStep(2)} style={{ width: "100%", height: 52, background: "#1a1412", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif", borderRadius: 4 }}>Continue to Payment</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, marginBottom: 20 }}>Payment</h2>
              <div style={{ background: "#f3efe9", borderRadius: 8, padding: 20, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ fontSize: 12, color: "#7a6e64" }}>Shipping to</span><span style={{ fontSize: 12, color: "#8b2c3a", cursor: "pointer" }} onClick={() => setStep(1)}>Edit</span></div>
                <div style={{ fontSize: 14 }}>{form.firstName} {form.lastName}</div>
                <div style={{ fontSize: 13, color: "#7a6e64" }}>{form.address}, {form.city}, {form.state} {form.zip}</div>
              </div>
              <div style={{ marginBottom: 16 }}><label style={{ fontSize: 12, color: "#7a6e64", letterSpacing: 1, display: "block", marginBottom: 6 }}>CARD NUMBER</label><input value={cardForm.number} onChange={e => setCardForm({...cardForm, number: e.target.value})} placeholder="4242 4242 4242 4242" style={{ width: "100%", height: 46, border: "1px solid #e2ddd6", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }} className="mobile-stack">
                <div><label style={{ fontSize: 12, color: "#7a6e64", letterSpacing: 1, display: "block", marginBottom: 6 }}>EXPIRY</label><input value={cardForm.exp} onChange={e => setCardForm({...cardForm, exp: e.target.value})} placeholder="MM/YY" style={{ width: "100%", height: 46, border: "1px solid #e2ddd6", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
                <div><label style={{ fontSize: 12, color: "#7a6e64", letterSpacing: 1, display: "block", marginBottom: 6 }}>CVV</label><input value={cardForm.cvv} onChange={e => setCardForm({...cardForm, cvv: e.target.value})} placeholder="123" style={{ width: "100%", height: 46, border: "1px solid #e2ddd6", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
                <div><label style={{ fontSize: 12, color: "#7a6e64", letterSpacing: 1, display: "block", marginBottom: 6 }}>NAME ON CARD</label><input value={cardForm.name} onChange={e => setCardForm({...cardForm, name: e.target.value})} style={{ width: "100%", height: 46, border: "1px solid #e2ddd6", borderRadius: 4, padding: "0 16px", fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }} /></div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, height: 52, border: "1px solid #e2ddd6", background: "#fff", cursor: "pointer", fontSize: 12, letterSpacing: 1, fontFamily: "'Outfit',sans-serif", borderRadius: 4 }}>← Back</button>
                <button className="btn-shine" onClick={() => setStep(3)} style={{ flex: 2, height: 52, background: "#1a1412", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif", borderRadius: 4 }}>Review Order</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, marginBottom: 20 }}>Review Order</h2>
              <div style={{ background: "#f3efe9", borderRadius: 8, padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 12, letterSpacing: 1, color: "#7a6e64", marginBottom: 8 }}>SHIPPING</div>
                <div style={{ fontSize: 14 }}>{form.firstName} {form.lastName} · {form.email}</div>
                <div style={{ fontSize: 13, color: "#7a6e64" }}>{form.address}, {form.city}, {form.state} {form.zip}</div>
              </div>
              <div style={{ background: "#f3efe9", borderRadius: 8, padding: 20, marginBottom: 24 }}>
                <div style={{ fontSize: 12, letterSpacing: 1, color: "#7a6e64", marginBottom: 8 }}>PAYMENT</div>
                <div style={{ fontSize: 14 }}>Card ending in {(cardForm.number || "4242").slice(-4)}</div>
              </div>
              {cart.map(item => (
                <div key={`${item.id}-${item.size}`} style={{ display: "flex", gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #f0ebe4" }}>
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
                    <div style={{ fontSize: 12, color: "#7a6e64" }}>Size: {item.size} · Qty: {item.qty}</div>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16 }}>${(item.price * item.qty).toFixed(0)}</div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, height: 52, border: "1px solid #e2ddd6", background: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "'Outfit',sans-serif", borderRadius: 4 }}>← Back</button>
                <button className="btn-shine" onClick={() => { setOrderPlaced(true); setCart([]); }} style={{ flex: 2, height: 52, background: "#c5a255", color: "#1a1412", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, fontFamily: "'Outfit',sans-serif", borderRadius: 4 }}>
                  Place Order — ${grandTotal.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="fade-in d2" style={{ position: "sticky", top: 100, alignSelf: "start" }}>
          <div style={{ background: "#fff", border: "1px solid #e2ddd6", borderRadius: 8, padding: 24 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, marginBottom: 20 }}>Order Summary</h3>
            {cart.map(item => (
              <div key={`${item.id}-${item.size}`} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 13 }}>
                <span style={{ color: "#7a6e64" }}>{item.name.length > 28 ? item.name.slice(0,28)+"..." : item.name} × {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(0)}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #e2ddd6", paddingTop: 16, marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}><span style={{ color: "#7a6e64" }}>Subtotal</span><span>${total.toFixed(0)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}><span style={{ color: "#7a6e64" }}>Shipping</span><span style={{ color: "#2a6a3a" }}>Free</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}><span style={{ color: "#7a6e64" }}>Tax (MA 6.25%)</span><span>${tax.toFixed(2)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}><span style={{ color: "#7a6e64" }}>Alterations</span><span style={{ color: "#2a6a3a" }}>Free</span></div>
            </div>
            <div style={{ borderTop: "1px solid #e2ddd6", paddingTop: 16, marginTop: 12, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>Total</span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24 }}>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: 16, background: "#f3efe9", borderRadius: 8, fontSize: 12, color: "#7a6e64", lineHeight: 1.6 }}>
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
    { name: "Priya M.", location: "New Jersey", stars: 5, text: "Sushma was incredibly patient. She showed me 8 different lehengas before I found the one. The video call made it feel like I was right there in the boutique." },
    { name: "Meera J.", location: "Houston, TX", stars: 5, text: "Booked a bridal session and it was the best decision. She understood my vision completely — the zardozi work on my lehenga was exactly what I imagined." },
    { name: "Anisha R.", location: "Toronto, Canada", stars: 5, text: "I was skeptical about buying a saree online, but the live call changed everything. I could see the drape, the shimmer, the border detail. Absolutely worth it." },
    { name: "Kavya T.", location: "Boston, MA", stars: 5, text: "Even though I'm 10 minutes from the boutique I used the video call when I couldn't make it in person. So convenient and Sushma is so warm and knowledgeable." },
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

  const inputStyle = { width: "100%", height: 44, border: "1px solid #e2ddd6", borderRadius: 4, padding: "0 14px", fontFamily: "'Outfit',sans-serif", fontSize: 13, outline: "none", background: "#fff", color: "#1a1412" };
  const labelStyle = { fontSize: 11, letterSpacing: 1, color: "#7a6e64", display: "block", marginBottom: 5, textTransform: "uppercase" };

  return (
    <div className="fade-in">

      {/* ── HERO ── */}
      <div style={{ background: "linear-gradient(135deg,#0a101d 0%,#1a2040 50%,#0a101d 100%)", padding: "72px 32px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(42,106,58,.18)", border: "1px solid rgba(42,106,58,.4)", borderRadius: 100, padding: "6px 18px", marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2a6a3a", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" }} />
            <span style={{ fontSize: 11, letterSpacing: 2, color: "#7acca0", textTransform: "uppercase" }}>Free · No Obligation</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(38px,5vw,68px)", fontWeight: 300, color: "#f0ebe4", lineHeight: 1.1, marginBottom: 16 }}>
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
              style={{ padding: "15px 40px", background: "#c5a255", color: "#1a1412", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, fontFamily: "'Outfit',sans-serif", borderRadius: 2 }}>
              Book Free Session
            </button>
            <button onClick={() => window.open("https://wa.me/18578001282", "_blank")}
              style={{ padding: "15px 40px", background: "transparent", color: "#f0ebe4", border: "1px solid rgba(240,235,228,.3)", cursor: "pointer", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif", borderRadius: 2 }}>
              WhatsApp Sushma
            </button>
          </div>
          <div style={{ marginTop: 20, fontSize: 12, color: "rgba(240,235,228,.3)" }}>📞 857-800-1282 · Available Tue–Sun</div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ background: "#fff", padding: "80px 32px", borderBottom: "1px solid #e2ddd6" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#c5a255", textTransform: "uppercase", marginBottom: 10 }}>Simple Process</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 400 }}>How Live Video Shopping Works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="mobile-grid">
            {STEPS.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "32px 20px", position: "relative" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#1a1412", color: "#c5a255", fontFamily: "'Cormorant Garamond',serif", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>{s.num}</div>
                {i < 3 && <div className="mobile-hide" style={{ position: "absolute", top: 52, left: "75%", width: "50%", height: 1, background: "#e2ddd6" }} />}
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 400, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: "#7a6e64", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOOKING FORM + CONTACT ── */}
      <div id="booking-form" style={{ background: "#faf8f5", padding: "80px 32px", borderBottom: "1px solid #e2ddd6" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "start" }} className="mobile-stack">

          {/* Form */}
          <div style={{ background: "#fff", border: "1px solid #e2ddd6", borderRadius: 10, padding: "40px 36px" }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#c5a255", textTransform: "uppercase", marginBottom: 8 }}>Free · No Commitment</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 400, marginBottom: 6 }}>Book Your Private<br />Video Shopping Call</h2>
            <p style={{ fontSize: 12, color: "#7a6e64", marginBottom: 28, lineHeight: 1.6 }}>Fill in your details and Sushma will confirm your slot via WhatsApp within a few hours.</p>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, marginBottom: 8 }}>Request Sent!</h3>
                <p style={{ fontSize: 13, color: "#7a6e64" }}>Sushma will confirm your slot on WhatsApp soon.</p>
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
                  style={{ width: "100%", height: 52, background: "#1a1412", color: "#fff", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif", borderRadius: 4, marginTop: 4 }}>
                  Submit & Open WhatsApp
                </button>
                <p style={{ fontSize: 10, color: "#b0a89e", textAlign: "center", letterSpacing: .3 }}>100% private · No fees · No commitment</p>
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
              <div key={label} onClick={action} style={{ display: "flex", gap: 16, padding: "18px 20px", background: "#fff", border: "1px solid #e2ddd6", borderRadius: 8, cursor: action ? "pointer" : "default", transition: "border-color .2s" }}
                onMouseEnter={e => action && (e.currentTarget.style.borderColor = "#8b2c3a")} onMouseLeave={e => action && (e.currentTarget.style.borderColor = "#e2ddd6")}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 1.5, color: "#b0a89e", textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 14, color: "#1a1412", fontWeight: 400 }}>{value}</div>
                </div>
              </div>
            ))}
            <div style={{ background: "#1a1412", borderRadius: 8, padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#c5a255", marginBottom: 6 }}>4.9 ★★★★★</div>
              <div style={{ fontSize: 12, color: "rgba(240,235,228,.6)" }}>Based on 200+ happy customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURED CATEGORIES ── */}
      <div style={{ background: "#fff", padding: "80px 32px", borderBottom: "1px solid #e2ddd6" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 400, marginBottom: 6 }}>Shop These Categories Live</h2>
            <p style={{ fontSize: 13, color: "#7a6e64" }}>Browse our most popular collections during your video call</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {CATEGORIES.map(({ label, color, img }) => (
              <div key={label} className="hover-lift" style={{ position: "relative", aspectRatio: "4/5", borderRadius: 8, overflow: "hidden", cursor: "pointer", background: color }}
                onClick={() => document.getElementById("booking-form").scrollIntoView({ behavior: "smooth" })}>
                {img && <img src={img} alt={label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24 }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#fff", marginBottom: 10 }}>{label}</h3>
                  <div style={{ display: "inline-block", padding: "8px 20px", background: "#c5a255", color: "#1a1412", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>
                    Book Live Session
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REVIEWS ── */}
      <div style={{ background: "#faf8f5", padding: "80px 32px", borderBottom: "1px solid #e2ddd6" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#c5a255", textTransform: "uppercase", marginBottom: 10 }}>Real Customers</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 400 }}>What Our Clients Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="mobile-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2ddd6", borderRadius: 8, padding: "28px 28px" }}>
                <div style={{ color: "#c5a255", fontSize: 14, letterSpacing: 2, marginBottom: 14 }}>★★★★★</div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, fontStyle: "italic", color: "#1a1412", lineHeight: 1.7, marginBottom: 16 }}>"{r.text}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "#b0a89e", letterSpacing: .5 }}>{r.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ background: "#fff", padding: "80px 32px", borderBottom: "1px solid #e2ddd6" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 400, marginBottom: 6 }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: 13, color: "#7a6e64" }}>Everything you need to know about Live Video Shopping</p>
          </div>
          <div style={{ borderTop: "1px solid #e2ddd6" }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} style={{ borderBottom: "1px solid #e2ddd6" }}>
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{ width: "100%", padding: "20px 0", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left", gap: 16 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1412", lineHeight: 1.4 }}>{faq.q}</span>
                  <Plus size={16} style={{ color: "#c5a255", flexShrink: 0, transform: openFaq === idx ? "rotate(45deg)" : "rotate(0)", transition: "transform .3s" }} />
                </button>
                <div style={{ maxHeight: openFaq === idx ? 200 : 0, overflow: "hidden", transition: "max-height .35s ease" }}>
                  <p style={{ paddingBottom: 20, fontSize: 13, color: "#7a6e64", lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <div style={{ background: "#1a1412", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, letterSpacing: 4, color: "#c5a255", textTransform: "uppercase", marginBottom: 16 }}>Knots of Tradition</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,4vw,52px)", color: "#f0ebe4", fontWeight: 300, marginBottom: 16, lineHeight: 1.2 }}>
            Your Perfect Outfit<br /><em style={{ color: "#c5a255" }}>Is One Call Away</em>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(240,235,228,.55)", marginBottom: 36, lineHeight: 1.7 }}>
            Free session. No pressure. Just Sushma, your style, and a full boutique on your screen.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-shine" onClick={() => document.getElementById("booking-form").scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "15px 40px", background: "#c5a255", color: "#1a1412", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, fontFamily: "'Outfit',sans-serif" }}>
              Book Free Session
            </button>
            <button onClick={() => window.open("https://wa.me/18578001282","_blank")}
              style={{ padding: "15px 40px", background: "transparent", color: "#f0ebe4", border: "1px solid rgba(240,235,228,.3)", cursor: "pointer", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif" }}>
              WhatsApp Sushma
            </button>
          </div>
          <div style={{ marginTop: 32, fontSize: 12, color: "rgba(240,235,228,.25)", cursor: "pointer" }} onClick={() => navigate("home")}>← Back to Home</div>
        </div>
      </div>

    </div>
  );
}
