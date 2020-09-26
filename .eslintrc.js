module.exports = {
  'env': {
    'es6': true,
    'browser': true
  },
  'extends': [
    'airbnb',
  ],
  'rules': {
    'semi': ['warn', 'never'],
    'quotes': ['warn', 'single'],
    'no-console': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    'arrow-body-style': ['warn', 'as-needed'],
    'arrow-parens': ['warn', 'as-needed'],
    'indent': ['warn', 2],
    'no-unused-vars': 'warn',
    'func-names': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'space-before-function-paren': 'off',
    'linebreak-style': 'off',
    'vars-on-top': 'off',
  },
  'parser': 'babel-eslint',
  'settings': {
    'react': {
      'version': '999.999.999'
    }
  },
  'ignorePatterns': ['build/**/*.js', 'node_modules/', 'build-tasks/postcss.config.js', 'src/js/modernizr.js']
}
