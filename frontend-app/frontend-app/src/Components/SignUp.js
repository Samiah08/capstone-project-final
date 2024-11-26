import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function SignUp(){
    let url = "http://localhost:9191/login/signup";
    let [firstname, setFirstname] = useState("");
    let [lastname, setLastname] = useState("");
    let [emailid, setEmailId] = useState("");
    let [password, setPassword] = useState("");
    let [typeofuser, setTypeOfUser] = useState("");
    let [error, setError] = useState("");
    let navigate = useNavigate();

    let handleSubmit = (event) => {
        event.preventDefault();
        if (emailid.length === 0 || password.length === 0 || typeofuser.length === 0 || firstname.length === 0 || lastname.length === 0) {
            setError("Please fill in all fields: first name, last name, email, password, and type of user");
        } else {
            let SignUp = { firstname, lastname, emailid, password, typeofuser };
            axios.post(url, SignUp)
                .then(result => {
                    console.log(result);
                    setError(result.data);
                })
                .catch(error => console.log(error));
            setFirstname("");
            setLastname("");
            setEmailId("");
            setPassword("");
        }
    }

    return (
        <div>
            <span style={{ "color": "red" }}>{error}</span>
            <h3>SignUp Page</h3>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input type="text" name="firstname" onChange={(event) => setFirstname(event.target.value)} /><br />

                <label>Last Name</label>
                <input type="text" name="lastname" onChange={(event) => setLastname(event.target.value)} /><br />

                <label>Email ID</label>
                <input type="email" name="emailid" onChange={(event) => setEmailId(event.target.value)} /><br />

                <label>Password</label>
                <input type="password" name="password" onChange={(event) => setPassword(event.target.value)} /><br />

                <label>Type of User</label>
                <input type="radio" name="typeofuser" value="admin" onChange={(event) => setTypeOfUser(event.target.value)} />Admin<br />
                <input type="radio" name="typeofuser" value="user" onChange={(event) => setTypeOfUser(event.target.value)} />User<br />

                <input type="submit" value="SignUp" />
                <input type="reset" value="reset" />
            </form>
            <br />
            <a onClick={() => navigate("/")}>Login</a>
        </div>
    );
}

export default SignUp;
