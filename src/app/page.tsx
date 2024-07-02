'use client'

import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SupportSection from './SupportSection';
import Footer from './Footer';



const Home: React.FC = () => {
  return (
    <div className='font-pixel'>
      <HeroSection />
      <AboutSection />
      <SupportSection />
    </div>
  );
};

export default Home;
