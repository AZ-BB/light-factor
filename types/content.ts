// Content structure types matching content.json

export interface Metadata {
  title: string;
  description: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface Logo {
  image: string;
  alt: string;
}

export interface Navigation {
  logo: Logo;
  links: NavLink[];
}

export interface HeroSection {
  id: string;
  brand: string;
  title: string;
  /** Optional highlighted part of title (e.g. "Egypt's Future") */
  titleHighlight?: string;
  subtitle: string;
  cta: {
    text: string;
    href: string;
  };
  image: {
    url: string;
    alt: string;
  };
}

export interface AboutSection {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  image: {
    url: string;
    alt: string;
  };
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServicesSection {
  id: string;
  label: string;
  title: string;
  items: ServiceItem[];
}

export interface PortfolioProject {
  title: string;
  category: string;
  images: string[];
}

export interface PortfolioSection {
  id: string;
  label: string;
  title: string;
  projects: PortfolioProject[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessSection {
  id: string;
  label: string;
  title: string;
  steps: ProcessStep[];
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface ValuesSection {
  id: string;
  label: string;
  title: string;
  items: ValueItem[];
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

export interface ContactSection {
  id: string;
  label: string;
  title: string;
  form: {
    fields: FormField[];
    submit: {
      text: string;
      success: string;
    };
  };
}

export interface BranchItem {
  icon: string;
  text: string;
}

export interface Branch {
  name: string;
  items: BranchItem[];
}

export interface Footer {
  title: string;
  branches: Branch[];
  emails: string[];
  closing: string;
}

export interface Sections {
  hero: HeroSection;
  about: AboutSection;
  services: ServicesSection;
  portfolio: PortfolioSection;
  process: ProcessSection;
  values: ValuesSection;
  contact: ContactSection;
}

export type TextDirection = "ltr" | "rtl";

export interface LanguageContent {
  alignment?: TextDirection;
  metadata: Metadata;
  navigation: Navigation;
  sections: Sections;
  footer: Footer;
}

export interface ContentData {
  languages: {
    [key: string]: LanguageContent;
  };
}
