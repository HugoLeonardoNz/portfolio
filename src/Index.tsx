import { useEffect } from "react";
import { Topbar } from "./components/Topbar";
import { Hero } from "./components/Hero";
import { Sobre } from "./components/Sobre";
import { Projects } from "./components/Projects";
import { Oficio } from "./components/Oficio";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { iniciarMovimento } from "./motion";

export default function Index() {
  useEffect(() => { iniciarMovimento(); }, []);
  return (
    <>
      <a href="#sobre" className="pular">Pular para o conteúdo</a>
      <Topbar />
      <main>
        <Hero />
        <Sobre />
        <Projects />
        <Oficio />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
