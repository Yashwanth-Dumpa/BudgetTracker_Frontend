
import { useState, useEffect, useContext } from "react";
import { userDetailsContext } from "../Context";
import "./budgetTable.css";
import InputAdornment from "@mui/material/InputAdornment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Expense from "./ExpenseButton.js";

import Cookies from "js-cookie";
import { TextField } from "@mui/material";

const Budget = () => {
  const user_id = Cookies.get("user_id");
  console.log(user_id, "In BudgetTable.js Budget cmponent ");
  const months = [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "Febrauary",
    "March",
  ];

  const [budget_input, setBudget] = useState({});
  const {budget_balance,setBalance} = useContext(userDetailsContext);//rendering in expensebutton.js when Add expense button is clicked.

  useEffect(() => {
    fetch("http://localhost:5000/" + user_id + "/getBudget")
      .then((response) => response.json())
      .then((jsonData) => {
        //console.log(jsonData);
        let budget_obj = {};
        for (let i of jsonData) {
          //console.log(Object.values(i));
          budget_obj[Object.values(i)[0]] = Object.values(i)[1];
        }
        setBudget(budget_obj);

        fetch("http://localhost:5000/"+user_id+"/getBudget/balance")
        .then(response=>response.json())
        .then((data)=>{
          console.log(data);
          setBalance(data);
        });
      });
  }, []);

  const save = () => {
    console.log("Save Clicked");
    console.log(budget_input);
    let options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budget_input),
    };
    fetch(
      "http://localhost:5000/" + user_id + "/addExpense-Credit",
      options
    ).then(() => {
      fetch("http://localhost:5000/"+user_id+"/getBudget/balance")
        .then(response=>response.json())
        .then((data)=>{
          console.log(data);
          setBalance(data);
        });
      toast.success("Budget added Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  };

  const set = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBudget((vals) => ({ ...vals, [name]: value }));
  };

  {
    /*const List = (props) => {
    return (
      <li className="lists">
        <div>
          <label htmlFor={props.month} className="pr-5 months">
            {props.month}
          </label>
          <input
            type="text"
            id={props.month}
            name={props.month}
            value={budget_input[props.month]}
            onChange={set}
          />
        </div>
      </li>
    );
  };*/
  }

  return (
    <div className="w-100 bg-warning p-4">
      <div className="d-flex flex-row justify-content-between w-100">
        <h1>Enter Budget</h1>
        <Expense btn="Enter Expenses" addBtn="Add Expense" name="Add Expense" />
      </div>
      <div className="d-flex flex-row justify-content-center">
        <ul>
          {/*{months.map((month)=><List month={month}/>)}*/}
          {months.map((month) => {
            return (
              <li className="lists">
                <div>
                  <TextField
                    variant="outlined"
                    id="outlined-start-adornment"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rs. </InputAdornment>
                      ),
                    }}
                    className="mr-4 ml-4 mb-4"
                    label={month}
                    name={month} type='number'
                    value={budget_input[month]}
                    onChange={set}
                  />
                  <TextField
                    id="outlined-start-adornment" disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rs. </InputAdornment>
                      ), 
                    }} value={budget_balance[month]===null?0:budget_balance[month]}
                  />
                </div>
                {/*<div>
                <label htmlFor={month} className="pr-5 months">
                  {month}
                </label>
                <input
                  type="number"
                  id={month}
                  name={month}
                  value={budget_input[month]}
                  onChange={set} defaultValue='0'
                />
              </div>*/}
              </li>
            );
          })}
        </ul>
      </div>
      {/*<div className="d-flex flex-row justify-content-center">
    
          
          {months.map((month) => {
            return (
              <li className="lists">
                <div>
                  <TextField
                    variant="outlined"
                    id="outlined-start-adornment"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rs. </InputAdornment>
                      ),
                    }}
                    className="mr-4 ml-4 mb-4"
                    label={month}
                    name={month} type='number'
                    value={budget_input[month]}
                    onChange={set}
                  />
                  <TextField
                    id="outlined-start-adornment" disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rs. </InputAdornment>
                      ), 
                    }} value={budget_balance[month]===null?0:budget_balance[month]}
                  />
                </div>
        
              </li>
            );
          })}
        
      </div>*/}
      <div>
        <>
          <button className="btn btn-primary" onClick={save}>
            Save
          </button>
          <ToastContainer />
        </>
      </div>
    </div>
  );
};

export default Budget;
