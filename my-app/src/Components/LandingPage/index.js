import React from "react";

export const LandingPage = () => {

  const randomUserApi =()=>{
    //function to Fetch API from Random User API
    const getRandomUserApi= async () => {
      try {
        const randomUserData = await fetch("https://randomuser.me/api/?results=15");
        const dataJson = await randomUserData.json();
        console.log("dataJson", dataJson.results);
      } catch (err) {
        console.error(err);
      }
    };
    getRandomUserApi();
  }

  return <div>{randomUserApi()}</div>;
};
