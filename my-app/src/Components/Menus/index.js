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
    if (menuContext.userNumberInput) {
      if (e.target.id === 'go') {
       menuContext.likedList.forEach(values => {
          if(!(values.randomCost <= parseInt(menuContext.userNumberInput))){
            values.maxLimitHide = true;
          };
        })
        menuContext.updateLikedList(menuContext.likedList);
        menuContext.updateRenderLikedList(true);
      }

      if(e.target.id ==='reset') {
        //If user wants to see original saved candidate
        const retrieveOriginalLikedArray = JSON.parse(window.localStorage.getItem('likedArray'));
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
          <button id="go" type="click" onClick={(e) => renderProjectCost(e)}>GO</button>
          <button id="reset" type="click" onClick={(e) => renderProjectCost(e)}>RESET</button>
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
    };
  };

  //function to hide filter cost functionality in home section
  const renderFilterCost = () => {
    if (window.location.pathname === '/Saved') {
        return 'filter-col';
    };
      return 'hidden';
  };

  //Function to toggle cost limit search
  const toggleCostLimitSearch=()=>{
    if(costLimitOn){
      updateCostLimitOn(false);
    }else{
      updateCostLimitOn(true);
    }

  }


  return (
    <div className="container">
      <div className="row">
        <div className="menu-col">
          <Link to="/Home" ><h4 id="home" onClick={(e) => toggleFooter(e)}>Home</h4></Link>
          <Link to="/Saved"><h4 id="saved" onClick={(e) => toggleFooter(e)}>Saved Candidates</h4></Link>
          <div className={renderFilterCost()}>
            <h4 onClick={() => toggleCostLimitSearch()}>Filter Cost</h4>
            <span className={costLimitOn ? '' : 'hidden'}>{renderCostLimit()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
