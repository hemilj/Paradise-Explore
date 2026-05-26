import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

// Helper: format MongoDB ObjectId to a short display ID
const shortId = (id) => '#PKG_' + String(id).slice(-4).toUpperCase();

// Helper: format ISO date to "DD Mon YYYY"
const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

function MyPackages() {

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const agentID = localStorage.getItem('agentID') || sessionStorage.getItem('agentID');
        if (!agentID) {
            setError('Agent session not found. Please log in again.');
            setLoading(false);
            return;
        }
        fetchPackages(agentID);
    }, []);

    const fetchPackages = async (agentID) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/packages/agent/${agentID}`);
            setPackages(res.data);
        } catch (err) {
            console.error('Failed to load packages:', err);
            setError('Could not load packages. Please check if the server is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-content">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '25px'
                }}
            >
                <h1 className="page-title" style={{ margin: 0 }}>My Packages</h1>
                <NavLink to="/manage-packages" className="btn btn-primary">
                    <i className="fa-solid fa-plus"></i> Add New Package
                </NavLink>
            </div>

            <div className="form-card table-section">
                {loading ? (
                    <p style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
                        <i className="fa-solid fa-spinner fa-spin"></i>&nbsp; Loading packages...
                    </p>
                ) : error ? (
                    <p style={{ textAlign: 'center', padding: '30px', color: '#e63946' }}>
                        <i className="fa-solid fa-triangle-exclamation"></i>&nbsp; {error}
                    </p>
                ) : packages.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
                        No packages found. <NavLink to="/manage-packages" style={{ color: 'var(--secondary)' }}>Create your first package</NavLink>.
                    </p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Type</th>
                                    <th>Destination</th>
                                    <th>Duration</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packages.map((pkg) => (
                                    <tr key={pkg._id}>
                                        <td><strong>{shortId(pkg._id)}</strong></td>
                                        <td><strong>{pkg.package_title}</strong></td>
                                        <td>{pkg.type_id?.type_name || '—'}</td>
                                        <td>{pkg.destination}</td>
                                        <td>{pkg.duration}</td>
                                        <td>{formatDate(pkg.createdAt)}</td>
                                        <td>
                                            <NavLink
                                                to={`/view-package/${pkg._id}`}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                <i className="fa-solid fa-eye"></i> View Details
                                            </NavLink>
                                        </td>
                                        <td>
                                            <span className={`status-badge-outline ${pkg.status === 'inactive' ? 'inactive' : 'active'}`}>
                                                <i className={`fa-solid ${pkg.status === 'inactive' ? 'fa-clock-rotate-left' : 'fa-check'}`}></i>
                                                {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                                            </span>
                                        </td>
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

export default MyPackages;