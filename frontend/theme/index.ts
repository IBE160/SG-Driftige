import { defineConfig, createSystem, defaultConfig } from '@chakra-ui/react'

const config = defineConfig({
  // You can add more theme properties here as per Chakra UI documentation
  theme: {
    tokens: {
      colors: {}, // Example: define custom colors
    },
  },
})

const system = createSystem(defaultConfig, config)
 
export default system