import { useState, useEffect } from 'react';

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
        <h1>Customer Information Portal - v3</h1>
          <span className="badge">{customers.length} Records</span>
        </div>

        {loading ? (
          <p className="loading">Loading customer data...</p>
        ) : (
          <div className="table-wrapper">
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
                {customers.map((c) => (
                  <tr key={c.customer_id}>
                    <td data-label="Name">{c.name}</td>
                    <td data-label="Email">{c.email}</td>
                    <td data-label="Phone">{c.phone}</td>
                    <td data-label="City">{c.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;