import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function AddFlightsDetails() {
    const url = "http://localhost:9292/flight/create";
    const [fid, setFid] = useState("");
    const [company, setCompany] = useState("");
    const [destination, setDestination] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!fid || !company || !destination || !price) {
            setError("Please fill in all fields.");
            setSuccessMessage("");
            return;
        }

        const Addflights = { fid, company, destination, price };
        try {
            const response = await axios.post(url, Addflights);
            const message = response.data.message || response.data;

            if (message.includes("Flights details already exist")) {
                setError("Flights details already exist with the given Flight ID.");
            } else if (message.includes("Same details exist")) {
                setError("Same details exist with a different flight ID.");
            } else {
                setSuccessMessage("Flight added successfully!");
                setError("");
            }
        } catch (err) {
            console.error("Error adding flight:", err);
            setError("An unexpected error occurred. Please try again.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h3 className="text-center mb-4">Add Flights Details</h3>

                {/* Error and Success Messages */}
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Flight ID</label>
                        <input
                            type="text"
                            name="fid"
                            className="form-control"
                            value={fid}
                            onChange={(e) => setFid(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Destination</label>
                        <input
                            type="text"
                            name="destination"
                            className="form-control"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Company</label>
                        <input
                            type="text"
                            name="company"
                            className="form-control"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price (£)</label>
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Add Flights</button>
                        <button
                            type="reset"
                            className="btn btn-secondary"
                            onClick={() => {
                                setFid("");
                                setCompany("");
                                setDestination("");
                                setPrice("");
                                setError("");
                                setSuccessMessage("");
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <Link to="/admin" className="btn btn-link">Back to Admin Dashboard</Link>
                </div>
            </div>
        </div>
    );
}

export default AddFlightsDetails;
