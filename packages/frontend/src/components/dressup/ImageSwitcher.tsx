import React from 'react';
import { IndicesType, ImagePathType } from './types';

type ImageSwitcherProps = {
  name: keyof IndicesType;
  imagePaths: ImagePathType[];
  indices: IndicesType;
  setIndices: React.Dispatch<React.SetStateAction<IndicesType>>;
};

const ImageSwitcher: React.FC<ImageSwitcherProps> = ({ name, imagePaths, indices, setIndices }) => {
  const nextImage = (type: keyof IndicesType) => {
    setIndices(prevIndices => ({
      ...prevIndices,
      [type]: (prevIndices[type] + 1) % (imagePaths.find(i => i.name === type)?.paths.length || 0)
    }));
  };

  const previousImage = (type: keyof IndicesType) => {
    setIndices(prevIndices => {
      const length = imagePaths.find(i => i.name === type)?.paths.length || 0;
      return {
        ...prevIndices,
        [type]: (prevIndices[type] - 1 + length) % length
      }
    });
  };

  const switchButton = (name: keyof IndicesType, onClick: () => void, text: string) => (
    <button className="px-3 py-2 mx-1 bg-gray-200 hover:bg-gray-300 border border-gray-800" onClick={onClick}>
      {text}
    </button>
  );

  return (
    <>
      <li className='p-3 flex flex-row'>
          <div className="px-5 mx-1 py-2 bg-gray-500 text-white uppercase border border-gray-800">
            <span className="font-bold ">{name}</span>
          </div>
          <div className="px-3 mx-1 py-2 bg-gray-400 border border-gray-800">
            {indices[name] + 1}
          </div>
          {switchButton(name, () => previousImage(name), `↓`)}
          {switchButton(name, () => nextImage(name), `↑`)}
          
          {(name === 'hat' || name === 'accessories' || name === 'extra') &&
              switchButton(name, () => setIndices(prevIndices => ({
                  ...prevIndices,
                  [name]: 0
              })), `No ${name}`)}
      </li>
    </>
  );
}

export default ImageSwitcher;
