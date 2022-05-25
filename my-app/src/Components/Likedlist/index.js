import React,{useState} from 'react';

//Import components
import {InfoHeader} from '../CandidateList/InfoHeader/';
import {LikedCandidateInfo} from '../LikedList/LikedCandidateInfo/';



export const LikedList =({likedList, updateLikedList})=>{

  return(
    <React.Fragment>
      <table>
      <InfoHeader />
      <LikedCandidateInfo likedList={likedList} updateLikedList={updateLikedList}/>
      </table>
    </React.Fragment>


  )
}
