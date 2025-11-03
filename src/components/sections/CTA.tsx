"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "../ui/shimmer-button";
import { useTranslation } from "../../hooks/useTranslation";

export const CTA = () => {
  const { t, loading } = useTranslation();

  if (loading) {
    return (
      <section id="contact" className="relative py-24 sm:py-32 bg-background overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-3xl p-12 sm:p-16">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-700 rounded w-96 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-700 rounded w-80 mx-auto mb-10"></div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <div className="h-14 bg-gray-700 rounded-full w-48"></div>
                <div className="h-14 bg-gray-700 rounded-full w-48"></div>
              </div>
              <div className="h-4 bg-gray-700 rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
              {t("cta.title")}
              <br />
              {t("cta.titleAccent")}
            </h2>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ShimmerButton className="text-lg px-10 font-semibold">
                {t("cta.ctaPrimary")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </ShimmerButton>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-14 px-10 rounded-full border-2 border-white/50 text-white hover:bg-white hover:text-black transition-all duration-300 text-lg font-medium"
              >
                {t("cta.ctaSecondary")}
              </motion.button>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              {t("cta.disclaimer")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

