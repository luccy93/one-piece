'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { createShopifyCheckout } from '@/lib/shopify';
import { motion } from 'framer-motion';

export default function CheckoutPortal() {
  const { cartItems } = useCart();

  useEffect(() => {
    // Trigger API Hand-off
    const executeCheckout = async () => {
      try {
        if (cartItems.length === 0) {
          // If arrived with empty cart, send back
          window.location.href = '/collections/all';
          return;
        }

        const lineItems = cartItems.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity
        }));

        const url = await createShopifyCheckout(lineItems);
        
        // Secure redirect
        if (url) {
          window.location.href = url;
        }
      } catch (e) {
        console.error("Checkout Error:", e);
      }
    };

    // Delay slightly to let the animation play before redirect blocks thread
    const timeout = setTimeout(executeCheckout, 2000);
    return () => clearTimeout(timeout);
  }, [cartItems]);

  return (
    <main className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center">
      {/* Background pulsing */}
      <motion.div 
        animate={{ backgroundColor: ["#000000", "#1a0b2e", "#000000"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none" 
      />
      
      {/* Shockwaves */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 1, borderWidth: "10px" }}
            animate={{ scale: 6, opacity: 0, borderWidth: "1px" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut"
            }}
            className={`absolute w-48 h-48 rounded-full mix-blend-screen ${i === 2 ? 'border-red-600 shadow-[0_0_50px_#ef4444]' : 'border-purple-600 shadow-[0_0_50px_#a855f7]'}`}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="font-bangers text-5xl md:text-8xl tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-purple-500 to-white drop-shadow-[0_0_30px_rgba(168,85,247,0.8)] uppercase"
        >
          MANIFESTING WILL
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-bebas text-xl md:text-3xl tracking-[0.3em] text-white/70 mt-8 uppercase"
        >
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Opening dimensional portal to secure checkout...
          </motion.span>
        </motion.p>
      </div>
    </main>
  );
}
