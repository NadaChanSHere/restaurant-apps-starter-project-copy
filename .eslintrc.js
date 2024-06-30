module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended' // Menggunakan plugin Prettier
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      // Atur aturan ESLint sesuai kebutuhan proyek Anda di sini
    },
  };
  