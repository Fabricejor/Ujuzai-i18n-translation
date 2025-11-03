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
