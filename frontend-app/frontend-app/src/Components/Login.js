import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    let url = "http://localhost:9191/login/signin";
    let [emailid, setEmailId] = useState("");
    let [password, setPassword] = useState("");
    let [typeofuser, setTypeOfUser] = useState("");
    let [error, setError] = useState("");
    let navigate = useNavigate();

    let handleSubmit = (event) => {
        event.preventDefault();
        if (emailid.length === 0 || password.length === 0 || typeofuser.length === 0) {
            setError("Please write email ID or password or select type of user");
        } else {
            let login = { emailid, password, typeofuser };
            axios.post(url, login)
                .then(result => {
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
                })
                .catch(error => console.log(error));

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
                            <h3 className="card-title text-center mb-4">Login Page</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="emailid" className="form-label">Email ID</label>
                                    <input
                                        type="text"
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
                                    <button type="submit" className="btn btn-primary">Sign In</button>
                                    <button type="reset" className="btn btn-secondary">Reset</button>
                                </div>
                            </form>
                            <div className="mt-3 text-center">
                                <a href="#" onClick={() => navigate("/signup")} className="link-primary">Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
