"use client";

import { motion } from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50";

  const styleMap = {
    primary:
      "bg-accent text-background hover:bg-accent/90 hover:shadow-glow active:scale-[0.98]",
    outline:
      "border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent active:scale-[0.98]",
    ghost:
      "text-soft-white/80 hover:text-accent hover:bg-white/5 active:scale-[0.98]",
  };
  const combined = `${base} ${styleMap[variant]} ${className}`;

  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={combined}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={combined}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
