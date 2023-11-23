import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div className="about-section bg-gray-800 p-10 md:p-20 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">About Us</h2>
          <p className="text-base md:text-lg mb-6">Women of Polkadot is dedicated to supporting and empowering women in the Polkadot ecosystem through regular meetings, events, and collaborations.</p>
          {/* Additional content or call-to-action buttons can be added here */}
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          {/* Placeholder for image or other media */}
          <img src="/path-to-your-image.jpg" alt="Women of Polkadot" className="rounded-lg shadow-xl" />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
