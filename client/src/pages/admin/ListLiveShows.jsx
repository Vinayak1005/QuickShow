import React, { useEffect, useState } from 'react';
import { dummyLiveShowsData, dummyCastsData } from '../../assets/assets';
import Title from '../../components/admin/Title';
import dateFormat from '../../lib/dateFormat';
import Loading from '../../components/Loading';

const ListLiveShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [liveShows, setLiveShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllLiveShows = async () => {
    try {
      // Simulate bookings
      const shows = dummyLiveShowsData.map((show, index) => ({
        show,
        showDateTime: show.dateTime,
        showPrice: show.price,
        occupiedSeats: {
          A1: `user_${index + 1}`,
          B1: `user_${index + 2}`,
          C1: `user_${index + 3}`,
        },
      }));
      setLiveShows(shows);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllLiveShows();
  }, []);

  return !loading ? (
    <>
      <Title text1="List" text2="Live Shows" />
      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium'>Show Title</th>
              <th className='p-2 font-medium'>Venue</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Performer</th>
              <th className='p-2 font-medium'>Total Bookings</th>
              <th className='p-2 font-medium'>Earnings</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {liveShows.map((entry, index) => {
              const { show, showDateTime, showPrice, occupiedSeats } = entry;
              const performer = dummyCastsData.find(p => p.id === show.performer_id);
              return (
                <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                  <td className='p-2 min-w-40'>{show.title}</td>
                  <td className='p-2'>{show.venue}</td>
                  <td className='p-2'>{dateFormat(showDateTime)}</td>
                  <td className='p-2'>{performer?.name || 'Unknown'}</td>
                  <td className='p-2'>{Object.keys(occupiedSeats).length}</td>
                  <td className='p-2'>
                    {currency} {Object.keys(occupiedSeats).length * showPrice}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListLiveShows;
