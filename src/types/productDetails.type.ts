import { TMediaSomeData } from "./product.type";


// interface IVariant {
//   _id: string;
//   color: string;
//   size: string;
//   weight: number;
//   price: number;
//   regular_price: number;
//   sale_price: number;
//   stock_quantity: number;
//   additional: string;
//   image: TMediaSomeData;
//   createdAt: string;
//   updatedAt: string;
// }

interface ISpecification {
  key: string;
  value: string;
}

interface ICategory {
  _id: string;
  title: string;
  slug: string;
  image: TMediaSomeData;
}

interface IBrand {
  _id: string;
  title: string;
  slug: string;
  image: TMediaSomeData;
}

export interface IProductDetails {
  _id: string;
  addedBy: string;
  title: string;
  slug: string;
  image: TMediaSomeData;
  gallery_images: TMediaSomeData[];
  category: ICategory[];
  brand: IBrand;
  description: string;
  short_description: string;
  price: number;
  regular_price: number;
  sale_price: number;
  color?: string[];
  stock_quantity: number;
  specifications: ISpecification[];
  warranty: string;
  weight: number;
  size: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
