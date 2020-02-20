// jest.config.js
module.exports = {
  preset: 'react-native',
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  testURL: 'http://localhost/',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    userAgent: 'Jest',
    language: 'en',
    vendor: 'pftp'
  },
  // transform some node modules
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|static-container|tcomb-form-native|@react-native-community/async-storage|@?react-navigation|react-navigation-redux-helpers)'
  ]
};
