import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Navbar from './components/NavBar';
import Grid from '@mui/material/Grid';
import SearchBar from './components/SearchBar';
import BackToTopButton from './components/BackToTop';
import ShowMoreButton from './components/ShowMore';
import SortByButton from './components/SortBy';
import FilterByGenre from './components/FilterByGenre';
import Super from './components/Super'
import { supabase } from './components/Super';
import Seasons from './components/Season';
import Carousel from './components/Carousel';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';


const genreMapping = {
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

function App() {
  const [feature, setFeature] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [numCardsToShow, setNumCardsToShow] = useState(9);
  const [searching, setSearching] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [theSeasons, setTheSeasons] = useState('');
  const [throwSignUp, setThrowSignUp] = useState('signUpPhase')
  const [loading, setLoading] = useState(true);


  function ApiId(id) {
    setTheSeasons(id)
  }

  React.useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in successfully:", session.user.email);
        setThrowSignUp('PreviewPhase')
      }
    });
    return () => {
      authListener.unsubscribe;
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    // Fetch data from the API when the component mounts
    fetch("https://podcast-api.netlify.app/shows")
      .then(response => response.json())
      .then(data => {
        const mapData = data.map(datamapping => (
          <Card
            // press={() => { setseasonInStore(datamapping.id) }}
            key={datamapping.id}
            titles={datamapping.title}
            images={datamapping.image}
            descriptions={datamapping.description}
            seasons={datamapping.seasons}
            genres={datamapping.genres.map(genreID => genreMapping[genreID])}
            updated={datamapping.updated}
            click={() => ApiId(datamapping.id)}
          />
        ));
        setFeature(mapData);
        setShowMore(true);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  const handleFilterByGenre = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    const filteredData = feature.filter(datamapping =>
      datamapping.props.titles.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFeature(filteredData);
    setSearching(true);
  };

  const handleGoBackToHomePage = () => {

    const homepageURL = 'http://localhost:5175/';

    // Navigate to the homepage
    window.location.href = homepageURL;
  };



  const handleShowMore = () => {
    setNumCardsToShow(prevNum => prevNum + 9);
  };

  const handleSort = (option) => {
    switch (option) {
      case 'asc':
        const sortedDataAZ = [...feature].sort((a, b) => a.props.titles.localeCompare(b.props.titles));
        setFeature(sortedDataAZ);
        break;
      case 'desc':
        const sortedDataZA = [...feature].sort((a, b) => b.props.titles.localeCompare(a.props.titles));
        setFeature(sortedDataZA);
        break;
      case 'updatedAsc':
        const sortedDataUpdatedAsc = [...feature].sort((a, b) => a.props.updated.localeCompare(b.props.updated));
        setFeature(sortedDataUpdatedAsc);
        break;
      case 'updatedDesc':
        const sortedDataUpdatedDesc = [...feature].sort((a, b) => b.props.updated.localeCompare(a.props.updated));
        setFeature(sortedDataUpdatedDesc);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress size={60} />
        <h2>Loading...</h2>
      </div>
    );
  }


  return (

    <>
      {throwSignUp === 'signUpPhase' && <Super />}
      {throwSignUp === 'PreviewPhase' &&

        <>
          <Carousel/>
          <Seasons
            id={theSeasons}
          />
          <div>

            <Navbar />
          </div>

          <br />
      
          <br />
          <div>
            <SearchBar onSearch={handleSearch} />

          </div>
          <br />

          <div className="filter-sort-container">
            <FilterByGenre genres={genreMapping} selectedGenre={selectedGenre} onChange={handleFilterByGenre} />
            <SortByButton onSort={handleSort} />
          </div>
          <br />
          <div className="button-container">

          </div>
          <br />
          <Grid container spacing={4}>
            {feature.slice(0, numCardsToShow)}
          </Grid>
  { searching && <button className='back-button' onClick={handleGoBackToHomePage}>Go Back</button> }
  <br />
  { showMore && <ShowMoreButton onClick={handleShowMore} /> }
          <br />
          <br />
          <BackToTopButton />


        </>
      }
    </>

  );
}

export default App;
