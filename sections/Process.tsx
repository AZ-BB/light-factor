"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discovery", desc: "Understanding your vision and constraints." },
  { num: "02", title: "Concept", desc: "Design direction and lighting strategy." },
  { num: "03", title: "Design", desc: "Detailed plans, specs, and visualizations." },
  { num: "04", title: "Delivery", desc: "Installation, commissioning, and handover." },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const stepItem = { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } };

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32 px-6 bg-charcoal/30">
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">How We Work</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-soft-white tracking-tight">
            Our Process
          </h2>
        </motion.div>
        <motion.ol
          className="relative"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent hidden md:block" />
          {steps.map((step) => (
            <motion.li key={step.num} variants={stepItem} className="relative flex gap-8 md:gap-12 pb-16 last:pb-0">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-accent/60 flex items-center justify-center bg-background text-accent font-display text-sm font-semibold">
                {step.num}
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-soft-white mb-2">{step.title}</h3>
                <p className="text-soft-white/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
