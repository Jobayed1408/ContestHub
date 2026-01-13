import React from 'react';
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto mb-20"
      >
        <h1 className="text-6xl font-black tracking-tighter mb-6">Empowering <span className="text-primary italic">Creators</span></h1>
        <p className="text-xl opacity-70 leading-relaxed">ContestHub started with a simple goal: to provide a fair and transparent platform where talent meets opportunity. Whether you are a programmer, designer, or writer, we give you the stage to shine.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Active Participants", value: "50k+", icon: "👥" },
          { label: "Prizes Distributed", value: "$2M+", icon: "💰" },
          { label: "Total Contests", value: "1,200+", icon: "🏆" }
        ].map((stat, i) => (
          <div key={i} className="p-10 border border-base-300 rounded-[3rem]  group hover:border-primary transition-all">
            <div className="text-4xl mb-4">{stat.icon}</div>
            <h2 className="text-4xl font-black mb-2">{stat.value}</h2>
            <p className="text-sm uppercase font-bold opacity-40 tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;