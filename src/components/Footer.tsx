import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Heart, Github, Facebook, Mail, Phone, ArrowUp } from "lucide-react";
import { useTranslation } from "../i18n/context";

export function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { name: "GitHub", icon: <Github className="w-5 h-5" />, url: "https://github.com/HenjiAKO" },
    { name: "Facebook", icon: <Facebook className="w-5 h-5" />, url: "https://www.facebook.com/share/17F11dagbj/" },
    { name: "Email", icon: <Mail className="w-5 h-5" />, url: "mailto:macasilhigkyle@gmail.com" },
    { name: "Phone", icon: <Phone className="w-5 h-5" />, url: "tel:09625510712" },
  ];

  const quickLinks = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.experience"), href: "#experience" },
    { name: t("nav.education"), href: "#education" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold text-white">Khyle Macasilhig</span>
            </div>
            <p className="text-slate-400 leading-relaxed">{t("footer.description")}</p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
                  title={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">{t("footer.quick_links")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-primary transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">{t("footer.contact")}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-slate-400">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">macasilhigkyle@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">09625510712</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Github className="w-4 h-4 text-primary" />
                <span className="text-sm">@HenjiAKO</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">{t("footer.connect")}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t("footer.connect_desc")}</p>
            <div className="space-y-2">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-0" onClick={() => scrollToSection("#contact")}>
                {t("footer.get_in_touch")}
              </Button>
              <Button
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                onClick={() => window.open("https://github.com/HenjiAKO", "_blank")}
              >
                <Github className="w-4 h-4 mr-2" />
                {t("footer.view_github")}
              </Button>
            </div>
          </motion.div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-slate-400 text-sm">
            <span>&copy; {currentYear} Khyle Macasilhig. {t("footer.made_with")}</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>{t("footer.coffee")}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-500 text-sm">{t("footer.built_with")}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-slate-400 hover:text-primary hover:bg-white/10"
            >
              <ArrowUp className="w-4 h-4 mr-1" />
              {t("footer.top")}
            </Button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
