

import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';    

import { useNavigate, Link } from "react-router-dom"

import {useState, useEffect,createContext, useContext} from 'react';

import Cookies from 'js-cookie';



const Test =(props)=>{
    function trial(){
        alert("Inside");
    }

    function notes(){
        toast.warning('Success Notification !', {
            position: toast.POSITION.TOP_RIGHT
        });
        
    }

    function log(){
        Cookies.remove('user_id');
    }
   const [inputs,setInput] = useState({});
   let trialobject = {june: 'Hello June', april: 'Hi April', may: 'Hi May', date: '2023-05-04', category: 'Groceries'};
   useEffect(()=>{
        setInput(trialobject);
   },
   []);
   const set = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setInput(vals=>({...vals,[name]:value}))
   }

    const show = ()=>{
        let options = {
            mode:'cors',
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(inputs)
            
        }
        console.log("Options", inputs);
        fetch('http://localhost:5000/test',options);
        
    }
    
    const getDetails = ()=>{
        let options = {
            method:'GET',
            mode:"cors"
        }
        console.log(props);
        fetch("http://localhost:5000/"+21+"/expenseTable")
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
           console.log( 'Cookies', Cookies.get('user_id'));
        })
    }



    return(
    <>
        <h1>Hello Testing</h1>
        <input type='text'  name='june' value={inputs.june||"Hello June"} onChange={set}/>
        <input type='text'  name='april' value={inputs.april||2} onChange={set}/>
        <input type='text' name='may' value={inputs.may||3}  onChange={set}/>
        <input type='date' name='date' value={inputs.date}  onChange={set}/>

        <TextField label="Fisrt NAme" required/>
        <select id='options' name='category' value={inputs.category||"Groceries"} onChange={set}>
                                <option>Groceries</option>
                                <option>Rent</option>
                                <option>Bills(Electricity,Telephone,etc.)</option>
                                <option selected>Entertainment</option>
                                <option>EMI</option>
                                <option>Travel</option>
                                <option>Medical</option>
                            </select>
        <button onClick={show}> Show</button>
        <button onClick={getDetails}>Get Details</button>
        <button onClick={notes}>Show toast Notification</button>
        <button onClick={trial}>Show trial</button>

        <button onClick={log}>LogOUT</button>

        <ToastContainer/>

       
        <Link to='/signUp'>Sign Up</Link>

       

     
    </>   


    )
}

export default Test