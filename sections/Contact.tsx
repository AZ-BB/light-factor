"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import type { ContactSection } from "@/types/content";

interface ContactProps {
  content: ContactSection;
}

export default function Contact({ content }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id={content.id} className="py-24 md:py-32 px-6 bg-charcoal/30">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
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

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {content.form.fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm text-soft-white/70 mb-2"
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-background border border-white/10 rounded-sm text-soft-white placeholder:text-soft-white/40 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type as "text" | "email" | "tel"}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-background border border-white/10 rounded-sm text-soft-white placeholder:text-soft-white/40 focus:outline-none focus:border-accent/50 transition-colors"
                />
              )}
            </div>
          ))}

          {submitted ? (
            <p className="text-accent text-sm">{content.form.submit.success}</p>
          ) : (
            <Button type="submit" className="w-full sm:w-auto">
              {content.form.submit.text}
            </Button>
          )}
        </motion.form>
      </div>
    </section>
  );
}
