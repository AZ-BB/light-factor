import Image from "next/image";
import Button from "@/components/Button";
import MotionWrapper from "@/components/MotionWrapper";
import type { HeroSection } from "@/types/content";

const ease = [0.22, 1, 0.36, 1] as const;

interface HeroProps {
  content: HeroSection;
}

export default function Hero({ content }: HeroProps) {
  return (
    <section
      id={content.id}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row lg:min-h-screen w-full">
        <div className="flex-[9] flex flex-col justify-end px-6 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-20 min-w-0 scale-100 md:scale-[0.85] min-[1600px]:scale-100 origin-bottom-left">
          <MotionWrapper
            className="max-w-2xl"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-accent text-xs sm:text-sm uppercase tracking-[0.35em] font-semibold mb-4 lg:mb-6">
              {content.brand}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-[0.95] text-soft-white">
              {content.title}
              <br />
              {content.titleHighlight ? (
                <span className="inline-block mt-1 px-3 py-0.5 bg-accent text-background">
                  {content.titleHighlight}
                </span>
              ) : null}
            </h1>
          </MotionWrapper>

          <MotionWrapper
            as="p"
            className="text-soft-white/80 text-xl sm:text-2xl font-medium mt-6 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            {content.subtitle}
          </MotionWrapper>

          <MotionWrapper
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease }}
          >
            <Button
              href={content.cta.href}
              className="uppercase font-bold tracking-[0.2em]"
            >
              {content.cta.text}
            </Button>
          </MotionWrapper>
        </div>

        <MotionWrapper
          className="relative flex-[11] min-h-[40vh] lg:min-h-full w-full lg:w-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          <div className="absolute inset-0 bg-charcoal">
            <Image
              src={content.image.url}
              alt={content.image.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
            <div className="absolute inset-0 bg-background/40" aria-hidden />
          </div>
        </MotionWrapper>
      </div>

      <div className="w-full h-2 bg-accent shrink-0" aria-hidden />
    </section>
  );
}
