 import './BlogCard.css';
 import { useLocation } from 'react-router-dom';
 import { useNavigate, Link, Navigate } from 'react-router-dom';
 import React, { useState,useEffect ,} from 'react';
 import axios from 'axios';
 const BlogCard =(props)=>{
       const navigater = useNavigate();
       const loginName = localStorage.getItem('loginName').split('@')[0];
       const emailID = localStorage.getItem('loginName');
       debugger;
       const loginProfile = localStorage.getItem('loginprofileImage');
       const location = useLocation();
       const[comm,setComm] = useState([]);
       const[count,setCount] = useState('');
       console.log(location.state)
       const item = location.state.data;
       const [dashboard, setDashboard] = useState([]);
       const[comment,setcomment] = useState('');
       const [isLoading, setIsLoading] = useState(true);
       const Logout = () => {
        const person = prompt("Logout Popup", "Are you want to Logout ?");
        if (person != null) {
            localStorage.clear('user');
            navigater('/Login');
        }
    }
    const MyBlogs=()=>{
        navigater('/MyBlogs');
    }
      const CreateNewBlog = () => {
         navigater('/CreateBlog')
      }

      const MyDashboard =()=>{
        navigater('/Dashboard');
    }
    const Profile =()=>{
        navigater('/Profile');
    }
    
      
      useEffect(() => {     
          const BlogId =  {BlogId:item.blogId};

          const apiUrlGetBlogId = `https://localhost:7086/api/BlogPosts/GetMyBlogById?BlogId=${encodeURIComponent(BlogId.BlogId)}`;
          fetch(apiUrlGetBlogId)
              .then(Response => { return Response.json() })
              .then(ResponseJson => {
                  debugger
                  setDashboard(ResponseJson);
              })
         

        

          const apiUrlComments = `https://localhost:7086/api/BlogPosts/GetComments?BlogId=${encodeURIComponent(BlogId.BlogId)}`;   
       
          fetch(apiUrlComments)
         .then(Response =>{return Response.json()})
         .then(ResponseJson =>{
            ResponseJson.forEach(element => {
                
                element.createdBy=element.createdBy.split('@')[0];        

            });

            setComm(ResponseJson)
            console.log(ResponseJson);
            setCount(ResponseJson.length)
           })
       }, []);

       const PostComment = async e => {
        e.preventDefault();
        if(comment.length==0||comment.length <=3){
          alert('Please enter your comments Or More then 3 characters')
          return;
        }
        const apiComment = "https://localhost:7086/api/BlogPosts/CreateComment";          
        const commentData = { content: comment, createdBy: emailID,CreatedDate: "", 
        imageName:null,imageSrc: loginProfile,BlogId:item.blogId,updatedBy:"",updatedDate: null};
        

        axios.post(apiComment, commentData)
            .then((result) => {
                debugger;
                console.log(result.data);
                const serializedState = JSON.stringify(result.data);
                localStorage.setItem('postCommetn', serializedState);
                if (result.status == 200) {
                //    console.log(commentData.content)
                setComm([...comm, commentData]);
                setCount((prev)=>prev+1)
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
            })
            .finally(() => {
                setIsLoading(false);
            }); 
    };



return(
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
                                    {/* <li class="nav-item">
                                        <a class="nav-link" href="#" onClick={Logout}>Logout</a>
                                    </li> */}
                                    <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle "  href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={loginProfile} onClick={Profile} alt="" title="Click Profile" width="30" height="24" />
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <li><a class="dropdown-item" onClick={Profile} href="#">Profile</a></li>
                                            <li><a class="dropdown-item" onClick={Logout} href="#">Logout</a></li>
                                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                                        </ul>

                                        
                                    </li>
                                    {/* <li class="nav-item float-end">
                                    <a class="nav-link" href="#"><a class="nav-link" href="#"> <img src="..." class="rounded-circle" alt="..."></img></a></a>
                                      </li> */}
                                    {/* <nav class="nav navbar-nav navbar-right">
                                        <div class="container">
                                            <a class="navbar-brand" href="#">
                                                <img src = {loginProfile} alt="" width="30" height="24" />
                                            </a>
                                        </div>
                                    </nav> */}

                                </ul>
                            </div>
                        </div>
                    </nav>

    <div class="box-header with-border">
        <div class="user-block">
            <img class="img-circle" src={dashboard.imageSrc} alt="User Image"></img>
            <span class="username"><a href="#">{dashboard.CreatedBy}</a></span>
            <span class="description">Shared publicly - {dashboard.CreatedDate}</span>
        </div>
        {/* <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-toggle="tooltip" title="" data-original-title="Mark as read">
                <i class="fa fa-circle-o"></i></button>
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
        </div> */}
    </div>
    <div className="card mx-auto"  >
        <img src={dashboard.image}  className="card-img-top ImageBlogCard" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{dashboard.title}</h5>
            <p className="card-text"  >{dashboard.content}</p>
            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
    </div>


    <thead>
    <div class="panel panel-default widget">
        <div class="panel-heading">
            <span class="glyphicon glyphicon-comment"></span>
            <div class="box-footer">
                <form onSubmit={PostComment}>
                    <img class="img-responsive img-circle img-sm" src={loginProfile} alt="Alt Text" />
                    <div class="img-push">
                        <input type="text" class="form-control input-sm inputComment"style={{'display': 'inline-block'}}  name="comment"   value={comment} onChange={(e) =>setcomment(e.target.value)}  placeholder="Press enter to post comment" />
                   
                   
                      <button class="btn btn-outline-secondary" style={{'margin-left': '20px'}}type="submit" >Comment</button>
                    </div>
                </form>
            </div>
            <h6 class="panel-title">
                 comments  : {count}</h6>
            {/* <span class="label label-info">
                </span> */}
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
                            <img src={item.imageSrc} class="img-circle img-responsive" style={{'width': '-webkit-fill-available'}} alt="" /></div>
                        <div class="rightContent">
                            <div>
                                {/* <a href="http://www.jquery2dotnet.com/2013/10/google-style-login-page-desing-usign.html">
                                    Google Style Login Page Design Using Bootstrap</a> */}
                                <span className="leftText">
                               <h5 style={{'display': 'inline-block'}} >{item.createdBy}</h5>
                             <span class="float-end">{item.createdDate}</span>
                                </span>
                                {/* <div class="mic-info">
                                <span class="label label-info"><a>{item.createdBy}</a> {item.createdDate}</span>
                                    By: <a href="#">{item.createdBy}&nbsp &nbsp </a> {item.createdDate}
                                </div> */}
                            </div>
                            <div class="comment-text commentClassInside">
                               {item.content}
                            </div>
                            {/* <div class="action">
                                <button type="button" class="btn btn-primary btn-xs" title="Edit">
                                    <span class="glyphicon glyphicon-pencil"></span>
                                </button>
                                <button type="button" class="btn btn-success btn-xs" title="Approved">
                                    <span class="glyphicon glyphicon-ok"></span>
                                </button>
                                <button type="button" class="btn btn-danger btn-xs" title="Delete">
                                    <span class="glyphicon glyphicon-trash"></span>
                                </button>
                            </div> */}
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
</>
)

}
export default BlogCard;