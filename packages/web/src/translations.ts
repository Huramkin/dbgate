import cs from '../../../translations/cs.json';
import sk from '../../../translations/sk.json';
import de from '../../../translations/de.json';
import fr from '../../../translations/fr.json';
import es from '../../../translations/es.json';
import zh from '../../../translations/zh.json';
import pt from '../../../translations/pt.json';
import it from '../../../translations/it.json';
import ja from '../../../translations/ja.json';
import ko from '../../../translations/ko.json';

import MessageFormat, { type MessageFunction } from '@messageformat/core';
import getElectron from './utility/getElectron';

const translations: Record<string, Record<string, string>> = {
  en: {},
  cs,
  sk,
  de,
  fr,
  zh,
  es,
  pt,
  it,
  ja,
  ko,
};

const supportedLanguages = Object.keys(translations);
const compiledMessages: Partial<Record<string, Record<string, MessageFunction<'string'>>>> = {};
const defaultLanguage = 'en';
let selectedLanguageCache: string | null = null;

function getBrowserLanguage(): string {
  const lang = navigator.language || (navigator as any).userLanguage || '';
  return lang.split('-')[0];
}

export function getSelectedLanguage(preferredLanguage?: string): string {
  if (selectedLanguageCache) return selectedLanguageCache;

  if (preferredLanguage === 'auto') {
    preferredLanguage = getBrowserLanguage();
  }

  const selectedLanguage = getElectron()
    ? preferredLanguage || defaultLanguage
    : localStorage.getItem('selectedLanguage') ?? preferredLanguage;

  if (!selectedLanguage || !supportedLanguages.includes(selectedLanguage)) return defaultLanguage;
  return selectedLanguage;
}

export function saveSelectedLanguageToCache(preferredLanguage?: string) {
  selectedLanguageCache = getSelectedLanguage(preferredLanguage);
}

function getCompiledMessages(language: string): Record<string, MessageFunction<'string'>> {
  if (!compiledMessages[language]) {
    const mf = new MessageFormat(language);
    const messages: Record<string, MessageFunction<'string'>> = {};
    const src = translations[language] || {};
    for (const [key, value] of Object.entries(src)) {
      try {
        messages[key] = mf.compile(value);
      } catch {
        messages[key] = () => value;
      }
    }
    compiledMessages[language] = messages;
  }
  return compiledMessages[language]!;
}

export function getCurrentTranslations(): Record<string, string> {
  const lang = getSelectedLanguage();
  return translations[lang] || {};
}

interface TranslateOptions {
  defaultMessage: string;
  values?: Record<string, any>;
}

export function _t(key: string, options: TranslateOptions): string {
  const language = getSelectedLanguage();
  if (language === defaultLanguage) {
    if (options.values) {
      let result = options.defaultMessage;
      for (const [k, v] of Object.entries(options.values)) {
        result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
      return result;
    }
    return options.defaultMessage;
  }

  const messages = getCompiledMessages(language);
  const fn = messages[key];
  if (fn) {
    try {
      return fn(options.values || {});
    } catch {
      return options.defaultMessage;
    }
  }
  return options.defaultMessage;
}

export function __t(key: string, options: TranslateOptions): string {
  return _t(key, options);
}
