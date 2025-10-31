"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ShimmerButton } from "../ui/shimmer-button";

const pricingTiers = [
  {
    name: "Essentiel",
    price: "49€",
    features: [
      "10,000 tâches/mois",
      "5 workflows",
      "Intégrations standards",
      "Support par email",
    ],
    cta: "Choisir Essentiel",
    popular: false,
  },
  {
    name: "Pro",
    price: "99€",
    features: [
      "50,000 tâches/mois",
      "25 workflows",
      "Intégrations premium",
      "Support prioritaire 24/7",
      "Accès API",
    ],
    cta: "Choisir Pro",
    popular: true,
  },
  {
    name: "Entreprise",
    price: "Sur mesure",
    features: [
      "Tâches illimitées",
      "Workflows illimités",
      "Intégrations personnalisées",
      "Support dédié",
      "Sécurité avancée",
    ],
    cta: "Contacter les ventes",
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-900/50 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-400 mb-3">
            Tarifs
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Un plan pour chaque besoin
          </h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choisissez le plan qui correspond à la taille et aux ambitions de votre entreprise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative border rounded-2xl p-8 h-full flex flex-col ${
                tier.popular ? "border-purple-500 scale-105 bg-black" : "border-white/10 bg-black/50"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 text-sm font-semibold text-white bg-purple-500 rounded-full">
                    Le plus populaire
                  </div>
                </div>
              )}

              <h4 className="text-2xl font-semibold mb-4">{tier.name}</h4>
              
              <div className="mb-6">
                <span className="text-5xl font-bold">{tier.price}</span>
                {tier.name !== "Entreprise" && <span className="text-gray-400"> / mois</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <ShimmerButton className="w-full font-semibold">
                {tier.cta}
              </ShimmerButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
