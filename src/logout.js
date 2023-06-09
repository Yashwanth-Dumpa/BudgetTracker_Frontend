import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <label>
        <button type='button'
          className="btn-danger btn"
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
