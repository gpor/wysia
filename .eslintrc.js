module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": [
    "react",
  ],
  "rules": {
    "no-unused-vars": "off",
    "no-empty": "off",
    "react/react-in-jsx-scope": "off",
    "comma-dangle": ["error", {
      "objects": "always-multiline",
      "arrays": "always-multiline",
    }],
    "indent": [2, 2, { "SwitchCase": 1 }],
    "object-curly-spacing": [
      "error",
      "always",
    ],
    "space-before-function-paren": [
      "error",
      "never",
    ],
    "space-before-blocks": [
      "error",
      "always",
    ],
  },
}
