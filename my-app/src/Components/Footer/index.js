import React, { useContext, useEffect } from 'react';

//Import CSS
import './Footer.css';

//Import function
import { createRandomNumber } from '../../functions/api';

import Button from 'react-bootstrap/Button';

//Import Provider Context
import { Context } from '../App';

export const Footer = () => {

  const footerContext = React.useContext(Context);

  //Generate random candidate when user clicks more to display per page
  const generateRandomCandidate = (e) => {
    footerContext.updateDisplaycount(e.target.value);
    footerContext.updatePageNumber(createRandomNumber);
    footerContext.updateBtnStatus(false);
  };

  //Click thru page Number
  const flipPageNumber = () => {
    footerContext.updateBtnStatus(false);
    footerContext.updatePageNumber(footerContext.pageNumber + 1)
  };


  //Function to delete all liked candidate and update local Storage
  const wipeLikedCandidate =()=>{
    //Update Liked List Array
    footerContext.updateLikedList([]);
    //Update Localstorage
    window.localStorage.setItem("likedArray", JSON.stringify([]));
  }

  //Function to toggle between Delete All button OR Display Candidates per page
  const toggleFooter = () => {
    if (!footerContext.toggleFooter) {
      return (
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

            <p onClick={() => flipPageNumber()}>next</p>
          </div>
        </div>
      );
    }
    return (
      <div className="footer-row" onClick={() => wipeLikedCandidate()}>
        <Button type="button" variant="danger">Reject All</Button>
        <Button type="button" variant="secondary">Reset Filter</Button>
      </div>
    );
  };

  return (
    <div className="footer-container">
      {toggleFooter()}
    </div>
  );
};
