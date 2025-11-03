"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const languages = {
  fr: { name: 'Français', flag: '🇫🇷' },
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
  ja: { name: '日本語', flag: '🇯🇵' },
  zh: { name: '中文', flag: '🇨🇳' },
};

export const LanguageSelector = () => {
  const { locale, changeLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages[locale as keyof typeof languages] || languages.fr;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline text-sm font-medium">
          {currentLanguage.name}
        </span>
        <span className="sm:hidden text-lg">{currentLanguage.flag}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 min-w-[180px] bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-lg shadow-lg z-40"
            >
              <div className="p-2">
                {Object.entries(languages).map(([code, language]) => (
                  <motion.button
                    key={code}
                    whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                    onClick={() => {
                      changeLocale(code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      locale === code 
                        ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white' 
                        : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span className="text-sm font-medium">{language.name}</span>
                    {locale === code && (
                      <motion.div
                        layoutId="selected"
                        className="w-2 h-2 bg-blue-500 rounded-full ml-auto"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
