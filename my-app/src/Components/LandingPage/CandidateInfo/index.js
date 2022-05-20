import React, {useEffect,useState} from "react";
import { fetchBizIdea} from "../../../functions/api";

//Import CSS
import "./CandidateInfo.css";

export const RenderCandidate = ({ candidateApiData }) => {

  useEffect(() => {
    if (candidateApiData.results) {
      candidateApiData.results.forEach(async (values, index) => {
        console.log(fetchBizIdea())
        // return fetchBizIdea();
      });

    }
  })








  //use Map function to loop thru the userApi object
  const renderCandidates = () => {
    //First render will be an empty array. Run when data has been retrieved
    if (candidateApiData.results) {

      const invdividualCandidates = candidateApiData.results.map((values, index) => {
          return (
            <div className="candidate-info">
              <img
                src={values.picture.large}
                alt={`${values.name.first} ${values.name.last}`}
            />
              <div className="candidate-name">
                <p className="first">{values.name.first}</p>
                <p className="last">{values.name.last}</p>
                <p className="biz-idea"></p>
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
    <div>

    </div>
  </div>);
};
