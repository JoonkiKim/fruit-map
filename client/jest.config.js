const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestconfig = {
  //   coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  //   "jsdom-environment-jsdom"
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["./jest.setup.js"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestconfig);
