import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router';


const Newsletter = () => (
  <motion.div 
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    className="my-20 p-12 md:p-24 rounded-[4rem] border border-primary/20  text-center relative overflow-hidden"
  >
    <h1 className="text-4xl font-bold mb-4">News Letter</h1>
    <div className="relative z-10">
      <h2 className="text-5xl md:text-7xl font-black  mb-6 tracking-tight">The Next Winner <br /> <span className="text-primary italic">Could Be You.</span></h2>
      <p className="text-lg /50 mb-12 max-w-xl mx-auto">Join our private list to receive exclusive entry codes for high-stakes challenges.</p>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <input type="text" placeholder="your@email.com" className="input text-gray-400 input-lg input-bordered rounded-full w-full max-w-sm " />
        <Link to={'/all-contests'} className="btn btn-primary btn-lg rounded-full px-12">Join Now</Link>
      </div>
    </div>
  </motion.div>
);
export default Newsletter;