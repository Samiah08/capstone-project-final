import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Payment() {
    const location = useLocation();
    const bookingId = location.state?.bookingId; // Access the booking ID passed via state
    const [formData, setFormData] = useState({
        emailid: '',
        paymentmethod: '',
    });
    const [message, setMessage] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null); // State to store booking details
    const [price, setPrice] = useState(null); // State to store the price
    const [fullName, setFullName] = useState(''); // State to store the full name

    // Auto-populate email ID and fetch full name from the API
    useEffect(() => {
        const storedEmail = sessionStorage.getItem("user");
        if (storedEmail) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                emailid: storedEmail,
            }));

            // Fetch full name using the email
            fetchFullName(storedEmail);

            // Fetch booking details when the email is set
            fetchBookingDetails(storedEmail);
        }
    }, []);

    // Fetch full name based on the email
    const fetchFullName = async (email) => {
        try {
            const response = await axios.get(`http://localhost:9191/login/findname/${email}`);
            if (response.data !== "User not found with the loged in email ID") {
                setFullName(response.data); // Set the fetched full name
                sessionStorage.setItem("fullName", response.data); // Store in sessionStorage
            } else {
                setFullName("Unknown User");
            }
        } catch (error) {
            console.error("Error fetching full name:", error);
            setFullName("Error fetching name");
        }
    };

    // Fetch booking details based on the email
    const fetchBookingDetails = async (email) => {
        try {
            const response = await axios.get(`http://localhost:9393/booking/findbooking/${email}`);
            if (response.data !== "-1") {
                setBookingDetails(response.data); // Set booking ID or details if found
                // Fetch price for the booking ID
                fetchPrice(response.data);
            } else {
                setMessage("Booking not found or server error.");
            }
        } catch (error) {
            console.error('Error fetching booking details:', error);
            setMessage("An error occurred while fetching booking details.");
        }
    };

    // Fetch price based on the booking ID
    const fetchPrice = async (bookid) => {
        try {
            const response = await axios.get(`http://localhost:9393/booking/getprice/${bookid}`);
            if (response.data !== "-1") {
                setPrice(response.data); // Set the price if found
            } else {
                setMessage("Price not found or server error.");
            }
        } catch (error) {
            console.error('Error fetching price:', error);
            setMessage("An error occurred while fetching price.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form reload
        try {
            const response = await axios.post('http://localhost:9494/payment/create', formData);

            if (response.data === "Payment successful") {
                setMessage("Payment successful");
                localStorage.setItem("authenticated", "true"); // Optional: Persist auth state
            } else {
                setMessage("Payment has already been made for this booking ID.");
            }
        } catch (error) {
            console.error('Error during API call:', error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h1>Payment Completion Page</h1>
            <br />
    
            {/* Display Booking Details, Price, and Full Name together */}
            <div>
                {bookingDetails && price !== null && (
                    <>
                        <h4>Please proceed payment for</h4>
                        <h4>Booking ID: {bookingDetails}</h4>
                        <h4>Price: £ {price}</h4>
                    </>
                )}
                {fullName && <h4>Full Name: {fullName}</h4>}
            </div>
    
            {/* Display a message if booking details or price could not be fetched */}
            {!bookingDetails && bookingId && (
                <div>
                    <h4>Booking ID: {bookingId} could not be retrieved.</h4>
                </div>
            )}
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Email ID</label>
                    <input
                        type="email"
                        name="emailid"
                        value={formData.emailid}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label>Payment Method</label>
                    <select
                        name="paymentmethod"
                        value={formData.paymentmethod}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            -- Select Payment Method --
                        </option>
                        <option value="Paypal">Paypal</option>
                        <option value="Apple Pay">Apple Pay</option>
                        <option value="Google Pay">Google Pay</option>
                        <option value="Credit card">Credit card</option>
                        <option value="Debit card">Debit card</option>
                    </select>
                    <br />
                    <input type="submit" value="Click here to pay" />
                    <input
                        type="reset"
                        value="Reset"
                        onClick={() => setFormData({ emailid: '', paymentmethod: '' })}
                    />
                </form>
                <br />
                {message && (
                    <div style={{ color: message === "Payment successful" ? 'green' : 'red' }}>
                        {message}
                    </div>
                )}
            </div>
            {message === "Payment successful" && <a href="/customer">Customer Dashboard</a>}
            {message !== "Payment successful" && <a href="/logout">Log Out</a>}
        </div>
    );
    
    
}

export default Payment;
