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
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { red } from "@mui/material/colors";

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

    {
      /* const data = [{category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"},
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
  {category:"Trial",amount:15000,date_and_time:"25 Mar 120",remarks:"undefined"}]*/
    }

    return (
      <>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
          <TableCell>
            <TextField
              sx={{ border: 0 }}
              variant="outlined"
              id="outlined-start-adornment"
              className="mr-4 ml-4 mb-4 border-0"
              name={row.month}
              type="number"
              value={budget_input[row.month]}
              onChange={set}
            />
          </TableCell>
          <TableCell align="right">{row.salary}</TableCell>
          <TableCell align="right">
            {row.balance === null ? row.salary : row.balance}
          </TableCell>
          <TableCell align="right">
            {row.balance === null ? 0 : row.spends}
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
    );
  }

  //-------------------------------------------------------

  const user_id = Cookies.get("user_id");
  console.log(user_id, "In BudgetTable.js Budget cmponent ");
  const [open, setOpen] = React.useState(undefined);

  const [tableData, setTableData] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState([]);
  const [budget_input, setBudget] = useState({});

  //const { data, setData} = useContext(userDetailsContext); //To filll monthly wise details.

  const { budget_balance, setBalance } = useContext(userDetailsContext); //rendering in expensebutton.js when Add expense button is clicked.
  function createData(month, salary, spends, monthly_data) {
    return {
      month,
      salary,
      spends,
      history: monthly_data, //Array of Objects
    };
  }

  //const tableData = [];

  /*for(let i of months){
    /*fetch("http://localhost:5000/"+user_id+"/viewSpendsMonth/?start="+i)
          .then(response=>response.json())
          .then(data=>{
            console.log("Monthly budget API call",data);
            tableData.push(createData(i,budget_input[i],budget_balance[i]),data);
          })        // tableData.push(createData(i,budget_input[i],budget_balance[i],monthlyBudget));  
  }*/

  console.log("Table Data from budget table.js", tableData);
  console.log("MOnthly budget use effect", monthlyBudget);

  //---------------------------For table styling---------------------------------------------------
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  //----------------------------------------------------------------------------------

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
        //Write an api for balance set
        /*fetch("http://localhost:5000/"+user_id+"/getBudget/spends")
        .then(response=>response.json())
        .then((data)=>{
          console.log(data);
          setBalance(data);
        });*/
      });

    fetch("http://localhost:5000/" + user_id + "/getBudget/spends")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBalance(data);
      });

    for (let i of months) {
      fetch("http://localhost:5000/" + user_id + "/viewSpendsMonth/?start=" + i)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          data.map((each) => {
            let ele = each;
            //console.log(ele['date_and_time']);
            const date = new Date(ele["date_and_time"]);
            const formattedDate = date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            ele["date_and_time"] = formattedDate;
          });
          //tableData.push(createData(i,budget_input[i],budget_balance[i],data));
          setMonthlyBudget(data);
          setTableData((vals) => [
            ...vals,
            createData(i, budget_input[i], budget_balance[i], data),
          ]);
          //tableData.push(createData(i,budget_input[i],budget_balance[i],data));
        });
    }
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
      fetch("http://localhost:5000/" + user_id + "/getBudget/spends")
        .then((response) => response.json())
        .then((data) => {
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
      <div className="w-100 p-4">
        <div className="text-center">
          <h1
            style={{
              fontFamily: "Times New Roman",
              fontWeight: 600,
              color: "black",
              fontSize: "40px",
            }}
          >
            Enter Budget
          </h1>
        </div>
        <div className="d-flex pl-5 pr-5 flex-row justify-content-between">
          <Expense
            btn="Enter Expenses"
            addBtn="Add Expense"
            name="Add Expense"
          />
          <button className="btn btn-primary" onClick={save}>
            Save
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    <h5>Month</h5>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <h5>Income</h5>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <h5>Balance</h5>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <h5>Spends</h5>
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*<Row key={data.month} row={data} />*/}
                {tableData.map((row, key) => (
                  <>
                    <>
                      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                        <TableCell align="center" component="th" scope="row">
                          {row.month}
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            sx={{ border: 0 }}
                            size="small"
                            variant="outlined"
                            id="outlined-start-adornment"
                            className="mr-4 ml-4 mb-4 border-0"
                            name={row.month}
                            type="number"
                            value={budget_input[row.month]}
                            onChange={set}
                          />
                        </TableCell>
                        {/*<TableCell align="right">{row.salary}</TableCell>*/}
                        <TableCell align="center">
                          {budget_input[row.month] - budget_balance[row.month]}
                        </TableCell>
                        <TableCell align="center">
                          {budget_balance[row.month]}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() =>
                              open === undefined
                                ? setOpen(key)
                                : setOpen(undefined)
                            }
                          >
                            {open === key ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}
                        >
                          <Collapse
                            in={open === key}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ margin: 1 }}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                              >
                                Transactions
                              </Typography>
                              <Table size="small" aria-label="purchases">
                                <TableHead>
                                  <TableRow className="bg-primary">
                                    <TableCell align="center">S.No</TableCell>
                                    <TableCell align="center">
                                      Category
                                    </TableCell>
                                    <TableCell align="center">Amount</TableCell>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">
                                      Remarks
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {row.history.map((historyRow, key) => (
                                    <TableRow key={historyRow.date}>
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                      >
                                        {key + 1}
                                      </TableCell>
                                      <TableCell align="center">
                                        {historyRow.category}
                                      </TableCell>
                                      <TableCell align="center">
                                        {historyRow.amount}
                                      </TableCell>
                                      <TableCell align="center">
                                        {historyRow.date_and_time}
                                      </TableCell>
                                      <TableCell align="center">
                                        {historyRow.remarks === 'undefined'
                                          ? "-"
                                          : historyRow.remarks}
                                      </TableCell>
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
        </Paper>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Budget;
