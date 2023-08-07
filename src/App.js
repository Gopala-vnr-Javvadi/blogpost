import './App.css';
import React,{componentDidMount, useEffect, useState,} from 'react';
import {Outlet, Route, RouterProvider, createBrowserRouter,createRoutesFromElements } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import {Data ,dataLoader} from './Components/Data';
import Contact from './Components/Contact';
import { Link } from "react-router-dom"
import Login from './Components/Login';
import Error from './Components/Error';
import Logout from './Components/Logout';
import Protected from './Components/Protected';
import SignUp from './Components/SignUp';
import BlogCard from './Components/BlogCard';
import CreateBlog from './Components/CreateBlog';
import MyBlogs from './Components/MyBlogs';
import Profile from './Components/Profile';
import DashboardTiles from './Components/DashboardTiles';
const App =(props)=> {

   var [isSignedIn, setIsSignedIn] = useState(null)

   const signin = () => {
     setIsSignedIn((localStorage.getItem('user'))? true:false)
   }
   const signout = () => {
     setIsSignedIn((localStorage.getItem('user'))? true:false)
   }
     var routers = createBrowserRouter(
          createRoutesFromElements(
              <Route  path="/" element = {<Root/>} >
                <Route index path="/"  element={<Home/>} />
                <Route path="/Login" element= {<Login/>}/>             
                <Route path="/SignUp" element= {<SignUp/>}/>  
                <Route path="/Dashboard" element={<Protected><Dashboard /></Protected>} />
                <Route path="/Data"  element={<Protected><Data/></Protected>} loader={dataLoader}/>
                <Route path="/Contact"  element={<Contact/>}/>
                <Route path="/CreateBlog"  element={<CreateBlog/>}/>
                <Route path="/MyBlogs"  element={<MyBlogs/>}/>
                
                {/* <Route path="/Logout"  element={<Protected ><Logout/> </Protected>}/> */}
                <Route path="/BlogCard"  element={<BlogCard/>}/>
                <Route path="/Profile"  element={<Profile/>}/>
                <Route path="/DashboardTiles"  element={<DashboardTiles/>}/>
                {/* <Route path="*"  element={<Error/>}/> */}
              
              </Route> 
           )
        )
     return(
         <div >
          <center>
             <RouterProvider router={routers}/>
          </center>
         </div>
       )
}

     const Root =()=>{
         return(
            <>
            <div > 
            <ul className="nav justify-content-end">
                  <li className="nav-item">
                     <Link  to="././Login" >Login</Link> &nbsp;&nbsp;&nbsp;&nbsp;
                 </li>
           
                 <li className="nav-item">
                     <Link  to="./Dashboard" >Dashboard</Link> &nbsp;&nbsp;&nbsp;&nbsp;
                 </li>
                 {/* <li className="nav-item">
                    <Link to="/Data" >Data</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    </li> */}
                 <li className="nav-item">
                     <Link to='/Contact' >Contact</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                     </li>
                  {/* <li className="nav-item">
                     <Link to='/Logout' >Logout</Link>
                     </li> */}
               </ul>
              
              
              </div>
             
              <div>
                 <Outlet/>
              </div>
            </>
           )







// const isLoggedIn = !(localStorage.getItem('token'));
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         {isLoggedIn ? <Route exact path='/Dashboard'><Dashboard/></Route> : <Route exact path ='/login'><Login/></Route> }
        
//       </Routes>
//     </Router>
//   );
}

export default App;
