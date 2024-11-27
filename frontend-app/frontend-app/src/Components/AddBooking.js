import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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

        setErrorMessage("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateDates()) return;

        try {
            const response = await axios.post("http://localhost:9393/booking/create", formData);
            const result = response.data;

            if (response.status === 200) {
                setSuccessMessage(result.message);
                setShowPaymentButton(result.cost > 0);
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

    const goToPayment = () => navigate("/Payment");

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h3 className="text-center">Flight Booking</h3>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Email ID</label>
                        <input
                            type="email"
                            name="emailid"
                            className="form-control"
                            value={formData.emailid}
                            onChange={handleChange}
                            readOnly
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Destination</label>
                        <input
                            type="text"
                            name="destination"
                            className="form-control"
                            value={formData.destination}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Company</label>
                        <input
                            type="text"
                            name="company"
                            className="form-control"
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Depart Date</label>
                        <input
                            type="date"
                            name="departdate"
                            className="form-control"
                            value={formData.departdate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Return Date</label>
                        <input
                            type="date"
                            name="returndate"
                            className="form-control"
                            value={formData.returndate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {errorMessage && (
                        <div className="alert alert-danger">{errorMessage}</div>
                    )}

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <button
                            type="reset"
                            className="btn btn-secondary"
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
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {successMessage && (
                    <div className="alert alert-success mt-4">
                        {successMessage}
                        {showPaymentButton && (
                            <button
                                onClick={goToPayment}
                                className="btn btn-success mt-3 d-block w-100"
                            >
                                Proceed to Payment
                            </button>
                        )}
                    </div>
                )}

                {!showPaymentButton && (
                    <div className="mt-4 text-center">
                        <Link to="/customer" className="btn btn-link">
                            Back to Dashboard
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddBooking;
