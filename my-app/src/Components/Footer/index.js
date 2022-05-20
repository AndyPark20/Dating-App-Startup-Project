import React from 'react';


//Import CSS
import './Footer.css';



export const Footer = ({ updateDisplaycount,updatePageNumber,pageNumber }) => {
  return (
    <div className="footer-container">
      <div className="footer-row">
        <div className="col page-per-view">
          <p>Display</p>
          <select onChange={(e) => updateDisplaycount(e.target.value)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <p>Candidates per page</p>
        </div>
        <div className="col next-prev-view">
          <p onClick={() => updatePageNumber(pageNumber+1)}>next</p>
        </div>
      </div>
    </div>
  );
};
