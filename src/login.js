import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

import validator from "validator";

import Cookies from "js-cookie";

export const Login = () => {
  const navigate = useNavigate();

  const [Perr, setPErr] = useState(false);
  const [Merr, setMErr] = useState(false);
  const [text, setText] = useState("");
  const [mailText, setMail] = useState("");

  const [loginDetails, setLoginDetails] = useState({});

  //For password hide and show symbol
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showPassword, setShowPassword] = useState(false);

  const set = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "mail") {
      // if(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))){ //Without using Validator module
      if (!validator.isEmail(value)) {
        setMail("Please enter valid mail address");
        setMErr(true);
      } else {
        setMail("");
        setMErr(false);
      }
    } else if (name === "password") {
      if (value !== "") {
        setPErr(false);
        setText("");
      }
    }
    setLoginDetails((vals) => ({ ...vals, [name]: value }));
  };

  function login() {
    if (loginDetails.mail === "" || loginDetails.mail === undefined) {
      setMail("Please Enter E-mail");
      setMErr(true);
    } else if (!validator.isEmail(loginDetails.mail)) {
      setMail("Please enter valid mail address");
      setMErr(true);
    } else if (
      loginDetails.password === "" ||
      loginDetails.password === undefined
    ) {
      setText("Please Enter Password");
      setPErr(true);
    } else {
      fetch(
        "http://localhost:5000/existingUser/?mail='" +
          loginDetails.mail +
          "'&password='" +
          loginDetails.password +
          "'"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data) {
            console.log(data[0].id);
            Cookies.set("user_id", data[0].id);
            navigate("/home", { replace: true });
          } else {
            toast.warning(
              "Invalid user details. Please check the mail Id and Password you have entered",
              {
                position: toast.POSITION.TOP_RIGHT,
              }
            );
            /*setTimeout(() => {
              navigate("/signUp", { replace: false });
            }, 5000);*/

            /*navigate('/signUp',{replace:false});
          console.log("Signup page and toast");*/
          }
        });
    }
  }

  // var err=false;

  return (
    <div className="i-container bg-success bg-gradient">
      <div className="d-flex flex-column border border-secondary w-25 p-4 bg-light sign-box">
        <h1 className="text-center mb-4">Login</h1>
        <div className="d-flex flex-column w-100 justify-content-center">
          <TextField
            variant="outlined"
            className="mr-4 ml-4 mb-4"
            label="E-mail ID"
            name="mail"
            value={loginDetails.mail}
            onChange={set}
            required
            error={Merr}
            helperText={mailText}
            onBlur={() => {
              console.log(loginDetails.mail); // fro debugging puposes
              if (loginDetails.mail === undefined || loginDetails.mail === "") {
                setMErr(true);
                setMail("Please Enter E-mail");
              } else if (!validator.isEmail(loginDetails.mail)) {
                setMail("Please enter valid mail address");
                setMErr(true);
              } else {
                setMErr(false);
                setMail("");
              }
            }}
          />
          <TextField
            variant="outlined"
            className="mr-4 ml-4"
            label="Password"
            name="password"
            value={loginDetails.password}
            onChange={set}
            required
            error={Perr}
            helperText={text}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>{" "}
                </InputAdornment>
              ),
            }}
            onBlur={() => {
              console.log(loginDetails.password); // fro debugging puposes
              if (
                loginDetails.password === undefined ||
                loginDetails.password === ""
              ) {
                setPErr(true);
                setText("Please Enter Password");
              } else {
                setPErr(false);
                setText("");
              }
            }}
          />
        </div>
        <div className="d-flex flex-column">
          <>
            <button className="d-block m-4 btn btn-success" onClick={login}>
              Login
            </button>
            <ToastContainer />
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
