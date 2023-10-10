import Image from 'next/image'
import Link from 'next/link'
import inkathonLogo from 'public/brand/inkathon-logo.png'
import githubIcon from 'public/icons/github-button.svg'
import sponsorIcon from 'public/icons/sponsor-button.svg'
import telegramIcon from 'public/icons/telegram-button.svg'
import vercelIcon from 'public/icons/vercel-button.svg'
import { FC } from 'react'


export const HomePageTitle: FC = () => {
  const title = 'ink!athon'
  const desc = 'Full-Stack DApp Boilerplate for Substrate and ink! Smart Contracts'
  const githubHref = 'https://github.com/scio-labs/inkathon'
  const deployHref = 'https://github.com/scio-labs/inkathon#deployment'
  const sponsorHref = 'mailto:hello@scio.xyz'
  const telegramHref = 'https://t.me/inkathon'

  return (
    <>
      <div className="flex flex-col items-center text-center font-mono">
        {/* Logo & Title */}
        <Link
          href={githubHref}
          target="_blank"
          className="group flex cursor-pointer items-center gap-4 rounded-3xl py-1.5 px-3.5 transition-all hover:bg-gray-900"
        >
          <Image src={inkathonLogo} priority width={60} alt="ink!athon Logo" />
          <h1 className="font-black text-[2.5rem]">{title}</h1>
        </Link>

        {/* Tagline & Links */}
        <p className="mt-2 text-gray-600 text-sm">
          By{' '}
          <a
            href="https://zoma.dev"
            target="_blank"
            className="font-semibold text-gray-500 hover:text-gray-100"
          >
            Dennis Zoma
          </a>{' '}
          &{' '}
          <a
            href="https://scio.xyz"
            target="_blank"
            className="font-semibold text-gray-500 hover:text-gray-100"
          >
            Scio Labs
          </a>
        </p>
        <p className="mt-4 mb-6 text-gray-400">{desc}</p>

        {/* Github & Vercel Buttons */}
        <div className="flex space-x-2">
          <Link href={githubHref} target="_blank">
            <Image src={githubIcon} priority height={32} alt="Github Repository" />
          </Link>
          <Link href={deployHref} target="_blank">
            <Image src={vercelIcon} priority height={32} alt="Deploy with Vercel" />
          </Link>
          <Link href={telegramHref} target="_blank">
            <Image src={telegramIcon} priority height={32} alt="Telegram Group" />
          </Link>
          <Link href={sponsorHref} target="_blank">
            <Image src={sponsorIcon} priority height={32} alt="Sponsor the Project" />
          </Link>
        </div>

        <div className="my-14 w-14 bg-gray-800 h-[2px]" />
      </div>
    </>
  )
}
