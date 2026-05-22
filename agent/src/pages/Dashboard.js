import React from 'react';

function Dashboard() {
  return (
    <div className="page-content">
      <div className="dashboard-welcome">
        <h1>Welcome back, Pickup Traveller! 👋</h1>
        <p>Here is what's happening with Paradise Explore today.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Active Packages</h3>
            <div className="stat-number">2</div>
          </div>
          <div className="stat-icon">
            <i className="fa-solid fa-map-location-dot"></i>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Bookings</h3>
            <div className="stat-number">1</div>
          </div>
          <div className="stat-icon">
            <i className="fa-solid fa-calendar-check"></i>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>New Inquiries</h3>
            <div className="stat-number">1</div>
          </div>
          <div className="stat-icon">
            <i className="fa-solid fa-envelope-open-text"></i>
          </div>
        </div>

        <div className="stat-card" style={{ borderLeftColor: '#10b981' }}>
          <div className="stat-info">
            <h3>My Earnings</h3>
            <div className="stat-number" style={{ color: '#059669' }}>
              ₹ 30,000.00
            </div>
            <small style={{ color: '#6b7280', fontSize: '0.75rem' }}>
              Confirmed bookings only
            </small>
          </div>
          <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
            <i className="fa-solid fa-indian-rupee-sign"></i>
          </div>
        </div>
      </div>

      <div className="form-card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid var(--border)',
            paddingBottom: '10px',
            marginBottom: '15px',
          }}
        >
          <h3 style={{ border: 'none', margin: 0, padding: 0 }}>Recent Bookings</h3>
          <a
            href="agent-bookings.php"
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '5px 12px' }}
          >
            View All
          </a>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Package</th>
                <th>Travel Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>#18</strong></td>
                <td>Ripipo</td>
                <td>Goa Family Fun Package</td>
                <td>2026-05-18</td>
                <td>
                  <span className="badge badge-Confirmed">Confirmed</span>
                </td>
                <td>
                  <a href="agent-bookings.php?id=18" style={{ color: 'var(--secondary)' }}>
                    <i className="fa-solid fa-eye"></i> View
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="form-card table-section" style={{ marginTop: '30px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid var(--border)',
            paddingBottom: '10px',
            marginBottom: '15px',
          }}
        >
          <h3 style={{ border: 'none', margin: 0, padding: 0 }}>Package Master (Core Details)</h3>
          <a
            href="view-packages.php"
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '5px 12px' }}
          >
            View All
          </a>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Master ID</th>
                <th>Type ID</th>
                <th>Title</th>
                <th>Destination</th>
                <th>Duration</th>
                <th>Overview</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>#2</strong></td>
                <td>4</td>
                <td><strong>Goa Family Fun Package</strong></td>
                <td>Goa</td>
                <td>5 Days / 4 Nights</td>
                <td title="Enjoy a relaxing and fun-filled family vacation in Goa with beaches, sightseeing, and water activities.">
                  Enjoy a relaxing and fun-filled family v...
                </td>
                <td>24 Feb 2026</td>
              </tr>
              <tr>
                <td><strong>#6</strong></td>
                <td>7</td>
                <td><strong>Rishikesh Adventure Tour</strong></td>
                <td>Rishikesh</td>
                <td>4 Days / 3 Nights</td>
                <td title="Experience the thrill of adventure in Rishikesh, known as the adventure capital of India. This package offers exciting river rafting in the Ganges, camping by the riverside, trekking, and bonfire nights. Perfect for adventure lovers and nature enthusiasts.">
                  Experience the thrill of adventure in Ri...
                </td>
                <td>08 Apr 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;