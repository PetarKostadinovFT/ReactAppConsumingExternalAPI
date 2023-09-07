module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },

  testPathIgnorePatterns: ["<rootDir>/template/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    axios: "axios/dist/node/axios.cjs",
  },

  transformIgnorePatterns: [
    "node_modules/(?!" +
      [
        "node-fetch",
        "fetch-blob",
        "data-uri-to-buffer",
        "jest-runtime",
        "formdata-polyfill",
      ].join("|") +
      ")",
  ],
};
