import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Without this, plain no-unused-vars has no idea <motion.div> or
      // <Foo /> references the imported `motion`/`Foo` identifier — it was
      // flagging the large majority of this project's component imports as
      // unused, which they weren't.
      'react/jsx-uses-vars': 'error',
      // unused-imports' versions are --fix-able (plain no-unused-vars isn't)
      // — deleting a genuinely unused import/var is always behavior-safe.
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        { vars: 'all', varsIgnorePattern: '^[A-Z_]', args: 'none' },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
