import React, { useEffect, useState } from "react";
import { fetchBizIdea } from "../../../functions/api";

//Import CSS
import "./CandidateInfo.css";

//Import function
import { createRandomMonth } from "../../../functions/api/"

export const RenderCandidate = ({ candidateApiData, randomBizApi,projectDuration }) => {

  const [bizIdeaList, updateBizIdeaList] = useState([]);
  const [combinedObject, updateCombinedObject] = useState([]);

  useEffect(()=>{
    //combine all fetched data, random month, and random cost into single object
    if(candidateApiData.results){
      candidateApiData.results.forEach((values, index) => {
        return(
          values['durationMonth'] = projectDuration[index],
          values['bizModel'] = randomBizApi[index]
        )

      })
     updateCombinedObject(candidateApiData);
    }

  })

  //Function to render random biz ideas from randomBizApi that is passed as props from parent component
  const renderBizIdea = (index)=>{
    console.log('comvinedOBject',combinedObject.results[index])
    if (Object.keys(combinedObject).length !==0) {
      console.log('object',combinedObject)
      return (
        <div>
          <span>{combinedObject.results[index].bizModel.this}</span>
          <span>{combinedObject.results[index].bizModel.that}</span>
          <span>{combinedObject.results[index].durationMonth}</span>
        </div>
      );
    };

  };

  //use Map function to loop thru the userApi object
  const renderCandidates = () => {
    //First render will be an empty array. Run when data has been retrieved
    if (combinedObject.results) {
      const invdividualCandidates = combinedObject.results.map(
        (values, index) => {
          return (
            <div className="candidate-info">
              <img
                src={values.picture.large}
                alt={`${values.name.first} ${values.name.last}`}
              />
              <div className="candidate-name">
                <p className="first">{values.name.first}</p>
                <p className="last">{values.name.last}</p>
                <span className="biz-idea">
                  {renderBizIdea(index)}
                </span>
          <span className="project-month"></span>
              </div>
            </div>
          );
        }
      );
      return invdividualCandidates;
    }
  };

  return (
    <div className="candidate-row-section">
      {renderCandidates()}
      <div></div>
    </div>
  );
};
