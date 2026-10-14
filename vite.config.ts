import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: '/upward/',
  plugins: [react()],
  test: {
    environment: 'node',
  },
})

