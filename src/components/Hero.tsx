import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ChevronDown, Code, Gamepad2 } from "lucide-react";
import { useTranslation } from "../i18n/context";

export function Hero() {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center space-x-2 text-sm"
            >
              <div className="flex items-center space-x-2 border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                <span className="text-xs font-terminal text-primary tracking-wider">{t("hero.available")}</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground"
            >
              {t("hero.greeting")}{" "}
              <span className="text-primary">{t("hero.name")}</span>
            </motion.h1>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center justify-center space-x-4 text-xl md:text-2xl text-muted-foreground"
            >
              <div className="flex items-center space-x-2">
                <Code className="w-6 h-6 text-primary" />
                <span>{t("hero.webdev")}</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center space-x-2">
                <Gamepad2 className="w-6 h-6 text-primary" />
                <span>{t("hero.gamedev")}</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-terminal text-sm tracking-wide"
            >
              <span className="text-primary">&gt;</span> {t("hero.description")}
              <span className="animate-blink ml-0.5 text-primary">|</span>
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  onClick={() => scrollToSection("about")}
                >
                  &gt; {t("hero.learnmore")}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border hover:bg-accent hover:border-primary/50 cursor-pointer transition-all duration-300 font-terminal tracking-wide"
                  onClick={() => scrollToSection("projects")}
                >
                  $ {t("hero.viewwork")}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => scrollToSection("about")}
            className="text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
