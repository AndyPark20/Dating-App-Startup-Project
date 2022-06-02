import React, { useContext, Fragment } from 'react';

//Import CSS
import './InfoHeader.css';

//Import Context
import { Context } from '../../App';

/*=================================================================================*/

export const InfoHeader = () => {
  const headerContext = React.useContext(Context)

  //Function to Sort project duration and time
  const sortLikedData = (e) => {

    //get id from event for resuableability of this function
    const sortOption = e.target.id

    //Store boolean value to localstorage in order to render Reject All button if the user refreshes the page
    window.localStorage.setItem("rejectAllBooleanValue", JSON.stringify(headerContext.toggleFooter));

    if (e.target.className === 'fa fa-long-arrow-up customer-style') {
      const result = headerContext.likedList.sort((a, b) => {
        if (a[sortOption] > b[sortOption]) { return 1; };
        if (a[sortOption] < b[sortOption]) { return -1; };
        return 0;
      });
      //Control arrow direction depending on which information user wants to toggle
      if (sortOption === 'durationMonth') {
        //Save Boolean value into local storage so that the arrow is pointed correctly when user refreshes - duration
        window.localStorage.setItem("durationArrowDirection", JSON.stringify(true));
        headerContext.updateToggleDurationSort(true);
      } else if (sortOption === 'randomCost') {
        //Save Boolean value into local storage so that the arrow is pointed correctly when user refreshes - cost
        window.localStorage.setItem("costArrowDirection", JSON.stringify(true));
        headerContext.updateToggleCostSort(true);
      };

      headerContext.updateLikedList(result);
      window.localStorage.setItem("likedArray", JSON.stringify(headerContext.likedList));
      return result;

    } else {
      const result = headerContext.likedList.sort((a, b) => {
        if (a[sortOption] > b[sortOption]) { return -1; };
        if (a[sortOption] < b[sortOption]) { return 1; };
        return 0;
      })

      //Control arrow direction depending on which information user wants to toggle
      if (sortOption === 'durationMonth') {
        //Save Boolean value into local storage so that the arrow is pointed correctly when user refreshes - duration
        window.localStorage.setItem("durationArrowDirection", JSON.stringify(false));
        headerContext.updateToggleDurationSort(false);
      } else if (sortOption === 'randomCost') {
        //Save Boolean value into local storage so that the arrow is pointed correctly when user refreshes - cost
        window.localStorage.setItem("costArrowDirection", JSON.stringify(false));
        headerContext.updateToggleCostSort(false);
      }
      headerContext.updateLikedList(result);
      window.localStorage.setItem("likedArray", JSON.stringify(headerContext.likedList));

      return result;
    }
  };

  //Render arrow for Project Duration
  const projectDuration = () => {
    if (window.location.pathname === '/Saved') {
      if (!headerContext.toggleDurationSort) {
        return 'fa fa-long-arrow-up customer-style';
      };
      return 'fa fa-long-arrow-down customer-style';
    };
  };

  //Redmer arrow for Project Cost
  const sortCost = () => {
    if (window.location.pathname === '/Saved') {
      if (!headerContext.toggleCostSort) {
        return 'fa fa-long-arrow-up customer-style';
      };
      return 'fa fa-long-arrow-down customer-style';
    };
  };

  return (
    <Fragment>
      <thead>
        <tr className="header-style">
          <th></th>
          <th></th>
          <th>Full Name:</th>
          <th>Phone:</th>
          <th>Email:</th>
          <th>Business Idea:</th>
          <th>Duration:
             <i className={projectDuration()} aria-hidden="true" id="durationMonth" onClick={(e) => sortLikedData(e)}></i>
          </th>
          <th>Cost:
            <i className={sortCost()} aria-hidden="true" id="randomCost" onClick={(e) => sortLikedData(e)}></i>
          </th>
        </tr>
      </thead>
    </Fragment>

  );
};
