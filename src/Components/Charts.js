
import { Chart } from "react-google-charts";
import {useState, useEffect,createContext, useContext} from 'react';

const UserContext = createContext();

const Graph = ()=>{
    var [data,setData] = useState([]);
  
    useEffect(()=>{
      fetch("http://localhost:5000/viewSpends")
      .then(response=>response.json())
      .then(jsonData=>{
          //console.log(jsonData);
          let arr = [["Expense", "Rupees"]];
          jsonData.map((each)=>{
              return arr.push(Object.values(each))
          })
          console.log(arr);
          setData(arr);
      }).catch((err)=>{
          console.log("Error",err);
      }) ;  
  
    },[])
    
     const options = {
      title:"View by Spends",
      titleTextStyle: {
          color: "Black",    
          fontName: "Roboto", 
          fontSize: 30, 
          bold: true,    
          italic: false
      },
      pieHole: 0.4,
      is3D: false,
      legend:{position:"bottom"},
      width:"500",
      height:"400",
    };
        return (
            <div className="d-flex justify-content-center">
                      <Chart
                      chartType="PieChart"
                      width="100%"
                      height="400px"
                      data={data}
                      options={options}
                      />    
              </div>
        );
  };
  const Graph2 = ()=>{
      var [data,setData] = useState([]);
    
      useEffect(()=>{
        fetch("http://localhost:5000/viewBalance")
        .then(response=>response.json())
        .then(jsonData=>{
            //console.log(jsonData);
            let arr = [["Expense", "Rupees"]];
            jsonData.map((each)=>{
                return arr.push(Object.values(each))
            })
            console.log(arr);
            setData(arr);
        }).catch((err)=>{
            console.log("Error",err);
        }) ;  
    
      },[])
      
       const options = {
        title:"View Balance",
        titleTextStyle: {
            color: "Black",    
            fontName: "Roboto", 
            fontSize: 30, 
            bold: true,    
            italic: false
        },
        pieHole: 0.4,
        is3D: false,
        legend:{position:"bottom"},
        width:"500",
        height:"400",
      };
          return (
            <UserContext.Provider value={data}>
              <div className="d-flex justify-content-center">
                        <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={data}
                        options={options}
                        />    
                </div>
            </UserContext.Provider>
          );
    };


const Graphs = ()=>{
    return(
    <div className="d-flex flex-row justify-content-around ">
        <Graph/>
        <Graph2/>
    </div>
    );
};

export default Graphs;