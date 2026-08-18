"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

/* ------------------------------------------------------------------ *
 * 1. Inertial smooth scrolling
 * Lenis drives real window scroll, so every existing scroll-linked
 * animation (video scrub, interludes, process) keeps working — it just
 * receives eased input instead of stepped wheel deltas.
 * ------------------------------------------------------------------ */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // in-page anchors must go through Lenis, not native jump
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -10 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

/* ------------------------------------------------------------------ *
 * 2. Scroll progress rail — instrument-panel spine on the right edge
 * ------------------------------------------------------------------ */
const CHAPTERS = [
  { id: "technology", label: "TECHNOLOGY" },
  { id: "process", label: "PROCESS" },
  { id: "group", label: "BRANDS" },
  { id: "contact", label: "CONTACT" },
];

export function ScrollRail() {
  const fillRef = useRef<HTMLSpanElement>(null);
  const [marks, setMarks] = useState<{ id: string; label: string; at: number }[]>(
    []
  );
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      setMarks(
        CHAPTERS.map((c) => {
          const el = document.getElementById(c.id);
          const top = el ? el.getBoundingClientRect().top + window.scrollY : 0;
          return { ...c, at: Math.min(1, Math.max(0, top / total)) };
        })
      );
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
      setActive(() => {
        let i = -1;
        CHAPTERS.forEach((c, idx) => {
          const el = document.getElementById(c.id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5)
            i = idx;
        });
        return i;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      onScroll();
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-1/2 right-6 z-40 hidden h-[46vh] -translate-y-1/2 lg:block"
    >
      {/* a seam: unsewn thread track, stitched in as you scroll */}
      <div className="vr-seam relative h-full w-[2px]">
        <span
          ref={fillRef}
          className="vr-seam-thread absolute inset-x-0 top-0 h-full origin-top"
          style={{ transform: "scaleY(0)" }}
        />
        {marks.map((m, i) => (
          <span
            key={m.id}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${m.at * 100}%` }}
          >
            {/* stitch knot */}
            <span
              className={`block h-[9px] w-[9px] rounded-full border transition-colors duration-500 ${
                i <= active
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                  : "border-white/30 bg-transparent"
              }`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 3. Custom cursor + magnetic hover (desktop, fine-pointer only)
 * ------------------------------------------------------------------ */
export function Cursor() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const ring = document.createElement("img");
    ring.src = "/feather-cursor.png";
    ring.alt = "";
    ring.setAttribute("aria-hidden", "true");
    ring.className = "vr-cursor";
    document.body.appendChild(ring);
    document.documentElement.classList.add("vr-has-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let magnet: HTMLElement | null = null;
    let raf = 0;

    const MAGNET_SEL = "a, button, [data-magnetic]";

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const el = (e.target as HTMLElement)?.closest?.(
        MAGNET_SEL
      ) as HTMLElement | null;

      if (el !== magnet) {
        if (magnet) magnet.style.transform = "";
        magnet = el;
        targetScale = el ? 1.55 : 1;
      }
      if (magnet) {
        // pull the element gently toward the pointer
        const r = magnet.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
        magnet.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(
          1
        )}px)`;
      }
    };

    let tilt = 0;
    const loop = () => {
      const vx = mx - rx;
      const vy = my - ry;
      rx += vx * 0.18;
      ry += vy * 0.18;
      scale += (targetScale - scale) * 0.15;
      // the quill leans into the direction of travel, then settles upright
      const targetTilt = Math.max(-28, Math.min(28, vx * 0.55 + vy * 0.2));
      tilt += (targetTilt - tilt) * 0.12;
      ring.style.transform = `translate(${rx.toFixed(1)}px, ${ry.toFixed(
        1
      )}px) translate(-50%, -50%) rotate(${tilt.toFixed(
        1
      )}deg) scale(${scale.toFixed(3)})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onLeave = () => (ring.style.opacity = "0");
    const onEnter = () => (ring.style.opacity = "1");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
      if (magnet) magnet.style.transform = "";
      ring.remove();
      document.documentElement.classList.remove("vr-has-cursor");
    };
  }, []);

  return null;
}

/* ------------------------------------------------------------------ *
 * 4. Kinetic headline — words rise out of a mask, driven by scroll
 * ------------------------------------------------------------------ */
export function Kinetic({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wordsRef.current.forEach((w) => {
        if (w) w.style.transform = "none";
      });
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      // 0 when the heading enters from below, 1 once it has risen into view
      const p = Math.min(
        1,
        Math.max(0, (window.innerHeight - r.top) / (window.innerHeight * 0.55))
      );
      wordsRef.current.forEach((w, i) => {
        if (!w) return;
        const stagger = i * 0.12;
        const t = Math.min(1, Math.max(0, (p - stagger) / (1 - stagger || 1)));
        const eased = 1 - Math.pow(1 - t, 3);
        w.style.transform = `translateY(${((1 - eased) * 105).toFixed(2)}%)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <h2 ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden py-[0.06em] align-bottom">
          <span
            ref={(el) => {
              wordsRef.current[i] = el;
            }}
            className="inline-block will-change-transform"
            style={{ transform: "translateY(105%)" }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </h2>
  );
}
