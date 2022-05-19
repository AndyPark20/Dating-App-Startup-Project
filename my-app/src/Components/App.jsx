import React, {useState} from 'react';

//Import CSS File
import "./App.css";

//Import Components
import { LandingPage } from './LandingPage/';
import { VerticalMenu } from './VerticalMenu';
import { Footer } from './Footer';

export const App =()=>{
  //store page number for pagination feature
  const [pageNumber, updatePageNumber] = useState(1);

  //Store display candidates per page number
  const [displayCount, updateDisplaycount] = useState(10)

  return (
    <div className="container">
      <div className="row">
        <div className="col main-section">
          <div className="vertical-menu">
            <VerticalMenu />
          </div>
          <div className="main-section-footer-style">
            <LandingPage pageNumber={pageNumber} displayCount={displayCount} />
            <Footer updateDisplaycount={updateDisplaycount} />
          </div>
        </div>
        <div className="footer-section"></div>
      </div>
    </div>
  );
}
