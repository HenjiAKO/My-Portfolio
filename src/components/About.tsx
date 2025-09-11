import { motion } from 'motion/react';
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Code2, Heart, Target, Zap } from 'lucide-react';

export function About() {
  const interests = [
    { icon: <Code2 className="w-5 h-5" />, label: "Web Development", color: "bg-purple-100 text-purple-700" },
    { icon: <Heart className="w-5 h-5" />, label: "Game Development", color: "bg-pink-100 text-pink-700" },
    { icon: <Target className="w-5 h-5" />, label: "Problem Solving", color: "bg-indigo-100 text-indigo-700" },
    { icon: <Zap className="w-5 h-5" />, label: "Innovation", color: "bg-yellow-100 text-yellow-700" },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my journey, passion, and what drives me to create amazing digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-800">My Story</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I'm a passionate Computer Science student at STI College Marikina, currently pursuing my BSCS degree. 
                  My journey in technology began during my senior high school years, where I discovered my love for both 
                  web and game development.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I thrive on creating engaging digital experiences and solving complex problems through code. 
                  My academic excellence, including graduating with honors from junior high school, reflects my 
                  dedication to continuous learning and growth in the tech industry.
                </p>
              </CardContent>
            </Card>

            <Card className="border-pink-100 bg-gradient-to-br from-pink-50 to-indigo-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-pink-800">Professional Experience</h3>
                <p className="text-muted-foreground leading-relaxed">
                  During my work immersion at ECOELEMENTS Inc. as a Data Product Encoder, I gained valuable 
                  industry experience in database management and maintaining data accuracy across multiple platforms. 
                  This experience taught me the importance of precision and consistency in technology solutions.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.label}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  <Badge variant="secondary" className={`${interest.color} flex items-center space-x-1 p-2 justify-center`}>
                    {interest.icon}
                    <span className="text-xs">{interest.label}</span>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 1, -1, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-2xl blur-2xl opacity-20"></div>
              <Card className="relative overflow-hidden border-0 shadow-xl">
                <CardContent className="p-0">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1555209183-8facf96a4349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NTczODIwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Coding workspace setup"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm opacity-90">My passion lies in creating</p>
                    <p className="font-semibold">Amazing Digital Experiences</p>
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