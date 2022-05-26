import React,{useContext} from 'react';

//Import CSS
import './Menus.css'

//Import React-Router
import {Link, Router} from 'react-router-dom';

import {Context} from '../App';

export const Menus =({updateBtnStatus})=>{

  const menuContext = React.useContext(Context);

  return(

    <div className="container">
      <div className="row">
        <div className="menu-col">
          <Link to="/Home" onClick={() =>menuContext.updateToggleFooter(false)}>Home</Link>
          <Link to="/Saved" onClick={()=>menuContext.updateToggleFooter(true)}>
            <h4>Saved Candidates</h4>
          </Link>
        </div>
      </div>
    </div>

  );
};
