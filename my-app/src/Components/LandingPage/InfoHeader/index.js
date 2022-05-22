import React from 'react';

//Import CSS
import './InfoHeader.css';

export const InfoHeader = ()=>{
  return(
    <thead>
          <tr>
            <th></th>
            <th>Full Name:</th>
            <th>Phone:</th>
            <th>Email:</th>
            <th>Business Idea:</th>
            <th>Project Completion ETA:</th>
            <th>Cost</th>
          </tr>
    </thead>
  )
}
