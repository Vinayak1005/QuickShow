import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favourite from './pages/Favourite';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import MyBookings from './pages/MyBookings';
import SeatLayout from './pages/SeatLayout';
import LiveShow from './pages/LiveShow';
import LiveShowDetails from './pages/LiveShowDetails';
import LiveShowSeatLayout from './pages/LiveShowSeatLayout'; 
import ListLiveShows from './pages/admin/ListLiveShows';
import AddLiveShows from './pages/admin/AddLiveShows';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BookNowPage from './pages/BookNowPage';
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddMovies from './pages/admin/AddMovies'
import ListMovies from './pages/admin/ListMovies'
import ListBookings from './pages/admin/ListBookings'

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <ScrollToTop />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favourite' element={<Favourite />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path="/seat-layout/:id/:date/:theatreId/:time" element={<SeatLayout />} />
        <Route path='/live-shows' element={<LiveShow />} />
        <Route path='/live-shows/:id' element={<LiveShowDetails />} />
        <Route path="/live-seat-layout/:id/:date" element={<LiveShowSeatLayout />} />
        <Route path="/book/:id" element={<BookNowPage />} />
        <Route path='admin/*' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-movies" element={<AddMovies />} />
        <Route path="list-movies" element={<ListMovies />} />
        <Route path="list-bookings" element={<ListBookings />} />
       <Route path="add-live-shows" element={<AddLiveShows />} />   
       <Route path="list-live-shows" element={<ListLiveShows />} /> 
      </Route>


      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
