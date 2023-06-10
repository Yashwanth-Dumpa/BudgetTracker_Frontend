import { useEffect, useContext } from "react";
import { userDetailsContext } from "../Context";
import Cookies from "js-cookie";
import Expense from "./ExpenseButton.js";
import Logout from "../logout";

const Dates = () => {
  const user_id = Cookies.get("user_id");
  const { setData, inputs, setInput, setGraphData, setGraphData1 } =
    useContext(userDetailsContext);

    let date = new Date().toJSON().slice(0, 10);
    let defaultDate = { from: date, to: date };

  useEffect(() => {
    setInput(defaultDate);
  }, []);

  const set = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((vals) => ({ ...vals, [name]: value }));
  };

  function display() {
    
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

        fetch("http://localhost:5000/" + user_id + "/expenseTable").then(() => {
          dateJson.map((each) => {
            let ele = each;
            const date = new Date(ele["date_and_time"]);
            const formattedDate = date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            ele["date_and_time"] = formattedDate;
          });
          setData(dateJson);
        }); // Datatable URL

        fetch(
          "http://localhost:5000/" +
            user_id +
            "/viewSpendsDates/?start='" +
            inputs.from +
            "'&end='" +
            inputs.to +
            "'"
        )
          .then((response) => response.json())
          .then((data) => {
            let arr = [["Expense", "Rupees"]]; //Error: has 4 columns but should have two.
            data.map((each) => {
              arr.push([each.category, each.amount]);
              return arr;
            });
            console.log(arr);
            setGraphData(arr);
          });
      }); //line 1 closing tag.
  } //Display Function closing bracket.

  return (
    <div>
      <div className="w-100  d-flex justify-content-around">
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
          <input
            type="date"
            id="to"
            name="to"
            onChange={set}
            value={inputs.to}
          />
        </div>
        <button
          className="ml-3 btn btn-primary mr-3"
          type="button"
          onClick={display}
        >
          Show Expenses
        </button>
      </div>
    
    </div>
  );
};
export default Dates;
