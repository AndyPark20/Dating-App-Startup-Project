import React, { useEffect, useState } from "react";

//Import child components
import { RenderCandidate } from "./CandidateInfo";

//Import functions
import { fetchCandidateApi } from "../../functions/api";

//Import CSS
import './LandingPage.css';



export const LandingPage = () => {
  //Store object retrieved from Api fetch in order to pass down as props to child components
  const [candidateApi, updateCandidateApi] = useState({});

  useEffect(() => {
    const getRandomUserApi = async () => {

      try {
        const apiResult = await fetchCandidateApi()
        updateCandidateApi(apiResult);

      } catch (err) {
        console.error(err);
      }
    };
    getRandomUserApi();
  },[]);

  return (
    <div className="candidate-master-container">
      <RenderCandidate candidateApiData={candidateApi} />
    </div>
  );
};
