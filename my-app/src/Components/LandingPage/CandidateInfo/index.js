import React, { useEffect, useState } from "react";
import { fetchBizIdea } from "../../../functions/api";

//Import CSS
import "./CandidateInfo.css";

export const RenderCandidate = ({ candidateApiData }) => {
  const [bizIdeaList, updateBizIdeaList] = useState([]);

  //call FetchBizIdea function at the first render to store data object within useState
  useEffect(() => {
    const fetchBizData = async () => {
      try {
        if (candidateApiData.results) {
          const bizIdeaData = await Promise.all(
            candidateApiData.results.map(async (values, index) => {
              return fetchBizIdea();
            })
          );
          updateBizIdeaList([...bizIdeaData]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBizData();
  }, [candidateApiData]);

  //Function to render random biz ideas from bizIdeaList state
  const renderBizIdea = (index)=>{
    if(bizIdeaList.length >0){
      // console.log(bizIdeaList[index].this);
      return (
        <div>
          <p>{bizIdeaList[index].this}</p>
          <p>{bizIdeaList[index].that}</p>
        </div>
      );
    };

  };

  //use Map function to loop thru the userApi object
  const renderCandidates = () => {
    //First render will be an empty array. Run when data has been retrieved
    if (candidateApiData.results) {
      const invdividualCandidates = candidateApiData.results.map(
        (values, index) => {
          return (
            <div className="candidate-info">
              <img
                src={values.picture.large}
                alt={`${values.name.first} ${values.name.last}`}
              />
              <div className="candidate-name">
                <p className="first">{values.name.first}</p>
                <p className="last">{values.name.last}</p>
                <p className="biz-idea">
                  {renderBizIdea(index)}
                </p>
              </div>
            </div>
          );
        }
      );
      return invdividualCandidates;
    }
  };

  return (
    <div className="candidate-row-section">
      {renderCandidates()}
      <div></div>
    </div>
  );
};
