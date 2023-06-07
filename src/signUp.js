import TextField from "@mui/material/TextField";

import { useNavigate, Link } from "react-router-dom";

import "./signUp.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import validator from "validator";

const SignUp = () => {
  const [Ferr, setFerr] = useState(false);
  const [Ftext, setFtext] = useState("");

  const [Merr, setMerr] = useState(false);
  const [Mtext, setMtext] = useState("");

  const [Perr, setPerr] = useState(false);
  const [Ptext, setPtext] = useState("");

  const [signUpData, setSignUpData] = useState({});
  const navigate = useNavigate();

  const set = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "mail") {
      // if(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))){ //Without using Validator module
      if (!validator.isEmail(value)) {
        setMtext("Please enter valid mail address");
        setMerr(true);
      } else {
        setMtext("");
        setMerr(false);
      }
    } else if(name==='password'){
      if (!validator.isStrongPassword(value,{ minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
        setPtext("Password should be atleast 8 charcters and consist of one uppercase, lowercase, symbol and a number");
        setPerr(true);
      } else {
        setPtext("");
        setPerr(false);
      }
    }
    setSignUpData((vals) => ({ ...vals, [name]: value }));
  };

  function signingup() {
    if (signUpData.firstName === undefined || signUpData.firstName === "") {
      setFerr(true);
      setFtext("Please enter First Name");
    } else if (signUpData.mail === undefined || signUpData.mail === "") {
      setMerr(true);
      setMtext("Please enter mail id");
    } else if (!validator.isEmail(signUpData.mail)) {
      setMtext("Please enter valid mail address");
      setMerr(true);
    } else if (
      signUpData.password === undefined ||
      signUpData.password === ""
    ) {
      setPerr(true);
      setPtext("Please Enter Password");
    } else if(!validator.isStrongPassword(signUpData.password,{ minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1})){
        setPtext("Password should be atleast 8 charcters and consist of one uppercase, lowercase, symbol and a number");
        setPerr(true);
    }
    else {
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
            console.log('Signup data',data.insertId);
            fetch("http://localhost:5000/insertBudget/"+data.insertId);
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
            error={Ferr}
            helperText={Ftext}
            onBlur={() => {
              console.log(signUpData.firstName); // fro debugging puposes
              if (
                signUpData.firstName === undefined ||
                signUpData.firstName === ""
              ) {
                setFerr(true);
                setFtext("Please Enter First Name");
              } else {
                setFerr(false);
                setFtext("");
              }
            }}
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
            error={Merr}
            helperText={Mtext}
            onBlur={() => {
              console.log(signUpData.mail); // fro debugging puposes
              if (signUpData.mail === undefined || signUpData.mail === "") {
                setMerr(true);
                setMtext("Please Enter E-mail Id");
              } else if (!validator.isEmail(signUpData.mail)) {
                setMtext("Please enter valid mail address");
                setMerr(true);
              } else {
                setMerr(false);
                setMtext("");
              }
            }}
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
            error={Perr}
            helperText={Ptext}
            onBlur={() => {
              console.log(signUpData.password); // fro debugging puposes
              if (
                signUpData.password === undefined ||
                signUpData.password === ""
              ) {
                setPerr(true);
                setPtext("Please Enter Password");
              } else if(!validator.isStrongPassword(signUpData.password,{ minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1})){
                  setPtext("Password should be of atleast 8 charcters and consist of one uppercase, lowercase, symbol and a number");
                  setPerr(true);
              }else {
                setPerr(false);
                setPtext("");
              }
            }}
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
