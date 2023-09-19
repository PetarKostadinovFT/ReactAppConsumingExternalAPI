"use strict";

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = (_module$exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/utils/*.{js,jsx}", "src/context/*.{js,jsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
}, _defineProperty(_module$exports, "testEnvironment", "jest-environment-jsdom"), _defineProperty(_module$exports, "transform", {
  "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
}), _defineProperty(_module$exports, "testPathIgnorePatterns", ["<rootDir>/template/", "<rootDir>/node_modules/"]), _defineProperty(_module$exports, "moduleNameMapper", {
  "\\.(css|less|scss)$": "identity-obj-proxy",
  "~src/(.*)": "<rootDir>/src/$1"
}), _module$exports);