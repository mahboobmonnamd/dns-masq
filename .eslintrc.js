module.exports = {
    env: {
      es6: true,
      node: true,
      jest: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:markdown/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir : __dirname, 
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'no-useless-escape': 0,
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'linebreak-style': 1,
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-var': 1,
      'eol-last': 1,
      'no-console': 1,
      '@typescript-eslint/no-empty-function': ['error', { allow: ['constructors'] }],
    },
  };
  