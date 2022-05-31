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
  const handleSubmit=(e)=>{
    e.preventDefault();
  }

  //Record user number's input
  const userCostSearchInput =(e)=>{
    menuContext.updateUserNumberInput(e.target.value);
  }

  //Retrieve likedArray list to populate project cost less than user input
  const renderProjectCost =()=>{
    // window.localStorage.setItem('costLimit', menu)
    if(menuContext.userNumberInput){
      const candidateLimitCost = menuContext.likedList.filter(values => values.randomCost <=parseInt(menuContext.userNumberInput))
      // const candidatePassedCost= menuContext.likedList.map((values, index) => {
      //   if (values.randomCost <= parseInt(menuContext.userNumberInput)) {
      //     console.log(menuContext.likedList[index])
      //     // menuContext.updateLikedList([menuContext.likedList[index]])
      //   }
      // })
      menuContext.updateLikedList(candidateLimitCost)
    }
  }

  const renderCostLimit = () => {
    return (
      <Fragment>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <label>
            Cost Limit:
            <input type="text" onChange={(e) => userCostSearchInput(e)}></input>
          </label>
          <button type="click" onClick={()=>renderProjectCost()}>GO</button>
        </form>
      </Fragment>
    );
  }

  //function to save boolean value to render either candidate per page or Reject all button
  const toggleFooter =(e)=>{
   if(e.target.id ==='home'){
     menuContext.updateToggleFooter(false)
     window.localStorage.setItem('toggleFooter',JSON.stringify(false))
   }else{
       menuContext.updateToggleFooter(false);
       window.localStorage.setItem("toggleFooter", JSON.stringify(true));
   }

  }


  return (
    <div className="container">
      <div className="row">
        <div className="menu-col">
          <Link to="/Home" ><h3 id="home" onClick={(e) => toggleFooter(e)}>Home</h3></Link>
          <Link to="/Saved"><h4 id="saved" onClick={(e) => toggleFooter(e)}>Saved Candidates</h4></Link>
          <div className="filter-col">
            <h6 className={costLimitOn ? 'hidden' : ''} onClick={()=>updateCostLimitOn(true)}>Filter Cost</h6>
            <span className={costLimitOn ? '' : 'hidden'}>{renderCostLimit()}</span>
          </div>
        </div>
      </div>
    </div>

  );
};
