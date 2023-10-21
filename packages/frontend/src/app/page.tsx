'use client';

import { HomePageTitle } from '@components/home/HomePageTitle'
import { ChainInfo } from '@components/web3/ChainInfo'
import { ConnectButton } from '@components/web3/ConnectButton'
import { NFTMint } from '@components/web3/CollectionContractInteractions'
import { useInkathon } from '@scio-labs/use-inkathon'
import DressUp from '@/components/dressup/DressUp';
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

const HomePage: NextPage = () => {
  // Display `useInkathon` error messages (optional)
  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  return (
    <>
      <div className="flex flex-col items-end justify-center font-mono">
        {/* Connect Wallet Button */}
        <ConnectButton />
      </div>
      <div className="mt-2 px-5">
        {/* Title */}
        <HomePageTitle />

        <div className="mt-10">
          {/* Dress Up */}
          <DressUp />
        </div>
        
        
        {/* Greeter Contract Interactions 
        <div className="mt-10 flex w-full flex-wrap items-start justify-center gap-4">
          <ChainInfo />
        </div>
        */}

      </div>
    </>
  )
}

export default HomePage
