import React from 'react';

//Import CSS
import './InfoHeader.css';

export const InfoHeader = () => {
  return (
    <thead>
      <tr className="header-style">
        <th></th>
        <th></th>
        <th>Full Name:</th>
        <th>Phone:</th>
        <th>Email:</th>
        <th>Business Idea:</th>
        <th>Project Duration:
             <i class="fa fa-long-arrow-up" aria-hidden="true"></i>
        </th>

        <th>Cost</th>
      </tr>
    </thead>
  );
};
