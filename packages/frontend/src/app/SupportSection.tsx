import React from 'react';
import Head from 'next/head'; // Import Head for adding custom font

const SupportSection: React.FC = () => {
  return (
    <>
      <div className="support-section bg-[url('/brand/supportcause.png')] bg-cover bg-center text-center text-white overlay">
        <div className="bg-black bg-opacity-60 p-40 flex flex-col justify-center items-center"> {/* Overlay for better text readability */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Stay Connected</h2>
          <p className="text-base md:text-lg max-w-lg mb-6">Stay updated with the latest news, events, and insights. Check out our blog for more information on whats happening within our community.</p>
          <a href="https://medium.com/women-of-polkadot" className="inline-block px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-[#123456] transition duration-300 ease-in-out">Follow Our Blog</a>
        </div>
      </div>
    </>
  );
};

export default SupportSection;
