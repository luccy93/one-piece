'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    // Simulate auth & particle burst before redirect
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#04060c] flex items-center justify-center p-6 text-white overflow-hidden relative">
      
      {/* Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#C0001A]/10 via-transparent to-[#F4C430]/5 blur-3xl rounded-full pointer-events-none" />

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
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="w-full max-w-md bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl relative z-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="font-bangers text-5xl tracking-widest text-[#F4C430] drop-shadow-[2px_2px_0_#b3001a] mb-2">
            WELCOME BACK
          </h1>
          <p className="font-bebas text-lg tracking-widest text-white/50">RESUME YOUR VOYAGE</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="relative group">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/20 px-0 py-3 text-lg font-sans focus:outline-none focus:border-[#F4C430] transition-colors peer"
              placeholder=" "
            />
            <label className="absolute left-0 top-3 text-white/50 font-bebas text-xl tracking-widest transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-[#F4C430] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-[#F4C430]">
              EMAIL ADDRESS
            </label>
          </div>

          <div className="relative group mt-4">
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/20 px-0 py-3 text-lg font-sans focus:outline-none focus:border-[#F4C430] transition-colors peer"
              placeholder=" "
            />
            <label className="absolute left-0 top-3 text-white/50 font-bebas text-xl tracking-widest transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-[#F4C430] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-[#F4C430]">
              PASSWORD
            </label>
          </div>

          <div className="flex justify-end mt-2">
            <Link href="#" className="font-sans text-sm text-white/40 hover:text-[#ff5a6e] transition-colors">
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="w-full font-bebas text-2xl tracking-widest uppercase py-4 bg-[#C0001A] text-white hover:bg-[#ff1a38] transition-colors rounded-lg shadow-[0_0_20px_rgba(192,0,26,0.3)] mt-4"
          >
            SIGN IN
          </motion.button>
        </form>

        <div className="mt-8 text-center font-sans text-sm text-white/50">
          New to the crew?{' '}
          <Link href="/signup" className="text-[#F4C430] hover:text-white transition-colors font-bold">
            Join the Fleet
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
