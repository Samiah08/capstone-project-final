import React, { useEffect, useState } from 'react';
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
    let user = sessionStorage.getItem("user");
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:9191/login/findname/${user}`)
                .then((response) => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('User not found with the logged-in email ID');
                    }
                })
                .then((data) => setFullName(data))
                .catch(() => setFullName('User not found'));
        }
    }, [user]);

    const goToViewFlights = () => navigate("/viewflights");
    const goToViewPrice = () => navigate("/ViewPrice");
    const goToAddbooking = () => navigate("/AddBooking");

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h3>Welcome to Customer Dashboard</h3>
                <h5 className="text-muted">{fullName ? fullName : user}</h5>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6 d-grid gap-3">
                    <button className="btn btn-primary" onClick={goToViewFlights}>
                        View All Flights
                    </button>
                    <button className="btn btn-secondary" onClick={goToViewPrice}>
                        View Price
                    </button>
                    <button className="btn btn-success" onClick={goToAddbooking}>
                        Book Flight
                    </button>
                </div>
            </div>
            <div className="mt-5 text-center">
                <Logout />
            </div>
        </div>
    );
}

export default CustomerDashboard;
