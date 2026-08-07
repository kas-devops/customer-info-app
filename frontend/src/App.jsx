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
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Customer Information Portal</h1>
          <p style={styles.subtitle}>{customers.length} customer records</p>
        </header>

        {loading ? (
          <p style={styles.loading}>Loading customer data...</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>City</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c, i) => (
                  <tr
                    key={c.customer_id}
                    style={{
                      ...styles.tr,
                      backgroundColor: i % 2 === 0 ? '#ffffff' : '#f9fafb',
                    }}
                  >
                    <td style={styles.td}>{c.name}</td>
                    <td style={styles.td}>{c.email}</td>
                    <td style={styles.td}>{c.phone}</td>
                    <td style={styles.td}>{c.city}</td>
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

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '48px 20px',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  header: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    padding: '32px 40px',
    color: '#ffffff',
  },
  title: {
    margin: 0,
    fontSize: '26px',
    fontWeight: 700,
  },
  subtitle: {
    margin: '6px 0 0',
    fontSize: '14px',
    opacity: 0.85,
  },
  loading: {
    padding: '40px',
    textAlign: 'center',
    color: '#666',
  },
  tableWrapper: {
    padding: '24px 40px 40px',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    background: '#f3f4f6',
    color: '#374151',
    fontWeight: 600,
    borderBottom: '2px solid #e5e7eb',
  },
  tr: {
    transition: 'background-color 0.15s ease',
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #f0f0f0',
    color: '#1f2937',
  },
};

export default App;