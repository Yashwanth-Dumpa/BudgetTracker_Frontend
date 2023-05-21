import './budgetTable.css';

import Expense from './ExpenseButton.js';

 const List =(props)=>{
    return (<li className="lists">
            <div>
                <label htmlFor={props.month} className="pr-5 months">{props.month}</label>
                <input type='text' id={props.month} default="0"/>
            </div>
        </li>)
};

const Budget = ()=>{
    const months = ['April','May','June','July','August', 'September','October','November','December','January','Febrauary','March'];
    return(
        <div className='w-100 bg-info p-4'>
            <div className = 'd-flex flex-row justify-content-between w-100'>
                <h1>Enter Budget</h1>
                <Expense btn="Enter Expenses" addBtn="Add Expense" name="Add Expense"/>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <ul>
                    {months.map((month)=><List month={month}/>)}
                </ul>
            </div>
        </div>
    )
}

export default Budget;