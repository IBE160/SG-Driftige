"use client"
 
import * as React from 'react'
import { ChakraProvider, cookieStorageManager } from '@chakra-ui/react'
import system from '../theme'
 
export function Providers({ children }: { children: React.ReactNode }) {
  return (
<ChakraProvider value={system} colorModeManager={cookieStorageManager}>
      {children}
</ChakraProvider>
  )
}
