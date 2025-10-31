"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "../ui/shimmer-button";

export const CTA = () => {
  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 to-black" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-3xl p-12 sm:p-16 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-white">
              Prêt à transformer
              <br />
              votre entreprise ?
            </h2>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Rejoignez des centaines d'entreprises qui automatisent déjà leurs processus avec l'IA
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ShimmerButton className="text-lg px-10 font-semibold">
                Démarrer gratuitement
                <ArrowRight className="ml-2 w-5 h-5" />
              </ShimmerButton>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-14 px-10 rounded-full border-2 border-white/50 text-white hover:bg-white hover:text-black transition-all duration-300 text-lg font-medium"
              >
                Parler à un expert
              </motion.button>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Aucune carte bancaire requise • Essai gratuit de 14 jours
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

