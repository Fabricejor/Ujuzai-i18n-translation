"use client";
import React from "react";
import { motion } from "framer-motion";
import { Bot, Zap, Shield, Code, TrendingUp, Clock } from "lucide-react";
import { MovingBorder } from "../ui/moving-border";

const features = [
  {
    icon: Bot,
    title: "IA Avancée",
    description: "Algorithmes d'apprentissage automatique de pointe pour une automatisation intelligente et adaptative.",
    color: "#8B5CF6", // Violet
  },
  {
    icon: Zap,
    title: "Déploiement Instantané",
    description: "Configurez et lancez vos automatisations en quelques minutes, sans code complexe.",
    color: "#3B82F6", // Blue
  },
  {
    icon: Shield,
    title: "Sécurité Maximale",
    description: "Chiffrement de bout en bout et conformité aux normes les plus strictes.",
    color: "#10B981", // Green
  },
  {
    icon: Code,
    title: "API Flexible",
    description: "Intégrez facilement avec vos outils existants via notre API REST moderne.",
    color: "#F97316", // Orange
  },
  {
    icon: TrendingUp,
    title: "Analytics Puissants",
    description: "Tableaux de bord en temps réel pour suivre vos performances et optimiser vos processus.",
    color: "#EC4899", // Pink
  },
  {
    icon: Clock,
    title: "Gain de Temps",
    description: "Réduisez les tâches répétitives de 80% et concentrez-vous sur l'essentiel.",
    color: "#6366F1", // Indigo
  },
];

export const Features = () => {
  return (
    <section id="features" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900/50 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-400 mb-3">
            Fonctionnalités
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Tout ce dont vous avez besoin
          </h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Une plateforme complète pour automatiser et optimiser tous vos processus métier
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <MovingBorder duration={5000} containerClassName="h-full rounded-2xl">
                <div className="p-8 h-full bg-black/80 backdrop-blur-sm rounded-2xl">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: `${feature.color}20`,
                      boxShadow: `0 0 15px ${feature.color}50`,
                    }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-white">{feature.title}</h4>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </MovingBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

