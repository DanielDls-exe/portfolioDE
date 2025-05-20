import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderOpen, ChartBar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  complexity: number;
  details: string;
  githubLink?: string;
  demoLink?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Pipeline ETL en Tiempo Real",
    description: "Sistema de procesamiento de datos en streaming para análisis en tiempo real",
    image: "/placeholder.svg",
    technologies: ["Apache Kafka", "Spark Streaming", "Python", "AWS"],
    complexity: 85,
    details: "Desarrollé un sistema de procesamiento de datos en tiempo real que ingiere información de múltiples fuentes, la procesa con Spark Streaming y la almacena para análisis. El sistema maneja más de 1 millón de eventos por minuto con baja latencia.",
    githubLink: "https://github.com",
  },
  {
    id: 2,
    title: "Plataforma de Data Warehouse",
    description: "Solución integral de almacenamiento y análisis de grandes volúmenes de datos",
    image: "/placeholder.svg",
    technologies: ["Snowflake", "dbt", "Airflow", "Tableau"],
    complexity: 75,
    details: "Diseñé e implementé una arquitectura moderna de data warehouse utilizando Snowflake, con transformaciones gestionadas por dbt y orquestación por Airflow. Incluye más de 50 modelos de datos y dashboards para diferentes equipos de negocio.",
    demoLink: "https://example.com",
  },
  {
    id: 3,
    title: "Sistema de Recomendación",
    description: "Motor de recomendaciones basado en comportamiento de usuario y ML",
    image: "/placeholder.svg",
    technologies: ["Python", "Scikit-learn", "PostgreSQL", "Docker"],
    complexity: 90,
    details: "Creé un sistema de recomendación que analiza patrones de comportamiento de usuarios y utiliza algoritmos de machine learning para generar recomendaciones personalizadas. Incrementó la tasa de conversión en un 15%.",
    githubLink: "https://github.com",
    demoLink: "https://example.com",
  },
];

const Projects: React.FC = () => {
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  
  // Extraer todas las tecnologías únicas
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  ).sort();
  
  // Filtrar proyectos según la tecnología seleccionada
  const filteredProjects = selectedTechnology 
    ? projects.filter(project => 
        project.technologies.includes(selectedTechnology)
      )
    : projects;

  return (
    <section id="proyectos" className="py-20 bg-gradient-to-br from-[#0a0c14] to-[#161a2c]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-6 dark:text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Proyectos
        </motion.h2>
        
        <motion.p 
          className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Una selección de mis proyectos más destacados en ingeniería y análisis de datos
        </motion.p>
        
        {/* Filtros de tecnologías */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Button 
            variant={selectedTechnology === null ? "default" : "outline"}
            onClick={() => setSelectedTechnology(null)}
            className="text-sm"
          >
            Todos
          </Button>
          
          {allTechnologies.map((tech) => (
            <Button
              key={tech}
              variant={selectedTechnology === tech ? "default" : "outline"}
              onClick={() => setSelectedTechnology(tech)}
              className="text-sm"
            >
              {tech}
            </Button>
          ))}
        </div>

        {/* Lista de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.5,
                layout: { duration: 0.3 }
              }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card 
                className="h-full flex flex-col overflow-hidden border-2 dark:border-slate-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-900/20"
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
              >
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                      <div className="text-white">
                        <FolderOpen className="h-5 w-5 mb-1" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow p-5">
                  <CardTitle className="text-xl mb-2 dark:text-white">{project.title}</CardTitle>
                  <CardDescription className="mb-4 dark:text-gray-400">{project.description}</CardDescription>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <ChartBar className="h-4 w-4" />
                      <span>Complejidad:</span>
                    </div>
                    <Progress value={project.complexity} className="h-1.5 mt-1" />
                  </div>
                  
                  {expandedProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        {project.details}
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        {project.githubLink && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                              Ver en GitHub
                            </a>
                          </Button>
                        )}
                        
                        {project.demoLink && (
                          <Button size="sm" asChild>
                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                              Ver Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
                
                <CardFooter className="pt-0 px-5 pb-5">
                  <Button 
                    variant="ghost"
                    className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedProject(expandedProject === project.id ? null : project.id);
                    }}
                  >
                    {expandedProject === project.id ? "Ver menos" : "Ver más"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;