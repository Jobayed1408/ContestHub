// src/pages/Dashboard/User/MyWinningContests.jsx
const MyWinningContests = () => {
    const winningData = [
      { id: 1, contest: "Logo Design Challenge", prize: "$100" },
      { id: 2, contest: "Photography Contest", prize: "$50" },
      { id: 3, contest: "Quiz Competition", prize: "$20" },
    ];
  
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">My Winning Contests</h3>
  
        <div className="space-y-3">
          {winningData.map((w) => (
            <div key={w.id} className="p-4 border rounded shadow">
              <h4 className="font-bold">{w.contest}</h4>
              <p>Prize: {w.prize}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MyWinningContests;
  