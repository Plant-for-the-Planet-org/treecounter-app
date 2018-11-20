/**
 * CREATE A COPY OF THIS FILE AND NAME IT: index.js
 */

/**
 * Parameters that are provided by the server to initialize the App.
 */
export const initialProps = {
  mediaPath: '/media/cache' // relative URI on server, where images are located (further sub-paths must be specified in application)
};

export const context = {
  scheme: 'https', // API server protocol
  host: 'www.trilliontreecampaign.org', // API server domain
  base: '', // debug mode on/off, set to empty string to switch debug mode off
  debug: false, // local console debugging switch
  currency: 'USD',
  mapIds: { inventory: 'dee6acf9de774fe6878813f707b4ab88' }
};
