'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { HAKI_DROP_PRODUCTS } from '@/lib/mockData';

export default function ProductGrid() {
  // Select 4 limited edition products from the mock data to create a single row grid
  const limitedProducts = HAKI_DROP_PRODUCTS.slice(0, 4);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="font-bangers text-5xl tracking-widest text-[#F4C430] drop-shadow-[2px_2px_0_#b3001a] text-center md:text-left">
          LIMITED EDITION DROPS
        </h2>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Desktop: 4 cols, Tablet: 2 cols, Mobile: 1 col, Gap: 32px (gap-8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {limitedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              image={product.images[0]}
              category={product.collection}
              handle={product.handle}
              backgroundImage="/images/cinematic-bg.png"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
