import React, { useEffect, useState, useContext } from 'react';

import Button from 'react-bootstrap/Button';

//confirmation modal
import { ConfirmationModal } from '../../ConfirmationModal';

import { Context } from '../../App';

import context from 'react-bootstrap/esm/AccordionContext';


export const LikedCandidateInfo = () => {

  const likedContext = React.useContext(Context)

  //State to track length of liked List Array for useEffect Controll
  const [count, updateCount] = useState(likedContext.likedList.length);
  //State to save user clicked event (e)
  const [savedE, updateE] = useState(null);
  //state to save user clicked index for delete candidate
  const [savedIndex, updateSavedIndex] = useState(null);
  //State to save candidate phone number
  const [phoneNumber, updatePhoneNumber]= useState('');


  //Render when the likedArray list gets longer
  useEffect(() => {
    //When page refreshes
    let getLikedArray = JSON.parse(window.localStorage.getItem("likedArray"));
    if (getLikedArray && !likedContext.toggleDurationSort) {

      //upate state if liked Candidate list data is available in localStorage;
      likedContext.updateLikedList(getLikedArray);

      //Get toggle sorting boolean value for both project duration and cost
      const sortDurationBooleanValue = JSON.parse(window.localStorage.getItem("durationArrowDirection"));
      const sortCostBooleanValue = JSON.parse(window.localStorage.getItem("costArrowDirection"));

      // /*Get Boolean value to retrieve boolean value for rendering Reject All button in saved Candidate
      // when user refreshes the page*/
      const rejectAllBtnBooleanValue = window.localStorage.getItem("rejectAllBooleanValue");


      //Update state if Boolean values for duration and cost is available
      likedContext.updateToggleDurationSort(sortDurationBooleanValue);
      likedContext.updateToggleCostSort(sortCostBooleanValue);

      // //Upate state to render Reject All button in saved candidates when used refreshes page
      likedContext.updateToggleFooter(rejectAllBtnBooleanValue);

      //When user comes from other page section
    } else {
      likedContext.updateLikedList(likedContext.likedList)
      window.localStorage.setItem("likedArray", JSON.stringify(likedContext.likedList));
    }
  }, [count])


  //Re-render if user clicks CONFIRM in modal to reject candidate
  useEffect(() => {

    if (likedContext.confirmReject) {
      likedContext.likedList.splice(savedIndex, 1);
      likedContext.updateLikedList(likedContext.likedList);
      updateCount(likedContext.likedList.length);

      //Update LocalStorage if candidate with limit cost array is empty
      window.localStorage.setItem("likedArray", JSON.stringify(likedContext.likedList));

      //Toggle back to false for Confirm reject to work on other candidates
      likedContext.updateConfirmReject(false);

      //Change Undo button back to Like in the Candidates Component
      if (likedContext.combinedObject.results) {
        likedContext.combinedObject.results.forEach((values, index) => {
          if (values.phone === phoneNumber) {
            likedContext.combinedObject.results[index].toggleButton = false;
            likedContext.updateCombinedObject({ ...likedContext.combinedObject });
          };
        })
      };
    };
  },[likedContext.confirmReject])


  useEffect(() => {
    likedContext.updateRenderLikedList(false);
  }, [likedContext.renderLikedList])

  //Render Only one time when the page loads so all the candidate are shown when loaded.
  useEffect(() => {
    let getLikedArray = JSON.parse(window.localStorage.getItem("likedArray"));
    getLikedArray.forEach(values => {
      values.maxLimitHide = false;
    })
    likedContext.updateLikedList(getLikedArray);
  }, [])

  //Function to delete delete card
  const deleteCard = (e, index) => {

    if (e.target.textContent === 'Reject') {
      const selectedPhoneNumber = e.target.id;
      updatePhoneNumber(selectedPhoneNumber);

      //Render Confirmation Modal for user to verify their action
      likedContext.updateRenderModal(true);

      //save user clicked event and index of the card
      updateE(e);
      updateSavedIndex(index);

      //Update Rejected Candidate information to appear on modal
      likedContext.updateRejectedCandidate(likedContext.likedList[index])
    };
  };

  //Render Button title
  const buttonStatus = (values) => {
    if (values.toggleButton) {
      return 'Reject'
    };
  };

  //Function to hide mos. if month is "completed" (zero)
  const hideMonth = (index) => {
    if (likedContext.likedList[index].durationMonth === 'Completed') {
      return 'hidden'
    };
    return 'month'
  };

  //Function to check if duration is 0
  const checkProjDuration = (values) => {
    if (values.durationMonth === 0) {
      return 'Ready';
    };
    return values.durationMonth;
  };

  //Function hide mos. if value is 0
  const hideMos = (values) => {
    if (values.durationMonth === 0) {
      return '';
    };
    return 'mos.';
  };

  const renderLikedCandidates = () => {
    if (likedContext.likedList) {
      const likedCandidatesArray = likedContext.likedList.map((values, index) => {
        if (!values.maxLimitHide) {
          return (
            <tbody>
              <tr className="name-tr-table">
                <td>
                  <Button variant="primary" id={values.phone} onClick={(e) => deleteCard(e, index)}>{buttonStatus(values)}</Button>
                </td>
                <td>
                  <img className="candidate-picture" src={values.picture.large} alt={`${values.name.first} ${values.name.last}`} />
                </td>
                <td>{`${values.name.first} ${values.name.last}`}</td>
                <td>{values.phone}</td>
                <td>{values.email}</td>
                <td>{`It's like a ${values.bizModel.that} for ${values.bizModel.this}`}</td>
                <td>{checkProjDuration(values)} <span className={hideMonth(index)}>{hideMos(values)}</span></td>
                <td>${values.randomCost}million <span className="currency">USD</span></td>
              </tr>
            </tbody>
          );
        }
      })
      return likedCandidatesArray;
    };
  };

  return (
    <React.Fragment>
      {renderLikedCandidates()}
    </React.Fragment>
  )
};
