import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code2, Heart, Target, Zap } from "lucide-react";
import { useTranslation } from "../i18n/context";

export function About() {
  const { t } = useTranslation();

  const interests = [
    { icon: <Code2 className="w-5 h-5" />, label: t("about.interest_web"), color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    { icon: <Heart className="w-5 h-5" />, label: t("about.interest_game"), color: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400" },
    { icon: <Target className="w-5 h-5" />, label: t("about.interest_problem"), color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
    { icon: <Zap className="w-5 h-5" />, label: t("about.interest_innovation"), color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t("about.title")}{" "}
            <span className="text-primary">{t("about.subtitle")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("about.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">{t("about.story")}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t("about.story1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("about.story2")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">{t("about.experience")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("about.experience_desc")}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.label}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="secondary"
                    className={`${interest.color} flex items-center space-x-1 p-2 justify-center w-full`}
                  >
                    {interest.icon}
                    <span className="text-xs">{interest.label}</span>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl" />
              <Card className="relative overflow-hidden border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="h-96 bg-gradient-to-br from-blue-50 to-slate-100 dark:from-blue-900/20 dark:to-slate-800 flex items-center justify-center">
                    <div className="text-center">
                      <Code2 className="w-20 h-20 text-primary/30 mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg">{t("about.passion_creates")}</p>
                      <p className="text-primary font-semibold text-xl mt-1">{t("about.passion_desc")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
