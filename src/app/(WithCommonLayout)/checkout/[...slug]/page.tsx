import CheckoutComponent from '@/components/modules/(UserModules)/Checkout/CheckoutComponent';
import { getSingleProductWithSomeDataBySlug } from '@/services/(UserServices)/CheckoutService';
import React from 'react';

const SingleProductCheckoutPage = async({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
      const { slug } = await params;
      const product = await getSingleProductWithSomeDataBySlug(slug);
      if(!product){
        return <div className="text-center text-2xl text-gray-500">Product not found</div>;
      }
    return (
        <div>
            <CheckoutComponent product={product} />
        </div>
    );
};

export default SingleProductCheckoutPage;