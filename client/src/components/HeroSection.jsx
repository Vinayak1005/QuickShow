import { useState } from "react";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { assets } from "../assets/assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const slides = [
    {
      _id: "324544",
      bg: assets.heroBg,
      title: "Spider‑Man",
      subtitle: "No Way Home",
      genres: "Action | Adventure | Sci‑Fi",
      year: 2021,
      duration: "2h 28m",
      type: "movie",
    },
    {
      _id: "552524",
      bg: assets.heroBg3,
      title: "Guardians",
      subtitle: "Of The Galaxy Vol‑3",
      genres: "Action | Horror | Fantasy",
      year: 2022,
      duration: "2h 6m",
      type: "movie",
    },
    {
      _id: "1232546",
      bg: assets.heroBg2,
      title: "Devara",
      subtitle: "Part‑1",
      genres: "Action | Thriller | Drama",
      year: 2024,
      duration: "2h 56m",
      type: "movie",
    },
    {
      _id: "ls_005",
      bg: assets.heroBg4,
      title: "The Weekend Night",
      subtitle: "Chennai",
      genres: "Live Show | Concert",
      year: 2025,
      duration: "6 pm Onwards",
      type: "live",
    },
  ];

  const titleClasses = [
    "text-5xl md:text-[70px] text-white",
    "text-4xl md:text-[50px] text-white",
    "text-5xl md:text-[60px] text-white",
    "text-5xl md:text-[60px] text-white",
  ];

  const subtitleClasses = [
    "text-2xl md:text-3xl text-white",
    "text-lg md:text-2xl text-white",
    "text-xl md:text-3xl text-white",
    "text-xl md:text-3xl text-white",
  ];

  const settings = {
    dots: true,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
    swipe: true,
    touchMove: true,
    pauseOnHover: true,
    beforeChange: (_, next) => setActive(next),
  };

  const handleNavigate = () => {
    const activeSlide = slides[active];

    if (activeSlide.type === "movie") {
      navigate(`/movies/${activeSlide._id}`);
    } else {
      navigate("/Live-Shows");
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((s, i) => (
          <div key={i}>
            <img src={s.bg} alt="" className="w-full h-screen object-cover" />
          </div>
        ))}
      </Slider>

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 text-white">
        {(active === 0 || active === 1) && (
          <img
            src={assets.marvelLogo}
            alt="Marvel"
            className="max-h-11 lg:h-11 mt-20"
          />
        )}

        <h1
          className={`font-semibold max-w-[440px] md:leading-[1.15] ${titleClasses[active]}`}
        >
          {slides[active].title}
        </h1>

        <h2
          className={`font-medium mt-2 tracking-wide ${subtitleClasses[active]}`}
        >
          {slides[active].subtitle}
        </h2>

        <div className="flex items-center gap-4 text-gray-300">
          <span>{slides[active].genres}</span>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" /> {slides[active].year}
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" /> {slides[active].duration}
          </div>
        </div>

        <button
          onClick={handleNavigate}
          className="flex items-center gap-1 px-6 py-3 text-sm b-primary hover:bg-primary-dull transition rounded-full font-medium"
        >
          Book Now
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
