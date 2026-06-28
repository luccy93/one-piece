"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-20 bg-black overflow-hidden border-t border-white/10">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#F4C430]/50 to-transparent shadow-[0_0_20px_#F4C430]" />
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center justify-center relative z-10">
        
        {/* Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl"
        >
          <p className="font-cormorant text-2xl md:text-3xl italic text-white/80 leading-relaxed">
            "I have no interest in conquering the world. The person with the most freedom in the sea is the Pirate King!"
          </p>
          <span className="block mt-6 font-bebas tracking-widest text-[#F4C430] text-lg">
            — Monkey D. Luffy
          </span>
        </motion.div>

        {/* Footer Brand */}
        <div className="flex flex-col items-center gap-2 mb-12">
          <div className="font-luckiest text-5xl tracking-widest uppercase text-[#F7D446] text-stroke">
            NIKA
          </div>
          <p className="font-bebas tracking-[0.3em] text-white/40 text-sm">
            THE DRUMS OF LIBERATION
          </p>
        </div>

        {/* Legal / Credits */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="font-inter text-xs text-white/30">
            &copy; {new Date().getFullYear()} Cinematic Reveal. Fan project for demonstration purposes.
          </p>
          <p className="font-inter text-xs text-white/30">
            One Piece is created by Eiichiro Oda.
          </p>
        </div>
      </div>
    </footer>
  );
}
