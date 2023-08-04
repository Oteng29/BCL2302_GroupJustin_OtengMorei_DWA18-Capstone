import  { useEffect, useState } from "react";
import axios from "axios";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";


export default function Carousel() {
  const [shows, setShows] = useState([]);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const slideWidth = 200;
  const slidesToShow = 4;
  const containerWidth = slideWidth * shows.length;


  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get("https://podcast-api.netlify.app/shows")
      .then((response) => {
        // Update the state with the fetched data
        setShows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const moveCarousel = (steps) => {
    const newPosition = carouselPosition + steps * slideWidth * slidesToShow;
    setCarouselPosition(Math.max(-(containerWidth - slideWidth * slidesToShow), Math.min(0, newPosition)));
  };
  let interval;

  const handleBackwardMouseDown = () => {
    clearInterval(interval);
    interval = setInterval(() => moveCarousel(1), 5000);
  };

  const handleForwardMouseDown = () => {
    clearInterval(interval);
    interval = setInterval(() => moveCarousel(-1), 50);
  };
  
  const handleMouseUp = () => {
    clearInterval(interval);
  };

  return (
    <div className="hero-section">
      <div className="carousel-container" >
        <div
          className="show-info"
          style={{
            transform: `translateX(${carouselPosition}px)`,
            width: `${containerWidth}px`,
          }}
        >
          {shows.map((show) => (
            <div key={show.id}>
              <img src={show.image} alt={show.name} width={slideWidth} />
              <h1>{show.name}</h1>
            </div>
          ))}
        </div>
      </div>

      <ArrowBackIosNewOutlinedIcon
        className="arrow-icon backward"
        onMouseDown={handleBackwardMouseDown}
        onMouseUp={handleMouseUp}
      />

      <ArrowForwardIosOutlinedIcon
        className="arrow-icon forward"
        onMouseDown={handleForwardMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}