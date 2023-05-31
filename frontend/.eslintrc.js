module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    "prettier"
  ],
  ignorePatterns:[
    "setupTests.ts",
    "index.tsx",
    "react-app-env.d.ts",
    "reportWebVitals.ts",
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ["tsconfig.json"]
  },
  plugins: [
    'react',
  ],
  rules: {
    '@typescript-eslint/quotes':'off',
    '@typescript-eslint/semi':'off',
    '@typescript-eslint/no-extraneous-class':'off',
    '@typescript-eslint/no-misused-promises':'off',
    'indent':'off',
    "@typescript-eslint/ban-types": [
      "error",
      {
        "extendDefaults": true,
        "types": {
          "{}": false
        }
      }
    ],
    "@typescript-eslint/indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ]
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
