import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code, Database, Gamepad2, Globe, Layers, Zap } from "lucide-react";
import { useTranslation } from "../i18n/context";

export function Skills() {
  const { t } = useTranslation();

  const skillCategories = [
    {
      titleKey: "skills.programming",
      icon: <Code className="w-6 h-6" />,
      color: "bg-primary",
      skills: [
        { name: "C#", level: 40, color: "bg-primary" },
        { name: "JavaScript", level: 35, color: "bg-amber-500" },
        { name: "HTML/CSS", level: 50, color: "bg-orange-500" },
        { name: "SQL", level: 20, color: "bg-blue-500" },
      ],
    },
    {
      titleKey: "skills.frameworks",
      icon: <Layers className="w-6 h-6" />,
      color: "bg-sky-600",
      skills: [
        { name: ".NET Framework", level: 20, color: "bg-indigo-500" },
        { name: "MonoGame", level: 10, color: "bg-green-500" },
        { name: "React", level: 20, color: "bg-cyan-500" },
        { name: "ASP.NET", level: 10, color: "bg-blue-600" },
      ],
    },
    {
      titleKey: "skills.gamedev",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "bg-sky-600",
      skills: [
        { name: "Game Design", level: 10, color: "bg-pink-500" },
        { name: "Aseprite", level: 5, color: "bg-red-500" },
        { name: "2D Graphics", level: 10, color: "bg-purple-600" },
        { name: "Game Logic", level: 15, color: "bg-indigo-600" },
      ],
    },
    {
      titleKey: "skills.webdev",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-emerald-600",
      skills: [
        { name: "Frontend Development", level: 20, color: "bg-green-500" },
        { name: "Backend Development", level: 25, color: "bg-teal-500" },
        { name: "Database Design", level: 10, color: "bg-blue-500" },
        { name: "API Development", level: 5, color: "bg-purple-500" },
      ],
    },
  ];

  const tools = [
    "Visual Studio", "Git", "GitHub", "Aseprite",
    "Figma", "VS Code", "SQL Server", "MonoGame",
  ];

  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t("skills.title")}{" "}
            <span className="text-primary">{t("skills.subtitle")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("skills.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border border-border bg-card hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`p-3 rounded-lg ${category.color} text-white`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {t(category.titleKey as any)}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.1), duration: 0.8 }}
                            viewport={{ once: true }}
                            className={`h-2 rounded-full ${skill.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("skills.tools")}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                    >
                      {tool}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
