// jest.config.js
module.exports = {
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.jsx?$': 'babel7-jest'
  }
};
