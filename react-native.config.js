// read this if you want to activate react-native-config for this project https://medium.com/differential/managing-configuration-in-react-native-cd2dfb5e6f7b
const ios = require('@react-native-community/cli-platform-ios');
const android = require('@react-native-community/cli-platform-android');

module.exports = {
  project: {
    ios: {},
    android: {}
  },
  assets: ['Resources/fonts', './app/assets/fonts'], // stays the same
  // commands: require('./path-to-commands.js'),
  dependencies: {
    'tipsi-stripe': {
      platforms: {
        android: null,
        ios: null,
      }
    }
  }
};
