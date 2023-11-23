import React from 'react';
import Head from 'next/head'; // Import Head for adding custom font

const SupportSection: React.FC = () => {
  return (
    <>
      <div className="support-section bg-[url('/brand/supportcause.png')] bg-cover bg-center text-center text-white overlay">
        <div className="bg-black bg-opacity-60 p-40"> {/* Overlay for better text readability */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "'Pixelify Sans', sans-serif" }}>Support Our Cause</h2>
          <p className="text-base md:text-lg mb-6">Mint an NFT on Astar or Aleph Zero to support women in the Polkadot ecosystem.</p>
          <button className="inline-block px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-[#123456] transition duration-300 ease-in-out">Mint NFT to Support</button>
        </div>
      </div>
    </>
  );
};

export default SupportSection;
