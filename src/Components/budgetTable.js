
import { useState, useEffect, useContext } from "react";
import { userDetailsContext } from "../Context";
import "./budgetTable.css";
import InputAdornment from "@mui/material/InputAdornment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Expense from "./ExpenseButton.js";

import Cookies from "js-cookie";
import { TextField } from "@mui/material";

//-----------------------------------------------------

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';












const Budget = () => {


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
  //-----------------For Collapsible table --------------------------------------
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    //const { data, setData} = useContext(userDetailsContext);
  
   {/* const data = [{category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
    {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
  {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"}]*/}
  
    return ( 
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.month}
          </TableCell>
          <TableCell><TextField sx={{border:0}}
                      variant="outlined" 
                      id="outlined-start-adornment"
                      className="mr-4 ml-4 mb-4 border-0"
                      name={row.month} type='number'
                      value={budget_input[row.month]}
                      onChange={set}
                    /></TableCell>
          <TableCell align="right">{row.salary}</TableCell>
          <TableCell align="right">{row.balance===null?row.salary:row.balance}</TableCell>
          <TableCell align="right">{row.balance===null?0:row.spends}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>S.No</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell>{historyRow.amount}</TableCell>
              
                      
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        </>
      
    );
  }
  


//-------------------------------------------------------


  const user_id = Cookies.get("user_id");
  console.log(user_id, "In BudgetTable.js Budget cmponent ");
  const [open, setOpen] = React.useState(false);


  //const { data, setData} = useContext(userDetailsContext); //To filll monthly wise details.
  const [budget_input, setBudget] = useState({});
  const {budget_balance,setBalance} = useContext(userDetailsContext);//rendering in expensebutton.js when Add expense button is clicked.
  function createData(month, salary, balance,monthly_data) {
    return {
      month, salary, balance, spends:salary-balance,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ]/*history:monthly_data*/
    };
  }
  
const tableData = [];
  for(let i of months){
    /*fetch("http://localhost/"+user_id+"/viewSpends/"+i)
    .then((response)=>response.json())
    .then((monthly_budget)=>{
      tableData.push(createData(i,budget_input[i],budget_balance[i]));
    });*/
   /* fetch("http://localhost:5000/"+user_id+"/viewSpendsMonth/?start="+i)
          .then(response=>response.json())
          .then(data=>{
            console.log("Monthly budget API call",data);
            tableData.push(createData(i,budget_input[i],budget_balance[i]),data);
          })*/
          tableData.push(createData(i,budget_input[i],budget_balance[i]));
     
  }
console.log('Table Data from budget table.js',tableData);

  

  const set = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBudget((vals) => ({ ...vals, [name]: value }));
  };
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



  return (
    <div>
    <div className="w-100 bg-warning p-4">
      <div className="d-flex flex-row justify-content-between w-100">
        <h1>Enter Budget</h1>
        <Expense btn="Enter Expenses" addBtn="Add Expense" name="Add Expense" />
      </div>
      {<div className="d-flex flex-row justify-content-center">
        <ul>
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
                    }} value={budget_balance[month]===null?budget_input[month]:budget_balance[month]}
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
      </div>}
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
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className='bg-dark'>
            <TableCell align="center" className='text-light'><h5>Month</h5></TableCell>
            <TableCell align="center" className='text-light'><h5>Income</h5></TableCell>
            <TableCell align="center" className='text-light'><h5>Balance</h5></TableCell>
            <TableCell align="center" className='text-light'><h5>Spends</h5></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*<Row key={data.month} row={data} />*/}
          {tableData.map((row) => (
            <>
             <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          
          <TableCell align="center">{row.month}</TableCell>
          <TableCell align="center"><TextField sx={{border:0}} size="small"
                      variant="outlined" 
                      id="outlined-start-adornment"
                      className="mr-4 ml-4 mb-4 border-0"
                      name={row.month} type='number'
                      value={budget_input[row.month]}
                      onChange={set}
                    /></TableCell>
          {/*<TableCell align="right">{row.salary}</TableCell>*/}
          <TableCell align="center">{row.balance===null?row.salary:row.balance}</TableCell>
          <TableCell align="center">{row.balance===null?0:row.spends}</TableCell>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>S.No</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell>{historyRow.amount}</TableCell>
              
                      
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        </>
            </>
            

          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default Budget;
