import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signUp.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';    

import Cookies from 'js-cookie';

export const Login = () => {
  const navigate = useNavigate();

  const [loginDetails,setLoginDetails] = useState({});

 const set = (event)=>{
  const name = event.target.name;
  const value = event.target.value;
  setLoginDetails(vals=>({...vals,[name]:value}));

 };

   function login(){
    
      fetch("http://localhost:5000/existingUser/?mail='"+loginDetails.mail+"'&password='"+loginDetails.password+"'")
      .then((response)=>{
        return response.json();
      }).then((data)=>{
        if(data){
          console.log(data[0].id);
          Cookies.set('user_id',data[0].id);
          navigate('/home',{replace:false})
        }
        else{
          toast.error("Account doesn't exist. Please sign up. ", {
            position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(()=>{
          navigate('/signUp',{replace:false});
        },5000);
          
          /*navigate('/signUp',{replace:false});
          console.log("Signup page and toast");*/
        }
      })
  }
  return (
    <div className="i-container bg-success bg-gradient">
      <div className="d-flex flex-column border border-secondary w-25 p-4 bg-light sign-box">
        <h1 className='text-center mb-4'>Login</h1>
        <div className="d-flex flex-column w-100 justify-content-center">
          <TextField
            variant="outlined"
            className="mr-4 ml-4 mb-4"
            label="E-mail ID" name='mail' value={loginDetails.mail} onChange={set}
            required
          />
          <TextField
            variant="outlined"
            className="mr-4 ml-4"
            label="Password" name='password' value={loginDetails.password} onChange={set}
            required type='password'
          />
        </div>
        <div className="d-flex flex-column">
          <>
          <button className="d-block m-4 btn btn-success" onClick={login}>Login</button>
          <ToastContainer/>
          </>
          <Link className="ml-4" to="/signUp">
            New User? Create an Account
          </Link>
        </div> 
      </div>

      <Link to="/home">Home</Link>
    </div>
  );
};



