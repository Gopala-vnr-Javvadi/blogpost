import { useNavigate } from "react-router-dom";
import React,{useState} from 'react';
import axios from 'axios';

const CreateBlog = () => {

    const token = localStorage.getItem('MyToken');
    const navigater = useNavigate();

     const CreateNewBlog = () => {
        localStorage.clear('user');
        navigater('/CreateBlog');
     }
     
    const [user, setUser] = useState()
    const loginName =localStorage.getItem('loginName');
    const profileName = localStorage.getItem('profileName');
    const[data,setData] = useState({
        title :'',email :'',content:'',category:'', file:'', ImageUrl:'',CreatedBy:'',
       });
    
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

    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value});
    }  
    const [fileSelected, setFileSelected] = useState();

    const saveFileSelected= (e) => {
      //in case you wan to print the file selected
      //console.log(e.target.files[0]);
      setFileSelected(e.target.files[0]);
    };
    const MyDashboard =()=>{
        navigater('/Dashboard');
    }
     
    const comment=()=>{


    }

    

    const [file, setFile] = useState(null);
    const [otherData, setOtherData] = useState('');
    
    const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    };
    
    const handleOtherDataChange = (event) => {
    setOtherData(event.target.value);
    };
    
    const handleSubmit = (event) => {
    event.preventDefault();
   
    if (data.title.length == 0 || data.title.length <=10  ) {
        alert(
         "Title should not empty & Should be Greater then 10 Characters",
        )
        return
      }
      if (data.content.length == 0 || data.content.length <250) {
        alert('Content should not be empty & minimum shoud have more then 250 characters')
        return
      }
      if (data.category.length == 0) {
        alert('Category should not be empty')
        return
      }
     

      if (file == null) {
        alert('Profile Image should be selected')
        return
      }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('CreatedDate', "");
    formData.append('Title', data.title);
    formData.append('EmailAddress', loginName);
    formData.append('Content', data.content);
    formData.append('CreatedBy', loginName);
    formData.append('category', data.category);
    fetch('https://localhost:7086/api/BlogPosts/File', {
        method: 'POST',
        body: formData,
        headers: {Authorization: `Bearer ${token}`}
    }).then((response) => response.json())
        .then((data) => {
            debugger;
        if(data.message == "Upload successful!"){
          alert("Your Post Uploaded Successful!")
          navigater('/Dashboard');
        }
            // Handle the response from the server
        })
        .catch((error) => {
            console.log("Error=>", error);
             if (error.response.data == "User not found") {
               alert(error.response.data);
              }
        });
        };
     
  
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
                                        <a class="nav-link active" onClick={MyBlogs} aria-current="page" href="#">My Blogs</a>
                                    </li>
                                    
                                    <li class="nav-item">
                                        <a class="nav-link" href="#" onClick={Logout}>Logout</a>
                                    </li>
                                   
                                    <nav class="nav navbar-nav navbar-right">
                                        <div class="container">
                                            <a class="navbar-brand" href="#">
                                                <img src={profileImage} alt="" width="30" height="24" />
                                            </a>
                                        </div>
                                    </nav>

                                </ul>
                            </div>
                        </div>
                    </nav>



        <form onSubmit={handleSubmit} style={{"width": "fit-content"}}>
        <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title"   onChange={changeHandler}  placeholder="Enter Title" />
                </div>
                <div className="mb-3">
                    <label for="content" className="form-label">Post Content</label>
                    <textarea className="form-control" name="content"   onChange={changeHandler}  ></textarea>
                </div><div className="mb-3">
                    <select className="form-select" aria-label="Default select example" name="category" onChange={changeHandler} >
                        <option selected>Select Category</option>
                        <option value="LifeStyle">LifeStyle</option>
                        <option value="Politics">Politics</option>
                        <option value="IT">IT</option>
                    </select> </div>
                <div className="mb-3">
                <input type="file" onChange={handleFileChange} />
                </div>
            
            <div className="mb-3"> <button type="submit" className="btn btn-primary"  >Submit Post</button>
            </div>
        </form>
         </div>
    </div>
   </>
     )


}
export default CreateBlog;