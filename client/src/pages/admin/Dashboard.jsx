import { ChartLineIcon, IndianRupee, PlayCircleIcon, StarIcon, UsersIcon, CalendarClockIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dummyDashboardData } from '../../assets/assets';
import BlurCircle from '../../components/BlurCircle';
import dateFormat from '../../lib/dateFormat';

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeMovies: [],
    activeLiveShows: [],
    totalUser: 0
  });
  const [loading, setLoading] = useState(true);

 const dashboardCards = [
  { title: "Total Bookings", value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
  { title: "Total Revenue", value: currency + (dashboardData.totalRevenue || 0), icon: IndianRupee },
  { title: "Active Movies", value: dashboardData.activeMovies?.length || "0", icon: PlayCircleIcon },
  { title: "Active Shows", value: dashboardData.activeLiveShows?.length || "0", icon: CalendarClockIcon },
  { title: "Total Users", value: dashboardData.totalUser || "0", icon: UsersIcon }
];


  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <>
      <Title text1={"Admin"} text2={"Dashboard"} />

      {/* Dashboard cards */}
      <div className='relative flex flex-wrap gap-4 mt-6'>
        <BlurCircle top='-100px' left='0' />
        <div className='flex flex-wrap gap-4 w-full'>
          {dashboardCards.map((card, index) => (
            <div key={index} className='flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full'>
              <div>
                <h1 className='text-sm'>{card.title}</h1>
                <p className='text-xl font-medium mt-1'>{card.value}</p>
              </div>
              <card.icon className='w-6 h-6' />
            </div>
          ))}
        </div>
      </div>

      {/* Active Movies */}
      <p className='mt-10 text-lg font-medium'>Active Movies</p>
      <div className='relative flex flex-wrap gap-6 mt-4 w-full max-w-screen-xl mx-auto'>
        <BlurCircle top='100px' left='-10%' />
        {dashboardData.activeMovies.map((show) => (
          <div
            key={show._id}
            className='w-[200px] md:w-[220px] rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:translate-y-1 transition duration-300'>
            <img src={show.movie.poster_path} alt="" className='h-60 w-full object-cover' />
            <p className='font-medium p-2 truncate'>{show.movie.title}</p>
            <div className='flex items-center justify-between px-2'>
              <p className='text-lg font-medium'>{currency} {show.showPrice}</p>
              <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
                <StarIcon className='w-4 h-4 text-primary fill-primary' />
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className='px-2 pt-2 text-sm text-gray-500'>{dateFormat(show.showDateTime)}</p>
          </div>
        ))}
      </div>

      {/* Active Live Shows */}
      <p className='mt-10 text-lg font-medium'>Active Live Shows</p>
      <div className='relative flex flex-wrap gap-6 mt-4 w-full max-w-screen-xl mx-auto'>
        <BlurCircle top='50px' left='10%' />
        {dashboardData.activeLiveShows.map((entry) => (
          <div
            key={entry._id}
            className='w-[200px] md:w-[220px] rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:translate-y-1 transition duration-300'
          >
            <img src={entry.show.poster_path} alt="" className='h-60 w-full object-cover' />
            <p className='font-medium p-2 truncate'>{entry.show.title}</p>
            <div className='flex items-center justify-between px-2'>
              <p className='text-lg font-medium'>{currency} {entry.showPrice}</p>
              <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
                <CalendarClockIcon className='w-4 h-4 text-primary' />
              </p>
            </div>
            <p className='px-2 pt-2 text-sm text-gray-500'>{dateFormat(entry.showDateTime)}</p>
            <p className='px-2 pt-1 text-xs text-gray-400'>{entry.show.venue}</p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
