"use client";

import './globals.css'
import 'tailwindcss/tailwind.css';
import { env } from '@config/environment'
import { getDeployments } from '@deployments/deployments'
import { UseInkathonProvider } from '@scio-labs/use-inkathon'


// src/app/layout.js

import './globals.css'

//👇 Import Open Sans font
import { Pixelify_Sans } from 'next/font/google'

//👇 Configure our font object
const pixelSans = Pixelify_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({
    children,
  } : {
    children: React.ReactNode
  }) {
  return (
    <html lang="en" className={pixelSans.variable}>
      <body className='bg-white text-black dark:bg-black dark:text-white'>
        <UseInkathonProvider
            appName="WomenOfPolkadot" // TODO
            connectOnInit={true}
            defaultChain={env.defaultChain}
            deployments={getDeployments()}
        >
          {children}
        </UseInkathonProvider>
      </body>
    </html>
  )
}

