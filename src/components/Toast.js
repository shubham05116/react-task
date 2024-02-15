import React from 'react'
import { CiCircleCheck } from "react-icons/ci";


const Toast = () => {

  return (
    <div className='success'>
      <CiCircleCheck className='icon'/>
      <p className='success-toast'>User account successfully created. </p>
    </div>
  )
}

export default Toast
