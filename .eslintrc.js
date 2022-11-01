module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        // 'padded-blocks': ['error', 'always'],
        'import/first': 0,
        'prettier/prettier': [
            'error',
            {
                parser: 'typescript',
                singleQuote: true,
                printWidth: 100,
                tabWidth: 4,
            },
        ],
    },
};
