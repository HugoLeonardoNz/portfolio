import { GlobalStyles } from "./components/GlobalStyles";
import { SideRail }     from "./components/SideRail";
import { Hero }         from "./components/Hero";
import { Ticker }       from "./components/Ticker";
import { Sobre }        from "./components/Sobre";
import { OQueEntrego }  from "./components/OQueEntrego";
import { Skills }       from "./components/Skills";
import { Analises }     from "./components/Analises";
import { Projects }     from "./components/Projects";
import { Experience }   from "./components/Experience";
import { Contact }      from "./components/Contact";
import { Footer }       from "./components/Footer";
import { C }            from "./theme";

export default function Index() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <GlobalStyles />
      <SideRail />
      <Hero />
      <Ticker />
      <Sobre />
      <OQueEntrego />
      <Skills />
      <Analises />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
