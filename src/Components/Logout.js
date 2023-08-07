import React from "react";
import { useNavigate } from "react-router-dom";

const HandleLogout =()=> {
  
   const navigater = useNavigate();
   const Logout =()=>{
      
     localStorage.clear('user');
      navigater('../Login');
   }

   
      return(
          <div>
              <button onClick={Logout}>Log out</button>

          </div> 

      )
};
export default HandleLogout;