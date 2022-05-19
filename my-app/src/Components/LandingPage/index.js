import React, { useEffect, useState } from "react";

//Import child components
import { RenderCandidate } from "./CandidateInfo";




export const LandingPage = () => {
  //Store object retrieved from Api fetch in order to pass down as props to child components
  const [userApi, updateUserApi] = useState({});

  useEffect(() => {
    const getRandomUserApi = async () => {

      try {
        const randomUserData = await fetch("https://randomuser.me/api/?results=15");
        const dataJson = await randomUserData.json();
        updateUserApi(dataJson);

      } catch (err) {
        console.error(err);
      }
    };
    getRandomUserApi();
  },[]);

  return (
    <div>
      <RenderCandidate userApiData={userApi} />
    </div>
  );
};
