import {useState,useEffect} from 'react';


const Dates = ()=>{

   const [inputs,setInput] = useState({});
   let defaultDate = {from:"2023-04-01", to:"2023-04-30"};
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
    fetch("http://localhost:5000/?start= & end=");
   }

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