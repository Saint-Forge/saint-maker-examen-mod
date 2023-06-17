module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: ['plugin:react/recommended', 'google', 'plugin:react/jsx-runtime', 'prettier', 'plugin:custom-rules/all'],
    plugins: [
        'react',
        '@typescript-eslint',
        'eslint-plugin-no-inline-styles',
        'check-file',
        'import',
        'etc',
        'unused-imports',
    ],
    rules: {
        // Naming Conventions
        'check-file/filename-naming-convention': [
            'error',
            {
                'src/components/*.{,tsx}': 'PASCAL_CASE', // Component’s names should be written using pascal
                'src/constants/*.{,ts}': 'CAMEL_CASE', // Non-components should be written using camel case
                'src/pages/*.{,tsx}': 'PASCAL_CASE',
                'src/redux/*.{,ts}': 'CAMEL_CASE',
                'src/redux/slice/*.{,ts}': 'CAMEL_CASE',
                'src/styles/*.{,css}': 'CAMEL_CASE',
                'src/unitTests/*.{,.test.ts}': 'CAMEL_CASE',
                'src/utils/*.{,ts}': 'CAMEL_CASE',
            },
        ],
        camelcase: 'error', // Attribute name should be camel case, Variable names should be camel case:

        // Bug Avoidance
        'no-unsafe-optional-chaining': 'error', // Use optional chaining if things can be null
        'no-console': 'error', // Remove all console.log()
        'react/prefer-read-only-props': 'error', // Treat props as read-only. Do not try to modify them.

        // Architecture & Clean Code
        'react/no-multi-comp': 'error', // Only include one React component per file
        'etc/no-commented-out-code': 'error', // No unneeded comments, Commented out code should be deleted, not committed

        // ES6
        'prefer-spread': 'error', // Can you use spread operator be used instead?
        'react/destructuring-assignment': 'error', // Can you use destructuring be used instead?
        'no-var': 'error', // Only use let or const
        '@typescript-eslint/prefer-optional-chain': 'error', // Can the optional chain operator be used instead of an explicit null check

        // CSS
        'no-inline-styles/no-inline-styles': 'error',

        // Misc
        'custom-rules/prefer-alias-imports.rule': [
            'error',
            {
                autoFetchPaths: true,
            },
        ], // Auto-fixed typescript aliases
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }], // Prefer arrow functions for React component definition
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                groups: ['external', ['internal', 'unknown']],
            },
        ], // Import sorting
        'import/no-default-export': 'error', // Prohibit default export
        'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        'unused-imports/no-unused-imports': 'warn',

        // Disabled
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',
        'require-jsdoc': 'off',
        'max-len': 'off',
    },
}
