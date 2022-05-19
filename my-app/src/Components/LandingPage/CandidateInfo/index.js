import React from "react";
import { fetchCandidateApi } from "../../../functions/api";

//Import CSS
import "./CandidateInfo.css";

export const RenderCandidate = ({ candidateApiData }) => {
  //Function to fetch Api to its this for that business idea
  const test =()=>{
  const fetchBizIdea = async () => {
    if (fetchCandidateApi) {
      const bizIdeaData = await fetch("http://itsthisforthat.com/api.php?json");
      const bizIdeaDataResult = await bizIdeaData.json();
      console.log("biz idea", bizIdeaDataResult);
    }
  };
  fetchBizIdea();
  }


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
      {test()}
    </div>
  </div>);
};
