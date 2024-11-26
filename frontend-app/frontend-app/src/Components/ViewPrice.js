import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewPrice() {
  const [destination, setDestination] = useState('');
  const [company, setCompany] = useState('');
  const [price, setPrice] = useState(null);
  const [message, setMessage] = useState('');
  const [typeofuser, setTypeOfUser] = useState('');  // User type state

  // Set the user type when the component mounts
  useEffect(() => {
    const userType = sessionStorage.getItem("typeofuser");
    setTypeOfUser(userType || 'guest'); // Default to 'guest' if no user type is stored
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:9393/booking/find', {
        destination,
        company,
      });

      // Check if the response is valid
      if (response.data && response.data.message) {
        setPrice(response.data.cost);
        setMessage(response.data.message);
      }
    } catch (error) {
      // Handle error (e.g. network issues, or API issues)
      setMessage('An error occurred while fetching the price.');
      setPrice(0.0);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>View Price Page</h3><br/>
        <div>
          <label>Destination</label>
          <input
            type="text"
            name="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          /><br/>

          <label>Company</label>
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          /><br/>

          <input type="submit" value="View Price"/>
          <input type="reset" value="Reset" onClick={() => { setDestination(''); setCompany(''); setPrice(null); setMessage(''); }} />
        </div>
      </form>

      {message && (
        <div>
          <h4>{message}</h4>
          {price !== null && <p>Price: £{price}</p>}
        </div>
      )}

      {/* Conditional rendering for user types */}
      {typeofuser === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
      {typeofuser === 'user' && <Link to="/customer">Customer Dashboard</Link>}
      {typeofuser === 'guest' && <p>Please log in to access a dashboard.</p>}
    </div>
  );
}

export default ViewPrice;
