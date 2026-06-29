"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductGrid from "@/components/ProductGrid";
import HeroCanvas from "@/components/HeroCanvas";

export default function HomeLandingPage() {
  const { scrollY } = useScroll();
  
  // Parallax values based on absolute scroll position
  const yAct1 = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityAct1 = useTransform(scrollY, [0, 400], [1, 0]);

  const yAct2 = useTransform(scrollY, [0, 1500], [0, 300]);
  
  // Mock static data array mapping Luffy's progressive forms
  const gearForms = [
    { name: "GEAR 1", desc: "The Rubber Boy", img: "/images/gears/gear1.jpg" },
    { name: "GEAR 2", desc: "Blood Pumping Jet speed", img: "/images/gears/gear2.jpg" },
    { name: "GEAR 3", desc: "Giant Titan Bone Balloon", img: "/images/gears/gear3.jpg" },
    { name: "GEAR 4", desc: "Bounce & Snakeman Armament", img: "/images/gears/gear4.jpg" },
    { name: "GEAR 5", desc: "The Drums of Liberation", img: "/images/luffy-gear5.jpg" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="relative bg-[#030108] text-white selection:bg-purple-600 selection:text-white overflow-hidden">
      
      {/* GLOBAL BACKGROUND NOISE & AMBIENT GLOW DESIGNS */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/10 via-transparent to-black pointer-events-none" />
        <HeroCanvas />
      </div>

      {/* ==========================================
          ACT I: THE GROUNDED WILL
          ========================================== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 bg-black/40 overflow-hidden">
        <motion.div 
          style={{ y: yAct1, opacity: opacityAct1 }}
          className="relative text-center z-20 max-w-3xl"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="text-purple-500 tracking-[0.4em] text-xs font-black mb-4 uppercase"
          >
            Act I // East Blue Foundation
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1, type: "spring" }}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 drop-shadow-lg"
          >
            Grounded Will
          </motion.h1>
          <motion.blockquote 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-2xl font-medium italic text-neutral-300 border-l-2 border-purple-500 pl-4"
          >
            "If you don't take risks, you can't create a future!"
          </motion.blockquote>
        </motion.div>
      </section>

      {/* ==========================================
          ACT II: THE SUPREME AWAKENING
          ========================================== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 bg-black/60">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          style={{ y: yAct2 }}
          className="relative text-center z-20 max-w-4xl"
        >
          <h2 className="text-7xl md:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-200 to-purple-600 drop-shadow-[0_0_55px_rgba(168,85,247,0.45)] mb-6">
            SUN GOD NIKA
          </h2>
          <div className="space-y-4 text-base md:text-xl font-bold tracking-tight text-neutral-300">
            <p className="text-red-500 font-mono text-sm uppercase tracking-[0.2em]">Kaido: "White hair... White clothes... Who are you?!"</p>
            <p className="text-white uppercase text-xl md:text-3xl font-black tracking-wide">
              "I am Monkey D. Luffy! The man who will surpass you... and become the Pirate King!"
            </p>
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          ACT III: THE 5 GEARS OF LIBERATION
          ========================================== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center bg-black/80 px-4 py-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16 max-w-xl"
        >
          <motion.h3 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-4xl md:text-6xl font-black text-purple-500 tracking-widest drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]"
          >
            *DOOM-DUTTA-DA-DA*
          </motion.h3>
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mt-2 font-bold">The Drums of Liberation Echo</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-7xl px-2"
        >
          {gearForms.map((gear, i) => (
            <motion.div
              key={gear.name}
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-neutral-900/40 backdrop-blur-md border border-purple-500/20 p-3 rounded-2xl flex flex-col items-center overflow-hidden aspect-[3/4]"
            >
              <div className="w-full flex-grow bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden relative mb-3">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${gear.img}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
              </div>
              <div className="text-center z-10">
                <h4 className="text-sm font-black tracking-wider text-white uppercase group-hover:text-purple-400 transition-colors">{gear.name}</h4>
                <p className="text-[10px] text-neutral-400 font-medium truncate max-w-[120px] mt-0.5">{gear.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ==========================================
          ACT IV: CHARACTER HORIZONS & HAKI DROP GRID
          ========================================== */}
      <section className="relative z-10 flex flex-col bg-[#020104] pt-12 pb-24 border-t border-purple-900/30">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="w-full grid grid-cols-1 md:grid-cols-3 border-b border-neutral-900"
        >
          {/* ZORO */}
          <motion.div variants={staggerItem} className="relative group p-8 flex flex-col justify-end min-h-[260px] overflow-hidden border-r border-neutral-900 bg-gradient-to-b from-transparent to-emerald-950/20">
            <div className="absolute inset-0 bg-emerald-500/5 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] font-black tracking-[0.3em] text-emerald-400 uppercase">Enies Lobby // Wano Variant</span>
              <h3 className="text-2xl font-black uppercase text-white mt-1 tracking-tight group-hover:text-emerald-400 transition-colors">ZORO // King of Hell</h3>
              <p className="text-xs text-neutral-400 mt-2 font-medium max-w-sm">"Three-Sword Style Ougi... Overdrawn spiritual green mist aura blades."</p>
            </div>
          </motion.div>

          {/* SANJI */}
          <motion.div variants={staggerItem} className="relative group p-8 flex flex-col justify-end min-h-[260px] overflow-hidden border-r border-neutral-900 bg-gradient-to-b from-transparent to-orange-950/20">
            <div className="absolute inset-0 bg-orange-500/5 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] font-black tracking-[0.3em] text-orange-400 uppercase">Germa Tech // Exoskeleton Spark</span>
              <h3 className="text-2xl font-black uppercase text-white mt-1 tracking-tight group-hover:text-orange-400 transition-colors">SANJI // Ifrit Jambe</h3>
              <p className="text-xs text-neutral-400 mt-2 font-medium max-w-sm">"High-velocity white hot plasma kicks generating internal physical overdrive."</p>
            </div>
          </motion.div>

          {/* BLACKBEARD */}
          <motion.div variants={staggerItem} className="relative group p-8 flex flex-col justify-end min-h-[260px] overflow-hidden bg-gradient-to-b from-transparent to-neutral-950">
            <div className="absolute inset-0 bg-indigo-500/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase">Yami Yami No Mi // Absolute Absence</span>
              <h3 className="text-2xl font-black uppercase text-white mt-1 tracking-tight group-hover:text-purple-400 transition-colors">MARSHALL D. TEACH</h3>
              <p className="text-xs text-neutral-500 mt-2 font-medium max-w-sm">"Infinite localized dark gravitational voids swallowing physical matter configurations."</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-7xl w-full mx-auto px-4 py-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <p className="text-xs text-purple-500 font-black tracking-[0.4em] uppercase mb-2">New World Marketplace Drop</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">LIMITED COMMERCE PIECES</h2>
            </div>
            <p className="text-xs font-medium text-neutral-500 max-w-md mt-4 md:mt-0">
              Inherited Will, The Destiny of Age, and The Dreams of People. As long as people continue to pursue Freedom, these items will never cease to be.
            </p>
          </div>

          {/* INTEGRATED LIVE COMMERCE GRID */}
          <ProductGrid />
        </motion.div>
      </section>

    </div>
  );
}
