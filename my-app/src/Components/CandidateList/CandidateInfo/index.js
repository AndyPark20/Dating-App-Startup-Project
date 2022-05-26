import React, { useEffect, useState, useContext } from "react";
import { fetchBizIdea } from "../../../functions/api";

//Import components
import { InfoHeader } from "../InfoHeader/index";

//Import Bootstrap
import Button from 'react-bootstrap/Button';
import "./CandidateInfo.css";

//Import function
import { createRandomMonth } from "../../../functions/api/";

//Import React Context
import { Context } from '../../App';

export const RenderCandidate = () => {

  const candidateInfoContext = React.useContext(Context);

  useEffect(() => {
    if (candidateInfoContext.likedList) {
      //set LocalStorage
      window.localStorage.setItem("likedArray", JSON.stringify(candidateInfoContext.likedList));
    };

    /*combine all fetched data, random month, and random cost into single object so that it can be saved when user clicks like*/
    if (candidateInfoContext.candidateApi.results && !candidateInfoContext.btnStatus) {
      candidateInfoContext.candidateApi.results.forEach((values, index) => {
        return (
          values['durationMonth'] = candidateInfoContext.projectDuration[index],
          values['bizModel'] = candidateInfoContext.randomBizApi[index],
          values['randomCost'] = candidateInfoContext.randomCost[index],
          //value to toggle between save or remove button text
          values['toggleButton'] = false
        );
      });
      candidateInfoContext.updateCombinedObject(candidateInfoContext.candidateApi);
    };
  });

  //Function to add or remove candidate from liked list array
  const getLikedCandidate = (e) => {
    const selectedPhoneNumber = e.target.id;

    //Add or Remove Liked Candidates depending on if "like" is true or false
    if (e.target.textContent === 'Like') {
      candidateInfoContext.combinedObject.results.forEach((values, index) => {
        if (values.phone === selectedPhoneNumber) {
          //Update liked candidates array
          const updatedToggleObj = { ...candidateInfoContext.combinedObject.results[index], toggleButton: true };
          candidateInfoContext.updateLikedList([...candidateInfoContext.likedList, updatedToggleObj]);


          //Update liked toggleButton for all candidate list array;
          candidateInfoContext.combinedObject.results[index].toggleButton = true;

          candidateInfoContext.updateCombinedObject({ ...candidateInfoContext.combinedObject });
          candidateInfoContext.updateBtnStatus(true);
        };
      })
    } else {
      //Remove Candidate from Liked List
      candidateInfoContext.likedList.forEach((candidateValues, index) => {
        if (selectedPhoneNumber === candidateValues.phone) {
          candidateInfoContext.likedList.splice(index, 1)
          candidateInfoContext.updateLikedList(candidateInfoContext.likedList);


          //Return toggleButton back to false so that the button becomes back to "Save" (All Candidate Array);
          candidateInfoContext.combinedObject.results.forEach((values, index) => {
            if (values.phone === selectedPhoneNumber) {
              candidateInfoContext.combinedObject.results[index].toggleButton = false;
              const updatedToggleObj = { ...candidateInfoContext.combinedObject };
              candidateInfoContext.updateCombinedObject({ ...candidateInfoContext.combinedObject });
            };
          })
        };
      })
    };
  };


  //Function to hide mos. if month is "completed" (zero)
  const hideMonth = (index) => {
    if (candidateInfoContext.combinedObject.results[index].durationMonth === 'Completed') {
      return 'hidden';
    }
    return 'month';
  }

  //Function to render random biz ideas from randomBizApi that is passed as props from parent component
  const renderBizIdea = (index) => {
    if (Object.keys(candidateInfoContext.combinedObject).length !== 0) {
      return (
        <React.Fragment>
          <td>{`It's like a ${candidateInfoContext.combinedObject.results[index].bizModel.that} for ${candidateInfoContext.combinedObject.results[index].bizModel.this}`}</td>
          <td>{candidateInfoContext.combinedObject.results[index].durationMonth} <span className={hideMonth(index)}>mos.</span></td>
          <td>${candidateInfoContext.combinedObject.results[index].randomCost}million <span className="currency">USD</span></td>
        </React.Fragment>
      );
    };
  };

  //Render save or Remove based on user decision
  const textForSaveButton = (values) => {
    if (!values.toggleButton) {
      return 'Like';
    }
    return 'Undo';
  }

  //use Map function to loop thru the userApi object
  const renderCandidates = () => {
    //First render will be an empty array. Run when data has been retrieved
    if (candidateInfoContext.combinedObject.results) {
      const invdividualCandidates = candidateInfoContext.combinedObject.results.map(
        (values, index) => {
          return (
            // <span className="candidate-info">
            <tbody key={index}>
              <tr className="name-tr-table">
                <td>
                  <Button variant="primary" id={values.phone} onClick={(e) => getLikedCandidate(e)}>{textForSaveButton(values)}</Button>
                </td>
                <td>
                  <img className="candidate-picture" src={values.picture.large} alt={`${values.name.first} ${values.name.last}`} />
                </td>
                <td>{`${values.name.first} ${values.name.last}`}</td>
                <td>{values.phone}</td>
                <td>{values.email}</td>
                <React.Fragment>
                  {renderBizIdea(index)}
                </React.Fragment>
              </tr>
            </tbody >
          );
        }
      );
      return invdividualCandidates;
    };
  };

  return (
    <React.Fragment>
      <table className="table-styling">
        <InfoHeader />
        {renderCandidates()}
      </table>
    </React.Fragment>
  );
};
