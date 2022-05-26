import React, { useState } from 'react';

//Import components
import { InfoHeader } from '../CandidateList/InfoHeader/';
import { LikedCandidateInfo } from '../LikedList/LikedCandidateInfo/';



export const LikedList = () => {

  return (
    <React.Fragment>
      <div className="candidate-master-container">
        <table className="table-styling">
          <InfoHeader />
          <LikedCandidateInfo/>
        </table>
      </div>
    </React.Fragment>


  )
}
