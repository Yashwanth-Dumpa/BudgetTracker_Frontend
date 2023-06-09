import "./App.css";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CollapsibleTable from "./Components/muiTablesTrial";
import Test from "./test.js";
import Budget from "./Components/budgetTable.js";
import Expense from "./Components/ExpenseTab.js";
import SignUp from "./signUp.js";
import { Login } from "./login.js";
import MainPage from "./mainPage.js";
import UserDetailsProvider from "./Context.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./logout";
function App() {
  //const user = useContext(UserContext);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p:1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/table" element={<CollapsibleTable />} />
        <Route
          path="/home"
          element={
            <UserDetailsProvider>
              <Box sx={{ width: "100%" , maxHeight:10}}>
                
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Typography><Header/></Typography>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    centered
                  >
                    <Tab label="Expenses" {...a11yProps(0)} />
                    <Tab label="Budget" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
              
                    <Expense />
                 
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Budget />
                </TabPanel>
              </Box>
            </UserDetailsProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
