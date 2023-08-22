import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {urlSignUp}  from "./Config";


function SignUp() {

    const navigate = useNavigate();
    const [Name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState()
    
    const[data,setData] = useState({
        fName :'',lName :'',email:'', password:'', role:'',phno:'',profileImage:'',gender:''
       });
       const [file, setFile] = useState(null);
       const handleFileChange = (event) => {
          setFile(event.target.files[0]);
          };
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value});
    }  

    
    const handleSignUp = async e => {
        e.preventDefault(); 
        
        if (data.fName.length == 0) {
          alert('First Name can not be empty')
          return
        }
        if (data.lName.length == 0) {
          alert('Last Name can not be empty')
          return
        }

        if (data.email.length == 0) {
          alert('Email Address can not be empty')
          return
        }
        const regex = "^[a-z0-9]+\.+[a-z0-9]+@[a-z]+\.[a-z]{2,3}$";
        const regexSecond = "/[a-z0-9]+[a-z0-9]+@[a-z]+\.[a-z]{2,3}";
        //Matching the given phone number with regular expression
        debugger
        const result = (data.email.match(regex)||data.email.match(regexSecond));
        if(!result) {
          alert("Given email-id is not valid");
          return
        }
        // if password length is less than 8 characters, alert invalid form.
    
        if (data.password.length < 8) {
          alert(
            'Invalid Form, Password must contain greater than or equal to 8 characters.',
          )
          return
        }

        if (data.role.length == 0) {
          alert('Category should not be empty')
          return
        }
        if (data.gender.length == 0) {
          alert('Gender should not be empty')
          return
        }
        if (data.phno.length == 0 ||data.phno.length >10 || data.phno.length < 10) {
          alert('Phone should not be empty & Equals to 10 digits')
          return
        }

        if (file == null) {
          alert('Profile Image should be selected')
          return
        }
     //    lastModified:1690976453527
     //    lastModifiedDate:  Wed Aug 02 2023 17:10:53 GMT+0530 (India Standard Time) {}
     //    name: "lti.png"
     //    size: 1074
     //    type :"image/png"
     //    webkitRelativePath: ""

       
        const dataSingup = { Username:data.fName, Password: data.password ,EmailAddress :data.email.toLowerCase(),
          Role:data.role,Surname:data.lName,PhoneNumber:data.phno,File:file};
     //    axios.post(apiUrl, dataSingup)    
     const formData = new FormData();
     formData.append('File', file);
     formData.append('CreatedDate', "");
     formData.append('Username', data.fName);
     formData.append('Password', data.password);
     formData.append('EmailAddress', data.email);
     formData.append('Gender', data.gender);
     formData.append('Role', data.role);
     formData.append('Surname', data.lName);
     formData.append('PhoneNumber',data.phno);
     fetch(urlSignUp, {
         method: 'POST',
         body: formData,
         
     })
            .then((result) => {     
                console.log(result.data);   
                const serializedState = JSON.stringify(result.data);  
                localStorage.setItem('myData', serializedState);  
                if (result.status == 200) {  
                   setUser(result.data);  
                   alert( "User is Created,Please login using your credentials"); 
                  navigate('/login');             
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

  return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100 bg-primary bg-img ">
    <div className="form_container p-5 rounded bg-white">
      <form onSubmit={handleSignUp}>
          <h3 className="text-center">Sign Up</h3>
             <div className="mb-2">
                  <label htmlFor="fName">*First Name</label>
                  <input className="form-control" type="text" Name ="fName" placeholder="Enter First Name" onChange={changeHandler}  />
             </div>
             <div className="mb-2">
                  <label htmlFor="lName">*Last Name</label>
                  <input className="form-control" type="text" Name ="lName" placeholder="Enter Last Name" onChange={changeHandler}  />
             </div>
             <div className="mb-2">
                  <label htmlFor="lName">*Email</label>
                  <input className="form-control" type="email" Name ="email" placeholder="Enter E-mail" onChange={changeHandler}  />
             </div>
             <div className="mb-2">
                  <label htmlFor="password">*Password:</label>
                  <input type="password" className="form-control" Name ="password"  placeholder="Password" onChange={changeHandler}/>
             </div>
             <div className="mb-2">
                  <label htmlFor="role">*Select Gender.</label>
                  <select className="form-control"  id="gender"  Name ="gender"  placeholder="Please Gender" onChange={changeHandler}  >
                  <option >-------Select your Gender-------</option>
                     <option value="Male">Male</option>
                     <option value="FeMale">Female</option>
                  </select>
             </div>
             <div className="mb-2">
                  <label htmlFor="role">*Select your Role.</label>
                  <select className="form-control"  id="role"  Name ="role"  placeholder="Please Select Your Role" onChange={changeHandler}  >
                  <option >-------Select your Role-------</option>
                     <option value="User">User</option>
                  </select>
             </div>
             <div className="mb-2">
                  <label htmlFor="phno">*Phone No.</label>
                  <input className="form-control" type="number" Name ="phno" placeholder="Enter Phone Numebr"  onChange={changeHandler}  />
             </div>
             <div className="mb-2">
                  <label htmlFor="profileImage">*Select Image:</label>
                  <input type="file" className="form-control"  onChange={handleFileChange} />
             </div>

             <div className="d-grid mt-2">
                  <button className="btn btn-primary" type="submit">Sign Up</button>
             </div>

             <p className="text-end mt-2">
                Already Registered? <Link to="/Login"className="ms-2">SignIn</Link>
             </p>
      </form>
    </div>
  </div>
  )
}

export default SignUp;
