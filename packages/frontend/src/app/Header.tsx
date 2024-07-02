import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed z-10 top-0 w-full flex justify-between p-4 text-white shadow-md transition-all duration-300 ease-in-out ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">Women of Polkadot</h1>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {/* Hamburger icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
        <div className={`absolute top-14 right-0 ${isScrolled ? 'bg-black' : 'bg-transparent'} shadow-md rounded-lg md:shadow-none z-20 md:relative md:visible md:top-0 md:right-0 ${isMenuOpen ? 'flex' : 'invisible'} flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0`}>
          <Link href="/" className="text-white hover:text-blue-500">Home</Link>
          {/* <Link href="/collection" className="hover:text-blue-500">Mint NFT</Link> */}
          <Link href="https://medium.com/women-of-polkadot" className="hover:text-blue-500">Blog</Link>
          {/* <a href="#" className="hover:text-blue-500">Connect Wallet</a> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;



