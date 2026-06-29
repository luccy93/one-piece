'use client';

import React, { useLayoutEffect, useRef, use } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock Order Statuses
const ORDER_STATUSES = [
  { id: 'processing', label: 'Processing', date: '2026-06-25 10:00 AM', active: true },
  { id: 'shipped', label: 'Shipped', date: '2026-06-26 02:30 PM', active: true },
  { id: 'out', label: 'Out for Delivery', date: '2026-06-28 08:15 AM', active: true },
  { id: 'delivered', label: 'Delivered', date: 'Pending', active: false },
];

export default function OrderTracking({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Create vertical floating levitation animation
      const tl = gsap.timeline();

      // Fade in the container
      tl.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      // Staggered node animation floating upwards
      tl.from(nodesRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)',
      }, "-=0.5");

      // Continuous anti-gravity floating loop for active nodes
      nodesRef.current.forEach((node, index) => {
        if (ORDER_STATUSES[index].active) {
          gsap.to(node, {
            y: -10,
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#04060c] pt-32 pb-24 px-6 text-white font-sans overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <h1 className="font-bangers text-5xl tracking-widest text-white drop-shadow-[2px_2px_0_#b3001a]">
              ORDER TRACKING
            </h1>
            <p className="font-bebas text-xl text-[#F4C430] tracking-widest mt-2">
              #{id}
            </p>
          </div>
          <Link href="/dashboard" className="font-bebas text-lg text-white/50 hover:text-white transition-colors">
            &larr; BACK TO DASHBOARD
          </Link>
        </div>

        <div ref={containerRef} className="relative py-12 flex flex-col items-center">
          
          {/* Vertical Tracking Line (Energy Beam) */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-white/5 rounded-full overflow-hidden">
            <div className="w-full h-[75%] bg-gradient-to-b from-[#C0001A] to-[#F4C430] shadow-[0_0_15px_rgba(244,196,48,0.8)]" />
          </div>

          <div className="flex flex-col-reverse gap-20 w-full relative z-10">
            {ORDER_STATUSES.map((status, idx) => (
              <div 
                key={status.id}
                ref={el => { nodesRef.current[idx] = el }}
                className={`flex w-full items-center ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-1/2 flex flex-col ${idx % 2 === 0 ? 'items-end pr-12 text-right' : 'items-start pl-12 text-left'}`}>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-2xl border backdrop-blur-md relative ${status.active ? 'bg-[#0a0f1c] border-[#F4C430] shadow-[0_0_20px_rgba(244,196,48,0.15)]' : 'bg-white/5 border-white/10 opacity-50'}`}
                  >
                    <h3 className="font-bebas text-2xl tracking-widest">{status.label}</h3>
                    <p className="font-sans text-sm mt-1 text-white/70">{status.date}</p>
                    
                    {/* Floating connecting particle */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${status.active ? 'bg-[#F4C430] shadow-[0_0_10px_#F4C430]' : 'bg-white/20'} ${idx % 2 === 0 ? '-right-[54px]' : '-left-[54px]'}`} />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
