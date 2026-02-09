"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-charcoal/30">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">
            Get in Touch
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-soft-white tracking-tight">
            Start a Project
          </h2>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <label htmlFor="name" className="block text-sm text-soft-white/70 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your name"
              className="w-full px-4 py-3 bg-background border border-white/10 rounded-sm text-soft-white placeholder:text-soft-white/40 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-soft-white/70 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-background border border-white/10 rounded-sm text-soft-white placeholder:text-soft-white/40 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm text-soft-white/70 mb-2">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+20 XXX XXX XXXX"
              className="w-full px-4 py-3 bg-background border border-white/10 rounded-sm text-soft-white placeholder:text-soft-white/40 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm text-soft-white/70 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your project..."
              className="w-full px-4 py-3 bg-background border border-white/10 rounded-sm text-soft-white placeholder:text-soft-white/40 focus:outline-none focus:border-accent/50 transition-colors resize-none"
            />
          </div>

          {submitted ? (
            <p className="text-accent text-sm">Thank you. We&apos;ll be in touch.</p>
          ) : (
            <Button type="submit" className="w-full sm:w-auto">
              Start a Project
            </Button>
          )}
        </motion.form>
      </div>
    </section>
  );
}
