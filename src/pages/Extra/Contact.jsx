import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen bg-transparent ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Info Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <h1 className="text-6xl font-black tracking-tighter">
            Get in <span className="text-primary italic">Touch</span>
          </h1>
          <p className="text-lg opacity-70">
            Have questions about a contest or need technical help? Our team is here to support your creative journey.
          </p>
          
          <div className="space-y-6">
            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-xl shadow-lg">
                📍
              </div>
              <div>
                <p className="font-bold">Hometown</p>
                <p className="text-sm opacity-60 italic">Dhaka,Bangladesh</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary text-secondary-content flex items-center justify-center text-xl shadow-lg">
                📧
              </div>
              <div>
                <p className="font-bold">Support Email</p>
                <p className="text-sm opacity-60 italic">support@contesthub.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }}
          className="p-8 border border-base-300 rounded-[2.5rem] bg-base-200 shadow-xl"
        >
          <form className="space-y-4">
            <div className="form-control">
              <label className="label text-xs text-white  font-bold uppercase opacity-60">
                Full Name
              </label>
              <input 
                type="text" 
                className="input text-white opacity-60 input-bordered rounded-2xl  focus:input-primary" 
                placeholder="John Doe" 
              />
            </div>

            <div className="form-control">
              <label className="label text-xs text-white opacity-60 font-bold uppercase ">
                Email Address
              </label>
              <input 
                type="email" 
                className="input input-bordered text-white opacity-60 rounded-2xl bg-base-100 focus:input-primary" 
                placeholder="john@example.com" 
              />
            </div>

            <div className="form-control">
              <label className="label text-xs text-white opacity-60 font-bold uppercase ">
                Message
              </label>
              <textarea 
                className="textarea textarea-bordered text-white opacity-60 rounded-2xl bg-base-100 h-32 focus:textarea-primary" 
                placeholder="How can we help?"
              ></textarea>
            </div>

            <button className="btn btn-primary btn-block rounded-2xl mt-4">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;