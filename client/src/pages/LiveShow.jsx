import React from "react";
import { dummyLiveShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import LiveShowCard from "../components/LiveShowCard";

const LiveShow = () => (
  dummyLiveShowsData.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />
      <h1 className="text-lg font-medium my-4 text-white">Now Showing Live Shows</h1>

      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {dummyLiveShowsData.map((show) => (
          <LiveShowCard key={show._id} show={show} />
        ))}
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-400 py-20">No live shows available.</div>
  )
);

export default LiveShow;
