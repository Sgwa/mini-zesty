const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const reactNative = require('eslint-plugin-react-native');
const prettier = require('eslint-plugin-prettier');
const globals = require('globals');
const { FlatCompat } = require('@eslint/eslintrc');
const importPlugin = require('eslint-plugin-import');
const noRelativeImports = require('eslint-plugin-no-relative-import-paths');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      '.expo',
      'android',
      'ios',
      'babel.config.js',
      '.prettierrc.js',
      'eslint.config.cjs',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,

  ...compat.config({
    extends: [
      'plugin:react-hooks/recommended',
      'plugin:react-native/all',
      'plugin:prettier/recommended',
    ],
  }),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: { ...globals.es2021, __DEV__: true, JSX: true },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      'react-native': reactNative,
      prettier,
      import: importPlugin,
      'no-relative-import-paths': noRelativeImports,
    },

    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
        'babel-module': {}
      }
    },

    rules: {
      'prettier/prettier': ['error', { singleQuote: false, jsxSingleQuote: false }],
      quotes: ['error', 'double', { avoidEscape: true }],
      'react/react-in-jsx-scope': 'off',
      'react-native/no-inline-styles': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'ignore' }],
      'react-native/no-raw-text': ['error', { skip: ['Text', 'Markdown'] }],
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        { allowSameFolder: false, rootDir: '.', prefix: '' },
      ],
    },
  },
];
