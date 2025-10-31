"use client";
import React from "react";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, Mail, Sparkles } from "lucide-react";

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
                  L'automatisation IA de nouvelle génération pour transformer votre entreprise.
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
                <h4 className="font-semibold mb-4 capitalize">{category}</h4>
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
              © 2025 Ujuzai. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Français
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                EUR €
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

