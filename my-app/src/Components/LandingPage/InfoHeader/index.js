import React from 'react';

//Import CSS
import './InfoHeader.css';

export const InfoHeader = ()=>{
  return(
    <div className="container">
      <div clasName="header-info-row">
        <div className="header-info-col">
          <h3>Full Name:</h3>
          <h3>Business Idea:</h3>
          <h3>Project Completion ETA:</h3>
        </div>
      </div>
    </div>
  )
}
