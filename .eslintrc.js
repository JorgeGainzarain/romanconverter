module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // Enforce the use of strict mode
    'strict': ['error', 'global'],

    // Disallow trailing whitespace at the end of lines
    'no-trailing-spaces': 'error',

    // Enforce consistent indentation (use 2 spaces)
    'indent': ['error', 2],

    // Enforce consistent spacing inside braces
    'object-curly-spacing': ['error', 'always'],

    // Enforce consistent spacing before blocks
    'space-before-blocks': ['error', 'always'],
  },
};
