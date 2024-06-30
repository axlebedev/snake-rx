export default {
  parser: '@babel/eslint-parser',

  extends: [
    // 'airbnb',
    'eslint-config-google',
  ],

  plugins: ['babel'],

  globals: {
    __DEV__: true,
    __CLIENT__: true,
  },

  rules: {
    'prefer-template': 'off',
    'no-var': 1,
    'no-unused-vars': 1,
    'camelcase': 1,
    'no-nested-ternary': 1,
    'no-console': 1,
    'no-template-curly-in-string': 1,
    'no-self-compare': 1,
    'import/prefer-default-export': 0,

    'object-curly-spacing': [2, 'always'],
    'arrow-body-style': 1,
    'import/no-extraneous-dependencies': ['off', { 'devDependencies': false }],
    'max-len': [2, 100],
    'semi': [2, 'never'],

    'function-component-definition': [2, { 'namedComponents': 'arrow-function' }],
  },
  ignorePatterns: ['dist', 'node_modules', 'webpack.*', 'config/paths.js'],
  env: {
    'browser': true,
    'es6': true,
  },
  parserOptions: {
    'ecmaVersion': 2021,
    'sourceType': 'module',
  },
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'config/webpack.common.js',
      },
    },
  },
}
