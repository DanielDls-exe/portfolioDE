import React, { useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    console.log("Particles container loaded", container);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#0a0c14] to-[#161a2c] text-white">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        className="absolute top-0 left-0 w-full h-full"
        options={{
          fpsLimit: 120,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#64748b",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      
      <div className="z-10 text-center px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Daniel Alvarado
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-6">Data Engineer</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Transformando datos complejos en soluciones inteligentes y accionables
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button 
            onClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg text-lg transition-all duration-300 hover:shadow-lg"
          >
            Ver Proyectos
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;