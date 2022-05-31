import React, {useContext} from 'react';

//import CSS (from loading io)
import './Loading.css';

import { Context } from '../App';

export const LoadingBar =()=>{

  const loading = React.useContext(Context)

  return(
    <div class={loading.spinner ? "lds-hourglass" : 'hidden'}></div>
  )
}
