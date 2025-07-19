import React, { useEffect, useState } from 'react';
import { dummyLiveShowsData, dummyCastsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import { CheckIcon, DeleteIcon } from 'lucide-react';
import Title from '../../components/admin/Title';

import liveShow1 from '../../assets/LiveShows/liveShow1.jpg';
import liveShow2 from '../../assets/LiveShows/liveShow2.jpg';
import liveShow3 from '../../assets/LiveShows/liveShow3.jpg';
import liveShow4 from '../../assets/LiveShows/liveShow4.jpg';
import liveShow5 from '../../assets/LiveShows/liveShow5.jpg';


const AddLiveShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [performers, setPerformers] = useState([]);
  const [selectedPerformer, setSelectedPerformer] = useState(null);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [liveShowPosters, setLiveShowPosters] = useState([]);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState('');
  const [showPrice, setShowPrice] = useState('');

 useEffect(() => {
  const posters = [liveShow1, liveShow2, liveShow3, liveShow4, liveShow5];
  setLiveShowPosters(posters);

  const performerIds = [32, 33, 34, 35, 36]; // only show valid performer roles
  const livePerformers = dummyCastsData.filter((cast) =>
    performerIds.includes(cast.id)
  );
  setPerformers(livePerformers);
}, []);


  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split('T');
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return {
          ...prev,
          [date]: [...times, time],
        };
      }
      return prev;
    });
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  const handleAddLiveShow = () => {
    if (!selectedPerformer || !selectedPoster || !showPrice || Object.keys(dateTimeSelection).length === 0) return;

    const newLiveShow = {
      _id: `ls_${Date.now()}`,
      title: `${selectedPerformer.name} Live Show`,
      venue: 'Sample Venue',
      performer_id: selectedPerformer.id,
      price: parseInt(showPrice),
      poster_path: selectedPoster,
      timings: dateTimeSelection,
    };

    dummyLiveShowsData.push(newLiveShow);
    alert('Live Show Added (dummy)');

    setDateTimeSelection({});
    setShowPrice('');
    setSelectedPerformer(null);
    setSelectedPoster(null);
  };

  return performers.length > 0 ? (
    <>
      <Title text1="Add" text2="Live Shows" />

      {/* Poster Selection */}
      <p className="mt-10 text-lg font-medium">Choose a Live Show Poster</p>
      <div className="overflow-x-auto overflow-hidden pb-4">
        <div className="flex gap-4 mt-4 w-max">
          {liveShowPosters.map((poster, index) => (
            <div
              key={index}
              className="relative max-w-40 cursor-pointer hover:translate-y-1 transition duration-300"
              onClick={() => setSelectedPoster(poster)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={poster}
                  alt={`Live Show Poster ${index}`}
                  className="w-full h-60 object-cover brightness-90"
                />
              </div>
              {selectedPoster === poster && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                  <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Performer Selection */}
      <p className="mt-10 text-lg font-medium">Choose a Performer</p>
      <div className="overflow-x-auto overflow-hidden pb-4">
        <div className="flex gap-4 mt-4 w-max">
          {performers.map((person) => (
            <div
              key={person.id}
              className="relative max-w-40 cursor-pointer hover:translate-y-1 transition duration-300"
              onClick={() => setSelectedPerformer(person)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={person.profile_path}
                  alt={person.name}
                  className="w-full h-60 object-cover brightness-90"
                />
              </div>
              {selectedPerformer?.id === person.id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                  <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              )}
              <p className="font-medium truncate">{person.name}</p>
              <p className="text-gray-400 text-sm">{person.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Price Input */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm">{currency}</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter Live Show Price"
            className="outline-none"
          />
        </div>
      </div>

      {/* Date-Time Input */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Date & Time</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
          >
            Add Time
          </button>
        </div>
      </div>

      {/* Selected Date-Times */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 font-semibold">Selected Date-Time</h2>
          <ul className="space-y-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date}>
                <div className="font-medium">{date}</div>
                <div className="flex flex-wrap gap-2 mt-1 text-sm">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="border border-primary px-2 py-1 flex items-center rounded"
                    >
                      <span>{time}</span>
                      <DeleteIcon
                        onClick={() => handleRemoveTime(date, time)}
                        width={15}
                        className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add Button */}
      <button
        onClick={handleAddLiveShow}
        className="bg-transparent text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
      >
        Add Live Show
      </button>
    </>
  ) : (
    <Loading />
  );
};

export default AddLiveShows;
