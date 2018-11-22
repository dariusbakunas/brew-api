module.exports = {
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};
