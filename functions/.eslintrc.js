// filepath: /Users/josephesfandiari/Desktop/Table Tap/tabletap/functions/.eslintrc.js
module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'error',
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        // Add any custom rules for JavaScript files here
      },
    },
  ],
};