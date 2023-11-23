import React from 'react';

const SupportSection: React.FC = () => {
  return (
    <div className="support-section bg-blue-100 p-10 text-center">
      <h2 className="text-3xl font-bold mb-4">Support Our Cause</h2>
      <p className="mb-6">Mint an NFT on Astar or Aleph Zero to support women in the Polkadot ecosystem.</p>
      <button className="btn btn-secondary">Mint NFT to Support</button>
    </div>
  );
};

export default SupportSection;
