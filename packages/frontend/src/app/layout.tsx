"use client";

import './globals.css'
import { Inconsolata } from 'next/font/google'
import 'tailwindcss/tailwind.css';
import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import { env } from '@config/environment'
import { getDeployments } from '@deployments/deployments'
import { UseInkathonProvider } from '@scio-labs/use-inkathon'



const inconsolata = Inconsolata({ subsets: ['latin'] })

export default function RootLayout({
    children,
  } : {
    children: React.ReactNode
  }) {
  return (
    <html lang="en">
      <body className='bg-white text-black dark:bg-black dark:text-white'>
        <UseInkathonProvider
            appName="ink!athon" // TODO
            connectOnInit={true}
            defaultChain={env.defaultChain}
            deployments={getDeployments()}
        >
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </UseInkathonProvider>
      </body>
    </html>
  )
}

