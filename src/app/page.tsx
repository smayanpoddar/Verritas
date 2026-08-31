"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cursor, Kinetic, ScrollRail, SmoothScroll } from "./motion";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

type Stage = {
  number: string;
  name: string;
  spec: string;
  image: string;
};

const STAGES: Stage[] = [
  {
    number: "01",
    name: "THE SKELETON",
    spec: "Kiln-dried hardwood frame, machine-jointed and steel-plated at every load corner",
    image: "/stages/01.png",
  },
  {
    number: "02",
    name: "BACK SUPPORT",
    spec: "Tensioned roller webbing anchored across the backrest for lasting posture",
    image: "/stages/02.png",
  },
  {
    number: "03",
    name: "THE DECK",
    spec: "Interlaced elastic webbing distributing weight evenly across the seat",
    image: "/stages/03.png",
  },
  {
    number: "04",
    name: "THE SPRINGS",
    spec: "Tempered serpentine springs hand-clipped to the frame, zone by zone",
    image: "/stages/04.png",
  },
  {
    number: "05",
    name: "THE FOAM",
    spec: "High-density cold-cured foam sculpted to hold its shape for decades",
    image: "/stages/05.png",
  },
  {
    number: "06",
    name: "THE WRAP",
    spec: "Quilted fiber comfort layer — the difference you feel in the first second",
    image: "/stages/06.png",
  },
  {
    number: "07",
    name: "THE RESULT",
    spec: "Full-grain leather, contrast piping, double-stitched seams. Done.",
    image: "/stages/07.png",
  },
];

type BrandComponent = {
  image: string;
  tag: string;
  title: string;
  copy: string;
  side: "left" | "right";
  ghost: string;
  blend: "multiply" | "screen" | false;
};

const BRAND_COMPONENTS: BrandComponent[] = [
  {
    image: "/components/verrafoam-block.png",
    tag: "COMPONENT — VERRAFOAM™",
    title: "OUR FOAM. OUR FORMULA.",
    copy: "VerraFoam™ is cold-cured in-house at 45kg/m³ — engineered to recover its shape seat after seat, decade after decade.",
    side: "right",
    ghost: "VERRAFOAM",
    blend: false,
  },
  {
    image: "/components/eisenmotion-mech.png",
    tag: "COMPONENT — EISENMOTION™",
    title: "THE EISENMOTION™ SYSTEM.",
    copy: "Our own recliner mechanism. Steel linkage, silent travel, rated for 100,000 cycles. No third-party hardware hiding inside.",
    side: "left",
    ghost: "EISENMOTION",
    blend: false,
  },
  {
    image: "/components/frame-cut.png",
    tag: "COMPONENT — THE FRAME",
    title: "BONES OF KILN-DRIED HARDWOOD.",
    copy: "Every Verritas piece starts as a machine-jointed hardwood skeleton, steel-plated at the load corners. Built square, built to stay square.",
    side: "right",
    ghost: "FRAME",
    blend: false,
  },
];

const MAKING_STEPS = [
  "/making/step1.png",
  "/making/step2.png",
  "/making/step3.png",
  "/making/step4.png",
  "/making/step5.png",
  "/making/step6.png",
  "/making/step7.png",
  "/making/step8.png",
];

const GROUP_BRANDS = [
  { name: "Varioform", logo: "/brands/varioform-cw.png", size: "h-24 sm:h-28", href: "", sub: "" },
  { name: "Grosch Ergonomics", logo: "/brands/grosch-w.png", size: "h-32 sm:h-40", href: "/brands/grosch", sub: "" },
  { name: "Covelli", logo: "/brands/covelli-c.png", size: "h-24 sm:h-28", href: "/brands/covelli", sub: "" },
  { name: "Incasa", logo: "/brands/incasa-w.png", size: "h-20 sm:h-24", href: "https://www.kukahomekolkata.com", sub: "" },
  { name: "Element", logo: "/brands/element-w.png", size: "h-32 sm:h-40", href: "", sub: "" },
];

const STATS = [
  { value: 120, suffix: "+", label: "QUALITY CHECKPOINTS" },
  { value: 10, suffix: " YR", label: "FRAME WARRANTY" },
  { value: 100, suffix: "%", label: "BUILT IN-HOUSE" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV_LINKS: [string, string][] = [
  ["TECHNOLOGY", "#technology"],
  ["PROCESS", "#process"],
  ["BRANDS", "#group"],
  ["BECOME OUR DEALER", "#dealer"],
  ["CONTACT", "#contact"],
];

function Navbar() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: reduceMotion ? 0 : -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-[var(--color-brand)] px-5 py-3 sm:px-10"
      >
        <a href="#top" className="cursor-pointer" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Verritas"
            width={150}
            height={50}
            preload
            className="h-9 w-auto sm:h-10"
          />
        </a>

        <div className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="cursor-pointer text-[11px] font-semibold tracking-[0.25em] text-white/60 transition-colors duration-200 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="cursor-pointer text-white sm:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-[var(--color-ink)] px-8 sm:hidden"
          >
            {NAV_LINKS.map(([label, href], i) => (
              <motion.a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: reduceMotion ? 0 : 0.08 + i * 0.06,
                }}
                className="cursor-pointer border-b border-white/10 py-4 text-[28px] font-black tracking-[-0.01em] text-white"
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProductionCounter() {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    if (reduceMotion) {
      count.set(1000);
      return;
    }
    const controls = animate(count, 1000, {
      duration: 8,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [count, reduceMotion]);

  return (
    <span className="flex items-baseline gap-3 whitespace-nowrap">
      <motion.span className="text-4xl font-black tracking-[-0.02em] text-white tabular-nums sm:text-5xl">
        {rounded}
      </motion.span>
      <span className="text-[11px] font-semibold tracking-[0.25em] text-white/50">
        SOFA UNITS MADE TODAY
      </span>
    </span>
  );
}

function Technology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const durationRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // "Camera" pulls back as the sofa explodes so the full teardown stays framed.
    // On phones the portrait video already fills the width, so don't zoom in
    // (that would crop the sofa's sides) — desktop fits by height, so it can.
    const small = window.innerWidth < 640;
    const SCALE_START = small ? 1.0 : 1.4;
    const SCALE_END = small ? 0.86 : 0.9;

    if (reduceMotion) {
      video.style.transform = `scale(${small ? 1.0 : 1.05})`;
      video.loop = true;
      video.play().catch(() => {});
      return;
    }

    let raf = 0;
    let target = 0;
    let cancelled = false;
    let objectUrl = "";

    // Scrubbing currentTime against the network source makes backward seeks
    // (which need a fresh byte-range request) far slower than forward ones —
    // the sofa "explodes" fine scrolling down but stalls/won't reassemble
    // scrolling back up. Loading the whole (small, ~2MB) clip into memory
    // once means every seek, either direction, is instant.
    fetch("/explode.webm")
      .then((res) => res.blob())
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
      })
      .catch(() => {});

    const measure = () => {
      const container = containerRef.current;
      if (!container) return -1;
      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      target =
        scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      return rect.bottom < 0 || rect.top > window.innerHeight ? 1 : 0;
    };

    // The last stretch of the clip spreads the parts out further than we
    // want to show (springs fan out, an extra base layer appears) — cap
    // playback so scrolling through the rest of the section just holds on
    // this frame instead of continuing to explode further.
    const EXPLODE_CAP = 0.62;

    // Self-correcting loop: only issue a new seek when the decoder is idle
    // (native video.seeking === false), so seeks are never flooded.
    const tick = () => {
      const offscreen = measure();
      const duration =
        durationRef.current ||
        (Number.isFinite(video.duration) ? video.duration : 0);
      const capped = Math.min(target, EXPLODE_CAP);

      if (duration && !video.seeking) {
        const t = capped * duration;
        if (Math.abs(video.currentTime - t) > 0.02) video.currentTime = t;
      }
      const scale = SCALE_START + (SCALE_END - SCALE_START) * capped;
      video.style.transform = `translateY(-2%) scale(${scale.toFixed(3)})`;
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(Math.max(0, 1 - target / 0.18));
      }
      raf = offscreen === 1 ? 0 : requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [reduceMotion]);

  return (
    <div
      id="technology"
      ref={containerRef}
      className="relative bg-[var(--color-ink)]"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="h-full w-full origin-center object-contain will-change-transform"
          aria-hidden
          onLoadedMetadata={(e) => {
            durationRef.current = e.currentTarget.duration;
            if (!reduceMotion) {
              e.currentTarget.pause();
              e.currentTarget.currentTime = 0;
            }
          }}
        >
          <source src="/explode.webm" type="video/webm" />
        </video>

        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-x-0 top-0 px-5 pt-28 sm:px-10"
        >
          <p className="text-[11px] font-semibold tracking-[0.35em] text-white/50">
            OUR TECHNOLOGY
          </p>
          <h2 className="mt-3 max-w-2xl text-[clamp(2rem,6vw,4.5rem)] font-black leading-[0.95] tracking-[-0.02em] text-white">
            LOOK INSIDE. SCROLL TO OPEN IT UP.
          </h2>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
  };
  const line: Variants = {
    hidden: { y: reduceMotion ? 0 : "110%" },
    show: { y: 0, transition: { duration: 0.9, ease: EASE } },
  };
  const fade: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section
      id="top"
      className="relative flex h-svh w-full flex-col justify-center overflow-hidden bg-[var(--color-ink)]"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        aria-hidden
      >
        <source src="/sofa-anatomy.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-[var(--color-ink)]/60"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 px-5 pt-20 pb-40 sm:px-10"
      >
        <motion.p
          variants={fade}
          className="mb-5 text-[11px] font-semibold tracking-[0.35em] text-white/50 sm:text-xs"
        >
          SOFA MANUFACTURING — EASTERN INDIA
        </motion.p>
        <h1 className="break-words text-[clamp(2.25rem,8vw,8.5rem)] font-black leading-[0.92] tracking-[-0.03em] text-white">
          <span className="block overflow-hidden">
            <motion.span variants={line} className="block">
              EASTERN INDIA&apos;S #1
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={line} className="block">
              SOFA MANUFACTURER
            </motion.span>
          </span>
        </h1>
        <motion.a
          variants={fade}
          href="#technology"
          className="group mt-10 inline-flex cursor-pointer items-center gap-3 text-white/60 transition-colors duration-200 hover:text-white"
        >
          <span className="text-[11px] font-semibold tracking-[0.35em]">
            SCROLL TO DISCOVER
          </span>
          <motion.span
            animate={reduceMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
          </motion.span>
        </motion.a>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden bg-[var(--color-ink)] py-4">
        <div className="marquee-track flex w-max items-center gap-8 px-4 sm:gap-12">
          {[0, 1].map((copy) => (
            <span
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-center gap-8 sm:gap-12"
            >
              {MAKING_STEPS.map((src, i) => (
                <Image
                  key={`${copy}-${src}`}
                  src={src}
                  alt={
                    copy === 0
                      ? `Sofa making — step ${i + 1} of ${MAKING_STEPS.length}`
                      : ""
                  }
                  width={220}
                  height={160}
                  className="h-20 w-auto sm:h-24"
                />
              ))}
              <ProductionCounter />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Anatomy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0);

  // Horizontal chapter: the build travels sideways, like a production line,
  // while the page scrolls down. Distance is measured from the real track
  // width so it always lands exactly on the last stage at any screen size.
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    if (reduceMotion) {
      track.style.transform = "none";
      return;
    }

    let raf = 0;
    const tick = () => {
      raf = 0;
      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p =
        scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      const distance = Math.max(0, track.scrollWidth - window.innerWidth);
      track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      const next = Math.min(
        STAGES.length - 1,
        Math.round(p * (STAGES.length - 1))
      );
      // only re-render on an actual stage change, not on every scroll frame
      setStage((prev) => (prev === next ? prev : next));
      return rect.bottom < 0 || rect.top > window.innerHeight ? 1 : 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div
      id="process"
      ref={containerRef}
      className="relative bg-[var(--color-paper)]"
      style={{ height: `${STAGES.length * 90}vh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-20">
        <div className="flex items-end justify-between px-5 sm:px-10">
          <p className="text-[11px] font-semibold tracking-[0.35em] text-[var(--color-ink-muted)]">
            THE PROCESS — SCROLL
          </p>
          <p className="text-[11px] font-semibold tracking-[0.35em] text-[var(--color-brand)] tabular-nums">
            {STAGES[stage].number} / {STAGES[STAGES.length - 1].number}
          </p>
        </div>

        {/* the line itself */}
        <div
          ref={trackRef}
          className="mt-6 flex w-max items-center gap-8 px-5 will-change-transform sm:gap-16 sm:px-10"
        >
          {STAGES.map((s, i) => (
            <article
              key={s.number}
              className="flex w-[78vw] flex-none items-center gap-6 sm:w-[62vw] sm:gap-10 lg:w-[46vw]"
            >
              <div className="relative aspect-[4/5] w-[42%] flex-none">
                <Image
                  src={s.image}
                  alt={`${s.name} — construction stage ${s.number}`}
                  fill
                  sizes="(max-width: 768px) 40vw, 22vw"
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <span
                  className={`block text-[clamp(3rem,7vw,6rem)] font-black leading-none tracking-[-0.04em] transition-colors duration-500 ${
                    i === stage
                      ? "text-[var(--color-brand)]"
                      : "text-[var(--color-ink)]/20"
                  }`}
                >
                  {s.number}
                </span>
                <h2 className="mt-2 text-[clamp(1.3rem,3vw,2.4rem)] font-black leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)]">
                  {s.name}
                </h2>
                <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                  {s.spec}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* travel indicator */}
        <div className="mt-10 px-5 sm:px-10">
          <div className="relative h-px w-full bg-[var(--color-ink)]/15">
            <span
              ref={barRef}
              className="absolute inset-y-0 left-0 w-full origin-left bg-[var(--color-brand)]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ComponentInterlude({ component }: { component: BrandComponent }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const fromLeft = component.side === "left";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const slide = useTransform(
    scrollYProgress,
    [0.05, 0.4],
    fromLeft ? ["-65%", "0%"] : ["65%", "0%"]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0.05, 0.5],
    fromLeft ? [-14, 0] : [14, 0]
  );
  const opacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
  const drift = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const ghostX = useTransform(
    scrollYProgress,
    [0, 1],
    fromLeft ? ["8%", "-8%"] : ["-8%", "8%"]
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden bg-[var(--color-ink)] px-5 py-24 sm:px-10"
    >
      <motion.span
        aria-hidden
        style={reduceMotion ? {} : { x: ghostX }}
        className="outline-number pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(6rem,22vw,20rem)] font-black leading-none whitespace-nowrap opacity-60"
      >
        {component.ghost}
      </motion.span>

      <div
        className={`relative grid w-full items-center gap-10 md:grid-cols-2 md:gap-16 ${
          fromLeft ? "" : "md:[&>*:first-child]:order-2"
        }`}
      >
        <motion.div
          style={
            reduceMotion ? {} : { x: slide, rotate, opacity, y: drift }
          }
          className={`relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-md md:max-w-[34vw] ${
            component.blend === "multiply"
              ? "mix-blend-multiply"
              : component.blend === "screen"
                ? "mix-blend-screen"
                : ""
          }`}
        >
          <Image
            src={component.image}
            alt={component.title}
            fill
            sizes="(max-width: 768px) 85vw, 40vw"
            className="object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <p className="text-[11px] font-semibold tracking-[0.35em] text-white/45">
            {component.tag}
          </p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-black leading-[0.95] tracking-[-0.02em] text-white">
            {component.title}
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/70">
            {component.copy}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Brands() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="group"
      ref={ref}
      className="bg-[var(--color-brand)] px-5 py-24 sm:px-10 sm:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p className="text-[11px] font-semibold tracking-[0.35em] text-white/50">
          VERRITAS GROUP
        </p>
        <Kinetic
          text="OUR BRANDS"
          className="mt-4 max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)] font-black leading-[0.95] tracking-[-0.02em] text-white"
        />
      </motion.div>

      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {GROUP_BRANDS.map((brand, i) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.08 }}
            className="flex min-h-[140px] items-center justify-center px-3 py-6"
          >
            {(() => {
              const inner = (
                <span className="flex flex-col items-center gap-2">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={280}
                    height={160}
                    className={`${brand.size} w-auto max-w-full object-contain`}
                  />
                  {brand.sub ? (
                    <span className="text-[10px] font-semibold tracking-[0.4em] text-white/70">
                      {brand.sub}
                    </span>
                  ) : null}
                </span>
              );
              const linkClass =
                "flex cursor-pointer items-center justify-center opacity-90 transition-opacity duration-200 hover:opacity-100";
              if (brand.href.startsWith("http")) {
                return (
                  <a
                    href={brand.href}
                    aria-label={brand.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {inner}
                  </a>
                );
              }
              return brand.href ? (
                <Link href={brand.href} aria-label={brand.name} className={linkClass}>
                  {inner}
                </Link>
              ) : (
                <span className="flex items-center justify-center opacity-90">
                  {inner}
                </span>
              );
            })()}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function StatNumber({
  value,
  suffix,
  trigger,
}: {
  value: number;
  suffix: string;
  trigger: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    if (!trigger) return;
    if (reduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.4, ease: "easeOut" });
    return () => controls.stop();
  }, [trigger, value, reduceMotion, count]);

  return (
    <span className="text-[clamp(3rem,8vw,6rem)] font-black leading-none tracking-[-0.03em] text-[var(--color-accent)]">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });

  return (
    <section
      ref={ref}
      className="bg-[var(--color-brand)] px-5 py-24 sm:px-10 sm:py-32"
    >
      <p className="text-[11px] font-semibold tracking-[0.35em] text-white/50">
        BY THE NUMBERS
      </p>
      <div className="mt-10 grid gap-12 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <StatNumber
              value={stat.value}
              suffix={stat.suffix}
              trigger={inView}
            />
            <p className="mt-3 text-[11px] font-semibold tracking-[0.3em] text-white/55">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DealerForm() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = fd.get("name") as string;
    const company = fd.get("company") as string;
    const city = fd.get("city") as string;
    const phone = fd.get("phone") as string;
    const email = fd.get("email") as string;
    const message = fd.get("message") as string;

    setStatus("sending");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "dealer",
          name,
          company,
          city,
          phone,
          email,
          message,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      form.reset();
    } catch {
      // Backend not reachable/configured — fall back to opening the
      // visitor's own mail client with everything pre-filled, so the
      // enquiry is never simply lost.
      const subject = `Dealer Enquiry — ${company}`;
      const body = [
        `Name: ${name}`,
        `Company / Firm: ${company}`,
        `City: ${city}`,
        `Phone: ${phone}`,
        email ? `Email: ${email}` : null,
        message ? `\nMessage:\n${message}` : null,
      ]
        .filter(Boolean)
        .join("\n");
      window.location.href = `mailto:smayanpoddar@gmail.com,shreevar@verritas.in,bhanu@verritas.in?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border-b border-[var(--color-ink)]/20 bg-transparent py-3 text-[16px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] outline-none transition-colors duration-200 focus:border-[var(--color-brand)] disabled:opacity-50";

  return (
    <section
      id="dealer"
      ref={ref}
      className="bg-[var(--color-paper)] px-5 py-24 sm:px-10 sm:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto max-w-3xl"
      >
        <p className="text-[11px] font-semibold tracking-[0.35em] text-[var(--color-ink-muted)]">
          TRADE & PARTNERSHIPS
        </p>
        <Kinetic
          text="BECOME OUR DEALER."
          className="mt-4 text-[clamp(2.2rem,6vw,4.5rem)] font-black leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)]"
        />
        <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
          Join our network of 250+ dealers across Eastern India. Tell us
          about your business and our team will get back to you.
        </p>

        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-12 border-l-2 border-[var(--color-brand)] bg-white/60 px-6 py-5"
          >
            <p className="text-[15px] font-semibold text-[var(--color-ink)]">
              Thanks — your enquiry is in.
            </p>
            <p className="mt-1 text-[14px] text-[var(--color-ink-muted)]">
              Our team will get back to you shortly.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2"
          >
            <input
              name="name"
              type="text"
              required
              disabled={status === "sending"}
              placeholder="Full name"
              className={inputClass}
            />
            <input
              name="company"
              type="text"
              required
              disabled={status === "sending"}
              placeholder="Company / firm name"
              className={inputClass}
            />
            <input
              name="city"
              type="text"
              required
              disabled={status === "sending"}
              placeholder="City"
              className={inputClass}
            />
            <input
              name="phone"
              type="tel"
              required
              disabled={status === "sending"}
              placeholder="Phone / WhatsApp"
              className={inputClass}
            />
            <input
              name="email"
              type="email"
              disabled={status === "sending"}
              placeholder="Email (optional)"
              className={`${inputClass} sm:col-span-2`}
            />
            <textarea
              name="message"
              rows={3}
              disabled={status === "sending"}
              placeholder="Tell us about your business (optional)"
              className={`${inputClass} resize-none sm:col-span-2`}
            />

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="cursor-pointer bg-[var(--color-ink)] px-8 py-4 text-[11px] font-semibold tracking-[0.25em] text-white transition-colors duration-200 hover:bg-[var(--color-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
              >
                {status === "sending" ? "SENDING…" : "SUBMIT ENQUIRY"}
              </button>
              {status === "error" && (
                <p className="mt-3 text-[13px] text-[var(--color-ink-muted)]">
                  Couldn&apos;t reach our server, so we&apos;ve opened your
                  email app instead — just hit send.
                </p>
              )}
            </div>
          </motion.form>
        )}
      </motion.div>
    </section>
  );
}

function Closing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      ref={ref}
      className="flex min-h-svh flex-col justify-between bg-[var(--color-ink)] px-5 pt-32 sm:px-10"
    >
      <div>
        <Kinetic
          text="BUILT TO LAST."
          className="text-[clamp(2.25rem,8vw,8.5rem)] font-black leading-[0.92] tracking-[-0.03em] text-white"
        />
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href="mailto:bhanu@verritas.in"
            className="cursor-pointer bg-white px-8 py-4 text-[11px] font-semibold tracking-[0.25em] text-[var(--color-ink)] transition-colors duration-200 hover:bg-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            ENQUIRE NOW
          </a>
          <a
            href="tel:+919836124365"
            className="cursor-pointer text-[16px] font-semibold text-white transition-colors duration-200 hover:text-[var(--color-accent)]"
          >
            +91 98361 24365
          </a>
        </motion.div>
        <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-white/70">
          Get in touch to explore our range or start a partnership.
        </p>
      </div>

      <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-8">
        <span className="inline-block bg-[var(--color-brand)] px-3 py-2">
          <Image
            src="/logo.png"
            alt="Verritas"
            width={120}
            height={40}
            className="h-7 w-auto"
          />
        </span>
        <p className="text-[11px] font-semibold tracking-[0.25em] text-white/35">
          © {new Date().getFullYear()} VERRITAS — FURNITURE MANUFACTURING
        </p>
      </footer>
    </section>
  );
}

export default function Home() {
  return (
    <main className="w-full overflow-x-clip bg-[var(--color-ink)] text-white">
      <SmoothScroll />
      <Cursor />
      <ScrollRail />
      <Navbar />
      <Hero />
      <Technology />
      <ComponentInterlude component={BRAND_COMPONENTS[0]} />
      <ComponentInterlude component={BRAND_COMPONENTS[1]} />
      <ComponentInterlude component={BRAND_COMPONENTS[2]} />
      <Brands />
      <Anatomy />
      <Stats />
      <DealerForm />
      <Closing />
    </main>
  );
}
