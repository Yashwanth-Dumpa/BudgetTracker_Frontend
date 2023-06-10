import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { useEffect,useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [userName,setuserName] = useState('');
   const user_id = Cookies.get('user_id');

useEffect(()=>{

  console.log(userName);
  fetch("http://localhost:5000/"+user_id+"/userName")
  .then(response=>response.json())
  .then(data=>{
    setuserName(data[0].firstname);
  })

},[]);

  return (
    <div className="d-flex justify-content-between pt-2">
      <h5 className='ml-3'><em>Welcome {userName}</em></h5>
      <label>
        <button type='button'
          className="btn-danger btn mr-3"
          data-toggle="tooltip"
          data-placement="top"
          title="Logout"
          onClick={() => {
            Cookies.remove("user_id");
            navigate("/", { replace: true });
          }}
        >
          <LogoutIcon />{" "}
        </button>
      </label>
    </div>
  );
};

export default Logout;
