import React from 'react';

const Testimonials = () => (
  <div className="py-10">
    <h2 className="text-3xl font-bold mb-6 text-center">What Our Winners Say</h2>
    <div className=" grid md:grid-cols-3 gap-6">
    
    {[1, 2, 3].map((item) => (
      <div key={item} className="card  p-6 shadow-sm">
        <p className="italic mb-4">"This platform changed my career. I entered a coding contest and won $5,000 plus a job offer!"</p>
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-neutral  rounded-full w-10"><span>U{item}</span></div>
          </div>
          <div>
            <p className="font-bold text-sm">User {item}</p>
            <p className="text-xs opacity-70">Grand Prize Winner</p>
          </div>
        </div>
      </div>
    ))}
  </div>
  </div>
  
);

export default Testimonials;