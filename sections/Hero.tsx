"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/Button";
import ScrollIndicator from "@/components/ScrollIndicator";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row lg:min-h-screen w-full">
        {/* Left column — copy (45%) */}
        <div className="flex-[9] flex flex-col justify-end px-6 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-20 min-w-0 scale-100 max-[1600px]:scale-[0.8]">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-accent text-xs sm:text-sm uppercase tracking-[0.35em] font-semibold mb-4 lg:mb-6">
              Light Faktor
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-[0.95] text-soft-white">
              A New Light for
              <br />
              <span className="inline-block mt-1 px-3 py-0.5 bg-accent text-background">
                Egypt&apos;s Future
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-soft-white/80 text-xl sm:text-2xl font-medium mt-6 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            Inspired by History. Powered by Light.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease }}
          >
            <Button href="#portfolio" className="uppercase font-bold tracking-[0.2em]">
              View Our Work
            </Button>
          </motion.div>
        </div>

        {/* Right column — image panel (55%) */}
        <motion.div
          className="relative flex-[11] min-h-[40vh] lg:min-h-full w-full lg:w-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          <div className="absolute inset-0 bg-charcoal">
            <Image
              src="/1.jpg"
              alt="Architectural lighting — Light Faktor"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
            <div className="absolute inset-0 bg-background/40" aria-hidden />
          </div>
        </motion.div>
      </div>

      {/* Full-width accent bar */}
      <div className="w-full h-2 bg-accent shrink-0" aria-hidden />

      {/* <ScrollIndicator /> */}
    </section>
  );
}
