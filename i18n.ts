import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from './translations/en/translation.json';
import esTranslation from './translations/es/translation.json';
import ptTranslation from './translations/pt/translation.json';

const resources = {
  pt: {
    translation: ptTranslation
  },
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  }
};

// Function to get the initial language
const getInitialLanguage = async (): Promise<string> => {
  try {
    // Try to get the language from AsyncStorage
    const savedLanguage = await AsyncStorage.getItem('user-language');
    if (savedLanguage) {
      return savedLanguage;
    }
    // Default to Portuguese
    return 'pt';
  } catch (error) {
    // Fallback to Portuguese (default)
    return 'pt';
  }
};

// Initialize i18n
const initializeI18n = async () => {
  const initialLanguage = await getInitialLanguage();
  
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: initialLanguage,
      fallbackLng: 'pt', // Brazilian Portuguese as default
      debug: __DEV__, // Enable debug in development
      
      interpolation: {
        escapeValue: false, // React already escapes values
      },
      
      react: {
        useSuspense: false, // Disable Suspense for React Native
      },
    });
};

// Function to change language
export const changeLanguage = async (language: string) => {
  try {
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem('user-language', language);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

// Initialize i18n immediately
initializeI18n();

export default i18n; 