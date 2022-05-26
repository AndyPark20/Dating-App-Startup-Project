import React, { useState, Fragment, useEffect } from 'react';

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

export const Context = React.createContext();

export const App = () => {

  //State to track liked candidates
  const [likedList, updateLikedList] = useState([]);
  //store page number for pagination feature
  const [pageNumber, updatePageNumber] = useState(createRandomNumber());
  //Store display candidates per page number
  const [displayCount, updateDisplaycount] = useState(10);
  //Toggle functionality for button to render Save or Remove
  const [btnStatus, updateBtnStatus] = useState(false);
  const [combinedObject, updateCombinedObject] = useState([]);
  //Randomly Generated Candidate Api
  const [candidateApi, updateCandidateApi] = useState({});
  //Fetch Random Biz Api
  const [randomBizApi, updateRandomBizApi] = useState([]);
  //Randomly Generated Project Generation
  const [projectDuration, updateProjectDuration] = useState([]);
  //Randomly Generated RandomCost
  const [randomCost, updateRandomCost] = useState([]);
  //Generated business Idea state
  const [bizIdeaList, updateBizIdeaList] = useState([]);



  return (
    <Context.Provider value={{
      candidateApi, updateCandidateApi, randomBizApi, updateRandomBizApi,
      projectDuration, updateProjectDuration, randomCost, updateRandomCost, displayCount, updateDisplaycount,
      updateBtnStatus,btnStatus, updateLikedList, likedList, updateCombinedObject, combinedObject,
      updateBizIdeaList, bizIdeaList, pageNumber, updatePageNumber
    }}>
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
                      <CandidateList/>
                      <Footer />
                    </Fragment>} />
                }/>
                <Route path="/Saved" element={<LikedList/>} />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </div>
    </Context.Provider >

  );
};
