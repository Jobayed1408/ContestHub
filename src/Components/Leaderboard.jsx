import React from 'react';

const Leaderboard = () => (
  <div className="py-10">
    <h2 className="text-3xl font-bold mb-6 text-center">Top Contest Winners</h2>
    <div className="overflow-x-auto border border-base-300 rounded-xl my-10">
    <table className="table bg-base-100">
      <thead className="bg-base-200">
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Contests Won</th>
          <th>Total Earnings</th>
        </tr>
      </thead>
      <tbody className='text-blue-500'>
        <tr><th>1</th><td>Sarah Jenkins</td><td>12</td><td className="text-blue-600 font-bold">$45,000</td></tr>
        <tr><th>2</th><td>Mohammad Jobayed</td><td>9</td><td className="text-blue-600 font-bold">$32,500</td></tr>
      </tbody>
    </table>
  </div>
  </div>
);

export default Leaderboard;