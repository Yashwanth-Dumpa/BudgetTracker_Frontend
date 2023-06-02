//For table

import './DataTable.css';
import {useState, useEffect, useContext} from 'react'; 
import Expense from './ExpenseButton.js';

//Delete
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DeleteIcon from '@mui/icons-material/Delete';

import Cookies from 'js-cookie';
import { userDetailsContext } from '../Context';


const DataTable = (props)=>{
   
    /*Printing data continously because of useEffect */ 
   // var [data,setData] = useState([]);
   const user_id = Cookies.get('user_id');
   const {data,setData,graphData,setGraphData, graphdata1,setGraphData1} = useContext(userDetailsContext);
    useEffect(()=>{
    fetch("http://localhost:5000/"+user_id+"/expenseTable")
    .then(response=>response.json())
    .then(jsonData=>{
        //console.log("Expense Table",jsonData);
        jsonData.map((each)=>{
            let ele = each;
            //console.log(ele['date_and_time']);
            const date = new Date(ele['date_and_time'])
            const formattedDate = date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
            })
        
            console.log(formattedDate);
                ele["date_and_time"] = formattedDate;
                console.log(each);
            })
         setData(jsonData);
        });
    },[]);

    function del(id){
        let options = {
            method:"DELETE",
            mode:"cors"
        }
        
        fetch("http://localhost:5000/"+user_id+"/delete-expense/"+id,options)
        .then(()=>{
            fetch("http://localhost:5000/"+user_id+"/expenseTable")
            .then(response=>response.json())
            .then(jsonData=>{
                //console.log(jsonData);
                jsonData.map((each)=>{
                    let ele = each;
                    //console.log(ele['date_and_time']);
                    const date = new Date(ele['date_and_time'])
                    const formattedDate = date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                    })
                
                    console.log(formattedDate);
                        ele["date_and_time"] = formattedDate;
                        console.log(each);
                    })
                setData(jsonData);
            });

            fetch("http://localhost:5000/"+user_id+"/viewSpends")
            .then(response=>response.json())
            .then(jsonData=>{
          //console.log(jsonData);
          let arr = [["Expense", "Rupees"]];
          jsonData.map((each)=>{
              return arr.push(Object.values(each))
          })
          console.log(arr);
          setGraphData(arr);
      })

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
        })
      
        });
    }


    return(
        <div className="d-flex justify-content-center ">
            <table className="w-75">
                <tr>
                    <th>Expense Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Remarks</th>
                    <th></th>
                </tr>
        
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.category}</td>
                            <td>{val.amount}</td>
                            <td>{val.date_and_time}</td>
                            <td>{val.remarks}</td>
                            <td><Expense btn="Edit" addBtn="Save Edit" name="Edit Expense" id={val.id}/></td>
                
                            <td><Popup
        trigger={
            <DeleteIcon color="primary"/>
        }
        modal nested >
        {close => (
            <div className="p-4">
                <button className="close" onClick={close}>
                    &times;
                </button> 
    
                <div className='text-center'>
                    <p >Are you sure you want to delete it?</p>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className="d-flex justify-content-around w-50">
                    
                    <button type="button" className="btn btn-primary" 
                    onClick = {()=>{
                        del(val.id);
                        close();}}>
                        Yes</button>
                    <button type="button" className="btn btn-secondary" 
                            onClick={() => {
                            console.log('modal closed ');
                            close();}}>No
                    </button>
                    </div>
                </div>
            </div>
        )}
    </Popup ></td>
                        </tr>
                    )
                })}
            </table>
        </div>
       
    );

};

export default DataTable;