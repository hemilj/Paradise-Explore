import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Packages() {
    const [allPackages, setAllPackages] = useState([]);

    const getPackages = async () => {
        try {
            const res = await axios.get('http://localhost:5000/all/packages');
            setAllPackages(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPackages();
    }, []);

    const handleDelete = (e) => {
        if (!window.confirm('Are you sure you want to delete this package?')) {
            e.preventDefault();
        }
    };

    const handleActivate = async (e, pkg) => {
        e.preventDefault();
        const pct = window.prompt(`Enter commission percentage for "${pkg.package_title}":\n(e.g., enter 11 for 11%)`);
        if (pct === null) return; // User cancelled
        
        const commissionVal = parseFloat(pct);
        if (isNaN(commissionVal) || commissionVal < 0) {
            alert("Please enter a valid positive number for percentage.");
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/packages/${pkg._id}/status`, {
                status: 'active',
                commission: commissionVal
            });
            getPackages(); // Refresh list
        } catch (error) {
            console.error(error);
            alert("Failed to activate package.");
        }
    };

    return (
        <div className="page-content">

            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                    <h1 className="page-title" style={{ marginBottom: '5px' }}>Package Management</h1>
                    <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: 0 }}>
                        Review, approve, and manage all travel packages created by agents.
                    </p>
                </div>
                <a href="admin-add-package.php" className="btn btn-primary">
                    <i className="fa-solid fa-plus" style={{ marginRight: '8px' }}></i> Add New Package
                </a>
            </div>

            {/* Filter & Search Bar */}
            <div className="filter-bar">
                <div className="filter-search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search packages, destinations, or agents..." />
                </div>
                <div className="filter-select">
                    <select>
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending Approval</option>
                        <option value="Active">Active</option>
                    </select>
                </div>
            </div>

            {/* Data Table */}
            <div className="form-card table-section" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table" style={{ marginTop: 0 }}>
                        <thead>
                            <tr>
                                <th>Package Details</th>
                                <th>Agent</th>
                                <th>Duration & Type</th>
                                <th>Agent Price / Seats</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allPackages.map((pkg) => (
                                <tr key={pkg._id}>

                                    <td>
                                        <div style={{ fontWeight: '600', color: '#374151' }}>{pkg.package_title}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#0d9488', marginTop: '4px' }}>
                                            <i className="fa-solid fa-location-dot" style={{ marginRight: '4px' }}></i>
                                            {pkg.destination}
                                        </div>
                                    </td>

                                    <td>
                                        <div style={{ fontWeight: '500', color: '#374151' }}>
                                            <i className="fa-solid fa-user-tie" style={{ color: '#9ca3af', marginRight: '6px' }}></i>
                                            {pkg.agentID?.nameAgency || 'Unknown Agency'}
                                        </div>
                                    </td>

                                    <td>
                                        <div style={{ color: '#374151' }}>{pkg.duration}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '4px' }}>
                                            Category: {pkg.type_id?.type_name || 'Unknown Type'}
                                        </div>
                                    </td>

                                    <td>
                                        <div style={{ fontWeight: 'bold', color: '#374151' }}>{pkg.batches && pkg.batches.length > 0 ? `₹${pkg.batches[0].price}` : 'N/A'}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '4px' }}>
                                            Seats: {pkg.batches && pkg.batches.length > 0 ? pkg.batches[0].max_people : 'N/A'}
                                        </div>
                                    </td>

                                    <td>
                                        {pkg.commission > 0 || pkg.status === 'active' ? (
                                            <>
                                                <div style={{ fontWeight: 'bold', color: '#0d9488' }}>
                                                    {pkg.batches && pkg.batches.length > 0 
                                                        ? `₹${pkg.batches[0].price + (pkg.batches[0].price * (pkg.commission / 100))}` 
                                                        : 'N/A'}
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '4px' }}>
                                                    {pkg.commission}% commission
                                                </div>
                                            </>
                                        ) : (
                                            <span style={{ fontSize: '0.85rem', color: '#9ca3af', fontStyle: 'italic' }}>
                                                Pending approval
                                            </span>
                                        )}
                                    </td>

                                    <td>
                                        <span className={`status-badge ${pkg.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                                            {pkg.status ? pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1) : ''}
                                        </span>
                                    </td>

                                    <td className="action-icons" style={{ textAlign: 'center' }}>
                                        <a href={`packages-details.php?id=${pkg._id}`} title="View Details">
                                            <i className="fa-solid fa-eye" style={{ color: '#3b82f6' }}></i>
                                        </a>

                                        {pkg.status === 'inactive' && (
                                            <a href="#" title="Activate Package" onClick={(e) => handleActivate(e, pkg)}>
                                                <i className="fa-solid fa-power-off" style={{ color: '#10b981' }}></i>
                                            </a>
                                        )}

                                        <a href={`edit-package.php?id=${pkg._id}`} title="Edit Package">
                                            <i className="fa-solid fa-pen-to-square" style={{ color: '#3b82f6' }}></i>
                                        </a>
                                        <a href={`delete-package.php?id=${pkg._id}`} title="Delete Package" onClick={handleDelete}>
                                            <i className="fa-solid fa-trash-can" style={{ color: '#ef4444' }}></i>
                                        </a>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Packages;