import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import { useNavigate, Link } from "react-router-dom";

const Logout = ()=>{
    const navigate = useNavigate();
    
    return(
        <div>
            <label>Logout<button onClick={()=>{
                Cookies.remove("user_id");
                navigate("/", { replace: true });
            }} className='btn-transparent btn'><LogoutIcon/> </button></label>
        </div>
    )
}

export default Logout;