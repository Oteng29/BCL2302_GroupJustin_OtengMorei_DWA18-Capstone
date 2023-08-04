import React from 'react';

const FilterByGenre = ({ genres, selectedGenre, onChange }) => {
  return (
    <div className="filter-by-genre">
      <span className='text-color'>Filter by: </span>
      <select value={selectedGenre} onChange={onChange}>
        <option className='option-box' value="">All Genres</option>
        {Object.keys(genres).map((genreID) => (
          <option key={genreID} value={genreID}>
            {genres[genreID]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByGenre;
