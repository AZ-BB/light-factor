"use client";

import { motion } from "framer-motion";

const values = [
  { title: "Integrity", desc: "Transparency and accountability in every project." },
  { title: "Innovation", desc: "Pushing boundaries with light and technology." },
  { title: "Sustainability", desc: "Efficient, responsible lighting for the future." },
  { title: "Excellence", desc: "Relentless attention to detail and craft." },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Values() {
  return (
    <section id="values" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">
            Our Foundation
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-soft-white tracking-tight">
            Values
          </h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={card}
              className="p-8 rounded-sm border border-white/10 bg-charcoal/30 hover:border-accent/20 transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              <h3 className="font-display text-lg font-semibold text-accent mb-3">
                {v.title}
              </h3>
              <p className="text-soft-white/60 text-sm leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
