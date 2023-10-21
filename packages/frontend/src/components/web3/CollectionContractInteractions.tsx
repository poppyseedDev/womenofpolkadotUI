import { ContractIds } from '@deployments/deployments';
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

type MintAttributes = {
  to: string;
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

export const NFTMint: FC = () => {
  const { api, activeAccount, activeSigner } = useInkathon();
  const { contract } = useRegisteredContract(ContractIds.Collection);
  const [mintStatus, setMintStatus] = useState<string>();
  const { register, handleSubmit } = useForm<MintAttributes>();

  const mintNFT = async (attributes: MintAttributes) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…');
      return;
    }

    setMintStatus('Minting...');
    try {
      // Assuming the function arguments are in the correct order
      await contractTxWithToast(api, activeAccount.address, contract, 'payableMintImpl::mint', {}, [
        attributes.to,
        attributes.background,
        attributes.skin,
        attributes.eyes,
        attributes.lips,
        attributes.hair,
        attributes.clothes,
        attributes.hat,
        attributes.accessories,
        attributes.extra,
      ]);
      setMintStatus('Mint successful!');
    } catch (e) {
      console.error(e);
      toast.error('Error while minting NFT. Try again…');
      setMintStatus('Mint failed.');
    }
  };

  if (!api) return null;

  return (
    <>
      <div className="flex grow flex-col space-y-4 max-w-[20rem]">
        <h2 className="text-center font-mono text-gray-400">Mint NFT</h2>

        {/* Mint NFT Form */}
        <div className="p-4 border border-gray-300 rounded bg-white dark:bg-gray-800">
          <form onSubmit={handleSubmit(mintNFT)}>
            <div className="space-y-4">
              {/* Render input fields for each attribute */}
              {['to', 'background', 'skin', 'eyes', 'lips', 'hair', 'clothes', 'hat', 'accessories', 'extra'].map(attr => (
                <div key={attr}>
                  <label className="block mb-1 font-bold">{attr}</label>
                  <input
                    type="text"
                    {...register(attr)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="px-4 py-2 mt-4 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Mint NFT
              </button>
            </div>
          </form>
        </div>

        {/* Mint Status */}
        {mintStatus && (
          <div className="p-4 mt-2 border border-gray-300 rounded bg-white dark:bg-gray-800">
            {mintStatus}
          </div>
        )}
      </div>
    </>
  )
}
