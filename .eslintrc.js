module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-console': 'warn',
    'react/jsx-curly-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    // 'react/no-unknown-property': ['RULES.WARN', {}],
  },
}
