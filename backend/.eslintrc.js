module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off", //não obrigar o uso do this
    "no-param-reassign": "off", // permitir receber um parâmetro e fazer alterações nele
    "camelcase": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
  }
};
