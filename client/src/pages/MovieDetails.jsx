import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  dummyDateTimeData,
  dummyShowsData,
  dummyCastsData,
  dummyTrailers,
} from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import { HeartIcon, PlayCircleIcon, StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";

import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

const languageMap = {
  en: "English",
  te: "Telugu",
  hi: "Hindi",
  ta: "Tamil",
};

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const getShow = async () => {
    const foundShow = dummyShowsData.find((show) => show._id === id);
    if (foundShow) {
      const cast = [
        dummyCastsData.find((c) => c.id === foundShow.heroId),
        dummyCastsData.find((c) => c.id === foundShow.heroineId),
        dummyCastsData.find((c) => c.id === foundShow.directorId),
      ].filter(Boolean);

      const trailer = dummyTrailers.find(
        (t) => t.title.toLowerCase() === foundShow.title.toLowerCase()
      );

      setShow({
        movie: { ...foundShow, cast },
        dateTime: dummyDateTimeData,
        trailer: trailer?.videoUrl || null,
      });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="mx-auto md:mx-0 rounded-xl h-104 max-w-70 object-cover"
        />
        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary">
            {languageMap[show.movie.original_language] ||
              show.movie.original_language.toUpperCase()}
          </p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="h-5 w-5 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} User Ratings
          </div>
          <p className="text-gray-400 text-sm mt-2 leading-tight max-w-xl">
            {show.movie.overview}
          </p>
          <p>
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-4">
            {show.trailer && (
              <a
                href={show.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3 text-sm bg-transparent hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
              >
                <PlayCircleIcon className="w-5 h-5" />
                Watch Trailer
              </a>
            )}

            <button
              onClick={() => navigate(`/book/${id}`)}
              className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull p-2.5 rounded-md font-medium transition cursor-pointer active:scale-95"
            >
              Book Now
            </button>

            <button>
              <HeartIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <p className="text-lg font-medium mt-20">Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-10 w-max px-4">
          {show.movie.cast?.map((cast, index) => {
            const role =
              index === 0 ? "Hero" : index === 1 ? "Heroine" : "Director";
            return (
              <div key={index} className="text-center">
                <img
                  src={cast.profile_path}
                  alt={cast.name}
                  className="rounded-full h-20 w-20 md:h-24 md:w-24 object-cover"
                />
                <p className="text-sm mt-2">{cast.name}</p>
                <p className="text-xs text-gray-400">{role}</p>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {dummyShowsData
          .filter((movie) => movie._id !== id)
          .slice(0, 4)
          .map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => navigate("/movies")}
          className="px-10 py-3 text-sm bg-transparent hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Show More
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
