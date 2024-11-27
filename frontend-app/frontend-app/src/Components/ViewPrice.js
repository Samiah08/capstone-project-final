import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewPrice() {
  const [destination, setDestination] = useState('');
  const [company, setCompany] = useState('');
  const [price, setPrice] = useState(null);
  const [message, setMessage] = useState('');
  const [typeofuser, setTypeOfUser] = useState('');  

  useEffect(() => {
    const userType = sessionStorage.getItem("typeofuser");
    setTypeOfUser(userType || 'guest'); 
  }, []);  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:9393/booking/find', {
        destination,
        company,
      });

      if (response.data && response.data.message) {
        setPrice(response.data.cost);
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('An error occurred while fetching the price.');
      setPrice(0.0);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-4">View Price Page</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              className="form-control"
              id="destination"
              name="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              className="form-control"
              id="company"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div className="form-group d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">View Price</button>
            <button
              type="reset"
              className="btn btn-secondary"
              onClick={() => { setDestination(''); setCompany(''); setPrice(null); setMessage(''); }}
            >
              Reset
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-4">
            <h4 className={`alert ${message.includes('error') ? 'alert-danger' : 'alert-success'}`}>
              {message}
            </h4>
            {price !== null && <p><strong>Price: £{price}</strong></p>}
          </div>
        )}

        <div className="mt-4">
          {typeofuser === 'admin' && (
            <Link to="/admin" className="btn btn-info btn-sm">Go to Admin Dashboard</Link>
          )}
          {typeofuser === 'user' && (
            <Link to="/customer" className="btn btn-info btn-sm">Go to Customer Dashboard</Link>
          )}
          {typeofuser === 'guest' && <p>Please log in to access a dashboard.</p>}
        </div>
      </div>
    </div>
  );
}

export default ViewPrice;
