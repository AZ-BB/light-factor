"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import type { PortfolioProject, PortfolioSection } from "@/types/content"

interface PortfolioProps {
  content: PortfolioSection;
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export default function Portfolio({ content }: PortfolioProps) {
  const projects = content.projects
  const [selected, setSelected] = useState<PortfolioProject | null>(null)
  const [index, setIndex] = useState(0)

  const images = selected?.images ?? []
  const total = images.length

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? total - 1 : i - 1))
  }, [total])

  const goNext = useCallback(() => {
    setIndex((i) => (i >= total - 1 ? 0 : i + 1))
  }, [total])

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null)
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected, goPrev, goNext])

  const openProject = (p: PortfolioProject) => {
    setSelected(p)
    setIndex(0)
  }

  return (
    <section id={content.id} className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">
            {content.label}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-soft-white tracking-tight">
            {content.title}
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
            <motion.button
              key={p.title}
              type="button"
              onClick={() => openProject(p)}
              variants={item}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-charcoal border border-white/5 w-full text-left"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity z-10" />
              <div className="absolute inset-0">
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-accent/80 text-xs uppercase tracking-wider">
                  {p.category}
                </span>
                <h3 className="font-display text-xl font-semibold text-soft-white mt-1">
                  {p.title}
                </h3>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 shrink-0">
              <h3 className="font-display text-lg font-semibold text-soft-white">
                {selected.title}
              </h3>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="p-2 text-soft-white/70 hover:text-soft-white rounded-sm transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center relative px-14 py-8 min-h-0">
              {total > 1 && (
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/20 bg-background/80 text-soft-white hover:bg-accent hover:text-background hover:border-accent transition-colors flex items-center justify-center"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              <div className="relative w-full max-w-5xl aspect-video mx-auto">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 rounded-sm overflow-hidden bg-charcoal"
                  >
                    <Image
                      src={images[index]}
                      alt={`${selected.title} — ${index + 1} of ${total}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {total > 1 && (
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/20 bg-background/80 text-soft-white hover:bg-accent hover:text-background hover:border-accent transition-colors flex items-center justify-center"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {total > 1 && (
              <div className="flex items-center justify-center gap-2 py-4 shrink-0">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === index ? "bg-accent scale-125" : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
