import { useEffect,useState } from 'react';
import './budgetTable.css';

import Expense from './ExpenseButton.js';





const Budget = ()=>{
    const months = ['April','May','June','July','August', 'September','October','November','December','January','Febrauary','March'];
 
    let default_months = {April:20000,May:50000,June:45000};
  const [ budget_input,setBudget] = useState({});
    useEffect(()=>{
        setBudget(default_months);

    },[]);

    const Trail = ()=>{
        console.log("ORKING");
        console.log(budget_input);
    }

    const set =(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setBudget(vals=>({...vals,[name]:value}))
    } 

    const List =(props)=>{
        return (<li className="lists">
                <div>
                    <label htmlFor={props.month} className="pr-5 months">{props.month}</label>
                    <input type='text' id={props.month} name={props.month}  value={budget_input[props.month]} onChange={set}/>
                </div>
            </li>)
    };

    return(
        <div className='w-100 bg-warning p-4'>
            <div className = 'd-flex flex-row justify-content-between w-100'>
                <h1>Enter Budget</h1>
                <Expense btn="Enter Expenses" addBtn="Add Expense" name="Add Expense"/>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <ul>
                    {months.map((month)=><List month={month}/>)}
                </ul>
            </div>
            <div>
                <button className="btn btn-primary" onClick={Trail}>Save</button>
            </div>
        </div>
    )
}

export default Budget;