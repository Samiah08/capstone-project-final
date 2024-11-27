import React from 'react';
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    const goToAddFlights = () => {
        navigate("/addflights");
    };
    const goToViewFlights = () => {
        navigate("/viewflights");
    };
    const goToViewPrice = () => {
        navigate("/ViewPrice");
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1>Welcome to Admin Dashboard</h1>
                <p className="text-muted">Manage flights and pricing from this dashboard.</p>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-4 d-grid gap-3">
                    <button className="btn btn-primary" onClick={goToAddFlights}>
                        Add Flights
                    </button>
                    <button className="btn btn-secondary" onClick={goToViewFlights}>
                        View All Flights
                    </button>
                    <button className="btn btn-success" onClick={goToViewPrice}>
                        View Price
                    </button>
                </div>
            </div>
            <div className="mt-5 text-center">
                <Logout />
            </div>
        </div>
    );
}

export default AdminDashboard;
