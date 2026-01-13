import React from 'react';

const FAQ = () => (
  <div className="py-10">
    <h2 className="text-3xl font-bold text-center mb-8">Common Questions</h2>
    <div className="collapse collapse-plus  mb-2">
      <input type="radio" name="my-accordion-3" defaultChecked /> 
      <div className="collapse-title text-xl font-medium">Is my entry fee refundable?</div>
      <div className="collapse-content"><p>Entry fees are non-refundable once a contest has started to ensure the prize pool stability.</p></div>
    </div>
    <div className="collapse collapse-plus ">
      <input type="radio" name="my-accordion-3" /> 
      <div className="collapse-title text-xl font-medium">How are winners chosen?</div>
      <div className="collapse-content"><p>Winners are chosen by a panel of expert judges based on the specific task instructions provided.</p></div>
    </div>
  </div>
);

export default FAQ;