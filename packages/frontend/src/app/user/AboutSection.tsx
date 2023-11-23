import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div className="bg-[#0e182e] p-10 md:p-20 text-gray-200">
      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "'Pixelify Sans', sans-serif" }}>About Us</h2>
          <p className="text-base md:text-lg mb-6">Women of Polkadot is dedicated to supporting and empowering women in the Polkadot ecosystem through regular meetings, events, and collaborations.</p>
          <a href="/join" className="inline-block px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-[#0e182e] transition duration-300 ease-in-out">Join Us</a>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-30">
          <img src="/brand/aboutimg.png" alt="Women of Polkadot" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
