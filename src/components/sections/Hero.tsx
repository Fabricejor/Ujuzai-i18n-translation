"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { ShimmerButton } from "../ui/shimmer-button";
import { SparklesCore } from "../ui/sparkles";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.4}
          particleColor="#FFFFFF"
          className="w-full h-full"
          particleCount={100}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-16">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium text-white/80">Automatisation IA de nouvelle génération</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-6 text-white"
          >
            Automatisez votre
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                futur avec l'IA
              </span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-2 left-0 h-1 bg-white/20"
              />
            </span>
          </motion.h1>

          {/* Subtitle with text generate effect */}
          <div className="max-w-3xl mx-auto mb-10">
            <TextGenerateEffect
              words="Transformez vos processus métier avec notre plateforme d'automatisation IA. Gagnez du temps, réduisez les coûts et augmentez votre productivité."
              className="text-lg sm:text-xl text-gray-400 font-normal"
            />
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <ShimmerButton className="text-base font-semibold">
              Commencer gratuitement
              <ArrowRight className="ml-2 w-4 h-4" />
            </ShimmerButton>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-12 px-8 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold"
            >
              Voir la démo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto pt-16 border-t border-white/10"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-1 text-white">99.9%</div>
              <div className="text-sm text-gray-400">Disponibilité</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-1 text-white">10M+</div>
              <div className="text-sm text-gray-400">Tâches automatisées</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-1 text-white">500+</div>
              <div className="text-sm text-gray-400">Entreprises</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

