import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
    

   
   const Home =()=>{
  //  const navigate =useNavigate();
 

    
        return(

       <div className=".App">
       {/* {(localStorage.getItem('user')!='undefined') ? () :  navigate('../Login')} */}
        
          <h1>
            Hello
          
          </h1>
          <div> <Login/></div>
         

        </div>
 

    )
}

 


export default Home;