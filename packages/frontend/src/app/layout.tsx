"use client";

import './globals.css'
import { Inconsolata } from 'next/font/google'
import 'tailwindcss/tailwind.css';
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
          {children}
        </UseInkathonProvider>
      </body>
    </html>
  )
}

