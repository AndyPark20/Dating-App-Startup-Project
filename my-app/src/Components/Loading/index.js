import React, {useContext} from 'react';

//import CSS (from loading io)
import './Loading.css';

import { Context } from '../App';

/*=================================================================================*/

export const LoadingBar =()=>{
  const loading = React.useContext(Context);

  return(
    <div className={loading.spinner ? 'spinner-container' : 'hidden'}>
    <div className={loading.spinner ? 'lds-facebook' : 'hidden'}><div></div><div></div><div></div></div>
    </div>
  );
};
