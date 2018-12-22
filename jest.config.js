module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!src/config/',
    '!src/db/migrations/',
    '!src/db/data/',
    '!src/db/seeders/',
  ],
  setupFiles: [
    '<rootDir>/tests/setupTests.js',
  ],
};
