import Link from 'next/link';
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full">
      <div className="hero bg-[url('/brand/heroimg.png')] bg-cover bg-no-repeat bg-center h-screen text-white">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="text-center pt-28 p-10 max-w-4xl --font-pixel-sans">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Empowering Women in the Polkadot Ecosystem</h1>
            <p className="text-sm sm:text-base md:text-lg mb-6">Join our community and be a part of the movement thats shaping the future of the Polkadot ecosystem. Participate in our meetups during Polkadot side events and make a difference.</p>
            <div className="flex justify-center items-center">
              <Link href="https://forms.gle/ogmE5ZvK5oGUzqmB8" className="py-2 px-3 border border-white rounded mr-4 hover:bg-white hover:text-black transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">Join Us</Link>
              <Link href="https://x.com/womenofpolkadot" className="btn btn-secondary hover:bg-secondary-dark transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-opacity-50">Follow us on Twitter</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
