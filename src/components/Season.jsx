import React, { useState, useEffect } from 'react';

const Preview = ({ podcastId, onClose }) => {
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPodcastById = async (podcastId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${podcastId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch podcast data.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(`Error fetching podcast with ID ${podcastId}:`, error);
      setError(error);
      return null;
    }
  };

  useEffect(() => {
    // Fetch data for the seasons and episodes from the API URL
    fetchPodcastById(podcastId)
      .then(data => {
        setSeasons(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [podcastId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="preview">
      <h2>Seasons and Episodes</h2>
      <button onClick={onClose}>Close</button>
      {seasons.map(season => (
        <div key={season.id}>
          <h3>Season {season.number}</h3>
          <ul>
            {season.episodes.map(episode => (
              <li key={episode.id}>{episode.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Preview;
