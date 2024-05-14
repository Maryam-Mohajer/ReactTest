import React, { useState } from 'react';
import styled from './TopButton.module.scss';
import { ChevronUp } from 'react-feather';
const TopButton = () => {
  const [visibleButton, setVisibelButton] = useState(false);

  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 280) {
      setVisibelButton(true);
    } else if (scrolled <= 280) {
      setVisibelButton(false);
    }
  };
  window.addEventListener('scroll', toggleVisibility);
  return (
    <div>
      {visibleButton && (
        <div className={styled.buttonContainer}>
          <button className={styled.topBtnStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ChevronUp />
          </button>
        </div>
      )}
    </div>
  );
};

export default TopButton;
