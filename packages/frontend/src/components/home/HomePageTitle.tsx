import Image from 'next/image'
import Link from 'next/link'
import womenofpolkadotlogo from 'public/brand/womenofpolkadotlogo.png'
import { FC } from 'react'


export const HomePageTitle: FC = () => {
  const desc = 'Mint your own Women of Polkadot NFTs! 🎉'
  const twitterHref = 'https://twitter.com/womenofpolkadot'

  return (
    <>
      <div className="flex flex-col items-center text-center font-mono">
        {/* Logo & Title */}
        <Link
          href={twitterHref}
          target="_blank"
          className="group flex cursor-pointer items-center gap-4 rounded-3xl py-1.5 px-3.5 transition-all"
        >
          <Image src={womenofpolkadotlogo} priority height={50} alt="ink!athon Logo" />
        </Link>

        <p className="mt-4 text-gray-400">{desc}</p>

        {/* Tagline & Links */}
        <p className="mt-2 text-gray-600 text-sm">
          By{' '}
          <a
            href="https://twitter.com/poppyseedDev"
            target="_blank"
            className="font-semibold text-gray-500 hover:text-gray-400"
          >
            Aurora Poppyseed
          </a>
          {' '}&{' '}
          <a
            href="https://twitter.com/Just_Luuuu"
            target="_blank"
            className="font-semibold text-gray-500 hover:text-gray-400"
          >
            Luuu
          </a>
          {' '}&{' '}
          <a
            href="https://twitter.com/ppt1993"
            target="_blank"
            className="font-semibold text-gray-500 hover:text-gray-400"
          >
            Pierina Ponce
          </a>
        </p>
        <p className='text-xs p-2'>
          Note: These NFTs are only eligible to be minted by Women of Polkadot. Before being eligible to mint your NFT, you must first connect your wallet and wait for approval.
        </p>
      </div>
    </>
  )
}
