import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewFlights() {
  const [flights, setFlights] = useState([]);
  const [message, setMessage] = useState('');
  const [typeofuser, setTypeOfUser] = useState('');

  useEffect(() => {
    fetch('http://localhost:9292/flight/all')
      .then(response => response.json())
      .then(data => setFlights(data))
      .catch(error => console.error('Error fetching flight data:', error));

    const userType = sessionStorage.getItem("typeofuser");
    setTypeOfUser(userType || 'guest'); 
  }, []);

  const handleDelete = (fid) => {
    fetch(`http://localhost:9292/flight/delete/${fid}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(errMessage => {
            throw new Error(errMessage || 'Failed to delete the flight');
          });
        }
        return response.text();
      })
      .then(message => {
        if (message === `Flight with ID ${fid} deleted successfully`) {
          setFlights(flights.filter(flight => flight.fid !== fid));
          setMessage(message);
        } else {
          setMessage(message || 'Unexpected response from server');
        }
      })
      .catch(error => {
        console.error('Error deleting flight:', error);
        setMessage(error.message || 'An error occurred while deleting the flight.');
      });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h1 className="text-center mb-4">View Flights</h1>

        {message && (
          <div className={`alert ${message.includes("deleted successfully") ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}

        {flights.length > 0 ? (
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Flight ID (fid)</th>
                <th>Destination</th>
                <th>Company</th>
                <th>Price ($)</th>
                {typeofuser === 'admin' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {flights.map(flight => (
                <tr key={flight.fid}>
                  <td>{flight.fid}</td>
                  <td>{flight.destination}</td>
                  <td>{flight.company}</td>
                  <td>{flight.price}</td>
                  {typeofuser === 'admin' && (
                    <td>
                      <button
                        onClick={() => handleDelete(flight.fid)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading flights...</p>
        )}

        <div className="mt-4">
          {typeofuser === 'admin' && (
            <Link to="/admin" className="btn btn-primary btn-sm">Admin Dashboard</Link>
          )}
          {typeofuser === 'user' && (
            <Link to="/customer" className="btn btn-secondary btn-sm">Customer Dashboard</Link>
          )}
          {typeofuser === 'guest' && <p>Please log in to access a dashboard.</p>}
        </div>
      </div>
    </div>
  );
}

export default ViewFlights;
