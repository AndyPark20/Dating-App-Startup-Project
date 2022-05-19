import React, { useEffect, useState } from "react";

//Import child components
import { RenderCandidate } from "./CandidateInfo";

//Import CSS
import './LandingPage.css';



export const LandingPage = () => {
  //Store object retrieved from Api fetch in order to pass down as props to child components
  const [candidateApi, updateCandidateApi] = useState({});

  useEffect(() => {
    const getRandomUserApi = async () => {

      try {
        const randomUserData = await fetch("https://randomuser.me/api/?results=15");
        const dataJson = await randomUserData.json();
        updateCandidateApi(dataJson);

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
