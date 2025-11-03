"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

const getSteps = (t: (key: string) => string) => [
  {
    number: "01",
    title: t("howItWorks.steps.connect.title"),
    description: t("howItWorks.steps.connect.description"),
  },
  {
    number: "02",
    title: t("howItWorks.steps.define.title"),
    description: t("howItWorks.steps.define.description"),
  },
  {
    number: "03",
    title: t("howItWorks.steps.ai.title"),
    description: t("howItWorks.steps.ai.description"),
  },
  {
    number: "04",
    title: t("howItWorks.steps.analyze.title"),
    description: t("howItWorks.steps.analyze.description"),
  },
];

export const HowItWorks = () => {
  const { t, loading } = useTranslation();

  if (loading) {
    return (
      <section id="how-it-works" className="relative py-24 sm:py-32 bg-black overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-32 mx-auto mb-3"></div>
            <div className="h-12 bg-gray-700 rounded w-80 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-700 rounded w-64 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-64 bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const steps = getSteps(t);

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-black overflow-hidden">
      {/* Diagonal background split */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-400 mb-3">
            {t("howItWorks.title")}
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
            {t("howItWorks.subtitle")}
          </h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("howItWorks.description")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
                />
                <div className="relative z-10 bg-black border border-white/10 rounded-lg p-8 h-full">
                  {/* Step number */}
                  <div className="text-6xl font-bold mb-4 bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent opacity-30">
                    {step.number}
                  </div>
                  
                  <h4 className="text-xl font-semibold mb-3 text-white">{step.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow indicator */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-20">
                      <ArrowRight className="w-5 h-5 text-white/20" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

