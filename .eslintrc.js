const config = {
  env: {
    browser: true,
    node: true
  },
  plugins: ['@typescript-eslint'],
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'prefer-const': 'warn',
    'import/no-duplicates': 'error'
  }
}

module.exports = config
