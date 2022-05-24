import React, { useEffect, useState } from "react";

import { fetchBizIdea } from "../../../functions/api";

//Import components
import { InfoHeader } from "../InfoHeader/index";

//Import CSS
import "./CandidateInfo.css";

//Import Bootstrap
import Button from 'react-bootstrap/Button'


//Import function
import { createRandomMonth } from "../../../functions/api/"

export const RenderCandidate = ({ candidateApiData, randomBizApi, projectDuration, randomCost }) => {

  const [bizIdeaList, updateBizIdeaList] = useState([]);
  const [combinedObject, updateCombinedObject] = useState([]);
  const [likedList, updateLikedList] = useState([]);

  useEffect(() => {
    console.log('candidate', combinedObject)
    /*combine all fetched data, random month, and random cost into single object so that it can be saved when user clicks like*/
    if (candidateApiData.results && combinedObject.length ===0) {
      candidateApiData.results.forEach((values, index) => {
        return (
          values['durationMonth'] = projectDuration[index],
          values['bizModel'] = randomBizApi[index],
          values['randomCost'] = randomCost[index],
          //value to toggle between save or remove button text
          values['toggleButton'] = false
        );
      });
      updateCombinedObject(candidateApiData);
    };
  });

  //Function to add or remove candidate from liked list array
  const getLikedCandidate = (e) => {
    const selectedPhoneNumber = e.target.id;
    const CheckUnCheckValue = e.target.checked;

    //Add or Remove Liked Candidates depending on if "like" is true or false
    if (e.target.textContent === 'Save') {
      combinedObject.results.forEach((values, index) => {
        if (values.phone === selectedPhoneNumber) {
          const updatedToggleObj = { ...combinedObject.results[index], toggleButton: true };
          updateLikedList([...likedList, updatedToggleObj]);
          combinedObject.results[index].toggleButton = true;
          updateCombinedObject({ ...combinedObject, toggledButton:true });
        };
      })
    } else {
      //Remove Candidate from Liked List
      likedList.forEach((candidateValues, index) => {
        if (selectedPhoneNumber === candidateValues.phone) {
          likedList.splice(index, 1)
          updateLikedList(likedList);
        };
      })
      //Return toggleButton back to false so that the button becomes back to "Save";
      combinedObject.results.forEach((values, index) => {
        if (values.phone === selectedPhoneNumber) {
          const updatedToggleObj = { ...combinedObject.results[index], toggleButton: false };
          updateLikedList([...likedList, updatedToggleObj]);
        };
      })
    }
  };



//Function to hide mos. if month is "completed" (zero)
const hideMonth = (index) => {
  if (combinedObject.results[index].durationMonth === 'Completed') {
    return 'hidden'
  }
  return 'month'
}

//Function to render random biz ideas from randomBizApi that is passed as props from parent component
const renderBizIdea = (index) => {
  if (Object.keys(combinedObject).length !== 0) {
    return (
      <React.Fragment>
        <td>{`It's like a ${combinedObject.results[index].bizModel.that} for ${combinedObject.results[index].bizModel.this}`}</td>
        <td>{combinedObject.results[index].durationMonth} <span className={hideMonth(index)}>mos.</span></td>
        <td>${combinedObject.results[index].randomCost}million <span className="currency">USD</span></td>
      </React.Fragment>
    );
  };
};

//Render save or Remove based on user decision
const textForSaveButton = (values) => {
  if (!values.toggleButton) {
    return 'Save';
  }
  return 'Remove';
}

//use Map function to loop thru the userApi object
const renderCandidates = () => {
  //First render will be an empty array. Run when data has been retrieved
  if (combinedObject.results) {
    const invdividualCandidates = combinedObject.results.map(
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
