import { motion } from 'motion/react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink, Github, Calendar, Star } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: "Verse of Shadows",
      description: "An immersive indie game project featuring engaging gameplay mechanics and stunning pixel art visuals. This project showcases advanced game development concepts including character movement, collision detection, and interactive environments.",
      image: "https://images.unsplash.com/photo-1642678730255-40a9e1847fb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMGdhbWUlMjBwaXhlbCUyMGFydHxlbnwxfHx8fDE3NTc0Mzg3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["MonoGame", "C#", "Aseprite", "Game Design"],
      status: "In Development",
      featured: true,
      github: null,
      demo: null,
      year: "2024"
    },
    {
      title: "Snake Game",
      description: "A classic Snake game implementation demonstrating fundamental game development principles. Features smooth gameplay, score tracking, and collision detection systems built with modern C# practices.",
      image: "https://images.unsplash.com/photo-1618422168439-4b03d3a05b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwZGV2ZWxvcG1lbnQlMjBjb2RpbmclMjBzY3JlZW58ZW58MXx8fHwxNzU3NDY1Mjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["C#", "Game Logic", "OOP", "Visual Studio"],
      status: "Completed",
      featured: false,
      github: "https://github.com/HenjiAKO/SnakeGame",
      demo: null,
      year: "2023"
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing my projects and skills. Built with modern web technologies and featuring smooth animations, interactive elements, and a game-inspired design aesthetic.",
      image: "https://images.unsplash.com/photo-1555209183-8facf96a4349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NTczODIwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Motion"],
      status: "Live",
      featured: false,
      github: null,
      demo: "#",
      year: "2024"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Development": return "bg-yellow-100 text-yellow-700";
      case "Completed": return "bg-green-100 text-green-700";
      case "Live": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my latest work in web and game development, demonstrating my skills and passion for creating engaging digital experiences
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                project.featured ? 'ring-2 ring-purple-200 bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-white'
              }`}>
                <CardContent className="p-0">
                  <div className={`grid ${project.featured ? 'lg:grid-cols-2' : 'md:grid-cols-3'} gap-0`}>
                    <div className={`relative ${project.featured ? '' : 'md:col-span-1'} overflow-hidden`}>
                      {project.featured && (
                        <div className="absolute top-4 left-4 z-10">
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="h-full"
                      >
                        <ImageWithFallback 
                          src={project.image}
                          alt={project.title}
                          className={`w-full ${project.featured ? 'h-80' : 'h-48'} object-cover`}
                        />
                      </motion.div>
                    </div>
                    
                    <div className={`p-6 ${project.featured ? '' : 'md:col-span-2'} flex flex-col justify-between`}>
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className={`${project.featured ? 'text-2xl' : 'text-xl'} font-bold text-gray-900`}>
                              {project.title}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{project.year}</span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <motion.div
                              key={tech}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: (index * 0.1) + (techIndex * 0.05), type: "spring", stiffness: 200 }}
                              viewport={{ once: true }}
                            >
                              <Badge variant="outline" className="border-purple-200 text-purple-700">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-3 mt-6">
                        {project.github && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-purple-200 hover:bg-purple-50"
                            onClick={() => window.open(project.github, '_blank')}
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                        )}
                        {project.demo && (
                          <Button 
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            onClick={() => window.open(project.demo, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Project
                          </Button>
                        )}
                        {!project.github && !project.demo && (
                          <Badge variant="secondary" className="text-muted-foreground">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                    </div>
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
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">More projects coming soon!</p>
          <Button 
            variant="outline" 
            size="lg"
            className="border-purple-200 hover:bg-purple-50"
            onClick={() => window.open('https://github.com/HenjiAKO', '_blank')}
          >
            <Github className="w-4 h-4 mr-2" />
            View All On GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}