'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    // Simulate auth burst before redirect
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#04060c] flex items-center justify-center p-6 text-white overflow-hidden relative">
      
      {/* Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tl from-[#6a3fb3]/10 via-transparent to-[#F4C430]/5 blur-3xl rounded-full pointer-events-none" />

      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 50, opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-[#F4C430] z-50 pointer-events-none mix-blend-screen"
            style={{ x: '-50%', y: '-50%' }}
          />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="w-full max-w-md bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl relative z-10 shadow-2xl mt-16"
      >
        <div className="text-center mb-10">
          <h1 className="font-bangers text-5xl tracking-widest text-[#F4C430] drop-shadow-[2px_2px_0_#b3001a] mb-2">
            JOIN THE FLEET
          </h1>
          <p className="font-bebas text-lg tracking-widest text-white/50">CREATE YOUR ACCOUNT</p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-8">
          
          <div className="relative group">
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-transparent border-b-2 border-white/20 px-0 py-2 text-lg font-sans focus:outline-none focus:border-[#F4C430] transition-colors peer"
              placeholder=" "
            />
            <label className="absolute left-0 top-2 text-white/50 font-bebas text-xl tracking-widest transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-[#F4C430] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-[#F4C430]">
              FULL NAME
            </label>
          </div>

          <div className="relative group">
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-transparent border-b-2 border-white/20 px-0 py-2 text-lg font-sans focus:outline-none focus:border-[#F4C430] transition-colors peer"
              placeholder=" "
            />
            <label className="absolute left-0 top-2 text-white/50 font-bebas text-xl tracking-widest transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-[#F4C430] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-[#F4C430]">
              EMAIL ADDRESS
            </label>
          </div>

          <div className="relative group">
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-transparent border-b-2 border-white/20 px-0 py-2 text-lg font-sans focus:outline-none focus:border-[#F4C430] transition-colors peer"
              placeholder=" "
            />
            <label className="absolute left-0 top-2 text-white/50 font-bebas text-xl tracking-widest transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-[#F4C430] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-[#F4C430]">
              MOBILE NUMBER
            </label>
          </div>

          <div className="relative group">
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-transparent border-b-2 border-white/20 px-0 py-2 text-lg font-sans focus:outline-none focus:border-[#F4C430] transition-colors peer"
              placeholder=" "
            />
            <label className="absolute left-0 top-2 text-white/50 font-bebas text-xl tracking-widest transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-[#F4C430] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-[#F4C430]">
              PASSWORD
            </label>
          </div>

          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="w-full font-bebas text-2xl tracking-widest uppercase py-4 bg-transparent border-2 border-[#F4C430] text-white relative overflow-hidden group/btn mt-2 rounded-lg"
          >
            <span className="relative z-10">REGISTER</span>
            <div className="absolute inset-0 bg-[#F4C430] -translate-x-[105%] skew-x-[-10deg] transition-transform duration-300 ease-in-out z-0 group-hover/btn:translate-x-0" />
            <div className="absolute inset-0 z-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
          </motion.button>
        </form>

        <div className="mt-8 text-center font-sans text-sm text-white/50">
          Already part of the crew?{' '}
          <Link href="/login" className="text-[#C0001A] hover:text-white transition-colors font-bold">
            Sign In
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
