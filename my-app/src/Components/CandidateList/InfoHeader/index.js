import React, {useContext} from 'react';

//Import CSS
import './InfoHeader.css';

//Import Context
import {Context} from '../../App';

export const InfoHeader = () => {

  const headerContext = React.useContext(Context)

  //Function to sort by shortest and longest project completion
  const sortDuration =(e)=>{
      if(e.target.className === 'fa fa-long-arrow-up customer-style'){
        const result =headerContext.likedList.sort((a,b)=>{
          if(a.durationMonth > b.durationMonth){
            return 1;
          };
          if(a.durationMonth < b.durationMonth){
            return -1;
          };
          return 0;
        })
        headerContext.updateToggleSort(true)
        headerContext.updateLikedList(result);
        return result;
      }
  }

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
             <i className="fa fa-long-arrow-up customer-style" aria-hidden="true" onClick={(e)=>sortDuration(e)}></i>
        </th>

        <th>Cost</th>
      </tr>
    </thead>
  );
};
