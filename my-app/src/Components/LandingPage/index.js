import React, { useEffect, useState } from "react";

//Import child components
import { RenderCandidate } from "./CandidateInfo";


//Import functions
import { fetchCandidateApi } from "../../functions/api";

//Import CSS
import './LandingPage.css';



export const LandingPage = ({ pageNumber, displayCount }) => {
  //Store object retrieved from Api fetch in order to pass down as props to child components
  const [candidateApi, updateCandidateApi] = useState({});

  useEffect(() => {
    const getRandomUserApi = async () => {
      try {
        const apiResult = await fetchCandidateApi(displayCount);
        updateCandidateApi(apiResult);
      } catch (err) {
        console.error(err);
      }
    };
    getRandomUserApi();
  }, [displayCount]);

  return (
    <div className="candidate-master-container">
      <RenderCandidate candidateApiData={candidateApi} />
    </div>
  );
};
