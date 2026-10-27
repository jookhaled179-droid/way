import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Instagram, Facebook, Mail, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { as?: React.ElementType };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const element = localRef.current;
      if (!element) return;
      const move = (e: MouseEvent) => {
        const r = element.getBoundingClientRect();
        gsap.to(element, {
          x: (e.clientX - r.left - r.width / 2) * .12,
          y: (e.clientY - r.top - r.height / 2) * .12,
          duration: .35, ease: "power3.out"
        });
      };
      const leave = () => gsap.to(element, { x: 0, y: 0, duration: .8, ease: "elastic.out(1,.35)" });
      element.addEventListener("mousemove", move);
      element.addEventListener("mouseleave", leave);
      return () => { element.removeEventListener("mousemove", move); element.removeEventListener("mouseleave", leave); };
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >{children}</Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

export const MarqueeItem = () => (
  <div className="flex shrink-0 items-center gap-10 px-5">
    <span>WAY MENSWEAR</span><span className="text-sky-300">✦</span>
    <span>BUILT FOR EVERYDAY</span><span className="text-sky-300">✦</span>
    <span>SHARP FITS</span><span className="text-sky-300">✦</span>
    <span>QUIET CONFIDENCE</span><span className="text-sky-300">✦</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(giantRef.current, { y: 90, opacity: 0, scale: .86 }, {
        y: 0, opacity: 1, scale: 1, ease: "power1.out",
        scrollTrigger: { trigger: wrapperRef.current, start: "top 85%", end: "bottom bottom", scrub: 1 }
      });
      gsap.fromTo(contentRef.current?.children ?? [], { y: 35, opacity: 0 }, {
        y: 0, opacity: 1, stagger: .1, ease: "power3.out",
        scrollTrigger: { trigger: wrapperRef.current, start: "top 55%", end: "bottom bottom", scrub: 1 }
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative min-h-screen overflow-hidden bg-[#07152e]">
      <div className="absolute inset-0 way-grid pointer-events-none" />
      <div className="float-glow absolute left-1/2 top-1/2 h-[55vh] w-[75vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-[100px]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-28 pb-10">
        <div ref={contentRef} className="w-full max-w-5xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[.35em] text-sky-300/75">The way you dress matters.</p>
          <h2 className="font-display text-6xl font-extrabold tracking-[-.07em] text-white md:text-9xl">
            WAY<span className="text-sky-300">.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
            Modern menswear designed around clean silhouettes, deep tones and pieces that stay relevant beyond a season.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton as="a" href="#shop" className="glass rounded-full px-7 py-4 text-sm font-bold text-white hover:bg-white/10">
              Shop collection
            </MagneticButton>
            <MagneticButton as="a" href="#contact" className="glass rounded-full px-7 py-4 text-sm font-bold text-slate-300 hover:text-white">
              Contact WAY
            </MagneticButton>
          </div>
        </div>

        <div className="relative z-10 mt-auto grid w-full max-w-6xl grid-cols-1 gap-8 border-t border-white/10 pt-8 text-sm text-slate-400 md:grid-cols-3">
          <div><p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-slate-500">WAY</p><p>Men's wear · Cairo · Egypt</p></div>
          <div className="flex items-center gap-3 md:justify-center"><MapPin size={16}/><span>Made for the city</span></div>
          <div className="flex gap-4 md:justify-end">
            <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={18}/></a>
            <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook size={18}/></a>
            <a href="mailto:hello@waymenswear.com" aria-label="Email" className="hover:text-white"><Mail size={18}/></a>
            <button onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top" className="ml-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 hover:bg-white/10"><ArrowUp size={16}/></button>
          </div>
        </div>
        <div className="mt-8 text-[10px] font-semibold uppercase tracking-[.25em] text-slate-600">© 2026 WAY. All rights reserved.</div>
      </div>

      <div ref={giantRef} className="pointer-events-none absolute bottom-[-2vh] left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[31vw] font-extrabold leading-[.7] tracking-[-.09em] text-transparent opacity-0 [text-shadow:0_0_0_rgba(255,255,255,0)] [-webkit-text-stroke:1px_rgba(190,220,255,.055)]">
        WAY
      </div>
    </div>
  );
}