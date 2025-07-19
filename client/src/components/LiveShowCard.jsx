import { CalendarIcon, MapPinIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LiveShowCard = ({ show }) => {
  const navigate = useNavigate();
  const toDetails = () => {
    navigate(`/live-shows/${show._id}`);
    scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col justify-between p-3 w-66 bg-transparent hover:translate-y-1 transition duration-300">
      <img
        onClick={toDetails}
        src={show.backdrop_path}
        alt={show.title}
        className="rounded-lg h-100 w-full object-cover cursor-pointer"/>

      <p className="font-semibold mt-2 truncate">{show.title}</p>

      <p className="text-sm text-gray-400 mt-2 flex items-center gap-1">
        <CalendarIcon className="h-4 w-4" />
        {new Date(show.dateTime).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>
      

      <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
        <MapPinIcon className="h-4 w-4" />
        {show.venue}
      </p>

      <button
        onClick={toDetails}
        className="mt-4 px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full">
        Tickets Starting From – ₹{show.price}
      </button>
    </div>
  );
};

export default LiveShowCard;
