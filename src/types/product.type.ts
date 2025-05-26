
export interface IProductCard {
  _id: string;
  title: string;
  slug: string;
  image: {
    _id: string;
    url: string;
    fileName: string;
  };
  category: string[];
  brand: string;  
  price: number;
  regular_price: number;
  sale_price: number;
  stock_quantity: number;
}
