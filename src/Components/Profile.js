import React,{useState,useEffect} from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';

function Profile() {


    const navigater = useNavigate();
    const [Name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState()
    const [profile,SetProfile] =useState([]);
    const emailID = localStorage.getItem('loginName');
    const loginProfile = localStorage.getItem('loginprofileImage');

    const[data,setData] = useState({
        fname :'',lName :'',email:'', password:'', role :'',phno:'',profileImage:''
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
     

    

    const [file, setFile] = useState(null);
    const [otherData, setOtherData] = useState('');
    
    const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    };
    
    const handleOtherDataChange = (event) => {
    setOtherData(event.target.value);
    };

    const handleSignUp = async e => {

            e.preventDefault();      
            const apiUrl = "https://localhost:7086/api/User/UpdateUser";   
            const dataSingup = { Username:data.fName, Password: data.password ,EmailAddress :data.email,
              Role:data.role,Surname:data.lName,PhoneNumber:data.phno,File:file};
         //    axios.post(apiUrl, dataSingup)    
         const formData = new FormData();
         formData.append('File', file);
         formData.append('CreatedDate', "");
         formData.append('Username', data.fName);
         formData.append('Password', data.password);
         formData.append('EmailAddress', data.email.toLocaleLowerCase());
         formData.append('Role', data.role);
         formData.append('Surname', data.lName);
         formData.append('PhoneNumber',data.phno);
         fetch(apiUrl, {
             method: 'POST',
             body: formData,
         })
                .then((result) => {     
                    console.log(result.data);   
                    const serializedState = JSON.stringify(result.data);  
                    localStorage.setItem('myData', serializedState);  
                    if (result.status == 200) {  
                       setUser(result.data);  
                       alert(result.data + "Please Login"); 
                       navigater('/login');             
                    }   
                    else {   
                    alert('Invalid User');
                    }    
                }).catch(error => {
                    console.log("Error=>", error);
                    if (error.response.data == "User not found") {
                        alert(error.response.data);
                    }
                })    
            
    }
    useEffect(() => {     
         
        const apiUrlGetBlogs = `https://localhost:7086/api/BlogPosts/MyProfile?email=${encodeURIComponent(emailID)}`;
        fetch(apiUrlGetBlogs)
            .then(response => { return response.json() })
            .then(responseJson => {
                debugger
                const d = {}
                d.email = responseJson.emailAddress
                d.password = responseJson.password
                d.phno = responseJson.phoneNumber
                d.role = responseJson.role
                d.lName = responseJson.surname
                d.fname = responseJson.username
                setData(d)
            
                localStorage.setItem('loginprofileImage',responseJson.imageUrl);
            }).catch((error) => {
             console.log("Error=>", error);
                if (error.response.data == "User not found") {
                    alert(error.response.data);
                  }
                });
                
            }, []);
    

    
  return (
       <div>
       <div><img  style={{'height': '240PX','width': '240PX','MARGIN-BOTTOM': '21px'}} src={loginProfile} width={50} height={100} className="card-img-top ImageBlog" alt="..." /></div>
       <div >
    <div>
      <form onSubmit={handleSignUp} style={{"width": "fit-content"}}>
          <h3 className="text-center"> Profile </h3>
             <div className="mb-2">
                  <label htmlFor="username">*First Name</label>
                  <input className="form-control" type="text" Name ="fname" value={data.fname} placeholder="Enter First Name" onChange={changeHandler}  />
             </div>
             <div className="mb-2">
                  <label htmlFor="lName">*Last Name</label>
                  <input className="form-control" type="text" Name ="lName" value={data.lName} placeholder="Enter Last Name" onChange={changeHandler}  />
             </div>
             <div className="mb-2">
                  <label htmlFor="lName">*Email</label>
                  <input className="form-control" type="email" disabled Name ="email" value={data.email} placeholder="Enter E-mail" onChange={changeHandler}  />
             </div>
             <div className="mb-2">
                  <label htmlFor="password">*Password:</label>
                  <input type="password" className="form-control" Name ="password" value={data.password}  placeholder="Password" onChange={changeHandler}/>
             </div>
             <div className="mb-2">
                  <label htmlFor="role">*Select your Role.</label>
                  <select className="form-control"  id="role"  Name ="role"  value={data.role} placeholder="Please Select Your Role" onChange={changeHandler}  >
                  <option >-------Select your Role-------</option>
                     <option value="User">User</option>
                  </select>
             </div>
             <div className="mb-2">
                  <label htmlFor="phno">*Phone No.</label>
                  <input className="form-control" type="number" Name ="phno" value={data.phno} placeholder="Enter Phone Numeber"  onChange={changeHandler}  />
             </div>
             <div className="mb-2">
                  <input type="file" className="form-control"  onChange={handleFileChange} />
             </div>

             <div className="d-grid mt-2">
                  <button className="btn btn-primary" type="submit">Update</button>
             </div>

             
      </form>
    </div>
  </div>
    </div>
  )
}

export default Profile
