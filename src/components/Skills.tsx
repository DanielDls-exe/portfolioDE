
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Database, Cpu, Cloud, HardDrive, WrenchIcon } from "lucide-react";

type Skill = {
  name: string;
  category: SkillCategoryType;
};

enum SkillCategoryType {
  Languages = "Lenguajes",
  Databases = "Bases de Datos",
  Cloud = "Cloud",
  BigData = "Big Data",
  Tools = "Herramientas",
}

const skills: Skill[] = [
  { name: "Python", category: SkillCategoryType.Languages },
  { name: "SQL", category: SkillCategoryType.Languages },
  { name: "Scala", category: SkillCategoryType.Languages },
  { name: "Java", category: SkillCategoryType.Languages },
  
  { name: "PostgreSQL", category: SkillCategoryType.Databases },
  { name: "MongoDB", category: SkillCategoryType.Databases },
  { name: "Snowflake", category: SkillCategoryType.Databases },
  { name: "Redis", category: SkillCategoryType.Databases },
  
  { name: "AWS", category: SkillCategoryType.Cloud },
  { name: "Azure", category: SkillCategoryType.Cloud },
  { name: "GCP", category: SkillCategoryType.Cloud },
  { name: "Kubernetes", category: SkillCategoryType.Cloud },
  
  { name: "Spark", category: SkillCategoryType.BigData },
  { name: "Kafka", category: SkillCategoryType.BigData },
  { name: "Hadoop", category: SkillCategoryType.BigData },
  { name: "Databricks", category: SkillCategoryType.BigData },
  
  { name: "Airflow", category: SkillCategoryType.Tools },
  { name: "dbt", category: SkillCategoryType.Tools },
  { name: "Docker", category: SkillCategoryType.Tools },
  { name: "Git", category: SkillCategoryType.Tools },
];

const getCategoryColor = (category: SkillCategoryType): string => {
  switch(category) {
    case SkillCategoryType.Languages:
      return "from-blue-500 to-indigo-600";
    case SkillCategoryType.Databases:
      return "from-emerald-500 to-teal-600";
    case SkillCategoryType.Cloud:
      return "from-cyan-500 to-blue-600";
    case SkillCategoryType.BigData:
      return "from-violet-500 to-purple-600";
    case SkillCategoryType.Tools:
      return "from-amber-500 to-orange-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};

const getCategoryIcon = (category: SkillCategoryType) => {
  switch(category) {
    case SkillCategoryType.Languages:
      return <Cpu className="h-6 w-6 text-white" />;
    case SkillCategoryType.Databases:
      return <Database className="h-6 w-6 text-white" />;
    case SkillCategoryType.Cloud:
      return <Cloud className="h-6 w-6 text-white" />;
    case SkillCategoryType.BigData:
      return <HardDrive className="h-6 w-6 text-white" />;
    case SkillCategoryType.Tools:
      return <WrenchIcon className="h-6 w-6 text-white" />;
    default:
      return <Cpu className="h-6 w-6 text-white" />;
  }
};

const SkillItem: React.FC<{ skill: Skill; index: number; categoryColor: string }> = ({ skill, index, categoryColor }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center justify-center px-4 py-3 rounded-lg bg-slate-800/80 border border-slate-700/50 hover:bg-slate-700/90 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm shadow-lg"
    >
      <span className="text-white font-medium text-sm whitespace-nowrap">{skill.name}</span>
    </motion.div>
  );
};

const SkillCategorySection: React.FC<{ category: SkillCategoryType; skills: Skill[] }> = ({ category, skills }) => {
  const categoryColor = getCategoryColor(category);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="mb-10"
    >
      <div className={`flex items-center gap-3 mb-6 p-3 bg-gradient-to-r ${categoryColor} rounded-lg shadow-md`}>
        {getCategoryIcon(category)}
        <h3 className="text-xl font-bold text-white">{category}</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <SkillItem key={skill.name} skill={skill} index={index} categoryColor={categoryColor} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  // Agrupar habilidades por categoría
  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Obtener todas las categorías únicas
  const categories = Object.keys(skillsByCategory) as SkillCategoryType[];

  return (
    <section id="habilidades" className="py-20 bg-gradient-to-br from-[#0a0c14] to-[#161a2c]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Habilidades</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {categories.map((category) => (
            <SkillCategorySection
              key={category}
              category={category as SkillCategoryType}
              skills={skillsByCategory[category]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;