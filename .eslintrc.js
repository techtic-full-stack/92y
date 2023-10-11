module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['react-app', '@typescript-eslint'],
    extends: [
        'next/core-web-vitals',
        'react-app',

        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        // 'react-app/jest',
    ],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        'linebreak-style': 'off',
        'react/display-name': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        '@typescript-eslint/no-unused-vars':
            process.env.NODE_ENV === 'production' || process.env.HUSKY ? 'error' : 'warn',
        // '@typescript-eslint/naming-convention': ['error', { selector: 'variableLike', format: ['camelCase'] }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
    overrides: [
        {
            files: ['**/*.stories.*'],
            rules: {
                'import/no-anonymous-default-export': 'off',
            },
        },
    ],
};
