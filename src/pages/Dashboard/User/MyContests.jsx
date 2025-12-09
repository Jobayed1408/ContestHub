import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const MyContests = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [myContests, setMyContests] = useState([]);

  // Fetch contests created by logged-in user
  useEffect(() => {
    if (!user?.email) return;

    console.log('user email',user.email) 
    axiosSecure
      .get(`/user-contests?email=${user.email}`)
      .then((res) => setMyContests(res.data))
      .catch((err) => console.error("Error fetching contests:", err));
  }, [user?.email, axiosSecure]);

  console.log('myContests', myContests)

  // Helper: calculate remaining time
  const getRemainingTime = (deadline) => {
    // if (!deadline) return "No deadline";
    console.log("Deadline received:", deadline);

    const end = new Date(deadline);
    if (isNaN(end)) return "Invalid date";
  
    const now = new Date();
    const diff = end - now;
    if (diff <= 0) return "Expired";
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return days > 0 
    ? `${days}d ${hours}h ${minutes}m ${seconds}s`
    : `${hours}h ${minutes}m ${seconds}s`;
  };
  

  return (
    <div className="overflow-x-auto mt-6">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Contest</th>
            <th>Participants</th>
            <th>Remaining Time</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {myContests.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No contests created yet.
              </td>
            </tr>
          )}

          {myContests.map((contest, index) => (
            <tr key={contest._id}>
              <th>
                <label>
                  {index+1}
                </label>
              </th>

              {/* Contest Name + Image */}
              <td>
                <div className="flex items-center gap-3">
                  
                  <div>
                    <div className="font-bold">{contest.contestName}</div>
                    <div className="text-sm opacity-50">
                      Created by: {contest.contestCreatorEmail}
                    </div>
                  </div>
                </div>
              </td>

              {/* Participants Count */}
              <td>
                {contest.participants || 0}
                <span className="badge badge-ghost badge-sm">
                  Participants joined
                </span>
              </td>

              {/* Remaining Time */}
              <td>{getRemainingTime(contest.deadline)}</td>

              {/* Remaining Time */}
              <td><bt className="btn btn-success">{contest.status}</bt></td>

              {/* Action Button */}
              <th>
                <Link to={`/contest-details/${contest.contestId}`}>
                  <button className="btn btn-primary ">Details</button>
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyContests;
