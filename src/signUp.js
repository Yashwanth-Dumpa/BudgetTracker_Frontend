import TextField from "@mui/material/TextField";

import { useNavigate, Link } from "react-router-dom";

import "./signUp.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({});
  const navigate = useNavigate();

  const set = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSignUpData((vals) => ({ ...vals, [name]: value }));
  };

  function signingup() {
    console.log(signUpData);
    let options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    };
    fetch("http://localhost:5000/newUser", options)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          toast.success("Account created successfully. Please login. ", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            navigate("/login", { replace: false });
          }, 5000);
        } else {
          toast.error("Account already exists. Please login. ", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            navigate("/login", { replace: false });
          }, 5000);
        }
      });
  }
  return (
    <div className="i-container bg-success bg-gradient">
          <div className="d-flex flex-column border border-secondary w-25 p-4  sign-box bg-light">
        <h1 className="text-center">Sign Up</h1>
        <div className="w-100 d-flex justify-content-center">
          <TextField
            variant="outlined"
            className="m-4 w-50"
            label="First Name"
            name="firstName"
            value={signUpData.firstName}
            onChange={set}
            required
          />
          <TextField
            variant="outlined"
            className="m-4 w-50"
            label="Last Name"
            name="lastName"
            value={signUpData.lastName}
            onChange={set}
          />
        </div>
        <div className="d-flex flex-column w-100 justify-content-center">
          <TextField
            variant="outlined"
            className="mr-4 ml-4 mb-4"
            label="E-mail ID"
            required
            name="mail"
            value={signUpData.mail}
            onChange={set}
          />
          <TextField
            variant="outlined"
            className="mr-4 ml-4"
            label="Password"
            type="password"
            name="password"
            value={signUpData.password}
            onChange={set}
            required
          />
        </div>
        <div className="d-flex flex-column">
          <>
            <button className="d-block m-4 btn btn-success" onClick={signingup}>
              Sign Up
            </button>
            <ToastContainer />
          </>
          <Link className="ml-4" to="/login">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
