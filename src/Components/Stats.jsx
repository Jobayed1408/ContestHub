import React from 'react';
import { motion } from "framer-motion";

const Stats = () => {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
   <div>
    <h1 className="text-4xl font-bold text-center mb-10">Our Stats</h1>
     <motion.div 
      variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10"
    >

      {[
        { label: "Prizes Awarded", val: "$1.2M+", color: "text-primary" },
        { label: "Active Contests", val: "540+", color: "text-secondary" },
        { label: "Global Creators", val: "85K", color: "text-accent" }
      ].map((s, i) => (
        <motion.div key={i} variants={item} 
          className="p-8 rounded-3xl border border-base-300 text-center"
        >
          <p className="text-xs uppercase font-bold tracking-widest  mb-2">{s.label}</p>
          <h2 className={`text-4xl  ${s.color}`}>{s.val}</h2>
        </motion.div>
      ))}
    </motion.div>
   </div>
  );
};

export default Stats;