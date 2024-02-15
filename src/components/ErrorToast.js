import React from 'react'
import { RxCrossCircled } from "react-icons/rx";

const ErrorToast = () => {
  return (
    <div className='error'>
      <RxCrossCircled className='icon'/>
      <p className='error-toast'>There was an error creating the account.
 </p>

    </div>
  )
}

export default ErrorToast
