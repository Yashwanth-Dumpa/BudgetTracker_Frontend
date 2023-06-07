import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { useNavigate, Link } from "react-router-dom";

import { useState, useEffect, createContext, useContext } from "react";

import Cookies from "js-cookie";

import InfoIcon from '@mui/icons-material/Info';
//-----------------------------------------------

import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";


const Controlled = ({name, errorVal})=>{
    return(
    <TextField label={name} error={errorVal} className='m-4' defaultValue='Worki!!!1'/>
    )
 } 


const Test = (props) => {
  function trial() {
    alert("Inside");
  }

  function notes() {
    toast.warning("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  function log() {
    Cookies.remove("user_id");
  }
  const [inputs, setInput] = useState({});
  let trialobject = {
    june: "Hello June",
    april: "Hi April",
    may: "Hi May",
    date: "2023-05-04",
    category: "Groceries",
  };
  useEffect(() => {
    setInput(trialobject);
  }, []);
  const set = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((vals) => ({ ...vals, [name]: value }));
  };

  const show = () => {
    let options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    };
    console.log("Options", inputs);
    fetch("http://localhost:5000/test", options);
  };

  const getDetails = () => {
    let options = {
      method: "GET",
      mode: "cors",
    };
    console.log(props);
    fetch("http://localhost:5000/" + 21 + "/expenseTable")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("Cookies", Cookies.get("user_id"));
      });
  };

  <>
    <h1>Hello Testing</h1>
    <input
      type="text"
      name="june"
      value={inputs.june || "Hello June"}
      onChange={set}
    />
    <input type="text" name="april" value={inputs.april || 2} onChange={set} />
    <input type="text" name="may" value={inputs.may || 3} onChange={set} />
    <input type="date" name="date" value={inputs.date} onChange={set} />

    <select
      id="options"
      name="category"
      value={inputs.category || "Groceries"}
      onChange={set}
    >
      <option>Groceries</option>
      <option>Rent</option>
      <option>Bills(Electricity,Telephone,etc.)</option>
      <option selected>Entertainment</option>
      <option>EMI</option>
      <option>Travel</option>
      <option>Medical</option>
    </select>
    <button onClick={show}> Show</button>
    <button onClick={getDetails}>Get Details</button>
    <button onClick={notes}>Show toast Notification</button>
    <button onClick={trial}>Show trial</button>

    <button onClick={log}>LogOUT</button>

    <ToastContainer />

    <Link to="/signUp">Sign Up</Link>
  </>;
 const value=5;

 
const err = false;
 const name='Hello';


 //-------------------------------------------------------------

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
 
  const open = Boolean(anchorEl);
  return (
    <>
    <div className="d-flex flex-column justify-content-center w-50 ">
      <div>
      <Typography className="w-50"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
         <InfoIcon/>
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography className="bg-info" sx={{ p: 1,maxWidth:350}}>This Pie Chart represents two Slices, 
        one for Expenses and the other for Balance amount. The sum of these two slices will give your Total Income. 
        </Typography>
      </Popover>
    </div>
     
    </div>
    <div>
      <button onClick={()=>{
        fetch("http://localhost:5000/55/getBudget/balance")
        .then(response=>response.json())
        .then((data)=>{
          console.log(data);
        });
        console.log('Cliked');
      }}>Click Me</button>
    </div>
    </>
  );
};

export default Test;
