import React, { useState, Fragment } from 'react';

//Import CSS File
import "./App.css";

//Import Components

import { Menus } from './Menus';
import { Footer } from './Footer';
import { CandidateList } from './CandidateList';

// import { Footer } from './Footer';
import { LikedList } from './LikedList/';

//Import React-Router
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Import function
import { createRandomNumber } from '../functions/api/index';

export const App = () => {

  //State to track liked candidates
  const [likedList, updateLikedList] = useState([]);

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
          </div>
          <div className="main-section-footer-style">
            <BrowserRouter>
              <Menus />
              <Routes>
                <Route path="/Home" element={
                  <Fragment>
                    <CandidateList
                      displayCount={displayCount}
                      btnStatus={btnStatus}
                      updateBtnStatus={updateBtnStatus}
                      displayCount={displayCount}
                      updateDisplaycount={updateDisplaycount}
                      pageNumber={pageNumber}
                      updatePageNumber={updatePageNumber}
                      btnStatus={btnStatus}
                      updateBtnStatus={updateBtnStatus}
                      likedList={likedList}
                      updateLikedList={updateLikedList}
                    />
                    <Footer updateDisplaycount={updateDisplaycount} updatePageNumber={updatePageNumber} pageNumber={pageNumber} updateBtnStatus={updateBtnStatus} />
                  </Fragment>} />
                }/>
                <Route path="/Saved" element={<LikedList likedList={likedList} updateLikedList={updateLikedList} />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </div>
  );
};
