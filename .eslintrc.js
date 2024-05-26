module.exports = {
  'rules': {
    'prefer-template': 'off',
    'no-var': 1,
    'no-unused-vars': 1,
    'camelcase': 1,
    'no-nested-ternary': 1,
    'no-console': 1,
    'no-template-curly-in-string': 1,
    'no-self-compare': 1,
    'import/prefer-default-export': 0,
    'arrow-body-style': 1,
    'import/no-extraneous-dependencies': ['off', { 'devDependencies': false }]
  },
  'ignorePatterns': ['dist', 'node_modules', 'webpack.*', 'config/paths.js'],
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': ['eslint:recommended'],
  'parserOptions': {
    'ecmaVersion': 2021,
    'sourceType': 'module'
  },
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'config/webpack.common.js'
      }
    }
  }
}
