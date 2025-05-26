import { TMediaSomeData } from "./product.type";

export type TBrand = {
  _id: string;
  title: string;
  slug: string;
  image: TMediaSomeData;
  description: string;
  websiteUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  createdBy: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TSomeBrand = {
    _id: string;
    title: string;
    slug: string;
    image: {
        _id: string;
        url: string;
        fileName: string;
    };
    description: string;
    websiteUrl: string;
}
