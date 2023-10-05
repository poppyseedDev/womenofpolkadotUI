
import { useState } from 'react';

const DressUp: React.FC = () => {
  const [shirtIndex, setShirtIndex] = useState(0);
  const [pantIndex, setPantIndex] = useState(0);
  
  const shirts = [
    "https://s-media-cache-ak0.pinimg.com/originals/25/43/a9/2543a9ef622c17ca0ccd1fae4441a8ac.png",
    "https://s-media-cache-ak0.pinimg.com/originals/05/b5/56/05b556aee24a79e17050270c7274de8c.png",
    // ... other shirt URLs ...
  ];

  const pants = [
    "https://s-media-cache-ak0.pinimg.com/originals/b3/c2/4d/b3c24d75d647564cdaa1d85f854587ba.png",
    "https://s-media-cache-ak0.pinimg.com/originals/a5/3a/56/a53a562de60d53e341289584e585f776.png",
    // ... other pant URLs ...
  ];

  const nextShirt = () => {
    setShirtIndex((prevIndex) => (prevIndex + 1) % shirts.length);
  };

  const nextPant = () => {
    setPantIndex((prevIndex) => (prevIndex + 1) % pants.length);
  };

  return (
    <>
    <div className="min-h-screen font-sans">
      <ul className="flex space-x-4 p-4">
        <li>
          <button className="p-4 m-3 bg-purple " onClick={nextShirt}>top</button>
        </li>
        <li>
          <button className="p-4 m-3" onClick={nextPant}>bottom</button>
        </li>
      </ul>
      <img src="https://s-media-cache-ak0.pinimg.com/originals/d5/19/f0/d519f0f021325f16e85a193ec3718130.png" className="absolute left-1/4 h-full" />
      <img src={shirts[shirtIndex]} className="absolute left-1/4 h-full z-10" />
      <img src={pants[pantIndex]} className="absolute left-1/4 h-full z-5" />
    </div>
    </>
  );
}

export default DressUp;
