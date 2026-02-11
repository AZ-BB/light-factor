import type {
  LanguageContent,
  HeroSection,
  AboutSection,
  ServicesSection,
  PortfolioSection,
  ProcessSection,
  ValuesSection,
  ContactSection,
  Footer,
} from "@/types/content";

export function createEmptyLanguageContent(
  langCode: string,
  alignment: "ltr" | "rtl" = "ltr"
): LanguageContent {
  return {
    alignment,
    metadata: {
      title: "",
      description: "",
    },
    navigation: {
      logo: { image: "", alt: "" },
      links: [],
    },
    sections: {
      hero: createEmptyHero(),
      about: createEmptyAbout(),
      services: createEmptyServices(),
      portfolio: createEmptyPortfolio(),
      process: createEmptyProcess(),
      values: createEmptyValues(),
      contact: createEmptyContact(),
    },
    footer: createEmptyFooter(),
  };
}

export function createEmptyHero(): HeroSection {
  return {
    id: "hero",
    brand: "",
    title: "",
    titleHighlight: "",
    subtitle: "",
    cta: { text: "", href: "" },
    image: { url: "", alt: "" },
  };
}

export function createEmptyAbout(): AboutSection {
  return {
    id: "about",
    label: "",
    title: "",
    paragraphs: [],
    image: { url: "", alt: "" },
  };
}

export function createEmptyServices(): ServicesSection {
  return {
    id: "services",
    label: "",
    title: "",
    items: [],
  };
}

export function createEmptyPortfolio(): PortfolioSection {
  return {
    id: "portfolio",
    label: "",
    title: "",
    projects: [],
  };
}

export function createEmptyProcess(): ProcessSection {
  return {
    id: "process",
    label: "",
    title: "",
    steps: [],
  };
}

export function createEmptyValues(): ValuesSection {
  return {
    id: "values",
    label: "",
    title: "",
    items: [],
  };
}

export function createEmptyContact(): ContactSection {
  return {
    id: "contact",
    label: "",
    title: "",
    form: {
      fields: [],
      submit: { text: "", success: "" },
    },
  };
}

export function createEmptyFooter(): Footer {
  return {
    title: "",
    branches: [],
    emails: [],
    closing: "",
  };
}
