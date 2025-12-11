// src/components/Home/ExtraSection.jsx
import React from "react";

const ExtraSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-6">
          🚀 Take Your Creativity to the Next Level!
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Join exciting contests, showcase your skills, and win amazing prizes. 
          There’s a world of opportunities waiting for you!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <div className="bg-white/20 p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
            <h3 className="text-2xl font-semibold mb-2">💡 Learn & Improve</h3>
            <p>Enhance your skills by participating in real contests and challenges.</p>
          </div>
          <div className="bg-white/20 p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
            <h3 className="text-2xl font-semibold mb-2">🏆 Win Rewards</h3>
            <p>Get recognized and earn prizes for your creative contributions.</p>
          </div>
          <div className="bg-white/20 p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
            <h3 className="text-2xl font-semibold mb-2">🌟 Build Your Portfolio</h3>
            <p>Showcase your work and grow your professional presence.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraSection;
