import { useEffect, useState } from "react";


export default function Seasons(prop) {

  const [showSeasons, setShowSeasons] = useState(null)
  // const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    if (prop.id) {
      fetch(`https://podcast-api.netlify.app/id/${prop.id}`)
        .then(response => response.json())
        .then(data => {
          const seasons = data.seasons

          const seasonsdata = seasons.map((item) => {
            return (
              <>
                <p className="text-color">{item.title}</p>
                <img className="card--image" src={item.image}></img>
                
                        {item.episodes.map((episode, episodeIndex) => {
                            return (
                                <li className="text-color" key={episodeIndex}>
                                    {episode.title}
                                    <br/>
                                    <br/>
                                    {episode.description}
                                    <br/>
                                    <br/>
                                    <audio controls>
                                        <source src={episode.file} type='audio/mpeg' />
                                    </audio>
                                </li>
                            )
                        }
                        )}
                    
              </>
            )
          })

          setShowSeasons(seasonsdata)
        })
    }
  }, [prop.id])

  // const fetchShowDetails = async (showId) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(`https://podcast-api.netlify.app/id/${showId}`);
  //     const data = response.data;
  //     setShowData(data);
  //     setSelectedSeason(null);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching show details:', error);
  //   }
  // };

  return (
    <div className="card-container">
      {showSeasons && showSeasons.map((season, index) => (
        <div key={index} className="card">
          {season}
        </div>
      ))}
    </div>
  );
}
