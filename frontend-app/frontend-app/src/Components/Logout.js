import { useNavigate } from "react-router-dom";

function Logout(){

    let navigate = useNavigate();
    let handlelogout= ()=>{
        sessionStorage.removeItem("user")
        navigate("/")
    }

    return(
        <div>
           <input type="button" value="logout" onClick={handlelogout}/>
        </div>
    )
    }
    
    export default Logout;