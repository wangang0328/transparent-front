module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react-refresh/only-export-components': 'off',
    trailingComma: 'off',
     // 注意你必须禁用基本规则，因为它可以报告不正确的错误
    "no-unused-vars" : "off" ,
    "@typescript-eslint/no-unused-vars" : ["error"]
  }
}
