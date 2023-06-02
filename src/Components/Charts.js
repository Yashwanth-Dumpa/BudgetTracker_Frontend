
import { Chart } from "react-google-charts";
import {useState, useEffect,createContext, useContext} from 'react';

import { userDetailsContext } from '../Context';

import Cookies from 'js-cookie';
//const UserContext = createContext();

/*const Graph = ()=>{
    const {graphData,setGraphData} =  useContext(userDetailsContext);
    //var [graphData,setGraphData] = useState([]);
    setGraphData([['Expense', 'Rupees']])
    useEffect(()=>{
     
      fetch("http://localhost:5000/viewSpends")
      .then(response=>response.json())
      .then(jsonData=>{
          //console.log(jsonData);
          
          //setGraphData([['Expense', 'Rupees']])
          for(let i=0; i<jsonData.length; i++){
            graphData.push(Object.values(jsonData[i]))
          }
          console.log(graphData)
          setGraphData(graphData); 
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
                      data={graphData}
                      options={options}
                      />    
              </div>
        );
  };*/
 const Graph = ()=>{
    const user_id = Cookies.get('user_id');
    //var [data,setData] = useState([]);
   const {graphData,setGraphData}= useContext(userDetailsContext);
    useEffect(()=>{
      fetch("http://localhost:5000/"+user_id+"/viewSpends")
      .then(response=>response.json())
      .then(jsonData=>{
          //console.log(jsonData);
          let arr = [["Expense", "Rupees"]];
          jsonData.map((each)=>{
              return arr.push(Object.values(each))
          })
          console.log('Graph Expenses',arr);
          setGraphData(arr);
      }).catch((err)=>{
          console.log("Error",err);
      }) ;  
  
    },[])
    
     const options = {
      title:"View Spends",
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
                      data={graphData}
                      options={options}
                      />    
              </div>
        );
  };
  const Graph2 = ()=>{
      //var [data,setData] = useState([]);
      const user_id = Cookies.get('user_id');
      const {graphData1,setGraphData1} = useContext(userDetailsContext);
    // let array = [['Expenses','Rupees'],[100000,45000]];
      useEffect(()=>{
        fetch("http://localhost:5000/"+user_id+"/viewBalance")
        .then(response=>response.json())
        .then(jsonData=>{
            console.log(jsonData);
            let arr = [["Expense", "Rupees"]];
            /*jsonData.map((each)=>{
                return arr.push(Object.values(each))
            })*/
            console.log("GraphData1",arr);
            //setGraphData1(arr);
            //let jsonData = {income:50000,outcome:12000}
            //Object.keys(jsonData).map((key)=>{arr.push([key,jsonData[key]])});
            for(let i of jsonData){
                console.log(i);
            Object.keys(i).map((key)=>{arr.push([key,i[key]])});
            }
            console.log("Graph BAlance",arr);
            setGraphData1(arr);
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
              <div className="d-flex justify-content-center">
                        <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={graphData1}
                        options={options}
                        />    
                </div>
          );
    };


const Graphs = (props)=>{
   
    return(
    <div className="d-flex flex-row justify-content-around ">
        <Graph/>
        <Graph2/>
    </div>
    );
};

export default Graphs;