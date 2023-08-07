import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


function Protected({ isSignedIn, children }) {

 
  if (!(localStorage.getItem('user'))? true:false) {
    
    toast("Default Notification !");
    return( 
                <>
        <Navigate to="/" replace /> 
       
        </>
    )
  }
  return children
}
export default Protected