import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: '/upward/',
  envDir: false,
  plugins: [react()],
  test: {
    environment: 'node',
  },
})

