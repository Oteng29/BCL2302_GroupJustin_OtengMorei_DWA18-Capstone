import { useEffect, useState } from "react";
import { useHref } from "react-router-dom";


export default function Seasons(prop) {

  const [showSeasons, setShowSeasons] = useState(null)
  const [episodesstore, setEpisodesStore] = useState(null)

  const scrollToEpisodes = () => {
    const episodesDiv = document.getElementById('episode-nevigate');
    if (episodesDiv) {
      episodesDiv.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly
    }
  };

  useEffect(() => {
    if (prop.id) {
      fetch(`https://podcast-api.netlify.app/id/${prop.id}`)
        .then(response => response.json())
        .then(data => {
          const seasons = data.seasons

          const seasonsdata = seasons.map((item) => {
            return (
              <div className="seasons">
                <p className="text-color">{item.title}</p>
                <img 
                className="card--image" 
                src={item.image} 
                onClick={() => {
                  episodesfunction(item.episodes)
                  scrollToEpisodes()
                }}></img>
               <p className="episode-count">{item.episodes.length} episodes</p> 
                        
                    
              </div>
            )
          })

          setShowSeasons(seasonsdata)
        })
    }
  }, [prop.id])


  function episodesfunction(episodeNumber){
    const episodesList = episodeNumber.map((episode, episodeIndex) => {
      console.log(episode.title)
      return (
          <li className="text-color" key={episodeIndex}>
            <h3>Episode</h3>
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
  })

  setEpisodesStore(episodesList)
  } 

  return (
    <>
    <div className="card-container">
        
     {showSeasons && showSeasons.map((season, index) => (
       <div key={index} className="card">
         {season}
       </div>
     ))}
   </div>

   <div className="episodes-div" id='episode-nevigate'>
    {episodesstore}
   </div> 
</>
  );
}
