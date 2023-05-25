
import { useEffect, useContext} from 'react';
import { userDetailsContext } from '../Context';

const Dates = ()=>{

   const {setData,inputs,setInput,setGraphData,setGraphData1} = useContext(userDetailsContext);
   let defaultDate = {from:"2023-04-23", to:"2023-05-23"};
   useEffect(()=>{
        setInput(defaultDate);
   },[]);


   const set = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setInput(vals=>({...vals,[name]:value}))
   }

   function display(){
    console.log("Dates",inputs);
    fetch("http://localhost:5000/?start='"+inputs.from+"'&end='"+inputs.to+"'")
    .then(response=>response.json())
    .then(dateJson=>{//line 1

     fetch("http://localhost:5000/expenseTable")
     .then(()=>{
          setData(dateJson);
     })// Datatable URL

     fetch("http://localhost:5000/viewBalance").then(()=>{
          let arr = [["Expense", "Rupees"]]; //error has 4 columns but should have two.
                    dateJson.map((each)=>{
                        return arr.push(Object.values(each))
                    })
                    console.log(arr);
                    setGraphData(arr);
     })

    })//line 1 closing tag.
 


   }//Display Function closing bracket.

    return(
        <div className='w-75  d-flex justify-content-around'>
                <div className="pr-5">
                <label htmlFor="from" className='pr-4'>From</label>
                <input type="date" id='from' className='mr-5' name="from" onChange={set} value={inputs.from}/>
                </div>
                <div className="pr-5">
                <label htmlFor='to' className='pr-4'>To</label>
                <input type="date" id='to' name="to" onChange={set} value={inputs.to}/> 
                </div>
                <button className="ml-3" type="button" onClick={display}>Show Expenses</button>
            </div>
    );
};
export default Dates;