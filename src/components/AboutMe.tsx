import React from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AboutMe: React.FC = () => {
  const stats = [
    { value: 5, label: "Años de Experiencia", detail: "Trabajando en proyectos de data engineering" },
    { value: 25, label: "Proyectos Completados", detail: "Abarcando diversos sectores y tecnologías" },
    { value: 12, label: "Pipelines ETL", detail: "Diseñados y optimizados para alto rendimiento" },
  ];

  return (
    <section id="sobre-mi" className="py-20 bg-gradient-to-br from-[#0a0c14] to-[#161a2c]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Sobre Mí
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            className="w-full md:w-2/5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border-4 border-dashed border-blue-500 p-2">
                <div className="w-full h-full rounded-xl overflow-hidden bg-gray-300">
                  {/* Placeholder for your image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg">
                    Tu Foto Aquí
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                DE
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4 dark:text-white">Transformando datos en valor</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Como ingeniero de datos apasionado, me especializo en diseñar sistemas de datos robustos y escalables que transforman información compleja en insights valiosos. Mi enfoque combina experiencia técnica con pensamiento estratégico para resolver problemas de datos desafiantes.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              Mi experiencia abarca todo el ciclo de vida de los datos, desde la adquisición y el procesamiento hasta la entrega en forma de pipelines eficientes. Me impulsa la creación de soluciones que permitan a las organizaciones tomar decisiones basadas en datos.
            </p>
            
            <TooltipProvider>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <motion.div 
                        className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md cursor-help flex flex-col items-center"
                        whileHover={{ 
                          y: -5,
                          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
                        }}
                      >
                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}+</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">{stat.label}</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{stat.detail}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;