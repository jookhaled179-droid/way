import type { CSSProperties, ReactNode } from "react";

const ink = "#07152e";

function Tee() {
  return (
    <svg viewBox="0 0 120 110" className="h-full w-full drop-shadow-[0_10px_18px_rgba(0,0,0,.45)]">
      <path d="M38 10 L18 18 L4 44 L24 54 L30 44 L30 100 Q60 106 90 100 L90 44 L96 54 L116 44 L102 18 L82 10 Q60 28 38 10 Z" fill="#bae6fd" stroke={ink} strokeWidth="5" strokeLinejoin="round"/>
      <path d="M44 12 Q60 24 76 12" fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round"/>
      <path d="M36 56 Q36 80 40 92" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".7"/>
      <text x="60" y="74" textAnchor="middle" fontSize="18" fontWeight="900" fill={ink} fontFamily="inherit">W</text>
    </svg>
  );
}

function Pants() {
  return (
    <svg viewBox="0 0 100 130" className="h-full w-full drop-shadow-[0_10px_18px_rgba(0,0,0,.45)]">
      <path d="M18 8 H82 L90 122 H60 L50 46 L40 122 H10 Z" fill="#334155" stroke={ink} strokeWidth="5" strokeLinejoin="round"/>
      <path d="M18 8 H82 L83 22 H17 Z" fill="#1e293b" stroke={ink} strokeWidth="5" strokeLinejoin="round"/>
      <path d="M50 22 V40" stroke={ink} strokeWidth="4" strokeLinecap="round"/>
      <path d="M24 32 Q20 70 18 110" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" opacity=".7"/>
      <circle cx="50" cy="15" r="3" fill="#bae6fd"/>
    </svg>
  );
}

function Sneaker() {
  return (
    <svg viewBox="0 0 140 90" className="h-full w-full drop-shadow-[0_10px_18px_rgba(0,0,0,.45)]">
      <path d="M10 62 L14 22 Q30 16 44 24 L58 40 Q90 44 118 52 Q132 56 130 70 L10 70 Z" fill="#fff" stroke={ink} strokeWidth="5" strokeLinejoin="round"/>
      <path d="M8 68 H132 Q132 82 118 82 H16 Q8 82 8 68 Z" fill="#38bdf8" stroke={ink} strokeWidth="5" strokeLinejoin="round"/>
      <path d="M34 50 Q60 36 92 52" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round"/>
      <path d="M44 30 L52 26 M50 36 L58 32" stroke={ink} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M18 30 Q17 42 18 54" stroke="#bae6fd" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

type Item = { el: ReactNode; angle: number; size: string };

function Ring({ items, radius, duration, reverse }: { items: Item[]; radius: number; duration: number; reverse?: boolean }) {
  return (
    <div className="orbit" style={{ "--dur": `${duration}s`, animationDirection: reverse ? "reverse" : "normal" } as CSSProperties}>
      {items.map((it, i) => (
        <div key={i} className="orbit-item" style={{ "--a": `${it.angle}deg`, "--r": radius } as CSSProperties}>
          <div className="orbit-upright" style={{ animationDirection: reverse ? "normal" : "reverse" }}>
            <div className="orbit-bob" style={{ width: it.size, height: it.size, animationDelay: `${i * -1.2}s` }}>{it.el}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function WayOrbit() {
  return (
    <div className="way-orbit relative aspect-square w-full">
      <div className="absolute inset-[9%] rounded-full border border-dashed border-sky-200/15"/>
      <div className="absolute inset-[19%] rounded-full border border-dashed border-sky-200/10"/>
      <div className="absolute inset-[30%] rounded-full bg-sky-400/15 blur-[60px]"/>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="font-display text-[20cqmin] font-extrabold leading-none tracking-[-.08em] text-white [text-shadow:0_0_40px_rgba(186,230,253,.35)]">WAY<span className="text-sky-200">.</span></p>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[.4em] text-sky-200/80">Quiet. Sharp.</p>
        </div>
      </div>
      <Ring radius={41} duration={26} items={[
        { el: <Tee/>, angle: 0, size: "22cqmin" },
        { el: <Pants/>, angle: 120, size: "20cqmin" },
        { el: <Sneaker/>, angle: 240, size: "22cqmin" },
      ]}/>
      <Ring radius={31} duration={18} reverse items={[
        { el: <Sneaker/>, angle: 60, size: "12cqmin" },
        { el: <Tee/>, angle: 180, size: "12cqmin" },
        { el: <Pants/>, angle: 300, size: "11cqmin" },
      ]}/>
    </div>
  );
}
