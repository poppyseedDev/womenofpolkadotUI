import { ContractIds } from '@deployments/deployments';
import { BN } from '@polkadot/util';
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon';
import { contractTxWithToast } from '@utils/contractTxWithToast';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type MintAttributes = {
  background: number;
  skin: number;
  eyes: number;
  lips: number;
  hair: number;
  clothes: number;
  hat: number;
  accessories: number;
  extra: number;
};

const TOKENS_TO_PAY = 100; // Tokens to pay for minting an NFT

export const NFTMint: FC<MintAttributes> = ({
    background,
    skin,
    eyes,
    lips,
    hair,
    clothes,
    hat,
    accessories,
    extra
  }) => {
  const { api, activeAccount, activeSigner } = useInkathon();
  const { contract } = useRegisteredContract(ContractIds.Collection);
  const [mintStatus, setMintStatus] = useState<string>();
  const { register, handleSubmit } = useForm<MintAttributes>();

  const mintNFT = async () => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…');
      console.log("Wallet not connected. Try again…")
      return;
    }

    setMintStatus('Minting...');
    try {

      const decimals = api.registry.chainDecimals?.[0] || 12
      const value = new BN(100).mul(new BN(10).pow(new BN(decimals)))
      
      //const paymentAmount = api.createType('Balance', TOKENS_TO_PAY); // Convert 100 tokens to the appropriate Balance type
      //console.log('paymentAmount', paymentAmount);

      // Assuming the function arguments are in the correct order
      await contractTxWithToast(api, activeAccount.address, contract, 'payableMintImpl::mint', { value: value }, [
        activeAccount.address,
        background,
        skin,
        eyes,
        lips,
        hair,
        clothes,
        hat,
        accessories,
        extra,
      ]);
      setMintStatus('Mint successful!');
    } catch (e) {
      console.error(e);
      toast.error('Error while minting NFT. Try again…');
      setMintStatus('Mint failed.');
    }
  };

  if (!api) return null;
  if (!activeAccount) {
    return <div className="p-4 text-lg text-gray-500 italic">Connect the wallet first to be able to mint.</div>;
  }

  return (
    <>
      <div className="flex grow flex-row space-y-4">
        {/* Mint NFT Form */}
        <div className="p-4">
          <form onSubmit={handleSubmit(mintNFT)}>
            <div className="space-y-4">
              {/* Render input fields for each attribute */}
              <button
                type="submit"
                className="px-7 uppercase py-4 bg-gray-600 text-lg text-white border border-black hover:bg-gray-700"
              >
                ✨ Mint NFT ✨
              </button>
            </div>
          </form>
        </div>

        {/* Mint Status */}
        {mintStatus && (
          <div className="p-4 italic mt-2 ">
            Message: {mintStatus}
          </div>
        )}
      </div>
    </>
  )
}
