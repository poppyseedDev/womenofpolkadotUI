import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="header bg-white p-4 text-black shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">Women of Polkadot</h1>
        <div className='space-x-4'>
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/events">Events</Link>
          <Link href="/join">Join Us</Link>
          <Link href="/support">Support Us</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
