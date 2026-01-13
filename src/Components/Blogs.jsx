import React from 'react';
import { Link } from 'react-router';

const Blogs = () => (
  <div className="py-10">
    <h2 className="text-3xl font-bold mb-6">Latest Articles</h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card lg:card-side shadow-xl border border-base-300">
        <figure className="lg:w-1/3"><img src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-788.jpg" alt="Blog" /></figure>
        <div className="card-body">
          <h2 className="card-title">How to win a Design Contest</h2>
          <p className="text-sm">5 tips from industry experts on making your entry stand out.</p>
          <div className="card-actions justify-end"><Link to='/how-it-works' className="btn btn-link btn-sm">Read More</Link></div>
        </div>
      </div>
    </div>
  </div>
);

export default Blogs;