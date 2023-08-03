import React from 'react';

const BackToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button onClick={handleScrollToTop} className="back-to-top-button">
      Back to Top
    </button>
  );
};

export default BackToTopButton;
