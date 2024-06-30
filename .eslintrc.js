module.exports = {
  parser: '@babel/eslint-parser',

  extends: [
    // 'airbnb',
    'eslint-config-google',
  ],

  plugins: ['babel', 'react'],

  globals: {
    __DEV__: true,
    __CLIENT__: true,
  },

  rules: {
    'prefer-template': 'off',
    'no-var': 'error',
    'no-unused-vars': 'error',
    'camelcase': 'error',
    'no-nested-ternary': 'error',
    'no-template-curly-in-string': 'error',
    'no-self-compare': 'error',
    'import/prefer-default-export': 0,

    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],

    // Prefer destructuring from arrays and objects
    // http://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // Allow .js files to use JSX syntax
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

    // все if должны быть с фигурными скобками
    'curly': ['error', 'all'],

    'object-curly-spacing': ['error', 'always'],
    'arrow-body-style': ['error', 'always'],
    // 'import/no-extraneous-dependencies': ['off', { 'devDependencies': false }],
    'max-len': ['error', { 'code': 100, 'ignoreComments': true }],
    'semi': ['error', 'never'],
    'no-unused-vars': 'error',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'indent': ['error', 2]
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
