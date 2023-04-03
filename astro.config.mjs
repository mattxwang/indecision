import { defineConfig } from 'astro/config'
import wasm from 'vite-plugin-wasm'

// https://astro.build/config
import react from '@astrojs/react'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    plugins: [wasm()],
    ssr: {
      noExternal: [/reactflow/]
    }
  }
})
