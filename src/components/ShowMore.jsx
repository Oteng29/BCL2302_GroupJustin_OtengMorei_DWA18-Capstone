import React from 'react';

const ShowMoreButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="show-more-button">
      Show more
    </button>
  );
};

export default ShowMoreButton;
