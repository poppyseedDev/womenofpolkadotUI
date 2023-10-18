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
  }

  const switchButton = (name: string, onClick: () => void, text: string) => (
    <div key={name}>
      <li>
        <button className="p-4 mx-2 my-1 bg-fuchsia-200 hover:bg-fuchsia-300 border border-cyan-500 rounded-2xl" onClick={onClick}>
          {text}
        </button>
      </li>

    </div>
  );

  return (
    <>
      <div className="min-h-screen grid grid-cols-2 font-sans">
        <ul className="flex flex-col p-4">
          {ImagePaths.map(img => img.name !== 'base' && 
              switchButton(
                img.name, 
                () => nextImage(img.name), 
                `Next ${img.name}`
              )
            )
          }
        </ul>
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
