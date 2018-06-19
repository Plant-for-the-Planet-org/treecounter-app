let userLang = navigator.language || navigator.userLanguage;

/**
 * Parameters that are provided by the server to initialize the App.
 */
export const initialProps = {
  locale: userLang === 'en-US' || 'en-UK' || 'en-GB' ? 'en' : null,
  mediaPath: '/media/cache' // relative URI on server, where images are located (further sub-paths must be specified in application)
};

export const context = {
  scheme: 'https', // API server protocol
  host: 'staging.trilliontreeecampaign.org', // API server domain
  base: '/app_dev.php', // debug mode on/off, set to empty string to switch debug mode off
  debug: true, // local console debugging switch
  currency: 'USD'
};
