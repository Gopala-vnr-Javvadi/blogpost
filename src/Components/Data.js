import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import  "../App.css"; 
export const Data =()=>{
       
     const dogUrl = useLoaderData()
     const navigation = useNavigation()

     if(navigation.state ==="loading"){
        return <h1>Loading....</h1>
     }
    
   return  <div className=".App" >
             <img src={dogUrl}></img>
           </div>

 
     };
     export const dataLoader = async()=>{

        var res ='https://www.w3schools.com/html/pic_trulli.jpg';
        return res;
        // await fetch('https://www.w3schools.com/html/pic_trulli.jpg')
        // const dog = await res();
        // return dog.url;
    
     }
     export default Data;
