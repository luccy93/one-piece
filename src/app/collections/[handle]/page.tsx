'use client';

import React, { useLayoutEffect, useRef, use } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

import { HAKI_DROP_PRODUCTS } from '@/lib/mockData';

const HoloFoilCard = ({ children, className }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-200, 200], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-200, 200], [-15, 15]);

  const handleMouse = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className={`${className} perspective-[1000px]`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full relative z-0">
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)`,
            x: useTransform(mouseXSpring, [-200, 200], [-50, 50]),
            y: useTransform(mouseYSpring, [-200, 200], [-50, 50])
          }}
        />
        {children}
      </div>
    </motion.div>
  );
};

const PhysicsWrapper = ({ collection, children, className }: { collection: string, children: React.ReactNode, className?: string }) => {
  if (collection === 'cards') {
    return <HoloFoilCard className={className}>{children}</HoloFoilCard>;
  }
  if (collection === 'stickers') {
    return (
      <motion.div 
        drag 
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} 
        dragElastic={0.8}
        className={`${className} cursor-grab active:cursor-grabbing shadow-[0_5px_15px_rgba(0,0,0,0.5)]`}
      >
        {children}
      </motion.div>
    );
  }
  if (collection === 'toys') {
    return (
      <motion.div 
        whileHover={{ scale: 1.06, rotate: 3, y: -5 }} 
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
  
  // default (tees & hoodies)
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = use(params);
  const headerRef = useRef<HTMLDivElement>(null);

  const displayProducts = handle === 'all' 
    ? HAKI_DROP_PRODUCTS 
    : HAKI_DROP_PRODUCTS.filter(p => p.collection === handle);

  const products = displayProducts.length > 0 ? displayProducts : HAKI_DROP_PRODUCTS;

  const isAll = handle === 'all';
  const categories = isAll 
    ? ['tees', 'hoodies', 'stickers', 'cards', 'toys']
    : [handle];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Dynamic sorting header levitation on scroll
      gsap.to(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top top',
          end: '+=200',
          scrub: true,
        },
        y: 20,
        backgroundColor: 'rgba(4, 6, 12, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: '24px',
        paddingTop: '24px',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#04060c] pt-32 pb-24 px-6 text-white font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 relative">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-32 flex flex-col gap-8">
            <div>
              <h2 className="font-bangers text-4xl tracking-widest text-[#F4C430] mb-6">FILTERS</h2>
              
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-bebas tracking-widest text-lg mb-3 text-white/80">PRICE</h3>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Min" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:border-[#F4C430] focus:outline-none transition-colors" />
                    <input type="text" placeholder="Max" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:border-[#F4C430] focus:outline-none transition-colors" />
                  </div>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-bebas tracking-widest text-lg mb-3 text-white/80">SIZE</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button key={size} className="bg-white/5 border border-white/10 rounded py-2 text-sm hover:border-[#F4C430] hover:bg-white/10 transition-colors">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Dynamic Sorting Header */}
          <div ref={headerRef} className="sticky top-20 z-20 flex justify-between items-center mb-8 pb-4 -mx-6 px-6 md:mx-0 md:px-0">
            <h1 className="font-bangers text-5xl tracking-widest uppercase drop-shadow-[2px_2px_0_#b3001a]">
              {handle.replace('-', ' ')}
            </h1>
            <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm font-sans focus:outline-none focus:border-[#F4C430] cursor-pointer appearance-none">
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="flex flex-col gap-16">
            {categories.map(category => {
              const categoryProducts = products.filter(p => p.collection === category);
              if (categoryProducts.length === 0) return null;

              return (
                <div key={category}>
                  {isAll && (
                    <h2 className="font-bebas text-3xl tracking-widest text-[#F4C430] mb-8 border-b border-white/10 pb-4 uppercase">
                      {category}
                    </h2>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryProducts.map((product) => (
                      <Link key={product.id} href={`/products/${product.handle}`}>
                        <PhysicsWrapper
                          collection={product.collection}
                          className="group relative bg-[#0a0f1c] rounded-2xl p-4 border border-white/10 overflow-hidden flex flex-col items-center text-center h-full"
                        >
                          <div className="w-full h-80 bg-[#1a1f3c] rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                            <img src={product.images[0]} alt={product.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <h3 className="font-bebas text-xl tracking-widest mb-1 mt-auto">{product.title}</h3>
                          <p className="font-sans text-[#F7D446] font-bold mt-2">
                            ${product.price.toFixed(2)} USD
                          </p>
                        </PhysicsWrapper>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}
