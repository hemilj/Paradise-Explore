import React from 'react';

const Users = () => {
    // Helper function for the delete/block confirmations
    const handleConfirm = (e, message) => {
        if (!window.confirm(message)) {
            e.preventDefault();
        }
    };

    return (
        <main className="users-main">

            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1>User Management</h1>
                    <p>View, search, and manage all registered platform users.</p>
                </div>
            </div>

            {/* Toolbar (Search & Filter) */}
            <div className="toolbar-card">
                <div className="search-box">
                    <span className="search-icon">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        className="search-input"
                    />
                </div>

                <div className="filter-box">
                    <select className="status-filter">
                        <option value="">All Statuses</option>
                        <option value="active">Active Only</option>
                        <option value="blocked">Blocked Only</option>
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="table-card">
                <div className="table-responsive">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* User Row 1 */}
                            <tr>
                                <td className="user-profile-cell">
                                    <img src="../user/uploads/1775885835_temp_69d9ddf1aeb67.jpg" alt="Ripipo" className="user-avatar" />
                                    <div className="user-details">
                                        <div className="user-name">Ripipo</div>
                                        <div className="user-location">Ahmedabad, Gujarat</div>
                                    </div>
                                </td>
                                <td>ripipo4132@azucore.com</td>
                                <td>7414258963</td>
                                <td>
                                    <span className="status-badge active-status">
                                        <span className="status-dot"></span> Active
                                    </span>
                                </td>
                                <td>
                                    <div className="action-group">
                                        <a href="view_user.php?id=13" className="action-btn view-btn" title="View Details">
                                            <i className="fa-solid fa-eye"></i>
                                        </a>
                                        <a href="update_status.php?id=13&status=0" className="action-btn block-btn" title="Block User" onClick={(e) => handleConfirm(e, 'Block this user?')}>
                                            <i className="fa-solid fa-ban"></i>
                                        </a>
                                        <a href="delete_user.php?id=13" className="action-btn delete-btn" title="Delete Account" onClick={(e) => handleConfirm(e, 'Are you sure you want to permanently delete this user?')}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>

                            {/* User Row 2 */}
                            <tr>
                                <td className="user-profile-cell">
                                    <img src="../user/uploads/1775882375_temp_69d9d07599bd7.jpg" alt="Dovak" className="user-avatar" />
                                    <div className="user-details">
                                        <div className="user-name">Dovak</div>
                                        <div className="user-location">Mumbai, Maharashtra</div>
                                    </div>
                                </td>
                                <td>dovak11303@azucore.com</td>
                                <td>8520147963</td>
                                <td>
                                    <span className="status-badge active-status">
                                        <span className="status-dot"></span> Active
                                    </span>
                                </td>
                                <td>
                                    <div className="action-group">
                                        <a href="view_user.php?id=12" className="action-btn view-btn" title="View Details">
                                            <i className="fa-solid fa-eye"></i>
                                        </a>
                                        <a href="update_status.php?id=12&status=0" className="action-btn block-btn" title="Block User" onClick={(e) => handleConfirm(e, 'Block this user?')}>
                                            <i className="fa-solid fa-ban"></i>
                                        </a>
                                        <a href="delete_user.php?id=12" className="action-btn delete-btn" title="Delete Account" onClick={(e) => handleConfirm(e, 'Are you sure you want to permanently delete this user?')}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>

                            {/* User Row 3 */}
                            <tr>
                                <td className="user-profile-cell">
                                    <img src="../user/uploads/1773841265_temp_69baab4cd0be2.jpg" alt="Dimpy" className="user-avatar" />
                                    <div className="user-details">
                                        <div className="user-name">Dimpy</div>
                                        <div className="user-location">Surat, Gujarat</div>
                                    </div>
                                </td>
                                <td>hvj2211@gmail.com</td>
                                <td>9265874653</td>
                                <td>
                                    <span className="status-badge active-status">
                                        <span className="status-dot"></span> Active
                                    </span>
                                </td>
                                <td>
                                    <div className="action-group">
                                        <a href="view_user.php?id=11" className="action-btn view-btn" title="View Details">
                                            <i className="fa-solid fa-eye"></i>
                                        </a>
                                        <a href="update_status.php?id=11&status=0" className="action-btn block-btn" title="Block User" onClick={(e) => handleConfirm(e, 'Block this user?')}>
                                            <i className="fa-solid fa-ban"></i>
                                        </a>
                                        <a href="delete_user.php?id=11" className="action-btn delete-btn" title="Delete Account" onClick={(e) => handleConfirm(e, 'Are you sure you want to permanently delete this user?')}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>

                            {/* User Row 4 */}
                            <tr>
                                <td className="user-profile-cell">
                                    <img src="../user/uploads/1772718266_temp_69a988a90e66c.jpg" alt="Pandu" className="user-avatar" />
                                    <div className="user-details">
                                        <div className="user-name">Pandu</div>
                                        <div className="user-location">Mumbai, Maharashtra</div>
                                    </div>
                                </td>
                                <td>kalemalye001@gmail.com</td>
                                <td>7485960213</td>
                                <td>
                                    <span className="status-badge active-status">
                                        <span className="status-dot"></span> Active
                                    </span>
                                </td>
                                <td>
                                    <div className="action-group">
                                        <a href="view_user.php?id=10" className="action-btn view-btn" title="View Details">
                                            <i className="fa-solid fa-eye"></i>
                                        </a>
                                        <a href="update_status.php?id=10&status=0" className="action-btn block-btn" title="Block User" onClick={(e) => handleConfirm(e, 'Block this user?')}>
                                            <i className="fa-solid fa-ban"></i>
                                        </a>
                                        <a href="delete_user.php?id=10" className="action-btn delete-btn" title="Delete Account" onClick={(e) => handleConfirm(e, 'Are you sure you want to permanently delete this user?')}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>

                            {/* User Row 5 */}
                            <tr>
                                <td className="user-profile-cell">
                                    <img src="../user/uploads/1770118805_temp_6981de7f89f70.jpg" alt="Hemil" className="user-avatar" />
                                    <div className="user-details">
                                        <div className="user-name">Hemil</div>
                                        <div className="user-location">Surat, Gujarat</div>
                                    </div>
                                </td>
                                <td>hemiljariwala2005@gmail.com</td>
                                <td>7990998201</td>
                                <td>
                                    <span className="status-badge active-status">
                                        <span className="status-dot"></span> Active
                                    </span>
                                </td>
                                <td>
                                    <div className="action-group">
                                        <a href="view_user.php?id=7" className="action-btn view-btn" title="View Details">
                                            <i className="fa-solid fa-eye"></i>
                                        </a>
                                        <a href="update_status.php?id=7&status=0" className="action-btn block-btn" title="Block User" onClick={(e) => handleConfirm(e, 'Block this user?')}>
                                            <i className="fa-solid fa-ban"></i>
                                        </a>
                                        <a href="delete_user.php?id=7" className="action-btn delete-btn" title="Delete Account" onClick={(e) => handleConfirm(e, 'Are you sure you want to permanently delete this user?')}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>

                            {/* User Row 6 */}
                            <tr>
                                <td className="user-profile-cell">
                                    <img src="../user/uploads/1770022507_temp_6980665a892a6.jpg" alt="Harshit" className="user-avatar" />
                                    <div className="user-details">
                                        <div className="user-name">Harshit</div>
                                        <div className="user-location">Surat, Gujarat</div>
                                    </div>
                                </td>
                                <td>harshitchauhan200519@gmail.com</td>
                                <td>8574960123</td>
                                <td>
                                    <span className="status-badge active-status">
                                        <span className="status-dot"></span> Active
                                    </span>
                                </td>
                                <td>
                                    <div className="action-group">
                                        <a href="view_user.php?id=5" className="action-btn view-btn" title="View Details">
                                            <i className="fa-solid fa-eye"></i>
                                        </a>
                                        <a href="update_status.php?id=5&status=0" className="action-btn block-btn" title="Block User" onClick={(e) => handleConfirm(e, 'Block this user?')}>
                                            <i className="fa-solid fa-ban"></i>
                                        </a>
                                        <a href="delete_user.php?id=5" className="action-btn delete-btn" title="Delete Account" onClick={(e) => handleConfirm(e, 'Are you sure you want to permanently delete this user?')}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="pagination-bar">
                    <span className="pagination-info">Showing 1 to 10 of 1,248 users</span>
                    <div className="pagination-controls">
                        <button className="page-btn text-btn">Prev</button>
                        <button className="page-btn num-btn active">1</button>
                        <button className="page-btn num-btn">2</button>
                        <button className="page-btn num-btn">3</button>
                        <button className="page-btn text-btn">Next</button>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default Users;