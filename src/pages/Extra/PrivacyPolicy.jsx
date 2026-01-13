import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 ">
      <h1 className="text-4xl font-black mb-10 border-b border-base-300 pb-4">Privacy Policy & Terms</h1>
      
      <div className="space-y-12 opacity-80 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">1. Data Collection</h2>
          <p>We collect information you provide directly to us when you create an account, participate in a contest, or communicate with us. This includes your name, email, and submission data.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">2. Contest Rules</h2>
          <p>By entering any contest on ContestHub, you agree to abide by the specific guidelines provided by the contest creator. Plagiarism will result in an immediate permanent ban from the platform.</p>
        </section>

        <section className="p-8 bg-base-200 text-gray-400 rounded-3xl italic">
          "Your privacy is our priority. We never sell your personal data to third parties. All payment information is processed through secure, encrypted gateways."
        </section>
      </div>
    </div>
  );
};
export default PrivacyPolicy;