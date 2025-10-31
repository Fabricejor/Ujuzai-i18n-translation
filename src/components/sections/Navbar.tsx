"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "../cn";

const navLinks = [
  { name: "Fonctionnalités", href: "#features" },
  { name: "Comment ça marche", href: "#how-it-works" },
  { name: "Tarifs", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-4 inset-x-0 max-w-6xl mx-auto z-50 transition-all duration-300 rounded-full",
          isScrolled
            ? "bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-black/10 dark:border-white/10"
            : "bg-transparent border border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 text-white dark:text-black" />
              </motion.div>
              <span className="text-xl font-bold">Ujuzai</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors px-4 py-2"
                >
                  {link.name}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                    layoutId="underline"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: "var(--scaleX, 0)",
                      originX: "var(--originX, 0.5)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{
                      // @ts-ignore
                      "--scaleX": "var(--hover-scaleX, 0)",
                      "--originX": "var(--hover-originX, 0.5)",
                    }}
                  />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                Se connecter
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-9 px-6 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium"
              >
                Démarrer
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-4 right-4 z-40 md:hidden bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors text-center"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 space-y-3 border-t border-black/10 dark:border-white/10">
                <button className="w-full py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                  Se connecter
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-11 px-6 rounded-full bg-black dark:bg-white text-white dark:text-black text-base font-medium"
                >
                  Démarrer
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

