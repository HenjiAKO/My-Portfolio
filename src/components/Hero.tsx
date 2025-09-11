import { motion } from 'motion/react';
import { Button } from "./ui/button";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronDown, Code, Gamepad2 } from 'lucide-react';
import profile_img from '../assets/profile_img.jpg';

export function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 bg-gradient-to-r ${
              i % 3 === 0 ? 'from-purple-400 to-pink-400' :
              i % 3 === 1 ? 'from-indigo-400 to-purple-400' :
              'from-pink-400 to-indigo-400'
            } rounded-full opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex items-center space-x-2 text-sm"
            >
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">Available for opportunities</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Khyle
              </span>
            </motion.h1>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center space-x-4 text-xl md:text-2xl text-muted-foreground"
            >
              <div className="flex items-center space-x-2">
                <Code className="w-6 h-6 text-purple-500" />
                <span>Web Developer</span>
              </div>
              <span className="text-purple-300">•</span>
              <div className="flex items-center space-x-2">
                <Gamepad2 className="w-6 h-6 text-pink-500" />
                <span>Game Developer</span>
              </div>
            </motion.div>

            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              Passionate computer science student specializing in web and game development. 
              I create engaging digital experiences using C# and .NET technologies, bringing 
              creative ideas to life through code.
            </motion.p>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={scrollToAbout}
              >
                Learn More About Me
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-purple-200 hover:bg-purple-50"
                onClick={() => window.open('https://github.com/HenjiAKO', '_blank')}
              >
                View My Work
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-full blur-3xl opacity-20"
            />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-100">
              <ImageWithFallback 
                src={profile_img}
                alt="Professional developer portrait"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={scrollToAbout}
            className="text-purple-500 hover:text-purple-600 transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}