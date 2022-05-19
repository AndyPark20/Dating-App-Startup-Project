import React from "react";


//Import CSS
import './CandidateInfo.css';



export const RenderCandidate = ({ candidateApiData }) => {
  //use Map function to loop thru the userApi object
  const renderCandidates = () => {

    //First render will be an empty array. Run when data has been retrieved
    if (candidateApiData.results) {
      const invdividualCandidates = candidateApiData.results.map((values, index) => {
          return (
              <div className="candidate-info">
                <img src={values.picture.large} alt={`${values.name.first} ${values.name.last}`}/>
                <div className="candidate-name">
                  <p className="first">{values.name.first}</p>
                  <p className="last">{values.name.last}</p>
                  </div>
              </div>
          );
        }
      );
      return invdividualCandidates;
    }
  };

  return <div className="candidate-row-section">{renderCandidates()}</div>;
};
