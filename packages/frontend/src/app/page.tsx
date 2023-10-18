'use client';

import { HomePageTitle } from '@components/home/HomePageTitle'
import { ChainInfo } from '@components/web3/ChainInfo'
import { ConnectButton } from '@components/web3/ConnectButton'
import { GreeterContractInteractions } from '@components/web3/GreeterContractInteractions'
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
      <div className="mt-20 px-5">
        {/* Title */}
        <HomePageTitle />

        <div className="mx-auto items-start justify-center">
        {/* Connect Wallet Button */}
        <ConnectButton />

        {/* Dress Up */}
        <DressUp />
        </div>
        
        {/* Greeter Contract Interactions */}
        <div className="mt-10 flex w-full flex-wrap items-start justify-center gap-4">
          {/* Chain Metadata Information */}
          <ChainInfo />

          {/* Greeter Read/Write Contract Interactions */}
          <GreeterContractInteractions />
        </div>

      </div>
    </>
  )
}

export default HomePage
