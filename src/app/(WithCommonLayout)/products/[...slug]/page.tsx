import ProductDetails from '@/components/modules/(UserModules)/Product/ProductDetails/ProductDetails';
import { getProductDetailsBySlug, getRelatedProducts } from '@/services/(UserServices)/ProductService';
import React from 'react';

const ProductDetailsPage = async({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
      const { slug } = await params;
      const product = await getProductDetailsBySlug(slug)
      // console.log(product);
      const relatedProducts = await getRelatedProducts(slug)
    return (
        <div>
            <ProductDetails relatedProducts={relatedProducts} product={product}/>
        </div>
    );
};

export default ProductDetailsPage;