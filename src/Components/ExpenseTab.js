import React from 'react';
import DataTable from './DataTable.js';
import Graphs from './Charts.js';
import Dates from './Dates.js';


const Expense = ()=>{
    return(
        <div className="p-3">
            <Dates/>
            <Graphs/>
            <DataTable/>
        </div>

    )
};

export default Expense;