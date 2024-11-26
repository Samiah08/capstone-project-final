import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AddFlightsDetails() {
    let url = "http://localhost:9292/flight/create";
    let [fid, setFid] = useState("");
    let [company, setCompany] = useState("");
    let [destination, setDestination] = useState("");
    let [price, setPrice] = useState("");
    let [error, setError] = useState("");
    let [successMessage, setSuccessMessage] = useState("");
    let navigate = useNavigate();

    let handleSubmit = async (event) => {
        event.preventDefault();

        // Validate if all fields are filled
        if (fid.length === 0 || destination.length === 0 || company.length === 0 || price.length === 0) {
            setError("Please fill in all fields.");
            setSuccessMessage(""); // Clear success message if there's an error
        } else {
            // Create the flight object
            const Addflights = { fid, company, destination, price };
            try {
                // Send data to the server using axios POST request
                const response = await axios.post(url, Addflights);
                
                // Assuming the backend returns a success message or the created flight data
                const message = response.data.message || response.data;
                
                // Handle the specific error messages
                if (message.includes("Flights details already exist")) {
                    setError("Flights details already exist with the given Flight ID.");
                } else if (message.includes("Same details exist")) {
                    setError(`Same details exist with a differnt flight ID`);
                } else if (message === "Flight details saved successfully") {
                    setSuccessMessage("Flight added successfully!");
                    setError(""); // Clear any errors on success
                } else {
                    // Catch-all for unexpected success responses
                    setSuccessMessage(message || "Flight details saved successfully.");
                    setError(""); // Clear any errors on success
                }
            } catch (error) {
                console.error("There was an error adding the flight:", error);

                // Handle unexpected errors
                setError("An unexpected error occurred. Please try again.");
                setSuccessMessage(""); // Clear success message if there's an error
            }
        }
    }

    return (
        <div>
            {/* Display error message in red color */}
            {error && <span style={{ color: "red" }}>{error}</span>}

            {/* Display success message */}
            {successMessage && <span style={{ color: "green" }}>{successMessage}</span>}

            <h3>Add Flights Details</h3>
            <form onSubmit={handleSubmit}>
                <label>Flight ID</label>
                <input type="text" name="fid" onChange={(event) => setFid(event.target.value)} /><br />

                <label>Destination</label>
                <input type="text" name="destination" onChange={(event) => setDestination(event.target.value)} /><br />

                <label>Company</label>
                <input type="text" name="company" onChange={(event) => setCompany(event.target.value)} /><br />

                <label>Price (£)</label>
                <input type="number" name="price" onChange={(event) => setPrice(event.target.value)} /><br />

                <input type="submit" value="Add Flights" />
                <input type="reset" value="Reset" />
            </form>
            <br />
            {/* Link to navigate back to the admin dashboard */}
            <Link to="/admin">Admin Dashboard</Link>
        </div>
    );
}

export default AddFlightsDetails;
