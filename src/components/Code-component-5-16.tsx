import { motion } from 'motion/react';
import { Button } from "./ui/button";
import { Download, Github, Facebook } from 'lucide-react';

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-purple-200/20 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">K</span>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Khyle
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6">
            {['about', 'skills', 'projects', 'experience', 'education', 'contact'].map((item, index) => (
              <motion.button
                key={item}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => scrollToSection(item)}
                className="hover:text-purple-600 transition-colors capitalize relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-purple-200 hover:bg-purple-50"
              onClick={() => window.open('https://github.com/HenjiAKO', '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Resume</span>
            </Button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}