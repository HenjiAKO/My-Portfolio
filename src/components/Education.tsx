import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";
import { useTranslation } from "../i18n/context";

export function Education() {
  const { t } = useTranslation();

  const education = [
    {
      degreeKey: "education.degree1",
      institutionKey: "education.institution1",
      periodKey: "education.period1",
      statusKey: "education.status1",
      locationKey: "education.location1",
      descKey: "education.desc1",
      statusClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      gpaKey: "education.gpa_ongoing",
      gpaClass: "border-blue-200 text-blue-700 bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:bg-blue-900/20",
      current: true,
      subjects: ["Data Structures", "Algorithms", "Object-Oriented Programming", "Database Systems", "Software Engineering"],
    },
    {
      degreeKey: "education.degree2",
      institutionKey: "education.institution2",
      periodKey: "education.period2",
      statusKey: "education.status2",
      locationKey: "education.location2",
      descKey: "education.desc2",
      statusClass: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      gpaKey: "education.gpa_standing",
      gpaClass: "border-green-200 text-green-700 bg-green-50 dark:border-green-800 dark:text-green-400 dark:bg-green-900/20",
      current: false,
      subjects: ["Mathematics", "Physics", "Computer Programming", "Research", "English"],
    },
    {
      degreeKey: "education.degree3",
      institutionKey: "education.institution3",
      periodKey: "education.period3",
      statusKey: "education.status3",
      locationKey: "education.location3",
      descKey: "education.desc3",
      statusClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      gpaKey: "education.gpa_honor",
      gpaClass: "border-amber-200 text-amber-700 bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:bg-amber-900/20",
      current: false,
      subjects: ["Mathematics", "Science", "English", "Filipino", "History"],
    },
  ];

  return (
    <section id="education" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t("education.title")}{" "}
            <span className="text-primary">{t("education.subtitle")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("education.description")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

            {education.map((edu, index) => (
              <motion.div
                key={edu.degreeKey}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative mb-8 md:mb-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                  className={`absolute left-6 w-4 h-4 rounded-full border-4 border-background shadow hidden md:block ${
                    edu.current ? "bg-primary" : "bg-muted-foreground/50"
                  }`}
                />

                <div className="md:ml-16">
                  <Card
                    className={`border border-border bg-card hover:shadow-md transition-all duration-300 ${
                      edu.current ? "ring-1 ring-primary/20" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <GraduationCap className={`w-5 h-5 ${edu.current ? "text-primary" : "text-muted-foreground"}`} />
                            <h3 className="text-xl font-bold text-foreground">
                              {t(edu.degreeKey as any)}
                            </h3>
                            {edu.current && (
                              <Badge className="bg-primary text-primary-foreground">
                                <BookOpen className="w-3 h-3 mr-1" />
                                {t("education.current")}
                              </Badge>
                            )}
                          </div>
                          <p className={`text-lg font-semibold ${edu.current ? "text-primary" : "text-foreground"}`}>
                            {t(edu.institutionKey as any)}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{t(edu.periodKey as any)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{t(edu.locationKey as any)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 lg:mt-0 flex flex-col space-y-2">
                          <Badge variant="outline" className={edu.gpaClass}>
                            {edu.gpaKey === "education.gpa_honor" && <Award className="w-3 h-3 mr-1" />}
                            {t(edu.gpaKey as any)}
                          </Badge>
                          <Badge className={edu.statusClass}>{t(edu.statusKey as any)}</Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {t(edu.descKey as any)}
                      </p>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3">{t("education.subjects")}</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.subjects.map((subject, subjectIndex) => (
                            <motion.div
                              key={subject}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: (index * 0.15) + (subjectIndex * 0.05), type: "spring", stiffness: 200 }}
                              viewport={{ once: true }}
                            >
                              <Badge
                                variant="secondary"
                                className="bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                              >
                                {subject}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
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
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">{t("education.goals_title")}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  {t("education.goals_desc")}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
