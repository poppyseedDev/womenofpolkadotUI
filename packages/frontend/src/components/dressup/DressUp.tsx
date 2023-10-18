import Image from 'next/image';
import { useState } from 'react';

const generatePaths = (categoryName: string, itemName: string, count: number) => {
  return Array(count).fill(0).map((_, i) => `/images/nfts/${categoryName}/${itemName}${i + 1}.png`);
};

type IndicesType = {
  background: number;
  skin: number;
  base: number;
  eyes: number;
  lips: number;
  hair: number;
  clothes: number;
  hat: number;
  accessories: number;
  extra: number;
};

type ImagePathType = {
  name: keyof IndicesType;
  paths: string[];
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
  { name: 'extra', paths: generatePaths('10-extra', 'ext', 6) },
];

const DressUp: React.FC = () => {
  const [indices, setIndices] = useState<IndicesType>({ background: 0, skin: 0, base: 0, eyes: 0, lips: 0, hair: 0, clothes: 0, hat: 0, accessories: 0, extra: 0 });

  const nextImage = (type: keyof IndicesType) => {
    setIndices(prevIndices => ({
      ...prevIndices,
      [type]: (prevIndices[type] + 1) % (ImagePaths.find(i => i.name === type)?.paths.length || 0)
    }));
  };

  const previousImage = (type: keyof IndicesType) => {
    setIndices(prevIndices => {
      const length = ImagePaths.find(i => i.name === type)?.paths.length || 0;
      return {
        ...prevIndices,
        [type]: (prevIndices[type] - 1 + length) % length
      }
    });
  };

  const RandomiseImg = () => {
    ImagePaths.forEach(img => nextImage(img.name));
  };

  const switchButton = (name: keyof IndicesType, onClick: () => void, text: string) => (
    <button className="px-3 py-2 mx-1 bg-gray-200 hover:bg-gray-300 border border-gray-800" onClick={onClick}>
      {text}
    </button>
  );

  const switchFunctionality = (name: keyof IndicesType) => (
    <div key={name}>
      <li className='p-3'>
      <span className="font-bold">{name}: </span>
        {switchButton(name, () => previousImage(name), `↑`)}
        {switchButton(name, () => nextImage(name), `↓`)}
      <span className="ml-3">{indices[name] + 1}</span>
      </li>
    </div>
  );

  return (
    <>
      <div className="min-h-screen grid grid-cols-2 font-sans">
        <div>
          <ul className="flex flex-col p-4">
            <li>
            <button className="p-4 mx-2 my-1 bg-fuchsia-200 hover:bg-fuchsia-300 border border-cyan-500 rounded-2xl"
              onClick={RandomiseImg}>Radom</button>
            </li>
            {ImagePaths.map(img => img.name !== 'base' && 
                switchFunctionality(img.name)
              )
            }
          </ul>
        </div>
        <div>
          {ImagePaths.map((img, idx) => (
            <div key={idx}>
            <Image
              alt={img.name}
              src={img.paths[indices[img.name]]}
              className="absolute left-1/4 z-10"
              width={500}
              height={500}
            />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DressUp;
