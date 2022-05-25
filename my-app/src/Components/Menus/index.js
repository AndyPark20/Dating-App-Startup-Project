import React from 'react';

//Import CSS
import './Menus.css'

//Import React-Router
import {Link, Router} from 'react-router-dom';

export const Menus =({updateBtnStatus})=>{
  return(

    <div className="container">
      <div className="row">
        <div className="menu-col">
          <Link to="/Home" onClick={()=>console.log('HELLO SIR!')}>Home</Link>
          <Link to="/Saved">
            <h4>Saved Candidates</h4>
          </Link>
        </div>
      </div>
    </div>

  );
};
