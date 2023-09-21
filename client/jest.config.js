module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/utils/*.{js,jsx}", "src/context/*.{js,jsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },

  testPathIgnorePatterns: ["<rootDir>/template/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "~src/(.*)": "<rootDir>/src/$1",
  },
};
