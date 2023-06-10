import { Chart } from "react-google-charts";
import { useEffect, useContext } from "react";
import { userDetailsContext } from "../Context";
import Cookies from "js-cookie";

const Graph = () => {
  const user_id = Cookies.get("user_id");
  const { graphData, setGraphData } = useContext(userDetailsContext);
  useEffect(() => {
    fetch("http://localhost:5000/" + user_id + "/viewSpends")
      .then((response) => response.json())
      .then((jsonData) => {
        let arr = [["Expense", "Rupees"]];
        jsonData.map((each) => {
          return arr.push(Object.values(each));
        });
        setGraphData(arr);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  const options = {
    title: "View Spends",
    titleTextStyle: {
      color: "Black",
      fontName: "Roboto",
      fontSize: 30,
      bold: true,
      italic: false,
    },
    pieHole: 0.4,
    is3D: false,
    legend: { position: "bottom" },
    width: "500",
    height: "400",
  };
  return (
    <div className="d-flex justify-content-center">
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={graphData}
        options={options}
      />
    </div>
  );
};
const Graph2 = () => {
  const user_id = Cookies.get("user_id");
  const { graphData1, setGraphData1 } = useContext(userDetailsContext);
  useEffect(() => {
    fetch("http://localhost:5000/" + user_id + "/viewBalance")
      .then((response) => response.json())
      .then((jsonData) => {
        let arr = [["Expense", "Rupees"]];
        for (let i of jsonData) {
          Object.keys(i).map((key) => {
            arr.push([key, i[key]]);
          });
        }
        setGraphData1(arr);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  const options = {
    title: "View Balance",
    titleTextStyle: {
      color: "Black",
      fontName: "Roboto",
      fontSize: 30,
      bold: true,
      italic: false,
    },
    pieHole: 0.4,
    is3D: false,
    legend: { position: "bottom" },
    width: "500",
    height: "400",
  };
  return (
    <div className="d-flex justify-content-center">
      <Chart
        chartType="PieChart"
        width="50%"
        height="400px"
        data={graphData1}
        options={options}
      />
    </div>
  );
};

const Graphs = (props) => {
  return (
    <div className="d-flex flex-row justify-content-around ">
      <Graph />
      <Graph2 />
    </div>
  );
};

export default Graphs;
