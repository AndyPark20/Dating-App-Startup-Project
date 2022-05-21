import React from 'react';

//Import CSS
import './Footer.css';

//Import function
import { createRandomNumber} from '../../functions/api/';


export const Footer = ({ updateDisplaycount,updatePageNumber,pageNumber }) => {

  //Generate random candidate when user clicks more to display per page
  const generateRandomCandidate = (e) => {
    updateDisplaycount(e.target.value);
    updatePageNumber(createRandomNumber);
  }


  return (
    <div className="footer-container">
      <div className="footer-row">
        <div className="col page-per-view">
          <p>Display</p>
          <select onChange={(e) => generateRandomCandidate(e)}>
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
