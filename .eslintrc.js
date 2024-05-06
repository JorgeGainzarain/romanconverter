// .eslintrc.js
module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "no-console": "error",
    "no-undef": "error",
    "no-unused-vars": "error",
    "no-irrelevant-methods": "error"
  }
};
