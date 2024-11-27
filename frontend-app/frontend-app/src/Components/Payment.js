import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

function Payment() {
    const location = useLocation();
    const bookingId = location.state?.bookingId;
    const [formData, setFormData] = useState({
        emailid: '',
        paymentmethod: '',
    });
    const [message, setMessage] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null);
    const [price, setPrice] = useState(null);
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("user");
        if (storedEmail) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                emailid: storedEmail,
            }));

            fetchFullName(storedEmail);
            fetchBookingDetails(storedEmail);
        }
    }, []);

    const fetchFullName = async (email) => {
        try {
            const response = await axios.get(`http://localhost:9191/login/findname/${email}`);
            if (response.data !== "User not found with the loged in email ID") {
                setFullName(response.data);
                sessionStorage.setItem("fullName", response.data);
            } else {
                setFullName("Unknown User");
            }
        } catch (error) {
            console.error("Error fetching full name:", error);
            setFullName("Error fetching name");
        }
    };

    const fetchBookingDetails = async (email) => {
        try {
            const response = await axios.get(`http://localhost:9393/booking/findbooking/${email}`);
            if (response.data !== "-1") {
                setBookingDetails(response.data);
                fetchPrice(response.data);
            } else {
                setMessage("Booking not found or server error.");
            }
        } catch (error) {
            console.error('Error fetching booking details:', error);
            setMessage("An error occurred while fetching booking details.");
        }
    };

    const fetchPrice = async (bookid) => {
        try {
            const response = await axios.get(`http://localhost:9393/booking/getprice/${bookid}`);
            if (response.data !== "-1") {
                setPrice(response.data);
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
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9494/payment/create', formData);
            if (response.data === "Payment successful") {
                setMessage("Payment successful");
                localStorage.setItem("authenticated", "true");
            } else {
                setMessage("Payment has already been made for this booking ID.");
            }
        } catch (error) {
            console.error('Error during API call:', error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h1 className="text-center mb-4">Payment Completion</h1>

                {bookingDetails && price !== null && (
                    <div className="mb-4">
                        <h4>Please proceed with payment for the following booking:</h4>
                        <p><strong>Booking ID:</strong> {bookingDetails}</p>
                        <p><strong>Price:</strong> £ {price}</p>
                    </div>
                )}
                {fullName && <h4><strong>Full Name:</strong> {fullName}</h4>}

                {!bookingDetails && bookingId && (
                    <div className="alert alert-warning">
                        <h4>Booking ID: {bookingId} could not be retrieved.</h4>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email ID</label>
                        <input
                            type="email"
                            name="emailid"
                            className="form-control"
                            value={formData.emailid}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Payment Method</label>
                        <select
                            name="paymentmethod"
                            className="form-select"
                            value={formData.paymentmethod}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>-- Select Payment Method --</option>
                            <option value="Paypal">Paypal</option>
                            <option value="Apple Pay">Apple Pay</option>
                            <option value="Google Pay">Google Pay</option>
                            <option value="Credit card">Credit card</option>
                            <option value="Debit card">Debit card</option>
                        </select>
                    </div>
                    <div className="d-grid gap-2 mb-3">
                        <button type="submit" className="btn btn-primary">Pay Now</button>
                        <button
                            type="reset"
                            className="btn btn-secondary"
                            onClick={() => setFormData({ emailid: '', paymentmethod: '' })}
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {message && (
                    <div className={`alert ${message === "Payment successful" ? 'alert-success' : 'alert-danger'}`}>
                        {message}
                    </div>
                )}

                {message === "Payment successful" ? (
                    <Link to="/customer" className="btn btn-link">Go to Customer Dashboard</Link>
                ) : (
                    <Link to="/logout" className="btn btn-link">Log Out</Link>
                )}
            </div>
        </div>
    );
}

export default Payment;
