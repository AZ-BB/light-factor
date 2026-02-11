import Image from "next/image";
import MotionWrapper from "@/components/MotionWrapper";
import type { AboutSection } from "@/types/content";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

interface AboutProps {
  content: AboutSection;
}

export default function About({ content }: AboutProps) {
  return (
    <section id={content.id} className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper
          className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <MotionWrapper variants={item}>
            <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">
              {content.label}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-soft-white mb-6 tracking-tight">
              {content.title}
            </h2>
            {content.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i < content.paragraphs.length - 1
                    ? "text-soft-white/70 leading-relaxed mb-4"
                    : "text-soft-white/70 leading-relaxed"
                }
              >
                {paragraph}
              </p>
            ))}
          </MotionWrapper>
          <MotionWrapper
            className="relative aspect-[4/3] rounded-sm overflow-hidden bg-charcoal border border-white/5"
            variants={item}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
            <Image
              src={content.image.url}
              alt={content.image.alt}
              fill
              className="object-cover object-center"
            />
          </MotionWrapper>
        </MotionWrapper>
      </div>
    </section>
  );
}
