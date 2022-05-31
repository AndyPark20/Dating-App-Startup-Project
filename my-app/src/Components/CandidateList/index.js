import React, { useEffect, useState, useContext } from "react";

//Import child components
import { RenderCandidate } from "./CandidateInfo";

//Import functions
import { fetchCandidateApi, fetchBizIdea, createRandomMonth, createRandomNumber } from "../../functions/api/";

//Import CSS
import "./CandidateList.css";

//
import { Context } from '../App';

export const CandidateList = () => {

  const candidateListContext = React.useContext(Context);

  useEffect(() => {

    //render loading spinner
    candidateListContext.updateSpinner(true);

    const getRandomUserApi = async () => {
      try {
        //Clear project duration array everytime api is fetched.
        candidateListContext.updateCandidateApi({});
        candidateListContext.updateRandomBizApi([]);
        candidateListContext.updateProjectDuration([]);
        candidateListContext.updateRandomCost([]);

        //Call back function to fetch api with pageNumber and displaycount Value
        const candidateApiResult = await fetchCandidateApi(candidateListContext.pageNumber, candidateListContext.displayCount);
        if (candidateApiResult) {
          //fetch Random Biz Idea API
          const bizIdeaData = await Promise.all(
            candidateApiResult.results.map(async (values, index) => {

              //Create random month based on the length of populated candidate Array
              candidateListContext.updateProjectDuration(projectDuration => [...projectDuration, createRandomMonth()]);

              //Create random cost based on the length of populated candidate array
              candidateListContext.updateRandomCost(randomCost => [...randomCost, createRandomNumber()]);

              //Return data from random biz idea api
              return fetchBizIdea();
            })
          );
          candidateListContext.updateRandomBizApi([...bizIdeaData]);

          //Make a deep copy of the api result object before updating the state
          let deepCopyApiResult = JSON.parse(JSON.stringify(candidateApiResult));
          candidateListContext.updateCandidateApi(deepCopyApiResult);

          //When Loading is finished disable loading spinner
          candidateListContext.updateSpinner(false);
        };
      } catch (err) {
        console.error(err);
      };
    };
    getRandomUserApi();
  }, [candidateListContext.displayCount, candidateListContext.pageNumber]);

  return (
    <div className="candidate-master-container">
      <RenderCandidate />
    </div>
  );
};
