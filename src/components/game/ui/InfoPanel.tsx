import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { gameBus } from "../GameEventBus";
import { Button } from "../../ui/button";
import { useTranslation } from "../../../i18n/context";

const sectionInfo: Record<string, { title: string; desc: string }> = {
  about: { title: "about.title", desc: "about.description" },
  skills: { title: "skills.title", desc: "skills.description" },
  projects: { title: "projects.title", desc: "projects.description" },
  experience: { title: "experience.title", desc: "experience.description" },
  education: { title: "education.title", desc: "education.description" },
  contact: { title: "contact.title", desc: "contact.description" },
};

export function InfoPanel() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [sectionId, setSectionId] = useState<string>("");

  useEffect(() => {
    const handler = (id: string) => {
      setSectionId(id);
      setOpen(true);
    };
    gameBus.on("open-section", handler);
    return () => gameBus.off("open-section", handler);
  }, []);

  const info = sectionInfo[sectionId];

  const scrollToSection = () => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && info && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-terminal text-xs text-primary tracking-wider uppercase">
                &gt; {sectionId}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t(info.title as any)}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {t(info.desc as any)}
            </p>
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-terminal tracking-wider"
              onClick={scrollToSection}
            >
              &gt; Visit {sectionId}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
