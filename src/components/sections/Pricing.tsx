"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ShimmerButton } from "../ui/shimmer-button";
import { useTranslation } from "../../hooks/useTranslation";

const getPricingTiers = (t: any) => {
  // Access features arrays directly from translations
  const essentialFeatures = t("pricing.tiers.essential.features") || [
    "10,000 tâches/mois",
    "5 workflows", 
    "Intégrations standards",
    "Support par email"
  ];
  
  const proFeatures = t("pricing.tiers.pro.features") || [
    "50,000 tâches/mois",
    "25 workflows",
    "Intégrations premium", 
    "Support prioritaire 24/7",
    "Accès API"
  ];
  
  const enterpriseFeatures = t("pricing.tiers.enterprise.features") || [
    "Tâches illimitées",
    "Workflows illimités",
    "Intégrations personnalisées",
    "Support dédié", 
    "Sécurité avancée"
  ];

  return [
    {
      name: t("pricing.tiers.essential.name"),
      price: t("pricing.tiers.essential.price"),
      features: Array.isArray(essentialFeatures) ? essentialFeatures : [essentialFeatures],
      cta: t("pricing.tiers.essential.cta"),
      popular: false,
    },
    {
      name: t("pricing.tiers.pro.name"),
      price: t("pricing.tiers.pro.price"),
      features: Array.isArray(proFeatures) ? proFeatures : [proFeatures],
      cta: t("pricing.tiers.pro.cta"),
      popular: true,
    },
    {
      name: t("pricing.tiers.enterprise.name"),
      price: t("pricing.tiers.enterprise.price"),
      features: Array.isArray(enterpriseFeatures) ? enterpriseFeatures : [enterpriseFeatures],
      cta: t("pricing.tiers.enterprise.cta"),
      popular: false,
    },
  ];
};

export const Pricing = () => {
  const { t, loading } = useTranslation();

  if (loading) {
    return (
      <section id="pricing" className="relative py-24 sm:py-32 bg-background overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-16 mx-auto mb-3"></div>
            <div className="h-12 bg-gray-700 rounded w-80 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-700 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-96 bg-gray-700 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const pricingTiers = getPricingTiers(t);

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
            {t("pricing.title")}
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {t("pricing.subtitle")}
          </h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("pricing.description")}
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
                    {t("pricing.popular")}
                  </div>
                </div>
              )}

              <h4 className="text-2xl font-semibold mb-4">{tier.name}</h4>
              
              <div className="mb-6">
                <span className="text-5xl font-bold">{tier.price}</span>
                {tier.cta !== t("pricing.tiers.enterprise.cta") && <span className="text-gray-400">{t("pricing.perMonth")}</span>}
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
