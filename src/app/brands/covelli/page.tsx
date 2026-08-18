"use client";

import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter-c" });

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C0A062";

const NOTES = [
  { k: "Sartoriale", v: "Hand-tailored leathers and bouclé, cut and stitched to order" },
  { k: "Su Misura", v: "Every frame made to the measure of its room" },
  { k: "Eredità", v: "A house style built to be inherited, not replaced" },
];

export default function CovelliPage() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <main
      className={`${playfair.variable} ${inter.variable} relative min-h-svh w-full overflow-hidden bg-[#14110F] text-[#F5F1E8]`}
      style={{ fontFamily: "var(--font-inter-c), sans-serif" }}
    >
      {/* soft gold vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-[130px]"
        style={{ background: `radial-gradient(circle, ${GOLD} 0%, transparent 60%)` }}
      />

      <Link
        href="/#group"
        className="absolute left-5 top-6 z-20 text-[11px] tracking-[0.3em] text-[#F5F1E8]/45 transition-colors duration-200 hover:text-[#F5F1E8] sm:left-10"
        style={{ fontFamily: "var(--font-inter-c), sans-serif" }}
      >
        ← VERRITAS GROUP
      </Link>

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center px-6 py-28 text-center"
      >
        <motion.div variants={item}>
          <Image
            src="/brands/covelli-c.png"
            alt="Covelli"
            width={300}
            height={180}
            className="h-28 w-auto sm:h-36"
          />
        </motion.div>

        <motion.span
          variants={item}
          className="mt-8 text-[11px] tracking-[0.45em] text-[#F5F1E8]/45"
          style={{ fontFamily: "var(--font-inter-c), sans-serif" }}
        >
          ISPIRAZIONE · DAL 1998
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 text-[clamp(2.5rem,7vw,5rem)] font-medium italic leading-[1.05]"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          The art of repose.
        </motion.h1>

        <motion.span
          variants={item}
          className="mt-8 block h-px w-16 bg-[var(--gold)]"
          style={{ ["--gold" as string]: GOLD }}
        />

        <motion.p
          variants={item}
          className="mt-8 max-w-lg text-[15px] leading-relaxed text-[#F5F1E8]/60"
          style={{ fontFamily: "var(--font-inter-c), sans-serif" }}
        >
          Covelli is Verritas at its most considered — a luxury seating line
          where Italian sensibility meets our own workshop. Fewer pieces, made
          slower, kept longer.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-14 grid w-full gap-8 sm:grid-cols-3"
        >
          {NOTES.map((n) => (
            <div key={n.k}>
              <p
                className="text-xl italic"
                style={{ fontFamily: "var(--font-playfair), serif", color: GOLD }}
              >
                {n.k}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#F5F1E8]/55">
                {n.v}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-14">
          <a
            href="mailto:covelli@verritas.in"
            className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden border px-10 py-4 text-[11px] tracking-[0.3em] transition-colors duration-300"
            style={{ borderColor: GOLD, color: GOLD, fontFamily: "var(--font-inter-c), sans-serif" }}
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
              style={{ background: GOLD }}
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#14110F]">
              REQUEST THE COLLECTION
            </span>
          </a>
        </motion.div>
      </motion.section>
    </main>
  );
}
