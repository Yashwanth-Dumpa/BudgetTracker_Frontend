//For table

import './DataTable.css';
import {useState, useEffect} from 'react'; 
import Expense from './ExpenseButton.js';
import Delete from './DeleteButton.js';



const DataTable = ()=>{
 
    /*Printing data continously because of useEffect */ 
    var [data,setData] = useState([]);
    useEffect(()=>{
    fetch("http://localhost:5000/expenseTable")
    .then(response=>response.json())
    .then(jsonData=>{
        //console.log(jsonData);
         setData(jsonData);
    });
    },[<Delete/>]);


    return(
        <div className="d-flex justify-content-center ">
            <table className="w-75">
                <tr>
                    <th>Expense Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                </tr>
        
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.id}</td>
                            <td>{val.category}</td>
                            <td>{val.amount}</td>
                            <td>{val.date_and_time}</td>
                            <td><Expense btn="Edit" addBtn="Save Edit" name="Edit Expense" id={val.id}/></td>
                            <td><Delete id={val.id}/></td>
                        </tr>
                    )
                })}
            </table>
        </div>
       
    );

};

export default DataTable;