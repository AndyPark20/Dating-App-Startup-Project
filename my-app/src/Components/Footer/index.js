import React from 'react';


//Import CSS
import './Footer.css';


export const Footer =()=>{
  return (
    <div className="footer-container">
      <div className="row">
        <div className="col page-per-view">
          <p>Display</p>
          <select>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <p>Candidates per page</p>
        </div>
      </div>
    </div>
  );
}
