import React, { useEffect, useState } from "react";

//Import child components
import { RenderCandidate } from "./CandidateInfo";

//Import functions
import { fetchCandidateApi, fetchBizIdea, createRandomMonth} from "../../functions/api";

//Import CSS
import "./LandingPage.css";

export const LandingPage = ({ pageNumber, displayCount }) => {
  //Store object retrieved from Api fetch in order to pass down as props to child components
  const [candidateApi, updateCandidateApi] = useState({});
  const [randomBizApi, updateRandomBizApi] = useState([]);
  const [projectDuration, updateProjectDuration] = useState([]);
  //Call back function to fetch api with pageNumber and displaycount Value
  useEffect(() => {
    const getRandomUserApi = async () => {
      try {
        const candidateApiResult = await fetchCandidateApi(pageNumber, displayCount);
        if (candidateApiResult) {
          const bizIdeaData = await Promise.all(
            candidateApiResult.results.map(async (values, index) => {
              return fetchBizIdea();
            })
          );
          updateRandomBizApi([...bizIdeaData]);

          //Make a deep copy of the api result object before updating the state
          let deepCopyApiResult = JSON.parse(JSON.stringify(candidateApiResult ));
          updateCandidateApi(deepCopyApiResult);
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
