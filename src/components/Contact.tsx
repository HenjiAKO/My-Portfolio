import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Mail, Phone, Github, Facebook, Send, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "../i18n/context";

export function Contact() {
  const { t } = useTranslation();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "758b5e14-1910-46ae-a6e0-1621ec0066cb");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      toast.success(t("contact.success"));
      event.currentTarget.reset();
    } else {
      toast.error(t("contact.error"));
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "macasilhigkyle@gmail.com",
      action: () => window.open("mailto:macasilhigkyle@gmail.com"),
      color: "bg-primary",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "09625510712",
      action: () => window.open("tel:09625510712"),
      color: "bg-emerald-600",
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: "@HenjiAKO",
      action: () => window.open("https://github.com/HenjiAKO", "_blank"),
      color: "bg-slate-700 dark:bg-slate-600",
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      label: "Facebook",
      value: "Khyle Macasilhig",
      action: () => window.open("https://www.facebook.com/share/17F11dagbj/", "_blank"),
      color: "bg-blue-600",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t("contact.title")}{" "}
            <span className="text-primary">{t("contact.subtitle")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border border-border bg-card">
              <CardContent className="p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                    <Send className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{t("contact.send")}</h3>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("contact.name")}</Label>
                      <Input id="name" name="name" placeholder={t("contact.name_placeholder")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.email")}</Label>
                      <Input id="email" name="email" type="email" placeholder={t("contact.email_placeholder")} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("contact.subject")}</Label>
                    <Input id="subject" name="subject" placeholder={t("contact.subject_placeholder")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.message")}</Label>
                    <Textarea id="message" name="message" rows={5} placeholder={t("contact.message_placeholder")} required />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Send className="w-4 h-4 mr-2" />
                    {t("contact.send_btn")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border border-border bg-card">
              <CardContent className="p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{t("contact.info_title")}</h3>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <motion.div
                      key={contact.label}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Card
                        className="border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-md bg-card"
                        onClick={contact.action}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${contact.color} text-white`}>{contact.icon}</div>
                            <div>
                              <p className="font-medium text-foreground">{contact.label}</p>
                              <p className="text-sm text-muted-foreground">{contact.value}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border bg-accent/30">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-primary">{t("contact.cta_title")}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t("contact.cta_desc")}
                </p>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-accent"
                    onClick={() => window.open("https://github.com/HenjiAKO", "_blank")}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-accent"
                    onClick={() => window.open("https://www.facebook.com/share/17F11dagbj/", "_blank")}
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground">{t("contact.location")}</p>
        </motion.div>
      </div>
    </section>
  );
}
