import React,{useState} from 'react';

//Import components
import {InfoHeader} from '../CandidateList/InfoHeader/';



export const LikedList =({likedList})=>{

  useState(() => {
    if (likedList){
      console.log(likedList)
    }
})

  return(
    <div>
      <InfoHeader/>
    </div>
  )
}
