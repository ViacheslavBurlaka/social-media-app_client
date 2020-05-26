// use this format since .eslintrc is deprecated.

module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'react/no-unescaped-entities': 0,
    semi: 'error',
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
};
