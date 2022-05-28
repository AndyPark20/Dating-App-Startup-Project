import React, { useContext, Fragment } from 'react';

//Import CSS
import './Menus.css'

//Import React-Router
import { Link, Router } from 'react-router-dom';

import { Context } from '../App';

export const Menus = ({ updateBtnStatus }) => {

  const menuContext = React.useContext(Context);

  const renderCostLimit=()=>{
    return(
      <Fragment>
      <label>Cost Limit:
      <input type="number"></input>
      </label>
      </Fragment>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="menu-col">
          <Link to="/Home" ><h3 onClick={() => menuContext.updateToggleFooter(false)}>Home</h3></Link>
          <Link to="/Saved"><h4 onClick={() => menuContext.updateToggleFooter(true)}>Saved Candidates</h4></Link>
          <div className="filter-col">
          <h6 onClick={()=>renderCostLimit()}>Filter Cost</h6>
  <span>{renderCostLimit()}</span>
          </div>
        </div>
      </div>
    </div>

  );
};
