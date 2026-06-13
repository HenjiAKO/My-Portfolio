import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Briefcase, Calendar, MapPin, CheckCircle } from "lucide-react";
import { useTranslation } from "../i18n/context";

export function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t("experience.title")}{" "}
            <span className="text-primary">{t("experience.subtitle")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("experience.description")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative mb-12"
            >
              <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow hidden md:block" />
              <div className="md:ml-16">
                <Card className="border border-border bg-card hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-5 h-5 text-primary" />
                          <h3 className="text-xl font-bold text-foreground">
                            {t("experience.data_title")}
                          </h3>
                        </div>
                        <p className="text-lg font-semibold text-primary">
                          {t("experience.data_company")}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{t("experience.data_period")}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{t("experience.data_location")}</span>
                          </div>
                          <Badge variant="outline" className="border-border text-muted-foreground">
                            {t("experience.data_type")}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {t("experience.data_desc")}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">
                          {t("experience.achievements")}
                        </h4>
                        <ul className="space-y-2">
                          {[1, 2, 3, 4].map((i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1, duration: 0.4 }}
                              viewport={{ once: true }}
                              className="flex items-start space-x-2"
                            >
                              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {t(`experience.achievement${i}` as any)}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3">
                          {t("experience.skills")}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {["Database Management", "Data Entry", "Quality Assurance", "Technical Documentation"].map(
                            (skill, skillIndex) => (
                              <motion.div
                                key={skill}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: skillIndex * 0.05, type: "spring", stiffness: 200 }}
                                viewport={{ once: true }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                                >
                                  {skill}
                                </Badge>
                              </motion.div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Card className="border border-border bg-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {t("experience.opportunity_title")}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  {t("experience.opportunity_desc")}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
