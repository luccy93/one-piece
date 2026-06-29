"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#04060c] pt-32 pb-24 px-6 md:px-12 text-white selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
      {/* Abstract floating background elements */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#F4C430]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bangers tracking-widest uppercase drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#F4C430]">Story</span>
          </h1>
          <p className="mt-6 text-xl font-bebas tracking-[0.2em] text-gray-400">Forged in the fires of liberation.</p>
        </motion.div>

        <div className="space-y-16 font-sans text-lg md:text-xl text-gray-300 leading-relaxed">
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm transform-gpu hover:-translate-y-2 transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
          >
            <h2 className="text-3xl font-bangers tracking-wider text-white mb-6">The Dawn of a New Era</h2>
            <p>
              "Haki Drop" wasn't born in a boardroom. It was born on the streets, fueled by a relentless desire to break free from the mundane. We looked at the current landscape of streetwear and saw uniforms—apparel designed to blend in. We wanted to build armor for those who want to stand out.
            </p>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm transform-gpu hover:-translate-y-2 transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:border-[#F4C430]/50 hover:shadow-[0_0_30px_rgba(244,196,48,0.1)]"
          >
            <h2 className="text-3xl font-bangers tracking-wider text-white mb-6">Supreme Quality. Unyielding Will.</h2>
            <p>
              Every garment is a testament to the "Conqueror's Haki" inside all of us. We source only the heaviest, most durable cottons, weave custom metallic threads, and utilize advanced dye-sublimation techniques to ensure our graphics never fade. Our aesthetic honors the "Sun God Nika"—ridiculous, unconstrained, and completely free.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
