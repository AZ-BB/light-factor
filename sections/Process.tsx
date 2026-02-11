import MotionWrapper from "@/components/MotionWrapper";
import type { ProcessSection } from "@/types/content";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const stepItem = { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } };

interface ProcessProps {
  content: ProcessSection;
}

export default function Process({ content }: ProcessProps) {
  return (
    <section id={content.id} className="py-24 md:py-32 px-6 bg-charcoal/30">
      <div className="max-w-4xl mx-auto">
        <MotionWrapper
          className="text-center mb-20"
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
          as="ol"
          className="relative"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent hidden md:block" />
          {content.steps.map((step) => (
            <MotionWrapper
              key={step.number}
              as="li"
              variants={stepItem}
              className="relative flex gap-8 md:gap-12 pb-16 last:pb-0"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-accent/60 flex items-center justify-center bg-background text-accent font-display text-sm font-semibold">
                {step.number}
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-soft-white mb-2">
                  {step.title}
                </h3>
                <p className="text-soft-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </MotionWrapper>
      </div>
    </section>
  );
}
