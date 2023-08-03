import React from 'react';

const SortBy = ({ onSort }) => {
  const handleSortChange = (event) => {
    onSort(event.target.value);
  };

  return (
    <div className="sort-by">
      <span className='text-color'>Sort by: </span>
      <select onChange={handleSortChange}>
        <option className='option-box' value="" >
          Select an option
        </option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
        <option value="updatedAsc">Date Updated (Ascending)</option>
        <option value="updatedDesc">Date Updated (Descending)</option>
      </select>
    </div>
  );
};

export default SortBy;
