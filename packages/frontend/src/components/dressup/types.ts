
export type IndicesType = {
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
  
export type ImagePathType = {
    name: keyof IndicesType;
    paths: string[];
  };