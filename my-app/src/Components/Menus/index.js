import React, { useContext, Fragment, useState } from 'react';

//Import CSS
import './Menus.css'

//Import React-Router
import { Link, Router } from 'react-router-dom';

import { Context } from '../App';

export const Menus = ({ updateBtnStatus }) => {

  const menuContext = React.useContext(Context);

  //State to keep track if user clicked on cost limit
  const [costLimitOn, updateCostLimitOn] = useState(false);


  //Prevent default
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  //Record user number's input
  const userCostSearchInput = (e) => {
    menuContext.updateUserNumberInput(e.target.value);
  }

  //Retrieve likedArray list to populate project cost less than user input
  const renderProjectCost = (e) => {
    console.log(e.target.id)
    if (menuContext.userNumberInput) {
      if (e.target.id === 'one') {
       menuContext.likedList.forEach(values => {
          if(!(values.randomCost <= parseInt(menuContext.userNumberInput))){
            values.maxLimitHide = true;

          };
        })
        menuContext.updateLikedList(menuContext.likedList);
        menuContext.updateRenderLikedList(true);
        // menuContext.updateRenderLikedList(false);


      }
      if(e.target.id ==='two') {
        //If user wants to see original saved candidate
        const retrieveOriginalLikedArray = JSON.parse(window.localStorage.getItem('likedArray'));
        console.log('RESET',retrieveOriginalLikedArray)
        retrieveOriginalLikedArray.forEach(values=>{
          values.maxLimitHide = false;
        })
        menuContext.updateLikedList(retrieveOriginalLikedArray)
       menuContext.updateRenderLikedList(true);

      }
    }
  }

  const renderCostLimit = () => {
    return (
      <Fragment>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            Cost Limit:
            <input type="text" onChange={(e) => userCostSearchInput(e)}></input>
          </label>
          <button id="one" type="click" onClick={(e) => renderProjectCost(e)}>GO</button>
          <button id="two" type="click" onClick={(e) => renderProjectCost(e)}>RESET</button>
        </form>
      </Fragment>
    );
  }

  //function to save boolean value to render either candidate per page or Reject all button
  const toggleFooter = (e) => {
    if (e.target.id === 'home') {
      menuContext.updateToggleFooter(false)
      window.localStorage.setItem('toggleFooter', JSON.stringify(false))
    } else {
      menuContext.updateToggleFooter(false);
      window.localStorage.setItem("toggleFooter", JSON.stringify(true));
    }

  }

  //function to hide filter cost functionality in home section
  const renderFilterCost = () => {
    if (window.location.pathname === '/Saved') {
        return 'filter-col';
    };
      return 'hidden';
  };


  return (
    <div className="container">
      <div className="row">
        <div className="menu-col">
          <Link to="/Home" ><h3 id="home" onClick={(e) => toggleFooter(e)}>Home</h3></Link>
          <Link to="/Saved"><h4 id="saved" onClick={(e) => toggleFooter(e)}>Saved Candidates</h4></Link>
          <div className={renderFilterCost()}>
            <h6 onClick={() => updateCostLimitOn(true)}>Filter Cost</h6>
            <span>{renderCostLimit()}</span>
          </div>
        </div>
      </div>
    </div>

  );
};
