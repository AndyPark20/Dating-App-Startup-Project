import React, { useEffect, useState } from "react";

import { fetchBizIdea } from "../../../functions/api";

//Import components
import { InfoHeader } from "../InfoHeader/index";

//Import CSS
import "./CandidateInfo.css";

//Import function
import { createRandomMonth } from "../../../functions/api/"

export const RenderCandidate = ({ candidateApiData, randomBizApi, projectDuration }) => {

  const [bizIdeaList, updateBizIdeaList] = useState([]);
  const [combinedObject, updateCombinedObject] = useState([]);

  useEffect(() => {
    /*combine all fetched data, random month, and random cost into single object so that it can be
    saved when user clicks like*/

    if (candidateApiData.results) {
      candidateApiData.results.forEach((values, index) => {
        return (
          values['durationMonth'] = projectDuration[index],
          values['bizModel'] = randomBizApi[index]
        );
      });
      updateCombinedObject(candidateApiData);
    };
  });

  //Function to render random biz ideas from randomBizApi that is passed as props from parent component
  const renderBizIdea = (index) => {
    if (Object.keys(combinedObject).length !== 0) {
      return (
        <div className="biz-model-container">
          <tr className="biz-tr-table">
            <td>{combinedObject.results[index].bizModel.this}</td>
            <td>{combinedObject.results[index].bizModel.that}</td>
            <td>{combinedObject.results[index].durationMonth}</td>
          </tr>
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
              <tr className="name-tr-table">
                <td>
                <img className="candidate-picture" src={values.picture.large} alt={`${values.name.first} ${values.name.last}`}/>
                </td>
                <td>{values.name.first} {values.name.last}</td>
                <td>
                  {renderBizIdea(index)}
                </td>
              </tr>

            </div>
          );
        }
      );
      return invdividualCandidates;
    };
  };

  return (
    <div className="candidate-row-section">
      <InfoHeader />
      {renderCandidates()}
    </div>
  );
};
