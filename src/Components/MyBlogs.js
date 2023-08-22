// Dashboard.js
import React, { useState, useEffect, } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import Logout from './Logout';
import BlogCard from './BlogCard';
import CreateBlog from './CreateBlog';
import axios from 'axios';
import { useContext } from 'react';
import {urlGetMyBlogs}  from "./Config";
const MyBlogs = () => {
    const navigater = useNavigate();
    const profileName = localStorage.getItem('profileName');
    const loginName = localStorage.getItem('loginName');
    const [blogs, setBlogsData] = useState([]);
    const [comment, setComment] = useState([null]);
    const token = localStorage.getItem('MyToken');
    const profileImage = localStorage.getItem('loginprofileImage');
    

   

    const CreateNewBlog = () => {
        navigater('/CreateBlog')
    }


    useEffect(() => {
        const getMyBlogs = urlGetMyBlogs +`${encodeURIComponent(loginName)}`;
        fetch(getMyBlogs, {
            headers: {Authorization: `Bearer ${token}`}
          })
            .then(Response => { return Response.json() })
            .then(ResponseJson => {
                setBlogsData(ResponseJson)
                ResponseJson.forEach(element => {
                    if(element.title.length >10){
                        element.title = element.title.substring(0, 10) + "......";
                    }
                    if (element.content.length > 25)
                        element.content = element.content.substring(0, 25) + "......";
                });

            })
    }, []);
     
    const BackToDashBoard =()=>{
        navigater('/Dashboard');

    }  
    const MyDashboard =()=>{
        navigater('/Dashboard');
    }  
    
    const Profile = () => {
        navigater('/Profile');
    }
    const Logout = () => {
        const person = prompt("Logout Popup", "Are you want to Logout ?");
        if (person != null) {
            localStorage.clear('user');
            navigater('/Login');
        }
    }
    const specificBlogCard = (item) => {
        navigater('/BlogCard', { state: { data: item } });

    }
    return (
        <>
            <div className='.App' >
                <div className='container'>

                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#"  onClick={MyDashboard}  >Dashboard</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <a class="navbar-brand" href="#">Hi {profileName},</a>
                            <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" onClick={BackToDashBoard} href="#">Go Back</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#" onClick={CreateNewBlog}>Create Blog</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#" onClick={Logout}>Logout</a>
                                    </li>
                                    {/* <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle " href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown link
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li> */}
                                    {/* <li class="nav-item float-end">
          <a class="nav-link" href="#"><a class="nav-link" href="#"> <img src="..." class="rounded-circle" alt="..."></img></a></a>
        </li> */}
                                     <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle " src={profileImage} href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={profileImage} onClick={Profile} alt="" title="Click Profile" width="30" height="24" />
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <li><a className="dropdown-item" onClick={Profile} href="#">Profile</a></li>
                                            <li><a className="dropdown-item" onClick={Logout} href="#">Logout</a></li>    
                                        </ul>
                                    </li>
                                    {/* <nav class="nav navbar-nav navbar-right">
                                        <div class="container">
                                            <a class="navbar-brand" href="#">
                                                <img src={profileImage} alt="" width="30" height="24" />
                                            </a>
                                        </div>
                                    </nav> */}

                                </ul>
                            </div>
                        </div>
                    </nav>


                    <h1 className='title'>My Blogs</h1>
                    <div className='cards'>
                        {
                            blogs.map((item, i) => (

                                <div key={i} className='carde' onClick={() => specificBlogCard(item)}>
                                    <img src={item.image} className="carde-img-top ImageBlog" alt="..." />
                                    <div className='carde-title'><h3>{item.title}</h3></div>
                                    <div className='carde-content'><p>{item.content}</p></div>
                                    <div className='carde-btn'>
                                        <button className='btn' onClick={() => specificBlogCard(item)}>Explore</button>

                                    </div>
                                </div>
                            ))
                        }
                    </div>

                       
                   
                </div>
            </div>
        </>
    );
};

export default MyBlogs;