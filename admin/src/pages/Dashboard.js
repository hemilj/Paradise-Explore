import React from 'react';

const Dashboard = () => {
    return (
        <main className="dashboard-main">

            {/* Header Section */}
            <div className="dashboard-header">
                <h1>Overview</h1>
                <p>Welcome back, Admin. Here are your complete system statistics.</p>
            </div>

            {/* Statistics Grid */}
            <div className="stats-grid">

                <div className="stat-card">
                    <div className="stat-icon icon-blue">
                        <i className="fa-solid fa-users"></i>
                    </div>
                    <div className="stat-info">
                        <p>Total Users</p>
                        <h3>6</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon icon-indigo">
                        <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <div className="stat-info">
                        <p>Total Agents</p>
                        <h3>5</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon icon-purple">
                        <i className="fa-solid fa-map-location-dot"></i>
                    </div>
                    <div className="stat-info">
                        <p>Total Packages</p>
                        <h3>7</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon icon-teal">
                        <i className="fa-solid fa-calendar-check"></i>
                    </div>
                    <div className="stat-info">
                        <p>Total Bookings</p>
                        <h3>9</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon icon-amber">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                    </div>
                    <div className="stat-info">
                        <p>Pending Bookings</p>
                        <h3>3</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon icon-green">
                        <i className="fa-solid fa-sack-dollar"></i>
                    </div>
                    <div className="stat-info">
                        <p>Total Revenue</p>
                        <h3>₹150,133.80</h3>
                        <span className="stat-subtext">All confirmed bookings</span>
                    </div>
                </div>

            </div>

            {/* Earnings Breakdown Section */}
            <div className="earnings-grid">

                {/* Agent Earnings Card */}
                <div className="earnings-card">
                    <div className="earnings-header">
                        <div className="earnings-title-group">
                            <div className="earnings-icon icon-indigo">
                                <i className="fa-solid fa-user-tie"></i>
                            </div>
                            <div>
                                <h4>Total Agent Earnings</h4>
                                <p>Base package price collected by all agents</p>
                            </div>
                        </div>
                        <span className="earnings-badge badge-indigo">Agents</span>
                    </div>
                    <h2 className="earnings-amount text-indigo">₹134,744.00</h2>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill fill-indigo" style={{ width: '90%' }}></div>
                    </div>
                    <p className="earnings-footer">90% of total revenue</p>
                </div>

                {/* Admin Commission Card */}
                <div className="earnings-card">
                    <div className="earnings-header">
                        <div className="earnings-title-group">
                            <div className="earnings-icon icon-teal">
                                <i className="fa-solid fa-percent"></i>
                            </div>
                            <div>
                                <h4>Admin Commission Earned</h4>
                                <p>Platform commission on approved packages</p>
                            </div>
                        </div>
                        <span className="earnings-badge badge-teal">Admin</span>
                    </div>
                    <h2 className="earnings-amount text-teal">₹15,389.80</h2>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill fill-teal" style={{ width: '10%' }}></div>
                    </div>
                    <p className="earnings-footer">10% of total revenue</p>
                </div>

            </div>

            {/* Recent Bookings Table Section */}
            <div className="table-container">
                <div className="table-header">
                    <h2>Recent Bookings</h2>
                    <a href="bookings.php">View All</a>
                </div>
                <div className="table-responsive">
                    <table className="bookings-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>User</th>
                                <th>Package</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-medium text-dark">#BK-0024</td>
                                <td>Hemil</td>
                                <td className="truncate-text">Dwarka Somnath Divine Darshan Yatra</td>
                                <td>Apr 20, 2026</td>
                                <td><span className="status-badge status-confirmed">Confirmed</span></td>
                                <td className="text-right">
                                    <a href="bookings.php" className="action-icon"><i className="fa-solid fa-eye"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-medium text-dark">#BK-0023</td>
                                <td>Hemil</td>
                                <td className="truncate-text">Divine Ujjain &amp; Omkareshwar Spiritual Retreat</td>
                                <td>Apr 20, 2026</td>
                                <td><span className="status-badge status-confirmed">Confirmed</span></td>
                                <td className="text-right">
                                    <a href="bookings.php" className="action-icon"><i className="fa-solid fa-eye"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-medium text-dark">#BK-0022</td>
                                <td>Hemil</td>
                                <td className="truncate-text">Chardham Yatra</td>
                                <td>Apr 20, 2026</td>
                                <td><span className="status-badge status-pending">Pending</span></td>
                                <td className="text-right">
                                    <a href="bookings.php" className="action-icon"><i className="fa-solid fa-eye"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-medium text-dark">#BK-0021</td>
                                <td>Hemil</td>
                                <td className="truncate-text">Chardham Yatra</td>
                                <td>Apr 20, 2026</td>
                                <td><span className="status-badge status-confirmed">Confirmed</span></td>
                                <td className="text-right">
                                    <a href="bookings.php" className="action-icon"><i className="fa-solid fa-eye"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-medium text-dark">#BK-0020</td>
                                <td>Hemil</td>
                                <td className="truncate-text">Chardham Yatra</td>
                                <td>Apr 20, 2026</td>
                                <td><span className="status-badge status-pending">Pending</span></td>
                                <td className="text-right">
                                    <a href="bookings.php" className="action-icon"><i className="fa-solid fa-eye"></i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
    );
};

export default Dashboard;