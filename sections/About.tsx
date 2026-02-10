"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={item}>
            <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">About Us</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-soft-white mb-6 tracking-tight">
              Where heritage meets innovation
            </h2>
            <p className="text-soft-white/70 leading-relaxed mb-4">
              Light Faktor specializes in architectural lighting that honors Egypts rich heritage
              while embracing forward-looking design. We create environments where light shapes
              space, emotion, and experience.
            </p>
            <p className="text-soft-white/70 leading-relaxed">
              From monumental projects to intimate interiors, we bring precision, artistry, and
              sustainable solutions to every commission.
            </p>
          </motion.div>
          <motion.div
            className="relative aspect-[4/3] rounded-sm overflow-hidden bg-charcoal border border-white/5"
            variants={item}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
            <Image
              src="/projects/doret-el-karz/1.png"
              alt="Marsa Alam Cultural Center"
              fill
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
