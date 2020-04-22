import config from 'react-native-config';

console.log('react-native config', config);
export const initialProps = {
  mediaPath: config.mediaPath // relative URI on server, where images are located (further sub-paths must be specified in application)
};

export const context = {
  scheme: config.scheme,
  host: config.host,
  api_url: config.api_url,
  base: config.base, // API base url. Debug mode off: "" on: "/app_dev.php" (requires login)
  debug: config.debug, // local console debugging switch
  currency: config.currency,
  bugsnagApiKey: config.bugsnagApiKey,
  android: {
    appId: config.androidAppId
  },
  ios: {
    appId: config.iosAppId
  },
  locationApikKey: config.locationApikKey,
  googleMapApiKey: config.googleMapApiKey
};
