import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/test/setup.ts'],
    hookTimeout: 30000,
    fileParallelism: false,
    sequence: {
      concurrent: false,
    },
    env: {
      DATABASE_URL: 'postgresql://docker:docker@localhost:5434/findafriend-test',
    },
  },
})