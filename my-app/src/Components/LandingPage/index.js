import React, { useEffect, useState } from "react";

//Import child components
import { RenderCandidate } from "./CandidateInfo";

//Import functions
import { fetchCandidateApi, fetchBizIdea, createRandomMonth, createRandomNumber} from "../../functions/api";

//Import CSS
import "./LandingPage.css";

export const LandingPage = ({ pageNumber, displayCount }) => {

  //Store object retrieved from Api fetch in order to pass down as props to child components
  const [candidateApi, updateCandidateApi] = useState({});
  const [randomBizApi, updateRandomBizApi] = useState([]);
  const [projectDuration, updateProjectDuration] = useState([]);
  const [randomCost, updateRandomCost] = useState([]);

  useEffect(() => {
    const getRandomUserApi = async () => {
      try {
        //Clear project duration array everytime api is fetched.
        updateCandidateApi({});
        updateRandomBizApi([]);
        updateProjectDuration([]);
        updateRandomCost([]);

        //Call back function to fetch api with pageNumber and displaycount Value
        const candidateApiResult = await fetchCandidateApi(pageNumber, displayCount);
        if (candidateApiResult) {
          //fetch Random Biz Idea API
          const bizIdeaData = await Promise.all(
            candidateApiResult.results.map(async (values, index) => {

              //Create random month based on the length of populated candidate Array
              updateProjectDuration(projectDuration => [...projectDuration, createRandomMonth()]);

              //Create random cost based on the length of populated candidate array
              updateRandomCost(randomCost => [...randomCost, createRandomNumber()]);

              //Return data from random biz idea api
              return fetchBizIdea();
            })
          );
          updateRandomBizApi([...bizIdeaData]);

          //Make a deep copy of the api result object before updating the state
          let deepCopyApiResult = JSON.parse(JSON.stringify(candidateApiResult));
          updateCandidateApi(deepCopyApiResult);
        };
      } catch (err) {
        console.error(err);
      };
    };
    getRandomUserApi();
  }, [displayCount, pageNumber]);

  return (
    <div className="candidate-master-container">
      <RenderCandidate
        candidateApiData={candidateApi}
        projectDuration={projectDuration}
        randomBizApi={randomBizApi}
        randomCost={randomCost}
        displayCount={displayCount}
      />
    </div>
  );
};
