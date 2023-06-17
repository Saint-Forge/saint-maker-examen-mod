import { defineConfig } from 'vitest/config'
import { getGeneratedAliases } from './getGeneratedAliases'

export default defineConfig({
    resolve: {
        alias: getGeneratedAliases(),
    },
    test: {
        root: '.',
        globals: true,
        setupFiles: './setup.js',
        watch: false,
        environment: 'jsdom',
        coverage: {
            all: true,
            include: ['src'],
            exclude: ['src/constants', 'src/main.tsx', 'src/theme.ts', 'src/test-globals.ts'],
            provider: 'istanbul',
        },
    },
})
