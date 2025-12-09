import { Link } from "react-router-dom";

const ContestCard = ({ contest }) => {
    // console.log('contest', contest)
  return (
    <div className="rounded-xl shadow-md border hover:shadow-xl transition p-4 bg-white dark:bg-gray-900">
      <img
        src={contest.image}
        alt={contest.name}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h2 className="text-xl font-bold mt-3">{contest.name}</h2>

      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {contest.description}
      </p>

      <div className="flex justify-between mt-4 text-sm">
        <span className="font-semibold">Type:</span>
        <span>{contest.contestType}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="font-semibold">Price:</span>
        <span>${contest.price}</span>
      </div>

      <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
        <Link to={`/contest-details/${contest._id}`}>View Details</Link>
      </button>
    </div>
  );
};

export default ContestCard;
