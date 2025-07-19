import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import { dummyShowsData, dummyLiveShowsData } from "../assets/assets";
import MovieCard from "./MovieCard";
import LiveShowCard from "./LiveShowCard";

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
    
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 text-sm font-semibold text-white hover:text-primary-dull transition-colors">
          View All
          <ArrowRight className="group-hover:translate-x-1 transition-transform w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap max-sm:justify-center gap-8 mt-8">
        {dummyShowsData.slice(0, 4).map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>
      
      <div className="relative flex items-center justify-between pt-28 pb-10">
        <BlurCircle top="-40px" right="-120px" />
        <p className="text-gray-300 font-medium text-lg">Live Shows</p>
        <button
          onClick={() => navigate("/live-shows")}
          className="group flex items-center gap-2 text-sm font-semibold text-white hover:text-primary-dull transition-colors">
          View All
          <ArrowRight className="group-hover:translate-x-1 transition-transform w-5 h-5" />
        </button>
        
      </div>

      <div className="flex flex-wrap max-sm:justify-center gap-8 mt-8">
        {dummyLiveShowsData.slice(0, 4).map((show) => (
          <LiveShowCard key={show._id} show={show} />
        ))}
      </div>

    </div>
  );
};

export default FeaturedSection;
