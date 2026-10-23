import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from './translations/en';
import { te } from './translations/te';

const dictionaries = { en, te };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('sathenna_lang');
    if (saved && (saved === 'en' || saved === 'te')) {
      return saved;
    }
    // Default to English as primary, easily switchable to Telugu
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.body.classList.remove('lang-en', 'lang-te');
    document.body.classList.add(`lang-${language}`);
    localStorage.setItem('sathenna_lang', language);
  }, [language]);

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'te') {
      setLanguageState(lang);
    }
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  /**
   * Helper to look up nested keys like 'nav.home' or 'common.viewDetails'
   */
  const t = (path, fallback = '') => {
    if (!path) return fallback;
    const parts = path.split('.');
    
    let current = dictionaries[language];
    for (const part of parts) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        current = undefined;
        break;
      }
    }

    if (current !== undefined && typeof current === 'string') {
      return current;
    }

    // Fallback to English
    let fallbackObj = dictionaries['en'];
    for (const part of parts) {
      if (fallbackObj && fallbackObj[part] !== undefined) {
        fallbackObj = fallbackObj[part];
      } else {
        fallbackObj = undefined;
        break;
      }
    }

    if (fallbackObj !== undefined && typeof fallbackObj === 'string') {
      return fallbackObj;
    }

    return fallback || path;
  };

  /**
   * Localized Content Helper for dynamic or API items
   * Usage: tc(item, 'title') -> checks translations[lang]?.title || item[`${field}_te`] || item[field]
   */
  const tc = (item, field) => {
    if (!item) return '';
    if (language === 'te') {
      if (item.translations?.te?.[field]) {
        return item.translations.te[field];
      }
      if (item[`${field}_te`]) {
        return item[`${field}_te`];
      }
      if (field === 'title' && item.teluguTitle) {
        return item.teluguTitle;
      }
      if (field === 'fullName' && item.teluguName) {
        return item.teluguName;
      }
    }
    return item[field] || item.translations?.en?.[field] || '';
  };

  /**
   * Formats a date string in the current locale
   */
  const formatDate = (dateString, options = { year: 'numeric', month: 'short', day: 'numeric' }) => {
    if (!dateString) return '';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString(language === 'te' ? 'te-IN' : 'en-IN', options);
    } catch {
      return dateString;
    }
  };

  const value = {
    language,
    isTelugu: language === 'te',
    setLanguage,
    toggleLanguage,
    t,
    tc,
    formatDate
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
