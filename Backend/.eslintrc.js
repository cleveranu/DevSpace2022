module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": 0,
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
