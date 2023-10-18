import Image from 'next/image';
import { useState } from 'react';
import { IndicesType, ImagePathType } from './types';
import ImageSwitcher from './ImageSwitcher';

const generatePaths = (categoryName: string, itemName: string, count: number) => {
  return Array(count).fill(0).map((_, i) => `/images/nfts/${categoryName}/${itemName}${i + 1}.png`);
};

const ImagePaths: ImagePathType[] = [
  { name: 'background', paths: generatePaths('1-background', 'BCK', 19) },
  { name: 'skin', paths: generatePaths('2-skin', 'Skin', 9) },
  { name: 'base', paths: generatePaths('3-base', 'Base', 1) },
  { name: 'eyes', paths: generatePaths('4-eyes', 'Eyes', 14) },
  { name: 'lips', paths: generatePaths('5-lips', 'Lips', 9) },
  { name: 'hair', paths: generatePaths('6-hair', 'Hair', 10) },
  { name: 'clothes', paths: generatePaths('7-clothes', 'Clo', 32) },
  { name: 'hat', paths: generatePaths('8-hat', 'hat', 12) },
  { name: 'accessories', paths: generatePaths('9-accessories', 'acc', 9) },
  { name: 'extra', paths: generatePaths('10-extra', 'ext', 7) },
];

const DressUp: React.FC = () => {
  const [indices, setIndices] = useState<IndicesType>({ background: 0, skin: 0, base: 0, eyes: 0, lips: 0, hair: 0, clothes: 0, hat: 0, accessories: 0, extra: 0 });

  const RandomiseImg = () => {
    const newIndices: Partial<IndicesType> = {};
  
    ImagePaths.forEach(img => {
      newIndices[img.name] = Math.floor(Math.random() * img.paths.length);
    });
  
    setIndices(prevIndices => ({
      ...prevIndices,
      ...newIndices
    }));
  };

  return (
    <>
    <div className='flex flex-col justify-center items-center'>
      <button 
        className="p-4 mb-4 uppercase bg-gray-600 text-white font-extrabold hover:bg-fuchsia-300 border border-cyan-500"
        onClick={RandomiseImg}>
          ✨ Randomise ✨
      </button>

    <div className='grid grid-cols-1 lg:grid-cols-2'>
    <div className="flex text-center items-center justify-center font-mono">
      <div className="relative w-full max-w-xl mx-auto" style={{height: '500px'}}>
        {ImagePaths.map((img, idx) => (
          <Image
            key={idx}
            alt={img.name}
            src={img.paths[indices[img.name]]}
            className="absolute top-0 left-0"
            width={500}
            height={500}
          />
        ))}
      </div>
    </div>

    {/* Items under the image */}
    <div className="flex flex-col text-center items-center justify-start font-mon">
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 w-full">
        <div className="">
          <div className="flex flex-col gap-3 p-4">
            {ImagePaths.map((img, idx) => img.name !== 'base' && 
              <div key={idx}>
                <ImageSwitcher 
                    name={img.name}
                    imagePaths={ImagePaths}
                    indices={indices} 
                    setIndices={setIndices} 
                />
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
    </div >
    </div>

    </>

  );
}

export default DressUp;
