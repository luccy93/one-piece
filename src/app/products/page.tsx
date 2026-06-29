'use client';

import React from 'react';
import ProductCard from '@/components/ProductCard';
import { HAKI_DROP_PRODUCTS } from '@/lib/mockData';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#030108] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="font-bangers text-6xl tracking-widest text-white drop-shadow-[2px_2px_0_#9333ea] text-center md:text-left uppercase">
          All Products
        </h1>
        <p className="font-sans text-neutral-400 mt-4 text-lg text-center md:text-left max-w-2xl">
          Browse the complete Haki Drop collection. Premium luxury streetwear, accessories, and collectibles.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {HAKI_DROP_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              image={product.images[0]}
              category={product.collection}
              handle={product.handle}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
