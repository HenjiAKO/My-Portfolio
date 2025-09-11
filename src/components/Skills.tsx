import { motion } from 'motion/react';
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Code, Database, Gamepad2, Globe, Layers, Zap } from 'lucide-react';

export function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "C#", level: 40, color: "bg-purple-500" },
        { name: "JavaScript", level: 35, color: "bg-yellow-500" },
        { name: "HTML/CSS", level: 50, color: "bg-orange-500" },
        { name: "SQL", level: 20, color: "bg-blue-500" },
      ]
    },
    {
      title: "Frameworks & Libraries",
      icon: <Layers className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      skills: [
        { name: ".NET Framework", level: 20, color: "bg-indigo-500" },
        { name: "MonoGame", level: 0, color: "bg-green-500" },
        { name: "React", level: 20, color: "bg-cyan-500" },
        { name: "ASP.NET", level: 10, color: "bg-blue-600" },
      ]
    },
    {
      title: "Game Development",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "from-pink-500 to-red-500",
      skills: [
        { name: "Game Design", level: 0, color: "bg-pink-500" },
        { name: "Aseprite", level: 2, color: "bg-red-500" },
        { name: "2D Graphics", level: 10, color: "bg-purple-600" },
        { name: "Game Logic", level: 5, color: "bg-indigo-600" },
      ]
    },
    {
      title: "Web Development",
      icon: <Globe className="w-6 h-6" />,
      color: "from-green-500 to-teal-500",
      skills: [
        { name: "Frontend Development", level: 20, color: "bg-green-500" },
        { name: "Backend Development", level: 25, color: "bg-teal-500" },
        { name: "Database Design", level: 10, color: "bg-blue-500" },
        { name: "API Development", level: 0, color: "bg-purple-500" },
      ]
    },
  ];

  const tools = [
    "Visual Studio", "Git", "GitHub", "Aseprite", 
    "Figma", "VS Code", "SQL Server", "MONOGAME(learning)"
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div 
                        key={skill.name}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.1), duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.15), duration: 1 }}
                            viewport={{ once: true }}
                            className={`h-2 rounded-full ${skill.color}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Tools & Technologies</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 transition-all duration-300"
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