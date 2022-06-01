import React,{useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import './ConfirmationModal.css';

import { Context } from '../App';

export const ConfirmationModal =()=>{

  const modal = React.useContext(Context);

  //Modal button functionality
  const modalBtnFunction =(e)=>{
    if(e.target.textContent ==='Confirm'){
      modal.updateConfirmReject(true);
      modal.updateRenderModal(false);
    }else{
      modal.updateRenderModal(false);
    }
  }


  return(
    <div className={modal.renderModal ? "confirmation-modal" : "hidden"}>
      <Button variant="primary" onClick={(e)=>modalBtnFunction(e)}>Confirm</Button>
      <Button variant="danger" onClick={(e)=>modalBtnFunction(e)}>Cancel</Button>
    </div>
  )
}
