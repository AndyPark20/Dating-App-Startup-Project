import React, { useEffect, useState } from "react";

//Import child components
import { RenderCandidate } from "./CandidateInfo";

//Import functions
import { fetchCandidateApi, fetchBizIdea } from "../../functions/api";

//Import CSS
import "./LandingPage.css";

export const LandingPage = ({ pageNumber, displayCount }) => {
  //Store object retrieved from Api fetch in order to pass down as props to child components
  const [candidateApi, updateCandidateApi] = useState({});
  const [randomBizApi, updateRandomBizApi] = useState([]);

  //Call back function to fetch api with pageNumber and displaycount Value
  useEffect(() => {
    const getRandomUserApi = async () => {
      try {
        const apiResult = await fetchCandidateApi(pageNumber, displayCount);
        if (apiResult) {
          const bizIdeaData = await Promise.all(
            apiResult.results.map(async (values, index) => {
              return fetchBizIdea();
            })
          );
          updateRandomBizApi([...bizIdeaData]);
          updateCandidateApi(apiResult);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getRandomUserApi();
  }, [displayCount, pageNumber]);

  return (
    <div className="candidate-master-container">
      <RenderCandidate
        candidateApiData={candidateApi}
        randomBizApi={randomBizApi}
      />
    </div>
  );
};
