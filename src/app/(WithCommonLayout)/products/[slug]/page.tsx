import ProductDetails from '@/components/modules/Product/ProductDetails/ProductDetails';
import { getProductDetailsBySlug } from '@/services/ProductService';
import React from 'react';

const ProductDetailsPage = async({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
      const { slug } = await params;
      const product = await getProductDetailsBySlug(slug)
    return (
        <div>
            <ProductDetails product={product}/>
        </div>
    );
};

export default ProductDetailsPage;