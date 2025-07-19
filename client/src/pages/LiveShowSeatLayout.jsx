import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { ArrowRightIcon } from "lucide-react";

const seatTypes = {
  Premium: { rows: ["A", "B", "C"], price: 1000 },
  Deluxe: { rows: ["D", "E", "F"], price: 2000 },
  UltraDeluxe: { rows: ["G", "H", "I"], price: 4000 },
};

const LiveShowSeatLayout = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [soldSeats, setSoldSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    if (soldSeats.includes(seatId)) {
      toast.error("This seat is already sold");
      return;
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      toast.error("You can select only 5 seats");
      return;
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 12) => (
    <div key={row} className="flex gap-2 justify-center mt-2">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        const isSelected = selectedSeats.includes(seatId);
        const isSold = soldSeats.includes(seatId);

        return (
          <button
            key={seatId}
            disabled={isSold}
            onClick={() => handleSeatClick(seatId)}
            className={`
              h-8 w-8 rounded border text-xs transition duration-200
              ${isSold ? "bg-gray-400 text-white cursor-not-allowed" : ""}
              ${isSelected ? "bg-primary text-white border-primary" : ""}
              ${
                !isSold && !isSelected
                  ? "border-primary/60 hover:bg-primary/10"
                  : ""
              }
            `}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
      <BlurCircle top="-100px" left="-100px" />
      <BlurCircle bottom="0px" right="0px" />

      <h1 className="text-2xl font-semibold pt-20 mb-2">Choose Your Seats</h1>
      <img src={assets.screenImage} alt="screen" className="mb-2" />
      <p className="text-gray-400 text-sm mb-6">All Eyes Here</p>

      {Object.entries(seatTypes).map(([type, config]) => (
        <div key={type} className="mb-10">
          <h2 className="text-lg font-semibold text-center mb-1">
            {type} - ₹{config.price}
          </h2>
          <div className="grid gap-2">
            {config.rows.map((row) => renderSeats(row))}
          </div>
        </div>
      ))}

      {/* Legends */}
      <div className="flex items-center gap-6 mt-2 mb-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-primary rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-400 rounded"></div>
          <span>Sold</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 border border-primary/60 rounded"></div>
          <span>Available</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/my-bookings")}
        className="flex items-center gap-1 mt-6 px-10 py-3 text-sm bg-transparent hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95"
      >
        Proceed to Checkout
        <ArrowRightIcon strokeWidth={3} />
      </button>
    </div>
  );
};

export default LiveShowSeatLayout;
