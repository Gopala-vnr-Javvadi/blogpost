// Dashboard.js
import React, { useState, useEffect, } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import Logout from './Logout';
import BlogCard from './BlogCard';
import CreateBlog from './CreateBlog';
import axios from 'axios';
import { useContext } from 'react';

const Dashboard = (props) => {
    const navigater = useNavigate();
    const loginName = localStorage.getItem('loginName').split('@')[0];
    const profileEmail = localStorage.getItem('loginName');
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
        const apiUrlGetBlogs = "https://localhost:7086/api/BlogPosts";
        fetch(apiUrlGetBlogs)
            .then(Response => { return Response.json() })
            .then(ResponseJson => {
                setBlogsData(ResponseJson)
                ResponseJson.forEach(element => {
                    if(element.content.length > 55)
                    element.content = element.content.substring(0,50) +"......";
                });
               
                profileImage();
            })
    }, []);
    
    const MyBlogs=()=>{
        navigater('/MyBlogs');
    }

    const MyDashboard =()=>{
        navigater('/Dashboard');
    }
    const Profile =()=>{
        navigater('/Profile');
    }

    const profileImage =(e)=>{
        debugger
        const apiUrlGetBlogs = `https://localhost:7086/api/BlogPosts/MyProfile?email=${encodeURIComponent(profileEmail)}`;
        fetch(apiUrlGetBlogs)
            .then(Response => { return Response.json() })
            .then(ResponseJson => {
                debugger
                setProfile(ResponseJson.imageUrl);
                localStorage.setItem('loginprofileImage',ResponseJson.imageUrl);
            }).catch((error) => {
             console.log("Error=>", error);
                if (error.response.data == "User not found") {
                    alert(error.response.data);
                  }
                });
                
            }
    
    

    const specificBlogCard = (item) => {
        // const BlogId =  {BlogId:item.blogId};
        // const apiUrlComments = `https://localhost:7086/api/BlogPosts/GetComments?BlogId=${encodeURIComponent(BlogId.BlogId)}`;   
        // fetch(apiUrlComments)
        // .then(Response =>{return Response.json()})
        // .then(ResponseJson =>{
        //     setComment(ResponseJson)
        // })
        navigater('/BlogCard', { state: { data: item } });

    }
    return (
        <>
            <div className='.App' >
                <div className='container'>

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#"  onClick={MyDashboard}  >Dashboard</a>
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
                                    {/* <li class="nav-item">
                                        <a class="nav-link" href="#" onClick={Logout}>Logout</a>
                                    </li> */}
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle " src={profile}  href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={profile} onClick={Profile} alt="" title="Click Profile" width="30" height="24" />
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <li><a className="dropdown-item" onClick={Profile} href="#">Profile</a></li>
                                            <li><a className="dropdown-item" onClick={Logout} href="#">Logout</a></li>
                                            {/* <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                                        </ul>
                                    </li>
                                    {/* <li class="nav-item float-end">
          <a class="nav-link" href="#"><a class="nav-link" href="#"> <img src="..." class="rounded-circle" alt="..."></img></a></a>
        </li> */}                  
                                   {/* <li class="nav-item">
                                        <a class="nav-link" href="#" onClick={Profile}>Profile</a>
                                    </li> */}
                                    {/* <nav class="nav navbar-nav navbar-right">
                                        <div class="container">
                                            <a class="navbar-brand" href="#">
                                                <img src={profile} onClick={Profile} alt="" title="Click Profile" width="30" height="24" />
                                            </a>
                                        </div>
                                    </nav> */}

                                </ul>
                            </div>
                        </div>
                    </nav>


                    <h1 className='title'>All Blogs</h1>
                    <div>
                        {/* <div className='float'><CreateBlog/>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  <div className='float-end'><Logout/></div><br/><br/> */}
                    </div>
               
                    <div className='cards'>
                {
                blogs.map((item,i)=>(
               
                //  <div key={i} className='card' onClick={() => specificBlogCard(item)}>
                //      <img src={item.image}  className="card-img-top ImageBlog" alt="..." />
                //      <div className='card-title'><h3>{item.title}</h3></div>
                //       <div className='card-content'><p>{item.content}</p></div>
                //       <div className='card-btn'>
                //      <button className='btn' onClick={() => specificBlogCard(item)}>Explore</button>

                //       </div>
                //  </div>

  <div  key={i} className="card" style={{width:"18rem"}}>
  <img src={item.image} className="card-img-top" alt="..."/>
  <div className="card-body">
  <h5 className="card-title">{item.title}</h5>
  <p className="card-text">{item.content}</p>
  <button className='btn btn-primary' onClick={() => specificBlogCard(item)}>Explore</button>
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