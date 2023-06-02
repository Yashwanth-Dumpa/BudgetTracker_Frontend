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
          <button className="btn button-style m-4" onClick={signup}>
            Sign Up
          </button>
          <button className="btn button-style m-4" onClick={signin}>
            Sign In
          </button>
        </div>
        <div className='heading-container'>
        <h1 className='m-4 bg-info'>Budget Tracker</h1>
        </div>
      </div>

  );
}

export default MainPage;
