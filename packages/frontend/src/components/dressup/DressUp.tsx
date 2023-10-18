import Image from 'next/image';
import { useState } from 'react';

const ImagePaths = [
  { name: 'background', paths: Array(10).fill(0).map((_, i) => `/images/nfts/1-background/BCK${i + 1}.png`) },
  { name: 'skin', paths: ["/images/nfts/2-skin/Skin1.png"] },
  { name: 'base', paths: ["/images/nfts/3-base/Base.png"] },
  { name: 'eyes', paths: ["/images/nfts/4-eyes/Eyes1.png"] },
  { name: 'lips', paths: ["/images/nfts/5-lips/Lips1.png"] },
  { name: 'hair', paths: ["/images/nfts/6-hair/Hair1.png"] },
  { name: 'clothes', paths: Array(3).fill(0).map((_, i) => `/images/nfts/7-clothes/Clo${i + 1}.png`) },
  { name: 'hat', paths: ["/images/nfts/8-hat/hat1.png"] },
  { name: 'accessories', paths: ["/images/nfts/9-accessories/acc1.png"] },
  { name: 'extra', paths: ["/images/nfts/10-extra/ext1.png"] },
];

const DressUp: React.FC = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [clothesIndex, setClothesIndex] = useState(0);

  const nextBackground = () => {
    setBackgroundIndex((prevIndex) => (prevIndex + 1) % ImagePaths[0].paths.length);
  };

  const nextClothing = () => {
    setClothesIndex((prevIndex) => (prevIndex + 1) % ImagePaths[6].paths.length);
  };

  const renderButton = (onClick: () => void, text: string) => (
    <li>
      <button className="p-4 m-3 bg-fuchsia-200 border border-cyan-500" onClick={onClick}>{text}</button>
    </li>
  );

  return (
    <>
      <div className="min-h-screen font-sans">
        <ul className="flex space-x-4 p-4">
          {renderButton(nextBackground, "Change Background")}
          {renderButton(nextClothing, "Next Clothing")}
        </ul>
        {ImagePaths.map((img, index) => (
          <Image
            key={img.name}
            alt={img.name}
            src={(img.name === 'background') ? img.paths[backgroundIndex] : (img.name === 'clothes') ? img.paths[clothesIndex] : img.paths[0]}
            className="absolute left-1/4 z-10"
            width={500}
            height={500}
          />
        ))}
      </div>
    </>
  );
}

export default DressUp;
