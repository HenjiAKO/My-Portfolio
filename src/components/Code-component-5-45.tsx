import { motion } from 'motion/react';
import { useState } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Mail, Phone, Github, Facebook, Send, MapPin } from 'lucide-react';
import { toast } from "sonner@2.0.3";

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Portfolio Contact');
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `);
    
    const mailtoLink = `mailto:macasilhigkyle@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    toast.success("Email client opened! Thank you for reaching out.");
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "macasilhigkyle@gmail.com",
      action: () => window.open('mailto:macasilhigkyle@gmail.com'),
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "09625510712",
      action: () => window.open('tel:09625510712'),
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: "@HenjiAKO",
      action: () => window.open('https://github.com/HenjiAKO', '_blank'),
      color: "from-gray-600 to-gray-800"
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      label: "Facebook",
      value: "Khyle Macasilhig",
      action: () => window.open('https://www.facebook.com/share/17F11dagbj/', '_blank'),
      color: "from-blue-500 to-blue-600"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Get In <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's connect! I'm always open to discussing new opportunities, collaborations, or just having a chat about technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Send className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-semibold">Send a Message</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                        className="border-purple-200 focus:border-purple-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="border-purple-200 focus:border-purple-400"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me more about your project or just say hi!"
                      rows={5}
                      required
                      className="border-purple-200 focus:border-purple-400 resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-semibold">Contact Information</h3>
                </div>
                
                <div className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <motion.div
                      key={contact.label}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Card 
                        className="border border-purple-100 hover:border-purple-200 transition-all duration-300 cursor-pointer hover:shadow-md"
                        onClick={contact.action}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${contact.color} text-white`}>
                              {contact.icon}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{contact.label}</p>
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

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-purple-800">Let's Build Something Amazing!</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I'm always excited to discuss new projects, creative ideas, or opportunities to be part of your team. 
                  Whether you have a question about my work or want to explore potential collaborations, I'd love to hear from you.
                </p>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-purple-200 hover:bg-purple-50"
                    onClick={() => window.open('https://github.com/HenjiAKO', '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-blue-200 hover:bg-blue-50"
                    onClick={() => window.open('https://www.facebook.com/share/17F11dagbj/', '_blank')}
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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground">
            Based in the Philippines • Open to remote opportunities
          </p>
        </motion.div>
      </div>
    </section>
  );
}