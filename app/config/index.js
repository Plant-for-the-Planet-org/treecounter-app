let userLang = navigator.language || navigator.userLanguage;

/**
 * Parameters that are provided by the server to initialize the App.
 */
export const initialProps = {
  locale: userLang === "en-US" || "en-UK" || "en-GB" ? "en" : null,
  mediaPath: "/media/cache", // relative URI on server, where images are located (further sub-paths must be specified in application)
};

/**
 * Parameters that are provided by the server to 'inform' the App in which context it is running.
 * For this application, the only significant parameters are the ones required to access the server API.
 *
 * example data:
 * {
 *  scheme: "https",
 *  host: "www.trilliontreecampaign.org",
 *  base: "/app_dev.php",
 *  location: "/app_dev.php/system/context/1",
 *  href: "https://www.trilliontreecampaign.org/app_dev.php/system/context",
 *  port: 443,
 *  pathname: "/system/context",
 *  search: null
 * }
 */
export const context = {
  // NEVER USE THE KEY 'serverSide' INSIDE THIS OBJECT
  scheme: "https", // API server protocol
  // host: "launch.trilliontreecampaign.org", // API server domain
  host: "staging.trilliontreecampaign.org", // API server domain
  base: "/app_dev.php", // debug mode on/off, set to empty string to switch debug mode off
//  base: "", // debug mode on/off, set to empty string to switch debug mode off
  debug: true, // local console debugging switch
};

