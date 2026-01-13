import { Link } from "react-router-dom";

const ContestCard = ({ contest }) => {
  return (
    <div className="flex flex-col h-full rounded-xl shadow-md hover:border-blue-500 hover:shadow-2xl transition-all duration-300 group">
      
      {/* Image Container with Fixed Aspect Ratio */}
      <div className="relative h-36 w-full overflow-hidden rounded-t-xl">
        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {contest.contestType}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold  line-clamp-1 mb-2">
          {contest.name}
        </h2>

        <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-grow">
          {contest.description}
        </p>

        {/* Details Row */}
        <div className="border-t border-slate-100 pt-4 mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className=" text-sm font-medium">Entry Fee</span>
            <span className="text-lg font-bold text-blue-600">${contest.price}</span>
          </div>

          {/* Button Styled Link */}
          <Link 
            to={`/contest/${contest._id}`}
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;