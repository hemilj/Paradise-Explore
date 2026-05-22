import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleView = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const blockUser = async (userId) => {
        console.log("Blocking user with ID:", userId);
        try {
            const res = await axios.put(`http://localhost:5000/users/block/${userId}`);
            if (res.data.success) {
                alert(res.data.message);
                // Update the user list after blocking/unblocking
                allUser();
            }
        } catch (error) {
            console.log(error);
        }
        console.log("Block user function executed for ID:", userId);
    }

    const allUser = async () => {
        try {
            const res = await axios.get('http://localhost:5000/users');
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        allUser();
    }, [])
    return (
        <>
            <style>
                {`
                    /* =========================================
                    Modal Overlay (Background)
                    ========================================= */
                    .modal-overlay {
                      position: fixed;
                      top: 0;
                      left: 0;
                      width: 100vw;
                      height: 100vh;
                      background-color: rgba(15, 23, 42, 0.4); /* Dark translucent background */
                      backdrop-filter: blur(6px); /* Creates the frosted glass effect */
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      z-index: 1000;
                      animation: fadeIn 0.3s ease-out forwards;
                    }

                    /* =========================================
                       Modal Container
                    ========================================= */
                    .user-modal {
                      position: relative;
                      background: #ffffff;
                      width: 90%;
                      max-width: 420px;
                      padding: 2.5rem 2rem;
                      border-radius: 20px;
                      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      font-family: 'Inter', system-ui, -apple-system, sans-serif;
                      animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }

                    /* =========================================
                       Close Button
                    ========================================= */
                    .close-btn {
                      position: absolute;
                      top: 16px;
                      right: 16px;
                      width: 32px;
                      height: 32px;
                      background: #f1f5f9;
                      border: none;
                      border-radius: 50%;
                      color: #64748b;
                      font-size: 14px;
                      font-weight: bold;
                      cursor: pointer;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      transition: all 0.2s ease-in-out;
                    }

                    .close-btn:hover {
                      background: #ef4444; /* Soft red on hover */
                      color: white;
                      transform: scale(1.05);
                    }

                    /* =========================================
                       User Image
                    ========================================= */
                    .modal-user-img {
                      width: 110px;
                      height: 110px;
                      border-radius: 50%;
                      object-fit: cover;
                      border: 4px solid #ffffff;
                      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                      margin-bottom: 1rem;
                    }

                    /* =========================================
                       Typography & Details
                    ========================================= */
                    .user-modal h2 {
                      margin: 0 0 1.5rem 0;
                      color: #0f172a;
                      font-size: 1.5rem;
                      font-weight: 700;
                      text-align: center;
                    }

                    .user-modal p {
                      width: 100%;
                      display: flex;
                      justify-content: space-between; /* Pushes label left, value right */
                      align-items: center;
                      margin: 0;
                      padding: 0.75rem 0;
                      border-bottom: 1px solid #e2e8f0;
                      color: #475569;
                      font-size: 0.95rem;
                    }

                    .user-modal p:last-child {
                      border-bottom: none; /* Removes the line under the last item */
                    }

                    .user-modal strong {
                      color: #1e293b;
                      font-weight: 600;
                    }

                    /* Optional: Make the "Status" look like a badge if you want to target it specifically via a class */
                    .user-modal p:last-child {
                      margin-top: 0.5rem;
                    }

                    /* =========================================
                       Animations
                    ========================================= */
                    @keyframes fadeIn {
                      from { opacity: 0; }
                      to { opacity: 1; }
                    }

                    @keyframes slideUp {
                      from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                      }
                    }
                `}
            </style>
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
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td className="user-profile-cell">
                                            <img src={`http://localhost:5000/${user.photo}`} alt={user.name} className="user-avatar" />
                                            <div className="user-details">
                                                <div className="user-name">{user.name}</div>
                                                <div className="user-location">{user.city}, {user.state}</div>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.mobno}</td>
                                        <td>
                                            <span className={`status-badge ${user.status === 'active' ? 'active-status' : 'blocked-status'}`}>
                                                <span className="status-dot"></span> {user.status === 'active' ? 'Active' : 'Blocked'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-group">

                                                <button
                                                    onClick={() => handleView(user)}
                                                    className='action-btn view-btn'
                                                    title="View Details"
                                                >
                                                    <i className="fa-solid fa-eye"></i>
                                                </button>
                                                <button
                                                    onClick={() => blockUser(user._id)}
                                                    className='action-btn block-btn'
                                                    title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                                                >
                                                    <i className="fa-solid fa-ban"></i>
                                                </button>
                                                {/* <a href={`delete_user.php?id=${user._id}`} className="action-btn delete-btn" title="Delete Account" onClick={(e) => handleConfirm(e, 'Are you sure you want to permanently delete this user?')}>
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </a> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {showModal && selectedUser && (

                            <div className="modal-overlay">

                                <div className="user-modal">

                                    <button
                                        className="close-btn"
                                        onClick={() => setShowModal(false)}
                                    >
                                        X
                                    </button>

                                    <img
                                        src={`http://localhost:5000/${selectedUser.photo}`}
                                        alt={selectedUser.name}
                                        className="modal-user-img"
                                    />

                                    <h2>{selectedUser.name}</h2>

                                    <p><strong>Email:</strong> {selectedUser.email}</p>

                                    <p><strong>Phone:</strong> {selectedUser.mobno}</p>

                                    <p><strong>City:</strong> {selectedUser.city}</p>

                                    <p><strong>State:</strong> {selectedUser.state}</p>

                                    <p><strong>Status:</strong> {selectedUser.status}</p>

                                </div>

                            </div>

                        )}
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
        </>
    );
};

export default Users;