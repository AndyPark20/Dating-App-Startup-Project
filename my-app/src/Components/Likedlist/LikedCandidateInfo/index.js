import React,{useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button'


export const LikedCandidateInfo = ({ likedList, updateLikedList, combinedObject, updateCombinedObject, updateBtnStatus}) => {

  //State to track length of liked List Array for useEffect Controll
  const [count,updateCount] = useState(likedList.length);

  useEffect(()=>{
    let getLikedArray = JSON.parse(window.localStorage.getItem("likedArray"));
    if(getLikedArray){
      updateLikedList(getLikedArray)
    }
  },[count])

  // //Function to add or remove candidate from liked list array
  // const getLikedCandidate = (e) => {
  //   const selectedPhoneNumber = e.target.id;
  //   const CheckUnCheckValue = e.target.checked;

  // //   //Add or Remove Liked Candidates depending on if "like" is true or false
  //   if (e.target.textContent === 'Like') {
  //     combinedObject.results.forEach((values, index) => {
  //       if (values.phone === selectedPhoneNumber) {
  //         //Update liked candidates array
  //         const updatedToggleObj = { ...combinedObject.results[index], toggleButton: true };
  //         updateLikedList([...likedList, updatedToggleObj]);
  //         //Update liked toggleButton for all candidate list array;
  //         combinedObject.results[index].toggleButton = true;
  //         updateCombinedObject({ ...combinedObject });
  //         updateBtnStatus(true);
  //       };
  //     })
  //   } else {
  //     //Remove Candidate from Liked List
  //     likedList.forEach((candidateValues, index) => {
  //       if (selectedPhoneNumber === candidateValues.phone) {
  //         likedList.splice(index, 1)
  //         updateLikedList(likedList);

  //         //Return toggleButton back to false so that the button becomes back to "Save" (All Candidate Array);
  //         combinedObject.results.forEach((values, index) => {
  //           if (values.phone === selectedPhoneNumber) {
  //             combinedObject.results[index].toggleButton = false;
  //             const updatedToggleObj = { ...combinedObject };
  //             updateCombinedObject({ ...combinedObject });
  //           };
  //         })
  //       };
  //     })
  //   };
  // };

  //Function to delete delete card
  const deleteCard =(e,index)=>{
     if(e.target.textContent ==='Delete'){
      likedList.splice(index,1);
       updateLikedList(likedList);
       updateCount(likedList.length)
       window.localStorage.setItem("likedArray", JSON.stringify(likedList));

     };
  };

  //Render Button title
  const buttonStatus=(values)=>{
    if(values.toggleButton){
      return 'Delete'
    }
  }

  //Function to hide mos. if month is "completed" (zero)
  const hideMonth = (index) => {

    if (likedList[index].durationMonth === 'Completed') {
      return 'hidden'
    }
    return 'month'
  }


  const renderLikedCandidates = () => {

    if (likedList) {
      const likedCandidatesArray = likedList.map((values, index) => {
        return (
          <tbody>
          <tr className="name-tr-table">
            <td>
              <Button variant="primary" id={values.phone} onClick={(e)=>deleteCard(e,index)}>{buttonStatus(values)}</Button>
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
