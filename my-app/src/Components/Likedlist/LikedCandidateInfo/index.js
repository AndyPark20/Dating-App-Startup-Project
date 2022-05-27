import React, { useEffect, useState, useContext } from 'react';

import Button from 'react-bootstrap/Button';

import { Context } from '../../App';


export const LikedCandidateInfo = () => {

  const likedContext = React.useContext(Context)

  //State to track length of liked List Array for useEffect Controll
  const [count, updateCount] = useState(likedContext.likedList.length);

  // toggleSort, updateToggleSort
  useEffect(() => {
    let getLikedArray = JSON.parse(window.localStorage.getItem("likedArray"));

    if (getLikedArray && !likedContext.toggleSort) {
      likedContext.updateLikedList(getLikedArray)
    }else{
      likedContext.updateLikedList(likedContext.likedList)
      window.localStorage.setItem("likedArray", JSON.stringify(likedContext.likedList));
    }
  }, [count])



  //Function to delete delete card
  const deleteCard = (e, index) => {
    const selectedPhoneNumber = e.target.id;
    if (e.target.textContent === 'Reject') {
      likedContext.likedList.splice(index, 1);
      likedContext.updateLikedList(likedContext.likedList);
      updateCount(likedContext.likedList.length);

      //Update LocalStorage
      window.localStorage.setItem("likedArray", JSON.stringify(likedContext.likedList));

      //Change Undo button back to Like in the Candidates Component
      if(likedContext.combinedObject.results){
        likedContext.combinedObject.results.forEach((values, index) => {
          if (values.phone === selectedPhoneNumber) {
            likedContext.combinedObject.results[index].toggleButton = false;
            const updatedToggleObj = { ...likedContext.combinedObject };
            likedContext.updateCombinedObject({ ...likedContext.combinedObject });
          };
        })
      };
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


  const renderLikedCandidates = () => {

    if (likedContext.likedList) {
      const likedCandidatesArray = likedContext.likedList.map((values, index) => {
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
              <td>{values.durationMonth} <span className={hideMonth(index)}>mos.</span></td>
              <td>${values.randomCost}million <span className="currency">USD</span></td>
            </tr>
          </tbody>
        );
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
