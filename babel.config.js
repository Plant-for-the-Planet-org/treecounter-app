module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  env: {
    production: {
      plugins: ['babel-plugin-transform-inline-environment-variables']
    },
    development: {
      plugins: ['babel-plugin-transform-inline-environment-variables']
    }
  }
};
