import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      'eslint-plugin-prettier': eslintPluginPrettierRecommended
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'max-len': ['error', 120],
      'no-trailing-spaces': ['error'],
      'object-curly-spacing': ['error', 'always'],
      'eol-last': ['error']
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];
