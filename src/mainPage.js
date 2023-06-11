import "./mainPage.css";

import { useNavigate } from "react-router-dom";
function MainPage() {
  const navigate = useNavigate();
  function signup() {
    navigate("/signUp", { return: false });
  }
  function signin() {
    navigate("/login", { return: false });
  }

  return (
    <div className="img-container w-100">
      <div className="d-flex flex-row justify-content-end w-100">
        <button className="btn button-style m-3" onClick={signup}>
          Sign Up
        </button>
        <button className="btn button-style m-3" onClick={signin}>
          Sign In
        </button>
      </div>
      <div className="heading-container w-25 d-flex flex-column p-5">
        <h1 className="text-center heading">Budget Tracker</h1>
        <p className="para"><em><strong>
          The Budget Tracker application empowers you to make informed financial decisions
          by providing real-time insights into your expenses, ensuring they stay
          within their budget and manage your finances effectively.</strong></em>
        </p>
       {/* <p>The application is designed to help users track and manage their personal expenses effectively. 
          It allows users to set a monthly budget based on their income and provides detailed insights into their 
          expenditures.</p>*/}
      </div>
    </div>
  );
}

export default MainPage;
