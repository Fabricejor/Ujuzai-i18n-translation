# Guide Complet d'Internationalisation (i18n) pour Next.js 16+

## Table des Matières
1. [Vue d'ensemble](#vue-densemble)
2. [Installation et Dépendances](#installation-et-dépendances)
3. [Structure des Fichiers](#structure-des-fichiers)
4. [Configuration Étape par Étape](#configuration-étape-par-étape)
5. [Composants et Hooks](#composants-et-hooks)
6. [Fichiers de Traduction](#fichiers-de-traduction)
7. [Intégration dans les Composants](#intégration-dans-les-composants)
8. [Bonnes Pratiques](#bonnes-pratiques)
9. [Troubleshooting](#troubleshooting)
10. [Sources et Références](#sources-et-références)

---

## Vue d'ensemble

Cette implémentation d'i18n pour Next.js 16+ utilise une approche côté client avec :
- **5 langues supportées** : Français (défaut), Anglais, Espagnol, Japonais, Chinois
- **Sauvegarde des préférences** dans les cookies
- **Détection automatique** de la langue du navigateur
- **Interface élégante** avec sélecteur de langue dans la navbar
- **Support complet** des composants React avec animations

---

## Installation et Dépendances

### Prérequis
- Next.js 16.0.1+
- React 19.2+
- TypeScript (recommandé)

### Dépendances Required
```json
{
  "dependencies": {
    "next": "16.0.1",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.552.0"
  }
}
```

### Installation
```bash
npm install framer-motion lucide-react
# ou
yarn add framer-motion lucide-react
```

---

## Structure des Fichiers

```
projet/
├── locales/                          # Fichiers de traduction
│   ├── fr/
│   │   └── common.json
│   ├── en/
│   │   └── common.json
│   ├── es/
│   │   └── common.json
│   ├── ja/
│   │   └── common.json
│   └── zh/
│       └── common.json
├── src/
│   ├── hooks/
│   │   └── useTranslation.ts         # Hook personnalisé
│   ├── components/
│   │   ├── LanguageSelector.tsx      # Sélecteur de langue
│   │   └── sections/                 # Composants de sections
│   └── app/
│       ├── layout.tsx
│       └── page.tsx
├── next.config.ts                    # Configuration Next.js
└── i18nconfig.md                     # Ce fichier
```

---

## Configuration Étape par Étape

### Étape 1 : Configuration Next.js

**Fichier : `next.config.ts`**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Note: Pas besoin de configuration i18n native pour l'approche côté client
};

export default nextConfig;
```

### Étape 2 : Hook de Traduction Personnalisé

**Fichier : `src/hooks/useTranslation.ts`**
```typescript
'use client';
import { useState, useEffect } from 'react';

interface TranslationData {
  [key: string]: any;
}

let translationCache: { [locale: string]: TranslationData } = {};

const loadTranslations = async (locale: string): Promise<TranslationData> => {
  if (translationCache[locale]) {
    return translationCache[locale];
  }

  try {
    const response = await import(`../../locales/${locale}/common.json`);
    translationCache[locale] = response.default;
    return response.default;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    // Fallback to French if locale not found
    if (locale !== 'fr') {
      return loadTranslations('fr');
    }
    return {};
  }
};

const getStoredLocale = (): string => {
  if (typeof window === 'undefined') return 'fr';
  
  // Check cookie first
  const cookieLocale = document.cookie
    .split('; ')
    .find(row => row.startsWith('NEXT_LOCALE='))
    ?.split('=')[1];
  
  if (cookieLocale && ['fr', 'en', 'es', 'ja', 'zh'].includes(cookieLocale)) {
    return cookieLocale;
  }

  // Check browser language
  const browserLang = navigator.language.slice(0, 2);
  if (['fr', 'en', 'es', 'ja', 'zh'].includes(browserLang)) {
    return browserLang;
  }

  return 'fr'; // Default fallback
};

export const useTranslation = () => {
  const [locale, setLocale] = useState<string>('fr');
  const [translations, setTranslations] = useState<TranslationData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedLocale = getStoredLocale();
    setLocale(storedLocale);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await loadTranslations(locale);
      setTranslations(data);
      setLoading(false);
    };

    if (locale) {
      loadData();
    }
  }, [locale]);

  const t = (key: string, fallback?: string): any => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }

    return value !== undefined ? value : fallback || key;
  };

  const changeLocale = async (newLocale: string) => {
    // Save preference in cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Update state
    setLocale(newLocale);
    
    // Optionally reload the page to apply the new locale
    window.location.reload();
  };

  return {
    t,
    locale,
    loading,
    changeLocale,
    availableLocales: ['fr', 'en', 'es', 'ja', 'zh'],
  };
};
```

### Étape 3 : Sélecteur de Langue

**Fichier : `src/components/LanguageSelector.tsx`**
```typescript
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
```

---

## Fichiers de Traduction

### Structure JSON Recommandée

**Fichier : `locales/fr/common.json`**
```json
{
  "navbar": {
    "features": "Fonctionnalités",
    "howItWorks": "Comment ça marche",
    "pricing": "Tarifs",
    "contact": "Contact",
    "login": "Se connecter",
    "getStarted": "Démarrer"
  },
  "hero": {
    "badge": "Automatisation IA de nouvelle génération",
    "title": "Automatisez votre",
    "titleAccent": "futur avec l'IA",
    "subtitle": "Transformez vos processus métier avec notre plateforme d'automatisation IA.",
    "ctaPrimary": "Commencer gratuitement",
    "ctaSecondary": "Voir la démo",
    "stats": {
      "uptime": "Disponibilité",
      "tasks": "Tâches automatisées",
      "companies": "Entreprises"
    }
  },
  "features": {
    "title": "Fonctionnalités",
    "subtitle": "Tout ce dont vous avez besoin",
    "description": "Une plateforme complète pour automatiser vos processus",
    "items": {
      "ai": {
        "title": "IA Avancée",
        "description": "Algorithmes d'apprentissage automatique de pointe."
      }
      // ... autres éléments
    }
  }
  // ... autres sections
}
```

### Langues Supportées

1. **Français** (`fr`) - Langue par défaut
2. **Anglais** (`en`) - English
3. **Espagnol** (`es`) - Español  
4. **Japonais** (`ja`) - 日本語
5. **Chinois** (`zh`) - 中文

> **Note** : Créez un fichier `common.json` identique pour chaque langue dans son dossier respectif.

---

## Intégration dans les Composants

### Exemple d'Utilisation Basique

```typescript
"use client";
import React from "react";
import { useTranslation } from "../hooks/useTranslation";

export const MonComposant = () => {
  const { t, loading } = useTranslation();

  // Squelette de chargement pendant le chargement des traductions
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
        <div className="h-8 bg-gray-700 rounded w-48"></div>
      </div>
    );
  }

  return (
    <div>
      <h1>{t("hero.title")}</h1>
      <p>{t("hero.subtitle")}</p>
      <button>{t("hero.ctaPrimary")}</button>
    </div>
  );
};
```

### Utilisation avec Fallback

```typescript
// Utilisation avec fallback si la clé n'existe pas
const title = t("section.nonExistentKey", "Titre par défaut");

// Accès aux objets imbriqués
const featureTitle = t("features.items.ai.title");

// Accès aux tableaux
const features = t("pricing.tiers.pro.features"); // Retourne un array
```

### Intégration dans la Navbar

```typescript
// Dans votre composant Navbar
import { LanguageSelector } from "../LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";

export const Navbar = () => {
  const { t, loading } = useTranslation();

  if (loading) return null;

  const navLinks = [
    { name: t("navbar.features"), href: "#features" },
    { name: t("navbar.pricing"), href: "#pricing" }
  ];

  return (
    <nav>
      {/* Navigation links */}
      {navLinks.map((link, index) => (
        <a key={index} href={link.href}>
          {link.name}
        </a>
      ))}
      
      {/* Sélecteur de langue */}
      <LanguageSelector />
    </nav>
  );
};
```

---

## Bonnes Pratiques

### 1. Organisation des Traductions
```json
{
  "section": {
    "subsection": {
      "element": "Traduction"
    }
  }
}
```

### 2. Nommage Cohérent
- Utilisez des clés descriptives : `hero.ctaPrimary` plutôt que `btn1`
- Groupez par section : `navbar.*`, `hero.*`, `footer.*`
- Soyez cohérent entre les langues

### 3. Gestion des Arrays
```json
{
  "features": {
    "list": [
      "Première fonctionnalité",
      "Deuxième fonctionnalité", 
      "Troisième fonctionnalité"
    ]
  }
}
```

### 4. Fallbacks Intelligents
```typescript
// Toujours fournir un fallback lisible
const text = t("key.that.might.not.exist", "Texte par défaut");
```

### 5. Squelettes de Chargement
```typescript
if (loading) {
  return <SkeletonComponent />;
}
```

---

## Troubleshooting

### Problèmes Courants

#### 1. Module Not Found Error
**Erreur** : `Cannot find module '../hooks/useTranslation'`

**Solution** :
```typescript
// Vérifiez le chemin relatif correct
import { useTranslation } from "../../hooks/useTranslation";
```

#### 2. Traductions Non Chargées
**Problème** : Les traductions ne se chargent pas

**Solutions** :
- Vérifiez que les fichiers JSON sont dans `locales/[langue]/common.json`
- Vérifiez la syntaxe JSON (pas de virgules en fin)
- Assurez-vous que le chemin d'import est correct

#### 3. Cookie Non Sauvegardé
**Problème** : La préférence de langue n'est pas persistante

**Solution** :
```typescript
// Vérifiez la configuration du cookie
document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
```

#### 4. Hydration Mismatch
**Problème** : Différence entre serveur et client

**Solution** :
```typescript
// Utilisez un état de chargement
if (loading) return <SkeletonLoader />;
```

### Debugging

#### Vérifier les Traductions Chargées
```typescript
const { t, locale, translations } = useTranslation();
console.log('Current locale:', locale);
console.log('Loaded translations:', translations);
```

#### Tester le Changement de Langue
```typescript
const handleLanguageTest = () => {
  console.log('Available locales:', availableLocales);
  changeLocale('en');
};
```

---

## Sources et Références

### Documentation Officielle
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [React Hooks Documentation](https://react.dev/reference/react/hooks)
- [Framer Motion](https://www.framer.com/motion/)

### Articles et Guides Utilisés
- [Internationalization (i18n) in Next.js: A Complete Guide](https://arnab-k.medium.com/internationalization-i18n-in-next-js-a-complete-guide-f62989f6469b) - Guide principal suivi
- [MDN Web Docs - Internationalization](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

### Librairies Alternatives
- **next-intl** : Solution plus avancée pour les gros projets
- **react-i18next** : Solution populaire avec plus de fonctionnalités
- **Format.js** : Suite complète d'outils i18n

### Outils de Développement
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) - Extension VS Code
- [Google Translate API](https://cloud.google.com/translate) - Pour automatiser les traductions

---

## Extension et Personnalisation

### Ajouter une Nouvelle Langue

1. **Créer le fichier de traduction**
```bash
mkdir locales/de
touch locales/de/common.json
```

2. **Ajouter la langue au hook**
```typescript
// Dans useTranslation.ts
availableLocales: ['fr', 'en', 'es', 'ja', 'zh', 'de']
```

3. **Ajouter au sélecteur**
```typescript
// Dans LanguageSelector.tsx
const languages = {
  // ... autres langues
  de: { name: 'Deutsch', flag: '🇩🇪' },
};
```

### Formatage des Dates et Nombres
```typescript
const formatDate = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = (amount: number, locale: string) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};
```

### Pluralisation
```json
{
  "items": {
    "zero": "Aucun élément",
    "one": "1 élément", 
    "other": "{{count}} éléments"
  }
}
```

---

## Checklist de Déploiement

- [ ] Tous les fichiers de traduction sont créés
- [ ] Toutes les clés sont traduites dans toutes les langues
- [ ] Les squelettes de chargement sont implémentés
- [ ] Le sélecteur de langue fonctionne
- [ ] Les cookies sont sauvegardés correctement
- [ ] La détection du navigateur fonctionne
- [ ] Les composants gèrent l'état de chargement
- [ ] Les fallbacks sont définis
- [ ] Tests sur tous les navigateurs supportés
- [ ] Tests sur mobile et desktop

---

## Performance et Optimisations

### Lazy Loading des Traductions
```typescript
// Les traductions sont chargées dynamiquement
const loadTranslations = async (locale: string) => {
  const response = await import(`../../locales/${locale}/common.json`);
  return response.default;
};
```

### Cache des Traductions
```typescript
// Système de cache intégré pour éviter les rechargements
let translationCache: { [locale: string]: TranslationData } = {};
```

### Bundle Splitting
Les fichiers de traduction sont automatiquement séparés par Next.js lors du build, optimisant le temps de chargement.

---

*Ce guide a été créé pour servir de référence complète et de prompt pour de futurs projets. Il peut être adapté selon les besoins spécifiques de chaque projet.*
