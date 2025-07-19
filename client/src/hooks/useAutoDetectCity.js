import { useEffect, useState } from "react";

const useAutoDetectCity = () => {
  const [city, setCity] = useState("Detecting...");

  useEffect(() => {
    const fetchCity = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`
        );
        const data = await res.json();
        const foundCity =
          data?.address?.city || data?.address?.town || data?.address?.village || "Unknown";
        setCity(foundCity);
      } catch (error) {
        console.error("Reverse geocoding error:", error);
        setCity("Unknown");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchCity(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err.message);
          setCity("Location blocked");
        }
      );
    } else {
      setCity("Geolocation not supported");
    }
  }, []);

  return city;
};

export default useAutoDetectCity;
