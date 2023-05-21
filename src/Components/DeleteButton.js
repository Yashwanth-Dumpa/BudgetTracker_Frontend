import React from 'react';
import {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DeleteIcon from '@mui/icons-material/Delete';


function Delete(props){
    

    function del(){
        let options = {
            method:"DELETE",
            mode:"cors"
        }
        
        fetch("http://localhost:5000/delete-expense/"+props.id,options);
    }
    return(
        <Popup
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
                        del();
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
    </Popup >
    )
}

export default Delete;