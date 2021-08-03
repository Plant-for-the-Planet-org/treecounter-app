import Config from "react-native-config";

console.log("react-native config", Config);
export const initialProps = {
  mediaPath: Config.mediaPath // relative URI on server, where images are located (further sub-paths must be specified in application)
};

export const context = {
  scheme: Config.scheme,
  host: Config.host,
  api_url: Config.api_url,
  base: Config.base, // API base url. Debug mode off: "" on: "/app_dev.php" (requires login)
  debug: Config.debug, // local console debugging switch
  currency: Config.currency,
  bugsnagApiKey: Config.bugsnagApiKey,
  android: {
    appId: Config.androidAppId
  },
  ios: {
    appId: Config.iosAppId
  },
  locationApikKey: Config.locationApikKey,
  googleMapApiKey: Config.googleMapApiKey,
  planet_pay_url: Config.planet_pay_url
};
