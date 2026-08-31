"use client";

import Image from "next/image";
import Link from "next/link";
import { Rubik } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const rubik = Rubik({ subsets: ["latin"], weight: ["400", "500", "700", "900"] });

const EASE = [0.16, 1, 0.3, 1] as const;

const SPECS = [
  { k: "Synchro-tilt", v: "Weight-sensing recline mechanism, 5 locking points" },
  { k: "120 kg", v: "Load-tested across 100,000 sit cycles" },
  { k: "12-year", v: "Mechanism warranty, in-house serviced" },
];

export default function GroschPage() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <main
      className={`${rubik.className} relative min-h-svh w-full overflow-hidden bg-[#0F172A] text-[#F8FAFC]`}
    >
      {/* blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#F8FAFC 1px, transparent 1px), linear-gradient(90deg, #F8FAFC 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 h-[60vmin] w-[60vmin] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #22C55E 0%, transparent 65%)" }}
      />
      {/* moving symbol watermark */}
      <motion.div
        aria-hidden
        initial={false}
        animate={
          reduceMotion
            ? {}
            : { y: [0, -26, 0], rotate: [-2, 2, -2] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-[10%] top-1/2 w-[70vw] max-w-[820px] -translate-y-1/2 opacity-30 sm:-right-[4%]"
      >
        <Image
          src="/brands/grosch-metal.png"
          alt=""
          width={820}
          height={347}
          className="h-auto w-full"
        />
      </motion.div>

      <Link
        href="/#group"
        className="absolute left-5 top-6 z-20 text-[11px] font-bold tracking-[0.25em] text-white/55 transition-colors duration-200 hover:text-white sm:left-10"
      >
        ← VERRITAS GROUP
      </Link>

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-6 py-28 sm:px-10"
      >
        <motion.div variants={item}>
          <Image
            src="/brands/grosch-w.png"
            alt="Grosch Ergonomics"
            width={360}
            height={170}
            className="h-24 w-auto sm:h-28"
          />
        </motion.div>

        <motion.span
          variants={item}
          className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-[#22C55E]/40 px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-[#22C55E]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
          ERGONOMIC SEATING
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 max-w-3xl text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.03em]"
        >
          ENGINEERED
          <br />
          TO SIT.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55"
        >
          Grosch builds office chairs the way a machine should be built — every
          mechanism measured, every joint rated, every recline tuned to the body
          that trusts it eight hours a day.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3"
        >
          {SPECS.map((s) => (
            <div key={s.k} className="bg-[#0F172A] p-6">
              <p className="text-2xl font-black tracking-[-0.02em] text-[#22C55E]">
                {s.k}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-white/55">
                {s.v}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-12">
          <a
            href="mailto:bhanu@verritas.in"
            className="inline-flex cursor-pointer items-center gap-3 bg-[#22C55E] px-8 py-4 text-[11px] font-bold tracking-[0.25em] text-[#0F172A] transition-colors duration-200 hover:bg-[#16A34A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E]"
          >
            ENQUIRE — TRADE &amp; CONTRACT →
          </a>
        </motion.div>
      </motion.section>
    </main>
  );
}
