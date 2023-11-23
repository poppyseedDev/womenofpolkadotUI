import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-gray-800 text-white p-10 mt-10">
      <div className="container mx-auto text-center">
        <p>Contact us at [email protected]</p>
        {/* Add social media links here */}
        <p className="mt-4">© 2023 Women of Polkadot. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
