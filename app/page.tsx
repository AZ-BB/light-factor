import Nav from "@/components/Nav";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Services from "@/sections/Services";
import Portfolio from "@/sections/Portfolio";
import Process from "@/sections/Process";
import Values from "@/sections/Values";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Values />
      <Contact />
    </main>
  );
}
