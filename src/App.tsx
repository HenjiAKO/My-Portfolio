import { lazy, Suspense } from "react";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Terminal } from "./components/Terminal";
import { LanguageProvider } from "./i18n/context";

const GameSection = lazy(() => import("./components/game/GameSection"));

function GameFallback() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="w-full aspect-video bg-muted rounded-xl border border-border animate-pulse flex items-center justify-center">
            <p className="text-muted-foreground font-terminal text-sm">Loading game...</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Suspense fallback={<GameFallback />}>
            <GameSection />
          </Suspense>
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer />
        <Terminal />
        <Toaster position="top-right" />
      </div>
    </LanguageProvider>
  );
}
