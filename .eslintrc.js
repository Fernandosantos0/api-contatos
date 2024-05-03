module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'indent': 'off',
    'no-unused-vars': 'off',
    'linebreak-style': 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    'quote-props': 'off',
    'strict': 'off',
    'space-before-function-paren': 'off',
    'no-param-reassign': 'off',
    'arrow-parens': 'off',
    'keyword-spacing': 'off',
    'no-return-await': 'off',
    'no-trailing-spaces': 'off',
    'no-undef': 'off',
    'object-curly-newline': 'off',
    'max-len': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-dupe-keys': 'off',
    'camelcase': 'off',
    'consistent-return': 'off',
    'prefer-const': 'off',
    'radix': 'off',
    'import/prefer-default-export': 'off',
  },
};
