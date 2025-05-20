import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"; // Aunque Button no se usa directamente en el nav de escritorio, se usa en el menú móvil

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Inicio", href: "#hero" },
    { name: "Sobre Mí", href: "#sobre-mi" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Habilidades", href: "#habilidades" },
    { name: "Contacto", href: "#contacto" } // "Contacto" ya es parte de navItems en tu código
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/90 backdrop-blur-md shadow-md" // Mantenido de tu código
            : "bg-transparent" // Mantenido de tu código
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Contenedor principal Flex: justify-end en móvil, md:justify-center en desktop */}
          <div className="flex items-center justify-end md:justify-center py-4">
            {/* Logo/Brand - Eliminado */}

            {/* Desktop Navigation - Se centrará gracias al md:justify-center del padre */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    isScrolled
                      ? "text-slate-700 text-white" // Mantenido de tu código (aunque text-slate-700 y text-white juntas es inusual, lo respeto)
                      : "text-slate-200 hover:text-white" // Mantenido de tu código
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false); // Cerrar menú móvil si está abierto
                    document.querySelector(item.href)?.scrollIntoView({
                      behavior: "smooth"
                    });
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button - Sigue a la derecha en móvil debido al justify-end del padre */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full ${
                isScrolled
                  ? "bg-slate-100 dark:bg-slate-800" // Mantenido de tu código
                  : "bg-slate-800/50" // Mantenido de tu código
              }`}
              aria-label="Menu"
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute w-full h-0.5 rounded-lg transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  } ${
                    isScrolled || isMobileMenuOpen // Asegura visibilidad de las líneas si el menú está abierto y el fondo cambia
                      ? "bg-slate-800 dark:bg-white" // Mantenido de tu código
                      : "bg-white" // Mantenido de tu código
                  }`}
                  style={{ top: "0%" }}
                />
                <span
                  className={`absolute w-full h-0.5 rounded-lg transform transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  } ${
                    isScrolled || isMobileMenuOpen
                      ? "bg-slate-800 dark:bg-white" // Mantenido de tu código
                      : "bg-white" // Mantenido de tu código
                  }`}
                  style={{ top: "40%" }}
                />
                <span
                  className={`absolute w-full h-0.5 rounded-lg transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  } ${
                    isScrolled || isMobileMenuOpen
                      ? "bg-slate-800 dark:bg-white" // Mantenido de tu código
                      : "bg-white" // Mantenido de tu código
                  }`}
                  style={{ top: "80%" }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-20 bg-white dark:bg-slate-900" // Mantenido de tu código
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => ( // Todos los items para el menú móvil
                  <a
                    key={item.name}
                    href={item.href}
                    className="py-3 text-lg font-medium text-slate-800 dark:text-white border-b border-gray-200 dark:border-gray-800" // Mantenido de tu código
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      setTimeout(() => {
                        document.querySelector(item.href)?.scrollIntoView({
                          behavior: "smooth"
                        });
                      }, 300);
                    }}
                  >
                    {item.name}
                  </a>
                ))}
                {/* El botón de contacto separado en el menú móvil se elimina ya que "Contacto" está en navItems */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;