import React, { useContext, useEffect, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import './ConfirmationModal.css';

import { Context } from '../App';

export const ConfirmationModal = () => {

  const modal = React.useContext(Context);



  //Modal button functionality
  const modalBtnFunction = (e) => {
    if (e.target.textContent === 'Confirm') {
      modal.updateConfirmReject(true);
      modal.updateRenderModal(false);
    } else {
      modal.updateRenderModal(false);
    }
  }

  //Render selected candidate information to reject
  const renderCandidate = () => {
    if (modal.rejectedCandidate.name) {
      //Destructure name object
      const { title, first, last } = modal.rejectedCandidate.name
      return (
        <Fragment>
          <span className="candidate-info">{title}.{first} {last}</span>
        </Fragment>
      )
    }
  }


  return (
    <div className={modal.renderModal ? "confirmation-modal" : "hidden"}>
      <div className="modal-row">
        <div className="modal-col">
          <p className="modal-message">Are you sure you want to delete {renderCandidate()}</p>
        </div>
        <div className="modal-col">
          <Button variant="primary" onClick={(e) => modalBtnFunction(e)}>Confirm</Button>
          <Button variant="danger" onClick={(e) => modalBtnFunction(e)}>Cancel</Button>
        </div>
      </div>
    </div>

  )
}
