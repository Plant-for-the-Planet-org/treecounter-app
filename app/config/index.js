/* processing values from environment */

console.log('Environment: ', process.env.env);
export const initialProps = {
  mediaPath: process.env.mediaPath // relative URI on server, where images are located (further sub-paths must be specified in application)
};

export const context = {
  scheme: process.env.scheme,
  host: process.env.host,
  api_url: process.env.api_url,
  base: process.env.base, // API base url. Debug mode off: "" on: "/app_dev.php" (requires login)
  debug: process.env.debug, // local console debugging switch
  currency: process.env.currency,
  bugsnagApiKey: process.env.bugsnagApiKey,
  android: {
    appId: process.env.androidAppId
  },
  ios: {
    appId: process.env.iosAppId
  },
  locationApikKey: process.env.locationApikKey,
  googleMapApiKey: process.env.googleMapApiKey
};
