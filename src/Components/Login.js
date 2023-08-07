import {React,useState}from "react";
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import './style.css' 
import '../App';
import $ from 'jquery';

const Login = () => {
    const navigate = useNavigate();
    const [email, setName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true);


    const handleLogin = async e => {
        e.preventDefault();

         // Check if the Email is an Empty string or not.     
          if (email.length == 0) {
            alert('Invalid Form, Email Address can not be empty')
            return
          }
          const regex = "^[a-z0-9]+\.+[a-z0-9]+@[a-z]+\.[a-z]{2,3}$";
          const regexSecond = "/[a-z0-9]+[a-z0-9]+@[a-z]+\.[a-z]{2,3}";
          //Matching the given phone number with regular expression
          debugger
          const result = (email.match(regex)||email.match(regexSecond));
          if(!result) {
            alert("Given email-id is not valid");
            return
          }
          // if password length is less than 8 characters, alert invalid form.
      
          if (password.length < 8) {
            alert(
              'Invalid Form, Password must contain greater than or equal to 8 characters.',
            )
            return
          }
      




        const apiUrl = "https://localhost:7086/api/Login";
        const data = { EmailAddress: email.toLowerCase(), password: password };
        axios.post(apiUrl, data)
            .then((result) => {
                debugger;
                console.log(result.data);
                const serializedState = JSON.stringify(result.data);
                localStorage.setItem('myData', serializedState);
                localStorage.setItem("loginName", email);
                if (result.status == 200) {
                    setUser(result.data);
                    localStorage.setItem('user', result.data);
                    navigate("/Dashboard");
                   //navigate("/DashboardTiles"); 
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
            .finally(() => {
                setIsLoading(false);
            }); 
    };
    return (
        <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary">
          <div className="form_container p-5 rounded bg-white">
            <form onSubmit={handleLogin}>
                <h3 className="text-center">Sign In</h3>
                   <div className="mb-2">
                        <label htmlFor="email">E-mail</label>
                        <input className="form-control" type="email" id="email" placeholder="Enter Email" value={email} onChange={(e) =>setName(e.target.value)}  />
                   </div>

                   <div className="mb-2">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" value={password} placeholder="Password" onChange={(e) =>setPassword(e.target.value)} />
                   </div>

                   <div className="mb-2">
                        <input type="checkbox" className="custom-control custom-checkbox" id="check" />
                        <label htmlFor="check" className="custom-input-label ms-2">Remember Me:</label>
                       
                   </div>

                   <div className="d-grid">
                        <button className="btn btn-primary" type="submit">Sign In</button>
                   </div>

                   <p className="text-end mt-2">
                        Forgot <a href="" >Password</a><Link to="/signup"className="ms-2">SignUp</Link>
                   </p>
            </form>
          </div>
        </div>
    );
};

export default Login;