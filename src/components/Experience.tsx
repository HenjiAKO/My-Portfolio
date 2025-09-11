import { motion } from 'motion/react';
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

export function Experience() {
  const experience = [
    {
      title: "Data Product Encoder",
      company: "ECOELEMENTS Inc.",
      type: "Work Immersion",
      period: "2023",
      location: "Philippines",
      description: "Gained valuable industry experience in database management and data accuracy maintenance across multiple platforms during my work immersion program.",
      achievements: [
        "Created and maintained accurate product data entries in the company's database system",
        "Ensured technical specifications and product attributes were properly cataloged",
        "Managed regular updates to product information across multiple platforms", 
        "Ensured consistency across all digital channels"
      ],
      skills: ["Database Management", "Data Entry", "Quality Assurance", "Technical Documentation"],
      current: false
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Work <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the valuable experiences that have shaped my career in technology
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 hidden md:block"></div>
            
            {experience.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative mb-8 md:mb-12"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-lg hidden md:block"></div>
                
                <div className="md:ml-16">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Briefcase className="w-5 h-5 text-purple-500" />
                            <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                            {exp.current && (
                              <Badge className="bg-green-100 text-green-700">Current</Badge>
                            )}
                          </div>
                          <p className="text-lg font-semibold text-purple-600">{exp.company}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </div>
                            <Badge variant="outline" className="w-fit border-purple-200 text-purple-700">
                              {exp.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {exp.description}
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Key Achievements</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achievementIndex) => (
                              <motion.li 
                                key={achievementIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: (index * 0.2) + (achievementIndex * 0.1), duration: 0.6 }}
                                viewport={{ once: true }}
                                className="flex items-start space-x-2"
                              >
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Skills Developed</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, skillIndex) => (
                              <motion.div
                                key={skill}
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                transition={{ delay: (index * 0.2) + (skillIndex * 0.05), type: "spring", stiffness: 200 }}
                                viewport={{ once: true }}
                              >
                                <Badge 
                                  variant="secondary" 
                                  className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200 transition-all duration-300"
                                >
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
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
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Looking for Opportunities</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  I'm actively seeking internship opportunities and entry-level positions in web development 
                  and game development where I can apply my skills and continue growing as a developer.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}