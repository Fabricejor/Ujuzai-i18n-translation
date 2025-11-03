"use client";
import React from "react";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, Mail, Sparkles } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

const footerLinks = {
  product: [
    { name: "Fonctionnalités", href: "#features" },
    { name: "Tarifs", href: "#pricing" },
    { name: "Intégrations", href: "#integrations" },
    { name: "API", href: "#api" },
  ],
  company: [
    { name: "À propos", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Carrières", href: "#careers" },
    { name: "Contact", href: "#contact" },
  ],
  resources: [
    { name: "Documentation", href: "#docs" },
    { name: "Guides", href: "#guides" },
    { name: "Support", href: "#support" },
    { name: "Statut", href: "#status" },
  ],
  legal: [
    { name: "Confidentialité", href: "#privacy" },
    { name: "Conditions", href: "#terms" },
    { name: "Cookies", href: "#cookies" },
    { name: "Licences", href: "#licenses" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "#", label: "Email" },
];

export const Footer = () => {
  const { t, loading } = useTranslation();

  if (loading) {
    return (
      <footer className="relative bg-black text-white overflow-hidden border-t border-white/10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 animate-pulse">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              <div className="col-span-2 lg:col-span-2">
                <div className="h-8 bg-gray-700 rounded w-24 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-6"></div>
                <div className="flex gap-2">
                  {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="w-10 h-10 bg-gray-700 rounded-full"></div>
                  ))}
                </div>
              </div>
              {Array(4).fill(0).map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-700 rounded w-16 mb-4"></div>
                  <div className="space-y-3">
                    {Array(4).fill(0).map((_, j) => (
                      <div key={j} className="h-3 bg-gray-700 rounded w-full"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  const footerLinks = {
    product: [
      { name: t("footer.sections.product.features"), href: "#features" },
      { name: t("footer.sections.product.pricing"), href: "#pricing" },
      { name: t("footer.sections.product.integrations"), href: "#integrations" },
      { name: t("footer.sections.product.api"), href: "#api" },
    ],
    company: [
      { name: t("footer.sections.company.about"), href: "#about" },
      { name: t("footer.sections.company.blog"), href: "#blog" },
      { name: t("footer.sections.company.careers"), href: "#careers" },
      { name: t("footer.sections.company.contact"), href: "#contact" },
    ],
    resources: [
      { name: t("footer.sections.resources.docs"), href: "#docs" },
      { name: t("footer.sections.resources.guides"), href: "#guides" },
      { name: t("footer.sections.resources.support"), href: "#support" },
      { name: t("footer.sections.resources.status"), href: "#status" },
    ],
    legal: [
      { name: t("footer.sections.legal.privacy"), href: "#privacy" },
      { name: t("footer.sections.legal.terms"), href: "#terms" },
      { name: t("footer.sections.legal.cookies"), href: "#cookies" },
      { name: t("footer.sections.legal.licenses"), href: "#licenses" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden border-t border-white/10">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 border-b border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <a href="#" className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold">Ujuzai</h3>
                </a>
                <p className="text-gray-400 mb-6 max-w-xs">
                  {t("footer.description")}
                </p>
                <div className="flex gap-2">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, backgroundColor: "#ffffff20" }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (categoryIndex + 1) * 0.1 }}
              >
                <h4 className="font-semibold mb-4 capitalize">{t(`footer.sections.${category}.title`)}</h4>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm relative group"
                      >
                        <span>{link.name}</span>
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              {t("footer.copyright")}
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                {t("footer.language")}
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                {t("footer.currency")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

