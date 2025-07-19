import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyLiveShowsData, dummyCastsData } from '../assets/assets';
import BlurCircle from '../components/BlurCircle';
import { HeartIcon, CalendarClockIcon, MapPinIcon } from 'lucide-react';
import LiveShowCard from '../components/LiveShowCard';

const LiveShowDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const foundShow = dummyLiveShowsData.find((s) => s._id === id);
    if (foundShow) {
      const performer = dummyCastsData.find((c) => c.id === foundShow.performer_id);
      setShow({ ...foundShow, performer });
    }
  }, [id]);

  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img
          src={show.poster_path}
          alt={show.title}
          className='mx-auto md:mx-0 rounded-xl h-104 max-w-70 object-cover'
        />
        <div className='relative flex flex-col gap-3'>
          <BlurCircle top='-100px' left='-100px' />

          <h1 className='text-4xl font-semibold max-w-96 text-balance'>
            {show.title}
          </h1>

          <div className='flex items-center gap-2 text-gray-300'>
            <CalendarClockIcon className='h-5 w-5 text-primary' />
            {(() => {
              const firstDateTime = Object.values(show.timings)?.[0]?.[0];
              return firstDateTime
                ? new Date(firstDateTime).toLocaleString('en-IN', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  })
                : 'Invalid Date';
            })()}
          </div>

          <div className='flex items-center gap-2 text-gray-300'>
            <MapPinIcon className='h-5 w-5 text-primary' />
            {show.venue}
          </div>

          <p className='text-gray-400 text-sm mt-2 leading-tight max-w-xl'>
            Experience a one-of-a-kind live performance with {show.performer?.name || 'an amazing artist'}.
          </p>

          <div className='flex items-center flex-wrap gap-4 mt-4'>
            <a
              className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull p-2.5 rounded-md font-medium transition cursor-pointer active:scale-95'
              href={`/live-seat-layout/${id}/${Object.keys(show.timings)[0]}`}>
              Buy Ticket — ₹{show.price}
            </a>

            <button>
              <HeartIcon className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>

      {show.performer && (
        <>
          <p className='text-lg font-medium mt-20'>Performer</p>
          <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
            <div className='flex items-center gap-4 w-max px-4'>
              <div className='text-center'>
                <img
                  src={show.performer.profile_path}
                  alt={show.performer.name}
                  className='rounded-full h-20 md:h-20 aspect-square object-cover'
                />
                <p className='text-sm mt-2'>{show.performer.name}</p>
              </div>
            </div>
          </div>

          <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
          <div className="flex flex-wrap max-sm:justify-center gap-8">
            {dummyLiveShowsData
              .filter((liveShow) => liveShow._id !== id)
              .slice(0, 4)
              .map((liveShow, index) => (
                <LiveShowCard key={index} show={liveShow} />
              ))}
          </div>

          <div className="flex justify-center mt-20">
            <button
              onClick={() => navigate("/live-shows")}
              className="px-10 py-3 text-sm bg-transparent hover:bg-primary-dull transition rounded-md font-medium cursor-pointer">
              Show More
            </button>
          </div>
        </>
      )}
    </div>
  ) : (
    <div className='text-center py-20 text-gray-500 text-lg'>Loading...</div>
  );
};

export default LiveShowDetails;
