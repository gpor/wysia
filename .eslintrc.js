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
    "react/react-in-jsx-scope": "off",
    "comma-dangle": ["error", {
      "objects": "always-multiline",
      "arrays": "always-multiline",
    }],
    "indent": [2, 2, { "SwitchCase": 1 }],
  },
}
