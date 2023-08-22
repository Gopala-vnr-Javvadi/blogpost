import './BlogCard.css';
import { useLocation } from 'react-router-dom';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import {urlGetBlogId,urlGetComments,urlCreateComment} from "./Config";

const BlogCard = (props) => {
    const navigater = useNavigate();

    const loginName = localStorage.getItem('loginName').split('@')[0];
    const emailID = localStorage.getItem('loginName');
    const token = localStorage.getItem('MyToken');
    const loginProfile = localStorage.getItem('loginprofileImage');
    const location = useLocation();
    const [comm, setComm] = useState([]);
    const [count, setCount] = useState('');
    console.log(location.state)
    const item = location.state.data;
    const [dashboard, setDashboard] = useState([]);
    const [comment, setcomment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const Logout = () => {
        const person = prompt("Logout Popup", "Are you want to Logout ?");
        if (person != null) {
            localStorage.clear('user');
            navigater('/Login');
        }
    }
    const MyBlogs = () => {
        navigater('/MyBlogs');
    }
    const CreateNewBlog = () => {
        navigater('/CreateBlog')
    }

    const MyDashboard = () => {
        navigater('/Dashboard');
    }
    const Profile = () => {
        navigater('/Profile');
    }


    useEffect(() => {
        const BlogId = { BlogId: item.blogId };

        const getBlogId = urlGetBlogId +`${encodeURIComponent(BlogId.BlogId)}`;
        fetch(getBlogId, {
            headers: {Authorization: `Bearer ${token}`}
          })
            .then(Response => { return Response.json() })
            .then(ResponseJson => {
                debugger
                setDashboard(ResponseJson);
            })


        const urlComments = urlGetComments +`${encodeURIComponent(BlogId.BlogId)}`;
        fetch(urlComments, {
            headers: {Authorization: `Bearer ${token}`}
          })
            .then(Response => { return Response.json() })
            .then(ResponseJson => {
                ResponseJson.forEach(element => {

                    element.createdBy = element.createdBy.split('@')[0];

                });

                setComm(ResponseJson)
                console.log(ResponseJson);
                setCount(ResponseJson.length)
            })
    }, []);

    const PostComment = async e => {
        e.preventDefault();
        if (comment.length == 0 || comment.length <= 3) {
            alert('Please enter your comments Or More then 3 characters')
            return;
        }
        
        const commentData = {
            content: comment, createdBy: emailID, CreatedDate: "",
            imageName: null, imageSrc: loginProfile, BlogId: item.blogId, updatedBy: "", updatedDate: null
        };
        


        axios.post(urlCreateComment, commentData,{
            headers: {
               // "Content-Type": "multipart/form-data",
               Authorization: `Bearer ${token}`
              },
           })
            .then((result) => {
                debugger;
                console.log(result.data);
                const serializedState = JSON.stringify(result.data);
                localStorage.setItem('postCommetn', serializedState);
                if (result.status == 200) {
                    //    console.log(commentData.content)
                    setComm([...comm, commentData]);
                    setCount((prev) => prev + 1)
                    alert(result.data);

                }
                else {
                    alert('Invalid User');
                }
            }).catch(error => {
                console.log("Error=>", error);
                if (error.response.data == "{Posting Comment is not Done.. Error}") {
                    alert(error.response.data);
                }
            }).finally(() => {
                setIsLoading(false);
            });
            
            setcomment('');
    };



    return (
        <>
            <div className='.App' >
                <div className='container'>
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#" onClick={MyDashboard} >Dashboard</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <a class="navbar-brand" href="#">Hi {loginName},</a>
                            <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" onClick={MyBlogs} href="#">My Blogs</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#" onClick={CreateNewBlog}>Create Blog</a>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle " href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={loginProfile} onClick={Profile} alt="" title="Click Profile" width="30" height="24" />
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <li><a class="dropdown-item" onClick={Profile} href="#">Profile</a></li>
                                            <li><a class="dropdown-item" onClick={Logout} href="#">Logout</a></li>
                                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                <div>
                        <div class="box-header with-border">
                            <div class="user-block">
                                {/* <img class="img-circle" src={dashboard.imageSrc} alt="User Image"></img>
                                <span class="username"><a href="#">{dashboard.CreatedBy}</a></span> */}
                                <span class="description">Shared publicly by: {dashboard.createdBy} on {dashboard.createdDate} </span>
                            </div>
                        </div>
                        <div className="card mx-auto"  >
                            <img src={dashboard.image} className="card-img-top ImageBlogCard" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{dashboard.title}</h5>
                                <p className="card-text"  >{dashboard.content}</p>
                            </div>
                      </div>
                    </div>
                    <div >
                        <thead>
                            <div class="panel panel-default widget">
                                <div class="panel-heading">
                                    <span class="glyphicon glyphicon-comment"></span>
                                    <div class="box-footer">
                                        <form onSubmit={PostComment}>
                                            <img class="img-responsive img-circle img-sm" src={loginProfile} alt="Alt Text" />
                                            <div class="img-push">
                                                <input type="text" class="form-control input-sm inputComment" style={{ 'display': 'inline-block','margin-top': '10px' }} name="comment" value={comment} onChange={(e) => setcomment(e.target.value)} placeholder="Press enter to post comment" />

                                                <button class="btn btn-outline-secondary" style={{ 'margin': '20px' }} hidden type="submit" >Comment</button>
                                            </div>
                                        </form>
                                    </div>
                                    <h6 class="panel-title" style={{ 'margin': '20px' }}>  comments  : {count}</h6> 
                                </div>
                            </div>
                        </thead>
                        <tbody>
                            {
                                comm.map((item) => (
                                    <div class="panel-body commentClass">

                                        <ul class="list-group">

                                            <li class="list-group-item">
                                                <div class="row">
                                                    <div class="leftContent">
                                                        <img src={item.imageSrc} class="img-circle img-responsive" style={{ 'width': '-webkit-fill-available' }} alt="" /></div>
                                                    <div class="rightContent">
                                                        <div>
                                                            <span className="leftText">
                                                                <h5 style={{ 'display': 'inline-block' }} >{item.createdBy}</h5>
                                                                <span class="float-end">{item.createdDate}</span>
                                                            </span>

                                                        </div>
                                                        <div class="comment-text commentClassInside">
                                                            {item.content}
                                                        </div>

                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        {/* <a href="#" class="btn btn-primary btn-sm btn-block" role="button"><span class="glyphicon glyphicon-refresh"></span> More</a> */}
                                    </div>
                                ))}
                        </tbody>

                  </div>
                </div>

            </div>
        </>
    )

}
export default BlogCard;