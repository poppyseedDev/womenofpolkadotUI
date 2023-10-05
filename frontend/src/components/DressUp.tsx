
import { useState } from 'react';

const DressUp: React.FC = () => {
  const [shirtIndex, setShirtIndex] = useState(0);
  const [pantIndex, setPantIndex] = useState(0);
  
  const shirts = [
    "https://s-media-cache-ak0.pinimg.com/originals/25/43/a9/2543a9ef622c17ca0ccd1fae4441a8ac.png",
    "https://s-media-cache-ak0.pinimg.com/originals/05/b5/56/05b556aee24a79e17050270c7274de8c.png",
    "https://s-media-cache-ak0.pinimg.com/originals/d7/5c/ba/d75cbab4c752bcd839098e7304fa449b.png",
    "https://s-media-cache-ak0.pinimg.com/originals/84/07/2f/84072f86cc9c7700367b958b1252527b.png",
    "https://s-media-cache-ak0.pinimg.com/originals/d3/72/cf/d372cf67ffa1073da171f6824ed30140.png",
    "https://s-media-cache-ak0.pinimg.com/originals/20/72/f6/2072f64b75fb5753a6b038312697fa0d.png",
    "https://s-media-cache-ak0.pinimg.com/originals/1f/86/b1/1f86b13b426f5ab1483326c97eaa962c.png"
  ];

  const pants = [
    "https://s-media-cache-ak0.pinimg.com/originals/b3/c2/4d/b3c24d75d647564cdaa1d85f854587ba.png",
    "https://s-media-cache-ak0.pinimg.com/originals/a5/3a/56/a53a562de60d53e341289584e585f776.png",
    "https://s-media-cache-ak0.pinimg.com/originals/2b/26/3b/2b263b07bcdd3d2fafab6ec03402e255.png",
    "https://s-media-cache-ak0.pinimg.com/originals/dd/a6/d7/dda6d7944174edbd743d92360e2ef8f5.png",
    "https://s-media-cache-ak0.pinimg.com/originals/94/c7/15/94c715a60995c215a74a2492a5bea344.png",
    "https://s-media-cache-ak0.pinimg.com/originals/da/1a/16/da1a1609695435ddc106d4f8989f1535.png",
    "https://s-media-cache-ak0.pinimg.com/originals/c3/78/78/c3787895d353d3b4d8534855ae0b1d83.png"
    // ... add more pant URLs as needed ...
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
          <button className="p-4 m-3 bg-purple-900" onClick={nextShirt}>top</button>
        </li>
        <li>
          <button className="p-4 m-3 bg-purple-900" onClick={nextPant}>bottom</button>
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
