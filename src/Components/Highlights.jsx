import React from 'react';
import { motion } from 'framer-motion';

const Highlights = () => {
  const highlights = [
    { icon: "🔥", text: "Top Prize: $15,000 for Python Hackathon", tag: "High Stakes" },
    { icon: "⭐", text: "New Contest: Logo Design for TechVanguard", tag: "New" },
    { icon: "🚀", text: "500+ New participants joined today", tag: "Trending" },
    { icon: "🏆", text: "Winner declared for Lyricist Championship", tag: "Closed" }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="my-24 px-4">
      <h2 className="text-4xl font-black  mb-12 italic text-center md:text-left">
        Platform <span className="text-primary">Highlights</span>
      </h2>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {highlights.map((h, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-5 rounded-2xl border border-base-300 transition-colors shadow-sm"
          >
            <div className="w-12 h-12 rounded-full  flex items-center justify-center text-2xl shrink-0">
              {h.icon}
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                 <span className="badge badge-primary badge-outline badge-xs uppercase font-bold text-[10px]">
                   {h.tag}
                 </span>
              </div>
              <p className=" font-bold md:text-lg leading-tight">
                {h.text}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Highlights;