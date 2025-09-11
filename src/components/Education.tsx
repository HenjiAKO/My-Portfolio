import { motion } from 'motion/react';
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

export function Education() {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science (BSCS)",
      institution: "STI College Marikina",
      period: "2024 - Present",
      status: "Current",
      location: "Marikina, Philippines",
      description: "Currently pursuing my bachelor's degree with a focus on software development, algorithms, and computer programming fundamentals.",
      subjects: ["Data Structures", "Algorithms", "Object-Oriented Programming", "Database Systems", "Software Engineering"],
      current: true,
      gpa: "Ongoing"
    },
    {
      degree: "Senior High School Graduate",
      institution: "STI College Marikina", 
      period: "2022 - 2024",
      status: "Completed",
      location: "Marikina, Philippines",
      description: "Completed senior high school education with a strong foundation in mathematics, science, and early programming concepts.",
      subjects: ["Mathematics", "Physics", "Computer Programming", "Research", "English"],
      current: false,
      gpa: "Good Standing"
    },
    {
      degree: "Junior High School Graduate",
      institution: "Missionary Sisters of the Sacred Heart",
      period: "2018 - 2022",
      status: "Completed with Honor",
      location: "Philippines",
      description: "Graduated with honors, demonstrating academic excellence and strong foundational knowledge across all core subjects.",
      subjects: ["Mathematics", "Science", "English", "Filipino", "History"],
      current: false,
      gpa: "With Honor"
    }
  ];

  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Education</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My academic journey and the educational foundation that supports my passion for technology and development
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 hidden md:block"></div>
            
            {education.map((edu, index) => (
              <motion.div
                key={edu.institution + edu.period}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative mb-8 md:mb-12"
              >
                {/* Timeline dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                  className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white shadow-lg hidden md:block ${
                    edu.current ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}
                ></motion.div>
                
                <div className="md:ml-16">
                  <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    edu.current 
                      ? 'bg-gradient-to-br from-green-50 to-blue-50 ring-2 ring-green-200' 
                      : 'bg-white/80 backdrop-blur-sm'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <GraduationCap className={`w-5 h-5 ${edu.current ? 'text-green-500' : 'text-purple-500'}`} />
                            <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                            {edu.current && (
                              <Badge className="bg-green-100 text-green-700">
                                <BookOpen className="w-3 h-3 mr-1" />
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className={`text-lg font-semibold ${edu.current ? 'text-green-600' : 'text-purple-600'}`}>
                            {edu.institution}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{edu.period}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{edu.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 lg:mt-0 flex flex-col space-y-2">
                          <Badge 
                            variant="outline" 
                            className={`w-fit ${
                              edu.gpa === "With Honor" 
                                ? 'border-yellow-300 text-yellow-700 bg-yellow-50' 
                                : edu.current 
                                ? 'border-green-300 text-green-700 bg-green-50'
                                : 'border-purple-200 text-purple-700 bg-purple-50'
                            }`}
                          >
                            {edu.gpa === "With Honor" && <Award className="w-3 h-3 mr-1" />}
                            {edu.gpa}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className={`w-fit ${
                              edu.status === "Completed with Honor" 
                                ? 'bg-yellow-100 text-yellow-700' 
                                : edu.current 
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {edu.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {edu.description}
                      </p>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Subjects</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.subjects.map((subject, subjectIndex) => (
                            <motion.div
                              key={subject}
                              initial={{ scale: 0, rotate: -180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              transition={{ delay: (index * 0.2) + (subjectIndex * 0.05), type: "spring", stiffness: 200 }}
                              viewport={{ once: true }}
                            >
                              <Badge 
                                variant="secondary" 
                                className={`${
                                  edu.current 
                                    ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700 hover:from-green-200 hover:to-blue-200' 
                                    : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200'
                                } transition-all duration-300`}
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <GraduationCap className="w-6 h-6 text-purple-500" />
                  <h3 className="text-xl font-semibold text-gray-900">Academic Goals</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Currently focused on mastering advanced programming concepts, software engineering principles, 
                  and building a strong foundation for a successful career in technology. I'm committed to 
                  maintaining academic excellence while gaining practical experience through personal projects.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}