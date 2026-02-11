import { headers } from "next/headers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Services from "@/sections/Services";
import Portfolio from "@/sections/Portfolio";
import Process from "@/sections/Process";
import Values from "@/sections/Values";
import Contact from "@/sections/Contact";
import { getContent } from "@/lib/content";
import {
  getLanguageFromHeaders,
  resolveLanguage,
} from "@/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const headersList = await headers();
  const headerLang = getLanguageFromHeaders(headersList);
  const availableLanguages = Object.keys(content.languages);
  const lang = resolveLanguage(headerLang, availableLanguages);
  const langContent = content.languages[lang] ?? content.languages.en;
  return {
    title: langContent.metadata.title,
    description: langContent.metadata.description,
  };
}

export default async function Home() {
  const content = await getContent();
  const headersList = await headers();
  const headerLang = getLanguageFromHeaders(headersList);
  const availableLanguages = Object.keys(content.languages);
  const lang = resolveLanguage(headerLang, availableLanguages);
  const langContent = content.languages[lang] ?? content.languages.en;

  return (
    <main className="ltr rtl">
      <Nav
        content={langContent.navigation}
        currentLang={lang}
        availableLanguages={availableLanguages}
      />
      <Hero content={langContent.sections.hero} />
      <About content={langContent.sections.about} />
      <Services content={langContent.sections.services} />
      <Portfolio content={langContent.sections.portfolio} />
      <Process content={langContent.sections.process} />
      <Values content={langContent.sections.values} />
      <Contact content={langContent.sections.contact} />
      <Footer content={langContent.footer} />
    </main>
  );
}
