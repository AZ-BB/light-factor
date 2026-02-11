import MotionWrapper from "@/components/MotionWrapper";
import type { ServicesSection } from "@/types/content";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const card = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

interface ServicesProps {
  content: ServicesSection;
}

export default function Services({ content }: ServicesProps) {
  return (
    <section id={content.id} className="py-24 md:py-32 px-6 bg-charcoal/30">
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
          {content.items.map((s) => (
            <MotionWrapper
              key={s.title}
              as="article"
              variants={card}
              className="group relative p-8 rounded-sm border border-white/10 bg-background/50 hover:border-accent/30 transition-colors duration-300 overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative">
                <span className="text-accent text-2xl mb-4 block opacity-80 group-hover:opacity-100 transition-opacity">
                  {s.icon}
                </span>
                <h3 className="font-display text-lg font-semibold text-soft-white mb-2">
                  {s.title}
                </h3>
                <p className="text-soft-white/60 text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </MotionWrapper>
      </div>
    </section>
  );
}
