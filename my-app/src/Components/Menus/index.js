import React, { useContext } from 'react';

//Import CSS
import './Menus.css'

//Import React-Router
import { Link, Router } from 'react-router-dom';

import { Context } from '../App';

export const Menus = ({ updateBtnStatus }) => {

  const menuContext = React.useContext(Context);

  return (

    <div className="container">
      <div className="row">
        <div className="menu-col">
          <Link to="/Home" ><h3 onClick={() => menuContext.updateToggleFooter(false)}>Home</h3></Link>
          <Link to="/Saved"><h3 onClick={() => menuContext.updateToggleFooter(true)}>Saved Candidates</h3></Link>
        </div>
      </div>
    </div>

  );
};
