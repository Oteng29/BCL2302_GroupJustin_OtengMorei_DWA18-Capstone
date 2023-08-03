import React from 'react';

const FilterByGenre = ({ genres, selectedGenre, onChange }) => {
  return (
    <div className="filter-by-genre">
      <span className='text-color'>Filter by: </span>
      <select value={selectedGenre} onChange={onChange}>
        <option className='option-box' value="">All Genres</option>
        {Object.keys(genres).map((genreId) => (
          <option key={genreId} value={genreId}>
            {genres[genreId]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByGenre;
