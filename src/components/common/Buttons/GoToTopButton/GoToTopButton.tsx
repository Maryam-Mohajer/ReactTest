import React, { useState } from 'react';
import { ChevronUp } from 'react-feather';
import styled from './GoToTopButton.module.scss';

const GoToTopButton = () => {
  const [visibleButton, setVisibleButton] = useState(false);

  const toggleVisibility = () => {
    const scroll = document.documentElement.scrollTop;
    if (scroll > 250) {
      setVisibleButton(true);
    } else if (scroll < 250) {
      setVisibleButton(false);
    }
  };
  window.addEventListener('scroll', toggleVisibility);
  return (
    <div>
      {visibleButton && (
        <div className={styled.container}>
          <button className={styled.topBtnStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ChevronUp color="white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default GoToTopButton;
