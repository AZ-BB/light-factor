"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

type MotionElement = "div" | "p" | "article" | "ol" | "li" | "section" | "span" | "form";

interface MotionWrapperProps extends Omit<HTMLMotionProps<MotionElement>, "children"> {
  children: ReactNode;
  as?: MotionElement;
}

export default function MotionWrapper({
  children,
  as = "div",
  ...motionProps
}: MotionWrapperProps) {
  const components = {
    div: motion.div,
    p: motion.p,
    article: motion.article,
    ol: motion.ol,
    li: motion.li,
    section: motion.section,
    span: motion.span,
    form: motion.form,
  };
  
  const MotionComponent = components[as];
  
  return (
    // @ts-ignore
    <MotionComponent {...motionProps}>
      {children}
    </MotionComponent>
  );
}
