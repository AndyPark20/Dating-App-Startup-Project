import React from 'react';

//Import CSS File
import "./App.css";

//Import Components
import { LandingPage } from './LandingPage/';
import { VerticalMenu } from './VerticalMenu';


export const App =()=>{

  return (
    <div className="container">
      <div className="row">
        <div className="col main-section">
          <div className="vertical-menu">
            <VerticalMenu />
          </div>
          <LandingPage />
        </div>
      </div>
    </div>
  );
}
