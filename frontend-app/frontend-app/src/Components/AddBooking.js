import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function AddBooking() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailid: "",
        destination: "",
        company: "",
        departdate: "",
        returndate: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [showPaymentButton, setShowPaymentButton] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Auto-populate email ID from sessionStorage
    useEffect(() => {
        const storedEmail = sessionStorage.getItem("user");
        if (storedEmail) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                emailid: storedEmail,
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateDates = () => {
        const today = new Date();
        const departureDate = new Date(formData.departdate);
        const returnDate = new Date(formData.returndate);

        if (departureDate <= today) {
            setErrorMessage("Departure date must be after today.");
            return false;
        }

        if (returnDate <= departureDate) {
            setErrorMessage("Return date must be after departure date.");
            return false;
        }

        setErrorMessage(""); // Clear errors if validation passes
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        if (!validateDates()) {
            return; // Exit if validation fails
        }

        try {
            const response = await axios.post("http://localhost:9393/booking/create", formData);

            const result = response.data;

            if (response.status === 200) {
                if (result.cost > 0) {
                    setSuccessMessage(result.message); // Display the success message
                    setShowPaymentButton(true); // Show the payment button
                } else {
                    setSuccessMessage(result.message); // Display message even for cost = 0
                    setShowPaymentButton(false); // Hide payment button
                }
            } else {
                setSuccessMessage("An error occurred while processing your request.");
                setShowPaymentButton(false);
            }
        } catch (error) {
            console.error("Error:", error);
            setSuccessMessage("Failed to connect to the server. Please try again later.");
            setShowPaymentButton(false);
        }
    };

    const goToPayment = () => {
        navigate("/Payment"); // Navigate to Payment page
    };

    return (
        <div>
            <h3>Flight Booking</h3>
            <br />
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Email ID</label>
                    <input
                        type="email"
                        name="emailid"
                        value={formData.emailid}
                        onChange={handleChange}
                        readOnly // Make the field read-only since it's auto-filled
                        required
                    />
                    <br />
                    <label>Destination</label>
                    <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label>Company</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label>Depart Date</label>
                    <input
                        type="date"
                        name="departdate"
                        value={formData.departdate}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label>Return Date</label>
                    <input
                        type="date"
                        name="returndate"
                        value={formData.returndate}
                        onChange={handleChange}
                        required
                    />
                    <br />

                    {/* Display validation error messages */}
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                    <button type="submit">Submit</button>
                    <input
                        type="reset"
                        value="Reset"
                        onClick={() => {
                            setFormData({
                                emailid: sessionStorage.getItem("user") || "",
                                destination: "",
                                company: "",
                                departdate: "",
                                returndate: "",
                            });
                            setSuccessMessage("");
                            setErrorMessage("");
                            setShowPaymentButton(false);
                        }}
                    />
                </form>
            </div>

            {/* Display Success Message and Payment Button */}
            {successMessage && (
                <div>
                    <p>{successMessage}</p>
                    {showPaymentButton && <button onClick={goToPayment}>Payment</button>}
                </div>
            )}

            {/* Conditionally Render Customer Dashboard Link */}
            {!showPaymentButton && <Link to="/customer">Customer Dashboard</Link>}
        </div>
    );
}

export default AddBooking;
