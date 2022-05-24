import React, { useState } from 'react';

//Import CSS File
import "./App.css";

//Import Components
import { LandingPage } from './LandingPage/';
import { VerticalMenu } from './VerticalMenu';
import { Footer } from './Footer';

//Import function
import { createRandomNumber } from '../functions/api/index';

export const App = () => {
  //store page number for pagination feature
  const [pageNumber, updatePageNumber] = useState(createRandomNumber());

  //Store display candidates per page number
  const [displayCount, updateDisplaycount] = useState(10);

  //Toggle functionality for button to render Save or Remove
  const [btnStatus, updateBtnStatus] = useState(false);

  return (
    <div className="container">
      <div className="row">
        <div className="col main-section">
          <div className="vertical-menu">
            <VerticalMenu />
          </div>
          <div className="main-section-footer-style">
            <LandingPage pageNumber={pageNumber} displayCount={displayCount} btnStatus={btnStatus} updateBtnStatus={updateBtnStatus}/>
            <Footer updateDisplaycount={updateDisplaycount} updatePageNumber={updatePageNumber} pageNumber={pageNumber} updateBtnStatus={updateBtnStatus}/>
          </div>
        </div>
      </div>
    </div>
  );
};
