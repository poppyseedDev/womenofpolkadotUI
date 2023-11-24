import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white p-10 ">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10">
          <a href="https://twitter.com/WomenOfPolkadot" className="hover:text-blue-400">Connect on Twitter</a>
        </div>
        <p className="mt-10">© 2023 Women of Polkadot. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
