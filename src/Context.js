import { createContext, useState } from 'react';



//create a context, with createContext api
export const userDetailsContext = createContext();

const UserDetailsProvider = (props) => {
        // this state will be shared with all components 
    //const [userDetails, setUserDetails] = useState();
    const [data,setData] = useState([]);

    const [inputs,setInput] = useState({}); //Dates Object
    const [budget_balance,setBalance] = useState({});
    const [graphData,setGraphData] = useState([["Expense", "Rupees"]]);
    const [graphData1,setGraphData1] = useState([["Expense", "Rupees"]]);

    return (
                // this is the provider providing state
        <userDetailsContext.Provider value={{data, setData,graphData,setGraphData,graphData1,setGraphData1,inputs,setInput,budget_balance,setBalance}}>
            {props.children}
        </userDetailsContext.Provider>
    );
};

export default UserDetailsProvider;