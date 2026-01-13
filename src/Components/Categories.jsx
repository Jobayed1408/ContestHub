import React from 'react';
import { motion } from "framer-motion";
const Categories = () => (
  <div className="py-12">
    <h2 className="text-3xl font-bold  mb-8">Popular Tracks</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {["Programming", "Article writing", "Photography", "Imag Design", "Logo Design", "Marketing" ,"Others"].map((cat, i) => (
        <motion.div 
          key={i}
          whileHover={{ scale: 1.02, translateY: -5 }}
          className="p-6 rounded-2xl border border-base-300 bg-base-100 hover:bg-base-200 transition-colors cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all">
            <span className="text-xl">#</span>
          </div>
          <h3 className="text-lg font-bold text-base-content">{cat}</h3>
          <p className="text-sm text-base-content/60">View Challenges →</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Categories;