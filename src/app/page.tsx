"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
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
    image: "/01.jpg",
  },
  {
    number: "02",
    name: "BACK SUPPORT",
    spec: "Tensioned roller webbing anchored across the backrest for lasting posture",
    image: "/02.jpg",
  },
  {
    number: "03",
    name: "THE DECK",
    spec: "Interlaced elastic webbing distributing weight evenly across the seat",
    image: "/03.jpg",
  },
  {
    number: "04",
    name: "THE SPRINGS",
    spec: "Tempered serpentine springs hand-clipped to the frame, zone by zone",
    image: "/04.jpg",
  },
  {
    number: "05",
    name: "THE FOAM",
    spec: "High-density cold-cured foam sculpted to hold its shape for decades",
    image: "/05.jpg",
  },
  {
    number: "06",
    name: "THE WRAP",
    spec: "Quilted fiber comfort layer — the difference you feel in the first second",
    image: "/06.jpg",
  },
  {
    number: "07",
    name: "THE RESULT",
    spec: "Full-grain leather, contrast piping, double-stitched seams. Done.",
    image: "/07.jpg",
  },
];

const MARQUEE_WORDS = [
  "FRAME",
  "WEBBING",
  "SPRINGS",
  "FOAM",
  "FIBER",
  "LEATHER",
  "STITCH",
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
    image: "/components/frame-wood.png",
    tag: "COMPONENT — THE FRAME",
    title: "BONES OF KILN-DRIED HARDWOOD.",
    copy: "Every Verritas piece starts as a machine-jointed hardwood skeleton, steel-plated at the load corners. Built square, built to stay square.",
    side: "right",
    ghost: "FRAME",
    blend: "screen",
  },
];

const GROUP_BRANDS = [
  "VARIOFORM",
  "GROSCH ERGONOMICS",
  "COVELLI",
  "INCASA",
  "ELEMENT",
];

const STATS = [
  { value: 120, suffix: "+", label: "QUALITY CHECKPOINTS" },
  { value: 10, suffix: " YR", label: "FRAME WARRANTY" },
  { value: 100, suffix: "%", label: "BUILT IN-HOUSE" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function Navbar() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.nav
      initial={{ y: reduceMotion ? 0 : -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-[var(--color-brand)] px-5 py-3 sm:px-10"
    >
      <a href="#top" className="cursor-pointer">
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
        {[
          ["PROCESS", "#process"],
          ["BRANDS", "#group"],
          ["CONTACT", "#contact"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="cursor-pointer text-[11px] font-bold tracking-[0.25em] text-white/60 transition-colors duration-200 hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
    </motion.nav>
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
      className="relative flex h-svh w-full flex-col justify-end overflow-hidden bg-[var(--color-ink)]"
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
        className="relative z-10 px-5 pb-28 sm:px-10"
      >
        <motion.p
          variants={fade}
          className="mb-5 text-[11px] font-bold tracking-[0.35em] text-white/50 sm:text-xs"
        >
          FURNITURE MANUFACTURING — EST. WITH NOTHING TO HIDE
        </motion.p>
        <h1 className="text-[clamp(3rem,11vw,9.5rem)] font-black leading-[0.92] tracking-[-0.03em] text-white">
          <span className="block overflow-hidden">
            <motion.span variants={line} className="block">
              BUILT FROM
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={line} className="block">
              THE BONES UP.
            </motion.span>
          </span>
        </h1>
        <motion.div
          variants={fade}
          className="mt-8 flex flex-wrap items-center gap-6"
        >
          <a
            href="#process"
            className="cursor-pointer bg-white px-7 py-4 text-[11px] font-bold tracking-[0.25em] text-[var(--color-ink)] transition-colors duration-200 hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            SEE THE PROCESS ↓
          </a>
          <p className="max-w-xs text-[13px] leading-relaxed text-white/55">
            We manufacture every frame, spring and seam ourselves — and we show
            you all of it.
          </p>
        </motion.div>
      </motion.div>

      <div className="relative z-10 overflow-hidden border-t border-white/15 bg-[var(--color-ink)]/80 py-3">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => (
            <span key={copy} aria-hidden={copy === 1} className="flex">
              {MARQUEE_WORDS.map((word) => (
                <span
                  key={`${copy}-${word}`}
                  className="mx-6 text-[12px] font-bold tracking-[0.4em] text-white/40"
                >
                  {word} <span className="ml-6 text-white/20">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Anatomy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(
      STAGES.length - 1,
      Math.max(0, Math.floor(v * STAGES.length))
    );
    setStage(next);
  });

  const current = STAGES[stage];

  return (
    <div
      id="process"
      ref={containerRef}
      className="relative bg-[var(--color-paper)]"
      style={{ height: `${STAGES.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden px-5 pt-16 sm:px-10">
        <p className="text-[11px] font-bold tracking-[0.35em] text-[var(--color-ink-muted)]">
          THE PROCESS — SCROLL
        </p>

        <div className="mt-4 grid flex-none items-center gap-6 md:grid-cols-2 md:gap-14">
          <div className="relative order-2 md:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.number}
                initial={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -28 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <span className="block text-[clamp(5rem,14vw,11rem)] font-black leading-none tracking-[-0.04em] text-[var(--color-brand)]">
                  {current.number}
                </span>
                <h2 className="mt-2 text-[clamp(1.8rem,4.5vw,3.5rem)] font-black leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)]">
                  {current.name}
                </h2>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                  {current.spec}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex gap-2">
              {STAGES.map((s, i) => (
                <span
                  key={s.number}
                  className={`h-1 flex-1 transition-colors duration-300 ${
                    i <= stage ? "bg-[var(--color-brand)]" : "bg-[var(--color-ink)]/15"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative order-1 mx-auto aspect-[4/5] w-full max-w-[280px] sm:max-w-sm md:order-2 md:max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.image}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={`${current.name} — construction stage ${current.number}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 40vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
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
          <p className="text-[11px] font-bold tracking-[0.35em] text-white/45">
            {component.tag}
          </p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-black leading-[0.95] tracking-[-0.02em] text-white">
            {component.title}
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55">
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
        <p className="text-[11px] font-bold tracking-[0.35em] text-white/50">
          VERRITAS GROUP
        </p>
        <h2 className="mt-4 max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)] font-black leading-[0.95] tracking-[-0.02em] text-white">
          OUR BRANDS
        </h2>
      </motion.div>

      <div className="mt-14 grid grid-cols-2 gap-px bg-white/15 sm:grid-cols-3 lg:grid-cols-5">
        {GROUP_BRANDS.map((brand, i) => (
          <motion.div
            key={brand}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.08 }}
            className="flex min-h-[110px] items-center justify-center bg-[var(--color-brand)] px-4 py-8"
          >
            <span className="text-center text-[13px] font-black tracking-[0.2em] text-white/80">
              {brand}
            </span>
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
    <span className="text-[clamp(3rem,8vw,6rem)] font-black leading-none tracking-[-0.03em] text-white">
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
      <p className="text-[11px] font-bold tracking-[0.35em] text-white/50">
        PROOF, NOT PROMISES
      </p>
      <div className="mt-10 grid gap-12 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <StatNumber
              value={stat.value}
              suffix={stat.suffix}
              trigger={inView}
            />
            <p className="mt-3 text-[11px] font-bold tracking-[0.3em] text-white/55">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
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
        <motion.h2
          initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.92] tracking-[-0.03em] text-white"
        >
          NOTHING
          <br />
          TO HIDE.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href="mailto:hello@verritas.com"
            className="cursor-pointer bg-white px-8 py-4 text-[11px] font-bold tracking-[0.25em] text-[var(--color-ink)] transition-colors duration-200 hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            TALK TO US
          </a>
          <p className="max-w-xs text-[13px] leading-relaxed text-white/50">
            Visit the workshop, open up a frame, count the staples yourself.
          </p>
        </motion.div>
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
        <p className="text-[11px] font-bold tracking-[0.25em] text-white/35">
          © {new Date().getFullYear()} VERRITAS — FURNITURE MANUFACTURING
        </p>
      </footer>
    </section>
  );
}

export default function Home() {
  return (
    <main className="w-full overflow-x-clip bg-[var(--color-ink)] text-white">
      <Navbar />
      <Hero />
      <ComponentInterlude component={BRAND_COMPONENTS[0]} />
      <ComponentInterlude component={BRAND_COMPONENTS[1]} />
      <ComponentInterlude component={BRAND_COMPONENTS[2]} />
      <Brands />
      <Anatomy />
      <Stats />
      <Closing />
    </main>
  );
}
