// .eslintrc.js
module.exports = {
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
    "ecmaFeatures": {
      "asyncFunctions": true,
      "classes": true,
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
