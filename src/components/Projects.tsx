import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ExternalLink, Github, ChevronRight, Calendar } from "lucide-react";
import { useTranslation } from "../i18n/context";

const accentColors = [
  { border: "border-l-blue-500", glow: "shadow-blue-500/20", tag: "bg-blue-500/10 text-blue-400 border-blue-500/30", status: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
  { border: "border-l-emerald-500", glow: "shadow-emerald-500/20", tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", status: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
  { border: "border-l-purple-500", glow: "shadow-purple-500/20", tag: "bg-purple-500/10 text-purple-400 border-purple-500/30", status: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
  { border: "border-l-amber-500", glow: "shadow-amber-500/20", tag: "bg-amber-500/10 text-amber-400 border-amber-500/30", status: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
];

export function Projects() {
  const { t } = useTranslation();

  const projects = [
    {
      titleKey: "projects.ingat_title",
      descKey: "projects.ingat_desc",
      technologies: ["Unity", "C#", "ShaderLab", "Interactive Storytelling"],
      statusKey: "projects.status_development",
      github: "https://github.com/HenjiAKO/Ingat-Visual-Novel-Game",
      demo: null,
      year: "2025",
    },
    {
      titleKey: "projects.shooting_title",
      descKey: "projects.shooting_desc",
      technologies: ["MonoGame", "C#", "Game Design", "Visual Studio"],
      statusKey: "projects.status_completed",
      github: "https://github.com/HenjiAKO/Shooting-Game",
      demo: null,
      year: "2024",
    },
    {
      titleKey: "projects.snake_title",
      descKey: "projects.snake_desc",
      technologies: ["C#", "Game Logic", "OOP", "Visual Studio"],
      statusKey: "projects.status_completed",
      github: "https://github.com/HenjiAKO/SnakeGame",
      demo: null,
      year: "2023",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
            <span className="font-terminal text-xs text-primary tracking-wider uppercase">
              {t("nav.projects")}
            </span>
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">{t("projects.title")} </span>
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              {t("projects.subtitle")}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-terminal text-sm tracking-wide">
            &gt; {t("projects.description")}
            <span className="animate-blink ml-0.5 text-primary">|</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const colors = accentColors[index % accentColors.length];
            return (
              <motion.div
                key={project.titleKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <div className={`h-full bg-card border border-border border-l-2 ${colors.border} rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl ${colors.glow} hover:-translate-y-2 hover:border-primary/30`}>
                  <div className="relative overflow-hidden">
                    <div className="h-36 bg-gradient-to-br from-primary/5 via-card to-muted/50 flex items-center justify-center border-b border-border/50">
                      <div className="text-center p-4">
                        <div className="w-14 h-14 mx-auto mb-2 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center border border-primary/20">
                          <Github className="w-7 h-7 text-primary/60" />
                        </div>
                        <p className="text-xs font-terminal text-muted-foreground tracking-wider">
                          {project.technologies[0].toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`font-terminal text-[10px] px-2 py-1 rounded-full border ${colors.status} backdrop-blur-sm`}>
                        {t(project.statusKey as any)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {t(project.titleKey as any)}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-terminal">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{project.year}</span>
                      </div>
                      <span className="text-border">//</span>
                      <span className="text-primary/60">v1.0.0</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {t(project.descKey as any)}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`font-terminal text-[10px] px-2 py-0.5 rounded border ${colors.tag} tracking-wider uppercase`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                      {project.github && (
                        <button
                          onClick={() => window.open(project.github, "_blank")}
                          className="flex items-center gap-1.5 text-xs font-terminal text-muted-foreground hover:text-primary transition-colors tracking-wider uppercase"
                        >
                          <Github className="w-3.5 h-3.5" />
                          {t("projects.code")}
                        </button>
                      )}
                      {project.demo && (
                        <button
                          onClick={() => window.open(project.demo, "_blank")}
                          className="flex items-center gap-1.5 text-xs font-terminal text-primary hover:text-primary/80 transition-colors tracking-wider uppercase"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {t("projects.view")}
                        </button>
                      )}
                      {!project.github && !project.demo && (
                        <span className="text-[10px] font-terminal text-muted-foreground italic">
                          {t("projects.coming_soon")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground mb-4 font-terminal">
            <span className="text-primary">&gt;</span> {t("projects.more")}
          </p>
          <Button
            variant="outline"
            size="lg"
            className="group border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 font-terminal tracking-wider"
            onClick={() => window.open("https://github.com/HenjiAKO", "_blank")}
          >
            <Github className="w-4 h-4 mr-2" />
            {t("projects.view_all")}
            <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
