import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => {
        setCustomers(data.customers || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="card">
        <div className="header">
          <h1>Customer Information</h1>
          <span className="badge">{customers.length} Records</span>
        </div>

        {loading ? (
          <p className="loading">Loading customer data...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.customer_id}>
                  <td className="name-cell">{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td><span className="city-tag">{c.city}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;