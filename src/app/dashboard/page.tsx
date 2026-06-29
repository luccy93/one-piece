'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';

// Mock Data
const MOCK_USER = {
  name: 'Monkey D. Luffy',
  tier: 'Conqueror Level',
  points: 8500,
  maxPoints: 10000,
  address: 'Thousand Sunny, New World',
  orders: [
    { id: '#10293', date: '2026-06-25', status: 'Shipped', total: '$125.00' },
    { id: '#10245', date: '2026-05-12', status: 'Delivered', total: '$45.00' }
  ]
};

const Hover3DCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-200, 200], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-200, 200], [-15, 15]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const { wishlistItems } = useWishlist();

  useEffect(() => {
    setMounted(true);
  }, []);

  const progressPercentage = (MOCK_USER.points / MOCK_USER.maxPoints) * 100;

  return (
    <main className="min-h-screen bg-[#04060c] pt-32 pb-24 px-6 text-white font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16"
        >
          <h1 className="font-bangers text-6xl tracking-widest text-white drop-shadow-[3px_3px_0_#b3001a]">
            WELCOME BACK, {MOCK_USER.name.toUpperCase()}
          </h1>
          <p className="font-bebas text-2xl text-[#F4C430] tracking-[0.2em] mt-2 mb-6">
            PIRATE KING IN TRAINING
          </p>

          <div className="flex flex-wrap gap-4 font-bebas text-lg tracking-widest">
            <Link href="/wishlist" className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-[#F4C430] transition-colors">
              MY WISHLIST {mounted && `(${wishlistItems.length})`}
            </Link>
            <Link href="/collections/all" className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-[#ff5a6e] transition-colors">
              CONTINUE SHOPPING
            </Link>
            <Link href="/login" className="px-6 py-2 bg-transparent text-white/50 hover:text-red-500 transition-colors">
              LOGOUT
            </Link>
          </div>
        </motion.div>

        {/* Haki Reward Tracker */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-[#0a0f1c] border border-white/10 rounded-2xl p-8 mb-12 shadow-[0_0_30px_rgba(244,196,48,0.05)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C430] opacity-[0.03] blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          <div className="flex justify-between items-end mb-4 relative z-10">
            <div>
              <h2 className="font-bebas text-3xl tracking-widest text-white/90">HAKI AURA LEVEL</h2>
              <p className="text-white/50 text-sm mt-1">Earn 10,000 pts to reach Pirate King tier.</p>
            </div>
            <div className="text-right">
              <span className="font-bangers text-4xl text-[#F4C430]">{MOCK_USER.points}</span>
              <span className="text-white/50 text-sm ml-2">/ {MOCK_USER.maxPoints} PTS</span>
            </div>
          </div>

          {/* Levitation Progress Bar */}
          <div className="h-4 bg-white/5 rounded-full overflow-hidden relative z-10">
            {mounted && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                className="h-full bg-gradient-to-r from-[#C0001A] to-[#F4C430] rounded-full shadow-[0_0_15px_rgba(244,196,48,0.5)]"
              />
            )}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Order History */}
          <Hover3DCard className="md:col-span-2 bg-[#0a0f1c] border border-white/10 rounded-2xl p-8 cursor-default shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <h3 className="font-bebas text-2xl tracking-widest text-[#ff5a6e] mb-6">RECENT VOYAGES (ORDERS)</h3>
            <div className="flex flex-col gap-4">
              {MOCK_USER.orders.map(order => (
                <Link key={order.id} href={`/orders/${order.id.replace('#', '')}`}>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                    <div>
                      <div className="font-bold text-white group-hover:text-[#F4C430] transition-colors">{order.id}</div>
                      <div className="text-sm text-white/50 mt-1">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bebas tracking-widest text-lg">{order.status}</div>
                      <div className="text-[#F4C430] text-sm font-bold">{order.total}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Hover3DCard>

          {/* Account Tier & Address */}
          <div className="flex flex-col gap-8 perspective-[1000px]">
            <Hover3DCard className="bg-[#0a0f1c] border border-white/10 rounded-2xl p-8 flex-1 cursor-default shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              <h3 className="font-bebas text-2xl tracking-widest text-[#F4C430] mb-4">CURRENT TIER</h3>
              <div className="font-bangers text-4xl drop-shadow-[2px_2px_0_#C0001A]">
                {MOCK_USER.tier}
              </div>
            </Hover3DCard>

            <Hover3DCard className="bg-[#0a0f1c] border border-white/10 rounded-2xl p-8 flex-1 cursor-default shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              <h3 className="font-bebas text-2xl tracking-widest text-[#F4C430] mb-4">SHIPPING TO</h3>
              <p className="text-white/70 leading-relaxed font-cormorant italic text-lg">
                {MOCK_USER.address}
              </p>
            </Hover3DCard>
          </div>

        </div>
      </div>
    </main>
  );
}
