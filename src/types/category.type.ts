import { TMediaSomeData } from "./product.type";


export type TCategorySomeData = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: TMediaSomeData
};
