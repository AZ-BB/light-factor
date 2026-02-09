"use client";

import { motion } from "framer-motion";

const projects = [
  { title: "Heritage Museum", category: "Heritage" },
  { title: "Riverside Tower", category: "Facade" },
  { title: "Cultural Center", category: "Interior" },
  { title: "Historic Square", category: "Urban" },
  { title: "Luxury Resort", category: "Hospitality" },
  { title: "Corporate HQ", category: "Commercial" },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">
            Portfolio
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-soft-white tracking-tight">
            Selected Work
          </h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {projects.map((p) => (
            <motion.a
              key={p.title}
              href="#"
              variants={item}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-charcoal border border-white/5"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity z-10" />
              <div className="absolute inset-0 flex items-center justify-center text-soft-white/15 text-sm">
                [ Image ]
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-accent/80 text-xs uppercase tracking-wider">
                  {p.category}
                </span>
                <h3 className="font-display text-xl font-semibold text-soft-white mt-1">
                  {p.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
