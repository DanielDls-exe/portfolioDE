import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ContactItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
}> = ({ icon, title, value, href }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
      {icon}
    </div>
    <div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      <div className="font-medium dark:text-white">{value}</div>
    </div>
  </a>
);

const Contact: React.FC = () => {
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    message: "",
    isSubmitting: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true }));
    
    // Simulamos envío del formulario
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Mensaje enviado con éxito",
      description: "Gracias por contactarme. Me pondré en contacto contigo pronto.",
    });
    
    setFormState({
      name: "",
      email: "",
      message: "",
      isSubmitting: false
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "tu.email@ejemplo.com",
      href: "mailto:tu.email@ejemplo.com",
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "GitHub",
      value: "github.com/tu-usuario",
      href: "https://github.com/tu-usuario",
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: "LinkedIn",
      value: "linkedin.com/in/tu-usuario",
      href: "https://linkedin.com/in/tu-usuario",
    },
  ];

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-[#0a0c14] to-[#161a2c] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 25px 25px, rgba(0, 0, 200, 0.2) 2%, transparent 0%)`,
               backgroundSize: "50px 50px"
             }}
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Contacto
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">¿Hablamos?</h3>
            <p className="text-gray-600 text-white mb-8">
              Si estás interesado en trabajar conmigo o tienes alguna pregunta, no dudes en ponerte en contacto. Estaré encantado de escucharte y responderé a tu mensaje lo antes posible.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <ContactItem 
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  value={item.value}
                  href={item.href}
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">Envíame un mensaje</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Tu nombre" 
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="tu@email.com" 
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="¿En qué puedo ayudarte?" 
                    required
                    rows={6}
                    className="mt-1"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full group relative overflow-hidden bg-blue-600 hover:bg-blue-700"
                  disabled={formState.isSubmitting}
                >
                  <span className="absolute inset-0 w-0 bg-blue-800 transition-all duration-[400ms] ease-out group-hover:w-full"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    {formState.isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        Enviar Mensaje
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;