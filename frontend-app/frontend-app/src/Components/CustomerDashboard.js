import React, { useEffect, useState } from 'react';
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
    let user = sessionStorage.getItem("user");
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate(); // Initialize navigate function

    // Fetch full name from the API
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:9191/login/findname/${user}`)
                .then((response) => {
                    if (response.ok) {
                        return response.text(); // API returns the full name as text
                    } else {
                        throw new Error('User not found with the logged in email ID');
                    }
                })
                .then((data) => setFullName(data)) // Set the full name from the API response
                .catch((error) => setFullName('User not found')); // Handle errors
        }
    }, [user]); // Run effect only when user changes

    const goToViewFlights = () => {
        navigate("/viewflights"); // Navigate to /viewflights route
    };

    const goToViewPrice = () => {
        navigate("/ViewPrice"); // Navigate to /viewprice route
    };
    const goToAddbooking = () => {
        navigate("/AddBooking"); // Navigate to /viewprice route
    };

    return (
        <div>
            <h3>Welcome to Customer dashboard {fullName ? fullName : user}</h3><br></br>
            <div>
                <button onClick={goToViewFlights}>View All Flights</button>
                <button onClick={goToViewPrice}>View Price</button>
                <button onClick={goToAddbooking}>Book flight</button>
            </div>
            <Logout />
        </div>
    );
}

export default CustomerDashboard;
