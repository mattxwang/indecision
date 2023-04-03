module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['node_modules/**/*', 'dist/**/*', 'rsdd/**/*'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'standard-with-typescript'
      ],

      parserOptions: {
        project: ['./tsconfig.json']
      },

      rules: {
        '@typescript-eslint/consistent-type-definitions': 'off'
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off'
  }
}
