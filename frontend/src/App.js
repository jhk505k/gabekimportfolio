import { useEffect, lazy, Suspense } from "react";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import "@/App.css";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";

const About = lazy(() => import("@/components/About").then((m) => ({ default: m.About })));
const Skills = lazy(() => import("@/components/Skills").then((m) => ({ default: m.Skills })));
const Experience = lazy(() => import("@/components/Experience").then((m) => ({ default: m.Experience })));
const Projects = lazy(() => import("@/components/Projects").then((m) => ({ default: m.Projects })));
const Education = lazy(() => import("@/components/Education").then((m) => ({ default: m.Education })));
const Contact = lazy(() => import("@/components/Contact").then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));

const Home = () => (
  <>
    <Nav />
    <main>
      <Hero />
      <Marquee />
      <Suspense fallback={<div className="min-h-screen" />}>
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </>
);

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const onAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -64 });
      }
    };
    document.addEventListener("click", onAnchor);
    return () => {
      document.removeEventListener("click", onAnchor);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App bg-[#090A0F] min-h-screen">
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-[#090A0F]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster theme="dark" position="bottom-right" richColors />
    </div>
  );
}

export default App;
