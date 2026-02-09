"use client";

import { motion } from "framer-motion";

const services = [
  { title: "Heritage Lighting", description: "Restoration and enhancement of historic sites with light.", icon: "◇" },
  { title: "Architectural Facades", description: "Dynamic illumination for buildings and urban landmarks.", icon: "▣" },
  { title: "Interior Lighting", description: "Ambient and task lighting for commercial and residential.", icon: "○" },
  { title: "Smart Systems", description: "Integrated controls and sustainable solutions.", icon: "◐" },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const card = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-6 bg-charcoal/30">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">What We Do</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-soft-white tracking-tight">
            Lighting Solutions
          </h2>
        </motion.div>
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((s) => (
            <motion.article
              key={s.title}
              variants={card}
              className="group relative p-8 rounded-sm border border-white/10 bg-background/50 hover:border-accent/30 transition-colors duration-300 overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative">
                <span className="text-accent text-2xl mb-4 block opacity-80 group-hover:opacity-100 transition-opacity">{s.icon}</span>
                <h3 className="font-display text-lg font-semibold text-soft-white mb-2">{s.title}</h3>
                <p className="text-soft-white/60 text-sm leading-relaxed">{s.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
