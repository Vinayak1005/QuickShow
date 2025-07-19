// pages/BookNowPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyShowsData, dummyDateTimeData } from "../assets/assets";

const theatres = [
  { id: "t1", name: "PVR Cinemas - Orion Mall", location: "Rajajinagar" },
  { id: "t2", name: "INOX - Garuda Mall", location: "MG Road" },
  { id: "t3", name: "Cinepolis - Royal Meenakshi", location: "Bannerghatta" },
];

const BookNowPage = () => {
  const { id } = useParams(); // movieId from URL
  const navigate = useNavigate();
  const movie = dummyShowsData.find((m) => m.id === parseInt(id));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const generateNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const handleTimeClick = (theatreId, time) => {
    const dateString = selectedDate.toISOString().split("T")[0]; // format: YYYY-MM-DD
    navigate(
      `/seat-layout/${id}/${dateString}/${theatreId}/${encodeURIComponent(
        time
      )}`
    );
  };

  const selectedDateStr = selectedDate.toISOString().split("T")[0];
  const shows = dummyDateTimeData[selectedDateStr] || [];

  // Show fallback if movie not found
  if (!movie) {
    return <div className="p-4 text-center text-red-500">Movie not found.</div>;
  }

  return (
    <div className="p-5 max-w-4xl mx-auto items-center">
      {/* Poster + Title + Overview in Flex Row */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
        <img
          src={movie?.poster_path}
          alt={movie?.title}
          className="w-40 sm:w-48 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie?.title}</h1>
          <p className="text-gray-600 text-sm max-w-md">{movie?.overview}</p>
        </div>
      </div>

      {/* Date Selection */}
      <h2 className="text-xl font-semibold mb-2 text-primary-dull">
        Select Date
      </h2>
      <div className="flex gap-3 overflow-x-auto mb-6">
        {generateNext7Days().map((date, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(date)}
            className={`px-5 py-3 text-sm rounded-md font-medium transition cursor-pointer
              ${
                selectedDate.toDateString() === date.toDateString()
                  ? "bg-primary text-white"
                  : "bg-transparent hover:bg-primary-dull text-whites"
              }`}
          >
            {date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </button>
        ))}
      </div>

      {/* Theatre & Showtimes */}
      <h2 className="text-xl font-semibold mb-2">Select Theatre & Showtime</h2>
      <div className="flex flex-col gap-6">
        {theatres.map((theatre) => {
          const theatreShows = shows.filter(
            (show) => show.theatreId === theatre.id
          );
          return (
            <div
              key={theatre.id}
              className="border rounded-lg p-4 hover:border-primary transition"
            >
              <h3 className="text-lg font-semibold">{theatre.name}</h3>
              <p className="text-sm text-gray-500">{theatre.location}</p>
              <div className="flex flex-wrap gap-3 mt-3">
                {theatreShows.length > 0 ? (
                  theatreShows.map((show) => (
                    <button
                      key={show.showId}
                      onClick={() => handleTimeClick(theatre.id, show.time)}
                      className="px-5 py-2 text-sm bg-transparent hover:bg-primary hover:text-white rounded-md transition"
                    >
                      {show.time}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">
                    No shows on this date.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookNowPage;
