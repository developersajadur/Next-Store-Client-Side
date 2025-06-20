

export interface TCategory {
  _id: string;
  title: string;
  slug: string;
  image: TMediaSomeData;
}

export interface TBrand {
  _id: string;
  title: string;
  slug: string;
  image: TMediaSomeData;
}

export interface IProductCard {
  _id: string;
  title: string;
  slug: string;
  image: TMediaSomeData;
  category: TCategory[];
  brand: TBrand;
  price: number;
  regular_price: number;
  sale_price: number;
  stock_quantity: number;
}

export interface ICart extends Omit<IProductCard, "category" | "brand"> {
  orderQuantity: number;
}



// Media type
export type TMediaSomeData = {
  _id: string;
  url: string;
  fileName: string;
};


// Product with Review info
type TBestReviewedProduct = {
  _id: string; 
  averageRating: number;
  reviewCount: number;
  product: IProductCard;
};

// Final Home Product Response Type
export type THomeProductResponse = {
  featuredProducts: IProductCard[];
  onSaleProducts: IProductCard[];
  readyToOrderProducts: IProductCard[];
  bestSellingProducts: IProductCard[];
  bestReviewedProducts: TBestReviewedProduct[];
};




