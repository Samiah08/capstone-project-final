import React from 'react';
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate(); // Initialize navigate function

    const goToAddFlights = () => {
        navigate("/addflights"); // Navigate to /addflights route
    };
    const goToViewFlights = () => {
        navigate("/viewflights"); // Navigate to /addflights route
    };
    const goToViewPrice = () => {
        navigate("/ViewPrice"); // Navigate to /addflights route
    };


    return (
        <div>
            <h1>Welcome to Admin Dashboard</h1><br />
            <div>
                <button onClick={goToAddFlights}>Add Flights</button>

                <button onClick={goToViewFlights}>View All Flights</button>

                <button onClick={goToViewPrice}>View Price</button>

            </div>
            <Logout />
        </div>
    );
}

export default AdminDashboard;
