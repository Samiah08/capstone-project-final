import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Login(){
let url = "http://localhost:9191/login/signin";
let[emailid,setEmailId]=useState("");
let[password,setPassword]=useState("");
let[typeofuser,setTypeOfUser]=useState("");
let [error,setError]=useState("");
let navigate =useNavigate();

let handleSubmit = (event) => {
    event.preventDefault();
    if (emailid.length === 0 || password.length === 0 || typeofuser.length === 0) {
        setError("Please write email ID or password or select type of user");
    } else {
        let login = { emailid, password, typeofuser };
        axios.post(url, login).then(result => {
            if (result.data === "user login successfully") {
                sessionStorage.setItem("user", emailid);
                sessionStorage.setItem("typeofuser", "user");
                navigate("/customer");
            } else if (result.data === "Admin login successfully") {
                sessionStorage.setItem("user", emailid);
                sessionStorage.setItem("typeofuser", "admin");
                navigate("/admin");
            } else {
                setError(result.data);
            }
        }).catch(error => console.log(error));

        setEmailId("");
        setPassword("");
    }
};

return(
    <div>
        <span style={{"color":"red"}}>{error}</span>
        <h3>Login Page</h3>
        <form onSubmit={handleSubmit}>
            <label>EmailId</label>
            <input type="emailid" name="emailid" onChange={(event)=>setEmailId(event.target.value)}/><br/>

            <label>Password</label>
            <input type="password" name="password" onChange={(event)=>setPassword(event.target.value)}/><br/>

            <label>Type of User</label>
            <input type="radio" name="typeofuser" value="admin" onChange={(event)=>setTypeOfUser(event.target.value)}/>Admin<br/>
            <input type="radio" name="typeofuser" value="user" onChange={(event)=>setTypeOfUser(event.target.value)}/>User<br/>

            <input type="submit" value="SignIn"/>
            <input type="reset" value="reset"/>

        </form>
        <br></br>
        <a onClick={()=>navigate("/signup")}>SignUp</a>
    </div>
)
}

export default Login;