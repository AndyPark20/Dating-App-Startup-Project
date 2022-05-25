import React, { useState, Fragment } from 'react';

//Import CSS File
import "./App.css";

//Import Components
import { CandidateList } from './CandidateList/';
import { Menus } from './Menus';

// import { Footer } from './Footer';
import { LikedList } from './LikedList/';

//Import React-Router
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => {

  //State to track liked candidates
  const [likedList, updateLikedList] = useState([]);

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
                  <CandidateList likedList={likedList} updateLikedList={updateLikedList} />
                }/>
                <Route path="/Saved" element={<LikedList likedList={likedList} updateLikedList={updateLikedList}/>} />
              </Routes>
            </BrowserRouter>
          </div>
          </div>
        </div>
      </div>
  );
};
