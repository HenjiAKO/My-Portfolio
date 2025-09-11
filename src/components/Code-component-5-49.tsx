import { motion } from 'motion/react';
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Heart, Github, Facebook, Mail, Phone, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/HenjiAKO",
      color: "hover:text-gray-700"
    },
    {
      name: "Facebook", 
      icon: <Facebook className="w-5 h-5" />,
      url: "https://www.facebook.com/share/17F11dagbj/",
      color: "hover:text-blue-600"
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:macasilhigkyle@gmail.com",
      color: "hover:text-purple-600"
    },
    {
      name: "Phone",
      icon: <Phone className="w-5 h-5" />,
      url: "tel:09625510712",
      color: "hover:text-green-600"
    }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Khyle Macasilhig
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Web & Game Developer passionate about creating engaging digital experiences with C# and .NET technologies.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 ${link.color}`}
                  title={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + (index * 0.05), duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-sm">macasilhigkyle@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4 text-pink-400" />
                <span className="text-sm">09625510712</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Github className="w-4 h-4 text-indigo-400" />
                <span className="text-sm">@HenjiAKO</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter/CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Let's Connect</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Interested in collaborating or have a project in mind? Let's create something amazing together!
            </p>
            <div className="space-y-2">
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0"
                onClick={() => scrollToSection('#contact')}
              >
                Get In Touch
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                onClick={() => window.open('https://github.com/HenjiAKO', '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                View GitHub
              </Button>
            </div>
          </motion.div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <span>© {currentYear} Khyle Macasilhig. Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>and lots of coffee</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">Built with React, TypeScript & Tailwind CSS</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-gray-400 hover:text-purple-400 hover:bg-white/10"
            >
              <ArrowUp className="w-4 h-4 mr-1" />
              Top
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </footer>
  );
}