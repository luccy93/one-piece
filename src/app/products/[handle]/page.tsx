'use client';

import React, { useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { ChevronDown, Truck, ShieldCheck, Shirt, Ruler } from 'lucide-react';
import { HAKI_DROP_PRODUCTS, Product } from '@/lib/mockData';

export default function ProductDetail({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = use(params);
  
  // Find the actual product in the database by handle
  const product = HAKI_DROP_PRODUCTS.find(p => p.handle === handle) || HAKI_DROP_PRODUCTS[0];

  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [direction, setDirection] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('features');

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    if (swipe < -50 && activeImage < product.images.length - 1) {
      setDirection(1);
      setActiveImage(prev => prev + 1);
    } else if (swipe > 50 && activeImage > 0) {
      setDirection(-1);
      setActiveImage(prev => prev - 1);
    }
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleAddToCart = () => {
    addToCart({ 
      id: product.id, 
      variantId: `${product.id}-${selectedSize}`,
      size: selectedSize,
      title: product.title, 
      price: product.price, 
      currencyCode: 'USD', 
      quantity: 1, 
      image: product.images[0] 
    });
  };

  const accordions = [
    {
      id: 'features',
      title: 'FEATURES & FABRIC',
      icon: <Shirt size={20} className="text-white/60" />,
      content: "Crafted from our proprietary ultra-heavyweight 400GSM cotton. Double-stitched reinforced seams ensure lifetime durability. The oversized dropped-shoulder block creates an effortless luxury drape. Pre-shrunk and silicone washed for a cashmere-like hand feel from day one."
    },
    {
      id: 'shipping',
      title: 'SHIPPING & RETURNS',
      icon: <Truck size={20} className="text-white/60" />,
      content: "Complimentary express shipping on all orders over $150. Due to the limited edition nature of these drops, please allow 2-3 business days for processing. We accept returns within 14 days of delivery for store credit only, provided the tags remain attached and the garment is unworn."
    },
    {
      id: 'care',
      title: 'CARE INSTRUCTIONS',
      icon: <ShieldCheck size={20} className="text-white/60" />,
      content: "To preserve the ultra-high density prints and luxury fabric: Machine wash cold inside-out on a delicate cycle. Do not bleach. Lay flat to dry in the shade. Do not iron directly on graphics. Dry clean recommended for maximum longevity."
    }
  ];

  return (
    <main className="min-h-screen bg-[#04060c] pt-24 md:pt-32 pb-32 md:pb-24 text-white font-sans selection:bg-purple-500/30">
      
      {/* Background Ambient Glow */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-10">
        
        {/* Animated Multi-Image Gallery Carousel */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 md:gap-6 h-[600px] md:h-[850px] md:sticky md:top-32">
          
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 w-full md:w-24 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  setDirection(idx > activeImage ? 1 : -1);
                  setActiveImage(idx);
                }}
                className={`relative w-20 md:w-full h-24 md:h-32 rounded-xl overflow-hidden border transition-all duration-300 flex-shrink-0 ${activeImage === idx ? 'border-white opacity-100' : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'}`}
              >
                <div className="absolute inset-0 bg-[#0C0C0E]" />
                <img src={img} className="relative z-10 object-contain w-full h-full p-2" alt="thumbnail" />
              </button>
            ))}
          </div>

          {/* Main Hero Image */}
          <div className="flex-1 relative bg-[#0C0C0E] rounded-3xl border border-white/5 overflow-hidden shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing group">
            {/* Cinematic Glow Behind Product */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.03)_0%,_transparent_60%)]" />
            
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.img
                key={activeImage}
                src={product.images[activeImage]}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction * -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute w-[80%] max-h-[80%] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                alt="Product View"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Product Info & Actions */}
        <div className="lg:col-span-5 flex flex-col pt-4 md:pt-10">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/40 uppercase mb-8">
            <span className="hover:text-white transition-colors cursor-pointer">HOME</span>
            <span>/</span>
            <span className="hover:text-white transition-colors cursor-pointer">{product.collection}</span>
            <span>/</span>
            <span className="text-white/80">{product.title.split('//')[0]}</span>
          </div>

          {/* Live Inventory Ticker */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#ff1a38]/10 border border-[#ff1a38]/30 text-[#ff1a38] px-3 py-1.5 rounded-sm font-bebas tracking-widest text-sm self-start mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a38] animate-pulse" />
            LIMITED EDITION DROP
          </motion.div>

          {/* Title & Price */}
          <h1 className="font-bebas text-5xl md:text-7xl tracking-wider uppercase leading-[0.9] mb-6 drop-shadow-xl">
            {product.title.split('//').map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-purple-500 mx-2">//</span>}
                {part}
              </React.Fragment>
            ))}
          </h1>
          
          <p className="font-sans text-2xl md:text-3xl font-light text-white mb-10">
            ${product.price.toFixed(2)} <span className="text-sm text-white/40 ml-1">USD</span>
          </p>

          <p className="font-sans text-lg text-white/60 leading-relaxed font-light mb-12">
            {product.description}
          </p>

          {/* Variant Swatches */}
          <div className="mb-12">
            <div className="flex justify-between items-end mb-4">
              <span className="font-bebas text-lg tracking-widest text-white/60">SELECT SIZE</span>
              <button className="flex items-center gap-1 text-white/40 text-xs hover:text-white transition-colors uppercase tracking-widest">
                <Ruler size={14} /> Size Guide
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2 md:gap-3">
              {product.variants.map(variant => (
                <button
                  key={variant.size}
                  onClick={() => setSelectedSize(variant.size)}
                  className={`font-bebas text-xl md:text-2xl tracking-widest py-3 rounded-md border transition-all duration-300 ${
                    selectedSize === variant.size 
                    ? 'border-white bg-white text-black' 
                    : 'border-white/20 bg-transparent text-white/70 hover:border-white hover:bg-white/5'
                  } ${variant.inventory === 0 ? 'opacity-30 cursor-not-allowed line-through' : ''}`}
                  disabled={variant.inventory === 0}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-4 mb-16 hidden md:flex">
            <button
              onClick={handleAddToCart}
              className="w-full font-bebas text-2xl tracking-widest uppercase px-8 py-5 bg-white text-black hover:bg-neutral-200 transition-colors rounded-sm flex items-center justify-center gap-2"
            >
              ADD TO CART
            </button>
          </div>

          {/* Premium Accordions */}
          <div className="border-t border-white/10">
            {accordions.map((acc) => (
              <div key={acc.id} className="border-b border-white/10">
                <button 
                  onClick={() => toggleAccordion(acc.id)}
                  className="w-full py-6 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    {acc.icon}
                    <span className="font-bebas tracking-widest text-lg group-hover:text-purple-400 transition-colors">{acc.title}</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-white/40 transition-transform duration-300 ${openAccordion === acc.id ? 'rotate-180 text-white' : ''}`}
                  />
                </button>
                
                <AnimatePresence>
                  {openAccordion === acc.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-sm text-white/50 leading-relaxed pb-6 font-light">
                        {acc.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Sticky Mobile Add-to-Cart Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0a0f1c]/90 backdrop-blur-xl border-t border-white/10 p-4 z-50 flex items-center gap-4">
        <div className="flex flex-col flex-1">
          <span className="text-xs font-bold text-white/60 line-clamp-1">{product.title}</span>
          <span className="text-sm font-bold text-white">${product.price.toFixed(2)} - Size: {selectedSize}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-white text-black font-bebas tracking-widest px-6 py-3 rounded-sm whitespace-nowrap active:scale-95 transition-transform"
        >
          ADD TO CART
        </button>
      </div>

    </main>
  );
}
