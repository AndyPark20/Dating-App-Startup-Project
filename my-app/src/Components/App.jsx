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
  //Object hold all the combined data including candidate, biz api, randomCost, and Idea
  const [combinedObject, updateCombinedObject] = useState([]);
  //Randomly Generated Candidate Api
  const [candidateApi, updateCandidateApi] = useState({});
  //Fetch Random Biz Api
  const [randomBizApi, updateRandomBizApi] = useState([]);
  //Randomly Generated Project Generation
  const [projectDuration, updateProjectDuration] = useState([]);
  //Randomly Generated RandomCost
  const [randomCost, updateRandomCost] = useState([]);
  //Generated business Idea
  const [bizIdeaList, updateBizIdeaList] = useState([]);
  //Toggle between display candidate per page and Delete all button (candidate list vs liked list)
  const [toggleFooter, updateToggleFooter] = useState(false);
  //Toggle Sort even for refresh for Duration project information
  const [toggleDurationSort, updateToggleDurationSort] = useState(false);
  //Toggle Sort even for refresh for Cost
  const [toggleCostSort, updateToggleCostSort] = useState(false);


  return (
    <Context.Provider value={{
      candidateApi, updateCandidateApi, randomBizApi, updateRandomBizApi,
      projectDuration, updateProjectDuration, randomCost, updateRandomCost, displayCount, updateDisplaycount,
      updateBtnStatus, btnStatus, updateLikedList, likedList, updateCombinedObject, combinedObject,
      updateBizIdeaList, bizIdeaList, pageNumber, updatePageNumber, toggleFooter, updateToggleFooter,
      toggleDurationSort, updateToggleDurationSort
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
                      <CandidateList />
                      <Footer />
                    </Fragment>} />
                }/>
                <Route path="/Saved" element={
                    <Fragment>
                      <LikedList />
                      <Footer />
                    </Fragment>
                  } />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </div>
    </Context.Provider >

  );
};
