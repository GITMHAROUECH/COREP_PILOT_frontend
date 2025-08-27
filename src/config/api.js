/**
 * Configuration de l'API pour différents environnements
 */

// Configuration basée sur les variables d'environnement Vite
const config = {
  // URL de base de l'API
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  
  // Informations de l'application
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'COREP Tracker',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Mode de développement
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  
  // Configuration des timeouts
  API_TIMEOUT: 30000, // 30 secondes
  
  // Configuration des retry
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 seconde
};

// Validation de la configuration
if (!config.API_BASE_URL) {
  console.error('VITE_API_BASE_URL n\'est pas définie');
}

// Log de la configuration en développement
if (config.IS_DEVELOPMENT) {
  console.log('Configuration API:', {
    API_BASE_URL: config.API_BASE_URL,
    APP_TITLE: config.APP_TITLE,
    APP_VERSION: config.APP_VERSION,
  });
}

export default config;

