module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!<rootDir>/src/config/**",
    "!<rootDir>/src/db/migrations/**",
    "!<rootDir>/src/db/data/**",
    "!<rootDir>/src/db/seeders/**",
  ],
  setupFiles: ["<rootDir>/tests/setupTests.js"],
};
