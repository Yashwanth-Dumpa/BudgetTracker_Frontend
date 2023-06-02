import './modal.css'
import React from 'react';
import {useState, useEffect,useContext} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';      
//import DeleteIcon from '@mui/icons-material/Delete';

import { userDetailsContext } from '../Context';

import Cookies from 'js-cookie';


function Expense(props){
    let defaultObject = {amount:0,category:"Entertainment",date:"2023-05-23",remarks:"No remarks"};

        const user_id = Cookies.get('user_id');
        console.log("Expenses button.js for displaying table",user_id);

    const {setData} = useContext(userDetailsContext);
    const {setGraphData,setGraphData1} =  useContext(userDetailsContext);
   
    const [inputs,setInput] = useState({});
    useEffect(()=>{
        setInput(defaultObject);
    },[]);
    const set = (event)=>{
         const name = event.target.name;
         const value = event.target.value;
         setInput(vals=>({...vals,[name]:value}))
    }

function notes(){
    toast.warning('Success Notification !', {
        position: toast.POSITION.TOP_RIGHT
    });
}
    function add(id){
        //console.log(inputs);
        if(!id){
            let options = {
                mode:'cors',
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(inputs)
                
            }
            console.log("Options", inputs);
            fetch('http://localhost:5000/'+user_id+'/addExpense',options);
            alert("Expense added");
        } else{
            let options = {
                mode:'cors',
                method:"PUT",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(inputs)
                
            }
            console.log("Options", inputs);
            fetch('http://localhost:5000/'+user_id+'/editExpense/'+props.id,options)
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

            })        
            notes();
        }
    }
    return(
        <Popup
        trigger={
            <button type="button" className="button">
                {props.btn}
            </button>
        }
        modal nested >
        {close => (
            <div className="p-4">
                <button className="close" onClick={close}>
                    &times;
                </button> 
                <div className="header text-center">{props.name}</div>
                <div className="content m-4">
                    <div className="d-flex justify-content-between">
                        <div>
                            <label htmlFor="amount" className='pr-3'>Amount</label>
                            <input type="number" id="amount" name='amount' value={inputs.amount} onChange={set}/>
                        </div>
                        <div>
                            <label htmlFor="options" className='pr-3'>Category</label>
                            <select id='options' name='category' value={inputs.category} onChange={set}>
                                <option>Groceries</option>
                                <option>Rent</option>
                                <option>Bills(Electricity,Telephone,etc.)</option>
                                <option>Entertainment</option>
                                <option>EMI</option>
                                <option>Travel</option>
                                <option>Medical</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <label htmlFor = "date" className='pr-3'>Date</label>
                        <input type='date' id='date' name='date' value={inputs.date} onChange={set}/>
                    </div>
                    <label>Remarks</label>
                    <textarea  rows='3' cols='85' className="w-100" name='remarks' value={inputs.remarks} onChange={set}/>
                </div>
                <div className="d-flex justify-content-between">

                    <button type="button" className="btn btn-secondary" 
                            onClick={() => {
                            console.log('modal closed ');
                            close();}}>close
                    </button>
                    <>
                    <button type="button" className="btn btn-primary" onClick={()=>{
                        add(props.id);
                        close();
                    }}>{props.addBtn}</button>
                    <ToastContainer/>
                    </>
                </div>
            </div>
        )}
    </Popup >
    )
}

export default Expense;