module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 15,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",

    "react/display-name": "off",
    "no-undef":"off",
    "no-unused-vars" : "off"
  },
  ignorePatterns: ["**/**.js", ".eslintrc.js", "types.ts", "import/first"],
};
