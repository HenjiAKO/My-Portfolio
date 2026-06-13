import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { motion } from "motion/react";
import { Gamepad2, Maximize2, Minimize2 } from "lucide-react";
import { createGameConfig } from "./config";
import { gameBus } from "./GameEventBus";
import { InfoPanel } from "./ui/InfoPanel";
export default function GameSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [started, setStarted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (started && containerRef.current && !gameRef.current) {
      const config = createGameConfig(containerRef.current);
      gameRef.current = new Phaser.Game(config);
      gameRef.current.events.on("ready", () => {
        gameRef.current!.registry.set("sessionSeed", Math.floor(Math.random() * 100000));
      });
    }
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [started]);

  const toggleFullscreen = () => {
    const el = containerRef.current?.parentElement;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setFullscreen(false));
    }
  };

  return (
    <section data-game-section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
            <span className="font-terminal text-xs text-primary tracking-wider uppercase">
              PORTFOLIO
            </span>
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-foreground">Explore Playing a </span>
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Game
            </span>
          </h2>
          <p className="text-sm text-muted-foreground font-terminal">
            &gt; Navigate through and interact with objects to discover my work.
            <span className="animate-blink ml-0.5 text-primary">|</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-border shadow-2xl">
            <div ref={containerRef} className="absolute inset-0 w-full h-full" />

            {!started && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center px-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/30 to-blue-500/30 flex items-center justify-center border border-primary/30">
                    <Gamepad2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-white font-terminal tracking-wider">
                    PORTFOLIO<br />ADVENTURE
                  </h3>
                  <button
                    onClick={() => setStarted(true)}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-terminal tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                  >
                    <Gamepad2 className="w-5 h-5" />
                    PLAY NOW!
                  </button>
                </div>
              </div>
            )}

            {started && (
              <button
                onClick={toggleFullscreen}
                className="absolute top-3 right-3 z-20 p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white/80 hover:text-white transition-all"
                title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <InfoPanel />
    </section>
  );
}
