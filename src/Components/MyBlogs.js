// Dashboard.js
import React, { useState, useEffect, } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import Logout from './Logout';
import BlogCard from './BlogCard';
import CreateBlog from './CreateBlog';
import axios from 'axios';
import { useContext } from 'react';

const MyBlogs = () => {
    const navigater = useNavigate();
    const loginName = localStorage.getItem('loginName');
    const [blogs, setBlogsData] = useState([]);
    const [comment, setComment] = useState([null]);


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
    //  const emailId =  {BlogId:item.blogId};
        const apiUrlGetBlogs = `https://localhost:7086/api/BlogPosts/MyBlogs?email=${encodeURIComponent(loginName)}`;
        fetch(apiUrlGetBlogs)
            .then(Response => { return Response.json() })
            .then(ResponseJson => {
                setBlogsData(ResponseJson)
            })
    }, []);
     
    const BackToDashBoard =()=>{
        navigater('/Dashboard');

    }  
    const MyDashboard =()=>{
        navigater('/Dashboard');
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

                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#"  onClick={MyDashboard}  >Dashboard</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <a class="navbar-brand" href="#">Hi {loginName},</a>
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
                                    <nav class="nav navbar-nav navbar-right">
                                        <div class="container">
                                            <a class="navbar-brand" href="#">
                                                <img src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" />
                                            </a>
                                        </div>
                                    </nav>

                                </ul>
                            </div>
                        </div>
                    </nav>


                    <h1 className='title'>All Blogs</h1>
                    <div>
                        {/* <div className='float'><CreateBlog/>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  <div className='float-end'><Logout/></div><br/><br/> */}
                    </div>


                    <tbody>{
                        blogs.map((item) => (

                            <div className="card mx-auto" onClick={() => specificBlogCard(item)}  >
                                <img src={item.image} width={50} height={100} className="card-img-top ImageBlog" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text"  >{item.content}</p>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        ))
                    }
                    </tbody>
                </div>
            </div>
        </>
    );
};

export default MyBlogs;