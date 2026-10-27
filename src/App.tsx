import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, ChevronDown, Heart, Menu, Search, ShoppingBag, X, Star, SlidersHorizontal } from "lucide-react";
import { CinematicFooter, MarqueeItem } from "./components/ui/motion-footer";
import { WayOrbit } from "./components/ui/way-orbit";

type Product = {
  id: number; name: string; category: string; price: number; old?: number; badge?: string; image?: string;
};

const products: Product[] = [
  { id: 1, name: "Essential Oxford Shirt", category: "Shirts", price: 1190, old: 1390, badge: "BESTSELLER" },
  { id: 2, name: "Midnight Overshirt", category: "Overshirts", price: 1490, badge: "NEW" },
  { id: 3, name: "Relaxed Black Tee", category: "T-Shirts", price: 790 },
  { id: 4, name: "Tailored Stone Trousers", category: "Trousers", price: 1590 },
  { id: 5, name: "Clean Collar Polo", category: "Polos", price: 990, badge: "NEW" },
  { id: 6, name: "Daily Navy Hoodie", category: "Hoodies", price: 1390, old: 1590 },
];

const categories = ["All", "Shirts", "T-Shirts", "Overshirts", "Polos", "Trousers", "Hoodies"];

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const filtered = useMemo(() => category === "All" ? products : products.filter(p => p.category === category), [category]);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", { y: 40, opacity: 0, stagger: .12, duration: 1, ease: "power3.out" });
      gsap.from(".hero-visual", { scale: .92, opacity: 0, duration: 1.25, ease: "power3.out", delay: .15 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const addToCart = (p: Product) => { setCart(c => [...c, p]); setCartOpen(true); };
  const toggleWish = (id: number) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07152e] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07152e]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#" className="font-display text-3xl font-extrabold tracking-[-.08em]">WAY<span className="text-sky-300">.</span></a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-300 md:flex">
            <a href="#shop" className="hover:text-white">Shop</a>
            <a href="#new" className="hover:text-white">New in</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(v => !v)} className="rounded-full p-3 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Search"><Search size={19}/></button>
            <button onClick={() => setCartOpen(true)} className="relative rounded-full p-3 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Cart"><ShoppingBag size={19}/>{cart.length > 0 && <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-sky-300 px-1 text-[9px] font-bold text-[#07152e]">{cart.length}</span>}</button>
            <button onClick={() => setMobileOpen(v => !v)} className="rounded-full p-3 md:hidden" aria-label="Menu">{mobileOpen ? <X size={21}/> : <Menu size={21}/>}</button>
          </div>
        </div>
        {searchOpen && <div className="border-t border-white/10 px-5 py-4"><div className="mx-auto flex max-w-7xl items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3"><Search size={18} className="text-slate-500"/><input autoFocus placeholder="Search WAY..." className="w-full bg-transparent outline-none placeholder:text-slate-600" /></div></div>}
        {mobileOpen && <nav className="border-t border-white/10 px-5 py-5 md:hidden"><div className="flex flex-col gap-5 text-sm font-semibold text-slate-300"><a href="#shop" onClick={()=>setMobileOpen(false)}>Shop</a><a href="#new" onClick={()=>setMobileOpen(false)}>New in</a><a href="#about" onClick={()=>setMobileOpen(false)}>About</a><a href="#contact" onClick={()=>setMobileOpen(false)}>Contact</a></div></nav>}
      </header>

      <main>
        <section ref={heroRef} className="relative min-h-[calc(100vh-76px)] overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 way-grid opacity-70"/>
          <div className="relative z-20 -rotate-1 scale-[1.04] overflow-hidden border-y border-white/10 bg-white/[.035] py-4 backdrop-blur-md">
            <div className="marquee-track flex w-max text-[10px] font-bold uppercase tracking-[.32em] text-slate-300 md:text-xs">
              <MarqueeItem /><MarqueeItem />
            </div>
          </div>
          <div className="absolute left-[60%] top-[42%] h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-[110px]"/>
          <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-10">
            <div className="hero-copy relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200/15 bg-white/[.035] px-4 py-2 text-[10px] font-bold uppercase tracking-[.25em] text-sky-200"><span className="h-1.5 w-1.5 rounded-full bg-sky-300"/> Spring / Summer 2027</div>
              <h1 className="font-display text-6xl font-extrabold leading-[.9] tracking-[-.075em] md:text-[7.4rem]">Dress your<br/><span className="text-sky-200">way.</span></h1>
              <p className="mt-7 max-w-md text-sm leading-7 text-slate-400 md:text-base">Clean menswear. Sharp fits. No unnecessary noise. Discover the pieces that make everyday dressing feel intentional.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#shop" className="magnetic inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#07152e] hover:bg-sky-100">Explore collection <ArrowRight size={17}/></a>
                <a href="#about" className="glass inline-flex items-center rounded-full px-7 py-4 text-sm font-bold text-white">Our story</a>
              </div>
              <div className="mt-12 flex gap-8 text-xs text-slate-500"><span><b className="text-slate-200">Free</b> delivery over EGP 2,000</span><span><b className="text-slate-200">Easy</b> returns</span></div>
            </div>
            <div className="hero-visual relative mx-auto w-full max-w-[560px]">
              <WayOrbit/>
            </div>
          </div>
        </section>

        <section id="new" className="border-b border-white/10 py-6">
          <div className="mx-auto flex max-w-7xl overflow-hidden px-5 md:px-8"><div className="marquee-track flex min-w-max gap-12 text-[10px] font-bold uppercase tracking-[.3em] text-slate-500"><span>NEW SEASON</span><span>✦</span><span>MEN'S ESSENTIALS</span><span>✦</span><span>DESIGNED IN EGYPT</span><span>✦</span><span>NEW SEASON</span><span>✦</span><span>MEN'S ESSENTIALS</span><span>✦</span><span>DESIGNED IN EGYPT</span><span>✦</span></div></div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[.3em] text-sky-300">The collection</p><h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-.05em] md:text-6xl">Built for every day.</h2></div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">{categories.map(c => <button key={c} onClick={()=>setCategory(c)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition ${category===c ? "border-sky-200/30 bg-sky-200 text-[#07152e]" : "border-white/10 bg-white/[.03] text-slate-400 hover:text-white"}`}>{c}</button>)}</div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(p => <article key={p.id} className="product-card group overflow-hidden rounded-[26px] border border-white/10 bg-white/[.025]">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#10284c]">
                {p.image
                  ? <img src={p.image} alt={p.name} className="product-image h-full w-full object-cover"/>
                  : <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-slate-600"><ShoppingBag size={34} strokeWidth={1.5}/><span className="text-[10px] font-bold uppercase tracking-[.25em]">Image coming soon</span></div>}
                {p.badge && <span className="absolute left-4 top-4 rounded-full bg-[#07152e]/80 px-3 py-1.5 text-[9px] font-bold tracking-[.18em] text-sky-200 backdrop-blur-md">{p.badge}</span>}
                <button onClick={()=>toggleWish(p.id)} aria-label="Wishlist" className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md ${wishlist.includes(p.id) ? "bg-white text-red-500" : "bg-[#07152e]/75 text-white"}`}><Heart size={16} fill={wishlist.includes(p.id) ? "currentColor" : "none"}/></button>
                <button onClick={()=>addToCart(p)} className="absolute bottom-4 left-4 right-4 translate-y-16 rounded-full bg-white py-3.5 text-xs font-bold text-[#07152e] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">Add to bag</button>
              </div>
              <div className="p-5"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-slate-600">{p.category}</p><h3 className="mt-2 text-sm font-semibold text-slate-100">{p.name}</h3></div><div className="text-right text-sm font-bold"><span>EGP {p.price.toLocaleString()}</span>{p.old && <del className="ml-2 text-xs font-normal text-slate-600">EGP {p.old.toLocaleString()}</del>}</div></div><div className="mt-4 flex gap-1"><span className="h-3 w-3 rounded-full border border-white/30 bg-[#101010]"/><span className="h-3 w-3 rounded-full border border-white/20 bg-[#d8d2c8]"/><span className="h-3 w-3 rounded-full border border-white/20 bg-[#17345d]"/></div></div>
            </article>)}
          </div>
        </section>

        <section id="about" className="border-y border-white/10 bg-white/[.02]">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 md:grid-cols-2 md:px-8">
            <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[32px] border border-white/10 bg-[#061329]">
              <div className="absolute inset-0 way-grid opacity-50"/>
              <div className="way-neon-halo absolute h-1/2 w-1/2 rounded-full bg-sky-400/30 blur-[80px]"/>
              <p className="way-neon relative select-none font-display text-[clamp(5rem,14vw,10rem)] font-extrabold leading-none tracking-[-.07em]">WAY</p>
              <p className="absolute bottom-6 text-[10px] font-bold uppercase tracking-[.4em] text-slate-500">Est. Egypt</p>
            </div>
            <div><p className="text-xs font-bold uppercase tracking-[.3em] text-sky-300">Why WAY</p><h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-.055em] md:text-6xl">Less noise.<br/>More you.</h2><p className="mt-6 max-w-lg text-sm leading-7 text-slate-400">WAY is a men's clothing store built around a simple idea: your clothes should work with your life, not compete with it. We focus on versatile colors, comfortable cuts and details that reward a closer look.</p><div className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6"><div><p className="font-display text-2xl font-bold">01</p><p className="mt-1 text-[10px] uppercase tracking-[.18em] text-slate-500">Clean cut</p></div><div><p className="font-display text-2xl font-bold">02</p><p className="mt-1 text-[10px] uppercase tracking-[.18em] text-slate-500">Daily wear</p></div><div><p className="font-display text-2xl font-bold">03</p><p className="mt-1 text-[10px] uppercase tracking-[.18em] text-slate-500">Made to last</p></div></div></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="glass rounded-[32px] p-8 md:p-14"><div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.3em] text-sky-300">The WAY standard</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-.04em] md:text-5xl">Good clothes should feel obvious.</h2></div><div className="flex gap-1 text-sky-300"><Star fill="currentColor" size={17}/><Star fill="currentColor" size={17}/><Star fill="currentColor" size={17}/><Star fill="currentColor" size={17}/><Star fill="currentColor" size={17}/></div></div><div className="mt-10 grid gap-8 border-t border-white/10 pt-8 text-sm leading-7 text-slate-400 md:grid-cols-3"><p><b className="text-white">01 — Fabric</b><br/>Comfortable materials selected for repeat wear, not one-off looks.</p><p><b className="text-white">02 — Fit</b><br/>Relaxed where it should be, structured where it matters.</p><p><b className="text-white">03 — Detail</b><br/>Small finishing touches that keep the whole look intentional.</p></div></div>
        </section>
      </main>

      <section id="contact" className="border-t border-white/10 bg-[#061329] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-10 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.3em] text-sky-300">Stay in the loop</p><h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-.05em] md:text-6xl">New drops.<br/>No spam.</h2></div><form onSubmit={e=>e.preventDefault()} className="flex w-full max-w-md gap-2"><input type="email" placeholder="Your email address" className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[.04] px-5 py-4 text-sm outline-none placeholder:text-slate-600 focus:border-sky-300/30"/><button className="rounded-full bg-sky-200 px-6 py-4 text-sm font-bold text-[#07152e]">Join</button></form></div></div>
      </section>

      <CinematicFooter />

      {cartOpen && <div className="fixed inset-0 z-[70]"><div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={()=>setCartOpen(false)}/><aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#07152e] shadow-2xl"><div className="flex items-center justify-between border-b border-white/10 p-5"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-slate-500">Your bag</p><h3 className="mt-1 font-display text-2xl font-bold">{cart.length} item{cart.length===1?"":"s"}</h3></div><button onClick={()=>setCartOpen(false)} className="rounded-full p-2 hover:bg-white/10"><X/></button></div><div className="flex-1 overflow-auto p-5">{cart.length===0 ? <div className="flex h-full flex-col items-center justify-center text-center text-slate-500"><ShoppingBag size={35}/><p className="mt-4 text-sm">Your bag is empty.</p></div> : <div className="space-y-4">{cart.map((p,i)=><div key={`${p.id}-${i}`} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[.03] p-3">{p.image ? <img src={p.image} className="h-24 w-20 rounded-xl object-cover" alt=""/> : <div className="flex h-24 w-20 items-center justify-center rounded-xl bg-[#10284c] text-slate-600"><ShoppingBag size={20}/></div>}<div className="flex-1"><p className="text-sm font-semibold">{p.name}</p><p className="mt-1 text-xs text-slate-500">{p.category}</p><p className="mt-4 text-sm font-bold">EGP {p.price.toLocaleString()}</p></div></div>)}</div>}</div>{cart.length>0 && <div className="border-t border-white/10 p-5"><div className="mb-4 flex justify-between text-sm"><span className="text-slate-500">Subtotal</span><b>EGP {cart.reduce((s,p)=>s+p.price,0).toLocaleString()}</b></div><button className="w-full rounded-full bg-white py-4 text-sm font-bold text-[#07152e]">Proceed to checkout</button></div>}</aside></div>}
    </div>
  );
}

export default App;