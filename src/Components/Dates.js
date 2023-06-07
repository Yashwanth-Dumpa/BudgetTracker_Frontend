import { useEffect, useContext } from "react";
import { userDetailsContext } from "../Context";
import Cookies from "js-cookie";

import Logout from "../logout";

import Test from "../test.js";

const Dates = () => {
  const user_id = Cookies.get("user_id");
  const { setData, inputs, setInput, setGraphData, setGraphData1 } =
    useContext(userDetailsContext);
  let defaultDate = { from: "2023-04-23", to: "2023-05-23" };
  useEffect(() => {
    setInput(defaultDate);
  }, []);

  const set = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((vals) => ({ ...vals, [name]: value }));
  };

  function display() {
    console.log("Dates", inputs);
    fetch(
      "http://localhost:5000/" +
        user_id +
        "/dates/?start='" +
        inputs.from +
        "'&end='" +
        inputs.to +
        "'"
    )
      .then((response) => response.json())
      .then((dateJson) => {
        //line 1

        fetch("http://localhost:5000/" + user_id + "/expenseTable").then(() => {
          dateJson.map((each) => {
            let ele = each;
            //console.log(ele['date_and_time']);
            const date = new Date(ele["date_and_time"]);
            const formattedDate = date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            console.log(formattedDate);
            ele["date_and_time"] = formattedDate;
            console.log(each);
          });
          setData(dateJson);
        }); // Datatable URL

        fetch("http://localhost:5000/" + user_id + "/viewBalance").then(() => {
          let arr = [["Expense", "Rupees"]]; //error has 4 columns but should have two.
          dateJson.map((each) => {
            return arr.push(Object.values(each));
          });
          console.log(arr);
          setGraphData(arr);
        });
      }); //line 1 closing tag.
  } //Display Function closing bracket.

  return (
     <div className='d-flex justify-content-between'>
    <div className="w-75  d-flex justify-content-around">
      <div className="pr-5">
        <label htmlFor="from" className="pr-4">
          From
        </label>
        <input
          type="date"
          id="from"
          className="mr-5"
          name="from"
          onChange={set}
          value={inputs.from}
        />
      </div>
      <div className="pr-5">
        <label htmlFor="to" className="pr-4">
          To
        </label>
        <input type="date" id="to" name="to" onChange={set} value={inputs.to} />
      </div>

      <button
        className="ml-3 btn btn-primary mr-3"
        type="button"
        onClick={display}
      >
        Show Expenses
      </button>
    </div>
    <div className='d-flex'>
    <Test/>
    <Logout/>
    </div>
    </div>
  );
};
export default Dates;
