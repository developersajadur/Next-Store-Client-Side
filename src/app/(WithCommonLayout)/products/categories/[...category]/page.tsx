import React from 'react';

const CategoryProductsPage = async({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
      const { category } = await params;
    return (
        <div>
            {category}
        </div>
    );
};

export default CategoryProductsPage;