//For table
import "./DataTable.css";
import { useState, useEffect, useContext } from "react";
import Expense from "./ExpenseButton.js";
import { TextField } from "@mui/material";
//Delete
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

import Cookies from "js-cookie";
import { userDetailsContext } from "../Context";

//----------------Table Imports
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const DataTable = (props) => {
  const user_id = Cookies.get("user_id");
  const { data, setData, graphData, setGraphData, graphdata1, setGraphData1 } =
    useContext(userDetailsContext);
    const {budget_balance,setBalance} = useContext(userDetailsContext);
    
  useEffect(() => {

    fetch("http://localhost:5000/" + user_id + "/expenseTable")
      .then((response) => response.json())
      .then((jsonData) => {
        jsonData.map((each) => {
          let ele = each;
          const date = new Date(ele["date_and_time"]);
          const formattedDate = date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          ele["date_and_time"] = formattedDate;
        });
        setData(jsonData);
      });
  }, []);

  function del(id) {
    let options = {
      method: "DELETE",
      mode: "cors",
    };

    fetch(
      "http://localhost:5000/" + user_id + "/delete-expense/" + id,
      options
    ).then(() => {

      fetch("http://localhost:5000/"+user_id+"/getBudget/spends")
      .then(response=>response.json())
      .then((data)=>{
        console.log(data);
        setBalance(data);
      });
      

      fetch("http://localhost:5000/" + user_id + "/expenseTable")
        .then((response) => response.json())
        .then((jsonData) => {
          jsonData.map((each) => {
            let ele = each;
            const date = new Date(ele["date_and_time"]);
            const formattedDate = date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            ele["date_and_time"] = formattedDate;
          });
          setData(jsonData);
        });

      fetch("http://localhost:5000/" + user_id + "/viewSpends")
        .then((response) => response.json())
        .then((jsonData) => {
          let arr = [["Expense", "Rupees"]];
          jsonData.map((each) => {
            return arr.push(Object.values(each));
          });
          setGraphData(arr);
        });

      fetch("http://localhost:5000/" + user_id + "/viewBalance")
        .then((response) => response.json())
        .then((jsonData) => {
          console.log(jsonData);
          let arr = [["Expense", "Rupees"]];
          for (let i of jsonData) {
            Object.keys(i).map((key) => {
              arr.push([key, i[key]]);
            });
          }
          setGraphData1(arr);
        });
    });
  }

  //--------------------For Table------------------------------------------

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
  //------------------------------------For Pagination------------------------
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <div className="d-flex justify-content-center">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 300 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S. No</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Remarks</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((val, key) => (
                    <StyledTableRow key={key}>
                      <StyledTableCell component="th" scope="row">
                        {key + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {val.category}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {val.amount}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {val.date_and_time}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {val.remarks === "undefined" ? "-" : val.remarks}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Expense
                          btn="Edit"
                          addBtn="Save Edit"
                          name="Edit Expense"
                          id={val.id}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Popup
                          trigger={<DeleteIcon sx={{ color: red[500] }} />}
                          modal
                          nested
                        >
                          {(close) => (
                            <div className="p-4">
                              <button className="close" onClick={close}>
                                &times;
                              </button>

                              <div className="text-center">
                                <p>
                                  Are you sure you want to delete it? Once
                                  deleted it cannot be restored.
                                </p>
                              </div>
                              <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-around w-50">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                      del(val.id);
                                      close();
                                    }}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                      console.log("modal closed ");
                                      close();
                                    }}
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Popup>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
  );
};

export default DataTable;
