// Dashboard.js
import React, { useState, useEffect, } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import Logout from './Logout';
import BlogCard from './BlogCard';
import CreateBlog from './CreateBlog';
import axios from 'axios';
import './Dashboard.css'
import { ToastContainer, toast ,Zoom,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {urlGetBlogs,urlGetProfile} from "./Config";
const Dashboard = (props) => {
    const navigater = useNavigate();
    
    const loginName = localStorage.getItem('profileName');
    const profileEmail = localStorage.getItem('loginName');
    const token = localStorage.getItem('MyToken');
    const [blogs, setBlogsData] = useState([]);

    const [comment, setComment] = useState([null]);
    const [profile, setProfile] = useState([null]);


    const Logout = () => {
        const person = prompt("Logout Popup", "Are you want to Logout ?");
        if (person != null) {
            localStorage.clear('user');
            navigater('/Login');
        }
    }

    const CreateNewBlog = () => {
        navigater('/CreateBlog')
    }

    useEffect(() => {
       
         fetch(urlGetBlogs, {
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
                
                
                profileImage();
            })
    }, []);

    const MyBlogs = () => {
        navigater('/MyBlogs');
    }

    const MyDashboard = () => {
        navigater('/Dashboard');
    }
    const Profile = () => {
        navigater('/Profile');
    }

    const profileImage = (e) => {
        
        const GetProfile = urlGetProfile +`${encodeURIComponent(profileEmail)}`;
        fetch(GetProfile, {
            headers: {Authorization: `Bearer ${token}`}
          })
            .then(Response => { return Response.json() })
            .then(ResponseJson => {
                debugger
                setProfile(ResponseJson.imageUrl);
                localStorage.setItem('loginprofileImage', ResponseJson.imageUrl);
            }).catch((error) => {
                console.log("Error=>", error);
                if (error.response.data == "User not found") {
                    alert(error.response.data);
                }
            });

    }

    const specificBlogCard = (item) => {
        navigater('/BlogCard', { state: { data: item } });
    }
    return (
        <>
            <div className='.App' >
                <div className='container'>

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#" onClick={MyDashboard}  >Dashboard</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <a className="navbar-brand" href="#">Hi {loginName},</a>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link active" onClick={MyBlogs} aria-current="page" href="#">My Blogs</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={CreateNewBlog}>Create Blog</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle " src={profile} href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={profile} onClick={Profile} alt="" title="Click Profile" width="30" height="24" />
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <li><a className="dropdown-item" onClick={Profile} href="#">Profile</a></li>
                                            <li><a className="dropdown-item" onClick={Logout} href="#">Logout</a></li>    
                                        </ul>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>

                <h1 className='title'>All Blogs</h1>
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

export default Dashboard;