import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    { name: "Contacto", href: "#contacto" }
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-slate-900/90 backdrop-blur-md shadow-md" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo/Brand */}
            <a 
              href="#hero" 
              className={`text-xl font-bold transition-colors ${
                isScrolled || isMobileMenuOpen
                  ? "text-slate-900 dark:text-white" 
                  : "text-white"
              }`}
            >
       
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    isScrolled 
                      ? "text-slate-700 text-white" 
                      : "text-slate-200 hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(item.href)?.scrollIntoView({
                      behavior: "smooth"
                    });
                  }}
                >
                  {item.name}
                </a>
              ))}
            
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full ${
                isScrolled 
                  ? "bg-slate-100 dark:bg-slate-800" 
                  : "bg-slate-800/50"
              }`}
              aria-label="Menu"
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute w-full h-0.5 rounded-lg transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  } ${
                    isScrolled 
                      ? "bg-slate-800 dark:bg-white" 
                      : "bg-white"
                  }`}
                  style={{ top: "0%" }}
                />
                <span
                  className={`absolute w-full h-0.5 rounded-lg transform transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  } ${
                    isScrolled 
                      ? "bg-slate-800 dark:bg-white" 
                      : "bg-white"
                  }`}
                  style={{ top: "40%" }}
                />
                <span
                  className={`absolute w-full h-0.5 rounded-lg transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  } ${
                    isScrolled 
                      ? "bg-slate-800 dark:bg-white" 
                      : "bg-white"
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
            className="fixed inset-0 z-40 pt-20 bg-white dark:bg-slate-900"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="py-3 text-lg font-medium text-slate-800 dark:text-white border-b border-gray-200 dark:border-gray-800"
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
                
                <Button className="mt-4" onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    document.querySelector("#contacto")?.scrollIntoView({
                      behavior: "smooth"
                    });
                  }, 300);
                }}>
                  Contacto
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;