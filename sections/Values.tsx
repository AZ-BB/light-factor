import MotionWrapper from "@/components/MotionWrapper";
import type { ValuesSection } from "@/types/content";

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

interface ValuesProps {
  content: ValuesSection;
}

export default function Values({ content }: ValuesProps) {
  return (
    <section id={content.id} className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper
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
        </MotionWrapper>

        <MotionWrapper
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {content.items.map((v) => (
            <MotionWrapper
              key={v.title}
              variants={card}
              className="p-8 rounded-sm border border-white/10 bg-charcoal/30 hover:border-accent/20 transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              <h3 className="font-display text-lg font-semibold text-accent mb-3">
                {v.title}
              </h3>
              <p className="text-soft-white/60 text-sm leading-relaxed">
                {v.description}
              </p>
            </MotionWrapper>
          ))}
        </MotionWrapper>
      </div>
    </section>
  );
}
