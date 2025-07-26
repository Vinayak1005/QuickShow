import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedSection from '../components/FeaturedSection';
import { fetchUser } from '../api';

const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


   useEffect(() => {
  console.log('Starting fetchUser');
  fetchUser()
    .then(data => {
      console.log('User data:', data);
      setUser(data);
    })
    .catch(err => {
      console.error('Fetch error:', err);
      setError(err.message);
    });
}, []);


  return (
    <div>
      {/* Show loading, error or user info */}
      {error && <div style={{color: 'red'}}>Error loading user: {error}</div>}
      {!error && !user && <div>Loading user info...</div>}
      {user && (
        <div style={{marginBottom: '20px'}}>
          <h2>Welcome back, {user.name}!</h2>
          <p>Your email: {user.email}</p>
        </div>
      )}

      {/* Your existing sections */}
      <HeroSection />
      <FeaturedSection />
    </div>
  );
};

export default Home;
