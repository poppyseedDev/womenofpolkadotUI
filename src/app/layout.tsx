"use client";

import './globals.css'
import 'tailwindcss/tailwind.css';
import './globals.css'

//👇 Import Open Sans font
import { Pixelify_Sans } from 'next/font/google'
import Header from './Header';
import Footer from './Footer';

//👇 Configure our font object
const pixelSans = Pixelify_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pixel-sans',
})

export default function RootLayout({
    children,
  } : {
    children: React.ReactNode
  }) {
  return (
    <html lang="en" className={pixelSans.variable}>
      <body className='bg-white font-pixel text-black dark:bg-black dark:text-white'>
        {/* <UseInkathonProvider
            appName="WomenOfPolkadot" // TODO
            connectOnInit={false}
            defaultChain={env.defaultChain}
            deployments={getDeployments()}
        > */}
          <Header />
          
          {children}
          <Footer />
        {/* </UseInkathonProvider> */}
      </body>
    </html>
  )
}

