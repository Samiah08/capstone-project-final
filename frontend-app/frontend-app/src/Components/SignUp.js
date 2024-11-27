import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
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
            let signUp = { firstname, lastname, emailid, password, typeofuser };
            axios.post(url, signUp)
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
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">SignUp Page</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="firstname" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        id="firstname"
                                        className="form-control"
                                        onChange={(event) => setFirstname(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastname" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        className="form-control"
                                        onChange={(event) => setLastname(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="emailid" className="form-label">Email ID</label>
                                    <input
                                        type="email"
                                        id="emailid"
                                        className="form-control"
                                        onChange={(event) => setEmailId(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Type of User</label>
                                    <div>
                                        <input
                                            type="radio"
                                            id="admin"
                                            name="typeofuser"
                                            value="admin"
                                            onChange={(event) => setTypeOfUser(event.target.value)}
                                        />
                                        <label htmlFor="admin" className="ms-2">Admin</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="user"
                                            name="typeofuser"
                                            value="user"
                                            onChange={(event) => setTypeOfUser(event.target.value)}
                                        />
                                        <label htmlFor="user" className="ms-2">User</label>
                                    </div>
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Sign Up</button>
                                    <button type="reset" className="btn btn-secondary">Reset</button>
                                </div>
                            </form>
                            <div className="mt-3 text-center">
                                <a href="#" onClick={() => navigate("/")} className="link-primary">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
