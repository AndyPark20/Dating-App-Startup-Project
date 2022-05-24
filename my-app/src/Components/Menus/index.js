import React from 'react';

//Import CSS
import './Menus.css'

//Import React-Router
import {Link, Router} from 'react-router-dom';

export const Menus =()=>{
  return(

    <div className="container">
      <div className="row">
        <div className="menu-col">
          <Link to="/Home">
            <h4>Home</h4>
          </Link>
          <Link to="/Saved">
            <h4>Saved Candidates</h4>
          </Link>
        </div>
      </div>
    </div>

  );
};
