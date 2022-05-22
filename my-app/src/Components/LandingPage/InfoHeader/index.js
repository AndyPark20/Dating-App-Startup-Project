import React from 'react';

//Import CSS
import './InfoHeader.css';

export const InfoHeader = ()=>{
  return(
    <div className="header-info">
          <tr>
            <th>Full Name:</th>
            <th>Business Idea:</th>
            <th>Project Completion ETA:</th>
          </tr>
    </div>
  )
}
