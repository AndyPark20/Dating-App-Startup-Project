import React, { useContext } from 'react';

//Import CSS
import './InfoHeader.css';

//Import Context
import { Context } from '../../App';

export const InfoHeader = () => {

  const headerContext = React.useContext(Context)


  //Function to sort by shortest and longest project completion
  const sortLikedData = (e) => {
    //get id from event for resuableability of this function
    const sortOption = e.target.id
    console.log(e.target.id)
    if (e.target.className === 'fa fa-long-arrow-up customer-style') {
      const result = headerContext.likedList.sort((a, b) => {

        if (a[sortOption] > b[sortOption]) { return 1; };
        if (a[sortOption] < b[sortOption]) { return -1; };
        return 0;
      });
      //Control arrow direction depending on which information user wants to toggle
      if (sortOption === 'durationMonth') {
        headerContext.updateToggleDurationSort(true);
      }else if (sortOption === 'randomCost'){
        headerContext.updateToggleCostSort(true);
      };

      headerContext.updateLikedList(result);
      window.localStorage.setItem("likedArray", JSON.stringify(headerContext.likedList));
      return result;
    } else {
      const result = headerContext.likedList.sort((a, b) => {
        if (a[sortOption] > b[sortOption]) {return -1;};
        if (a[sortOption] < b[sortOption]) {return 1;};
        return 0;
      })

      //Control arrow direction depending on which information user wants to toggle
      if (sortOption === 'durationMonth') {
        headerContext.updateToggleDurationSort(false);
      } else if (sortOption === 'randomCost') {
        headerContext.updateToggleCostSort(false);
      }
      headerContext.updateLikedList(result);
      window.localStorage.setItem("likedArray", JSON.stringify(headerContext.likedList));
      return result;
    }
  };

  //Render arrow for Project Duration
  const projectDuration = () => {
    if (!headerContext.toggleDurationSort) {
      return 'fa fa-long-arrow-up customer-style';
    };
    return 'fa fa-long-arrow-down customer-style';
  };

  //Redmer arrow for Project Cost
  const sortCost = () => {
    if(!headerContext.toggleCostSort){
      return 'fa fa-long-arrow-up customer-style';
    };
    return 'fa fa-long-arrow-down customer-style';
  };

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
             <i className={projectDuration()} aria-hidden="true" id="durationMonth" onClick={(e) => sortLikedData(e)}></i>
        </th>
        <th>Cost:
            <i className={sortCost()} aria-hidden="true" id="randomCost" onClick={(e) => sortLikedData(e)}></i>
        </th>
      </tr>
    </thead>
  );
};
