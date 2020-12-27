module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended', 'standard',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: [2, 'always'],
    'comma-dangle': ['error', 'always-multiline'],
  },
};
