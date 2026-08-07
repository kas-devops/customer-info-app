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
      <style>{`
        * { box-sizing: border-box; }
        .page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0d9488 100%);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          padding: 48px 20px;
          display: flex;
          justify-content: center;
        }
        .container {
          width: 100%;
          max-width: 900px;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%);
          padding: 32px 40px;
          color: #ffffff;
        }
        .title { margin: 0; font-size: 26px; font-weight: 700; }
        .subtitle { margin: 6px 0 0; font-size: 14px; opacity: 0.9; }
        .badge {
          display: inline-block;
          margin-top: 10px;
          background: rgba(255,255,255,0.2);
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }
        .loading { padding: 60px 40px; text-align: center; color: #64748b; }
        .table-wrapper { padding: 24px 40px 40px; overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th {
          text-align: left;
          padding: 12px 16px;
          background: #f0fdfa;
          color: #0f766e;
          font-weight: 600;
          border-bottom: 2px solid #99f6e4;
          white-space: nowrap;
        }
        td {
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
          color: #1e293b;
        }
        tr:hover td { background: #f8fafc; }

        @media (max-width: 640px) {
          .page { padding: 20px 12px; }
          .header { padding: 24px 20px; }
          .title { font-size: 20px; }
          .table-wrapper { padding: 12px; }
          table, thead, tbody, tr, th, td { display: block; }
          thead { display: none; }
          tr {
            margin-bottom: 14px;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            overflow: hidden;
          }
          td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 14px;
            border-bottom: 1px solid #f1f5f9;
          }
          td:last-child { border-bottom: none; }
          td::before {
            content: attr(data-label);
            font-weight: 600;
            color: #0d9488;
            margin-right: 12px;
          }
        }
      `}</style>

      <div className="container">
        <header className="header">
          <h1 className="title">Customer Information Portal</h1>
          <p className="subtitle">Live customer records</p>
          <span className="badge">{customers.length} customers</span>
        </header>

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