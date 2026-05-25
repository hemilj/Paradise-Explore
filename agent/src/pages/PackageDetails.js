import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';

// Helper: format ISO date to "DD Mon YYYY"
const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

// Helper: format currency
const formatPrice = (amount) =>
    '₹' + Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 });

// Helper: short display ID from MongoDB _id
const shortId = (id) => '#PKG_' + String(id).slice(-4).toUpperCase();

function PackageDetails() {
    const { id } = useParams();

    const [pkg, setPkg]         = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {
        if (!id) { setError('No package ID provided.'); setLoading(false); return; }
        axios.get(`http://localhost:5000/api/packages/${id}`)
            .then(res => setPkg(res.data))
            .catch(err => {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to load package details.');
            })
            .finally(() => setLoading(false));
    }, [id]);

    // ── Loading state ────────────────────────────────────────────────────────
    if (loading) return (
        <div className="page-content" style={{ textAlign: 'center', paddingTop: '80px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
            <p style={{ color: 'var(--text-muted)', marginTop: '15px' }}>Loading package details…</p>
        </div>
    );

    // ── Error state ───────────────────────────────────────────────────────────
    if (error) return (
        <div className="page-content" style={{ textAlign: 'center', paddingTop: '80px' }}>
            <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '2rem', color: 'var(--secondary)' }}></i>
            <p style={{ color: 'var(--secondary)', marginTop: '15px' }}>{error}</p>
            <NavLink to="/my-packages" className="btn btn-secondary" style={{ marginTop: '10px' }}>
                <i className="fa-solid fa-arrow-left"></i> Back to Packages
            </NavLink>
        </div>
    );

    // ── Main render ───────────────────────────────────────────────────────────
    return (
        <div className="page-content">

            {/* ── Page Header ────────────────────────────────────────────── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
                <div>
                    <h1 className="page-title" style={{ marginBottom: '5px' }}>Package Details</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
                        <strong style={{ color: 'var(--primary)' }}>{pkg.package_title}</strong>
                        &nbsp;·&nbsp;{shortId(pkg._id)}
                    </p>
                </div>
                <NavLink to="/my-packages" className="btn btn-secondary">
                    <i className="fa-solid fa-arrow-left"></i> Back to All Packages
                </NavLink>
            </div>

            {/* ── 1. Basic Information Card ───────────────────────────────── */}
            <div className="form-card">
                <h3>1. Basic Information</h3>
                <div className="form-row">
                    <div className="form-group" style={{ flex: 2 }}>
                        <label>Package Title</label>
                        <div className="detail-value">{pkg.package_title}</div>
                    </div>
                    <div className="form-group">
                        <label>Package Type</label>
                        <div className="detail-value">{pkg.type_id?.type_name || '—'}</div>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <div className="detail-value">
                            <span className={`status-badge ${pkg.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                                {pkg.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Destination</label>
                        <div className="detail-value">
                            <i className="fa-solid fa-location-dot" style={{ color: 'var(--secondary)', marginRight: '6px' }}></i>
                            {pkg.destination}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Duration</label>
                        <div className="detail-value">
                            <i className="fa-regular fa-clock" style={{ color: 'var(--secondary)', marginRight: '6px' }}></i>
                            {pkg.duration}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Created At</label>
                        <div className="detail-value">{formatDate(pkg.createdAt)}</div>
                    </div>
                </div>

                {pkg.overview && (
                    <div className="form-group">
                        <label>Overview</label>
                        <div className="detail-value" style={{ whiteSpace: 'pre-line', lineHeight: '1.7' }}>{pkg.overview}</div>
                    </div>
                )}

                <div className="form-row">
                    {pkg.inclusions && (
                        <div className="form-group">
                            <label><i className="fa-solid fa-circle-check" style={{ color: '#155724', marginRight: '6px' }}></i>Inclusions</label>
                            <ul style={{ paddingLeft: '20px', margin: 0, lineHeight: '1.9', color: 'var(--text-dark)' }}>
                                {pkg.inclusions.split(',').map((item, i) => (
                                    <li key={i}>{item.trim()}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {pkg.exclusions && (
                        <div className="form-group">
                            <label><i className="fa-solid fa-circle-xmark" style={{ color: '#721c24', marginRight: '6px' }}></i>Exclusions</label>
                            <ul style={{ paddingLeft: '20px', margin: 0, lineHeight: '1.9', color: 'var(--text-dark)' }}>
                                {pkg.exclusions.split(',').map((item, i) => (
                                    <li key={i}>{item.trim()}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* ── 2. Package Images ────────────────────────────────────────── */}
            {pkg.images && pkg.images.length > 0 && (
                <div className="form-card">
                    <h3>2. Package Images</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {pkg.images.map((img, i) => (
                            <img
                                key={i}
                                src={`http://localhost:5000/uploads/${img}`}
                                alt={`Package ${i + 1}`}
                                style={{
                                    width: '180px',
                                    height: '120px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* ── 3. Day-wise Itinerary ─────────────────────────────────── */}
            <div className="form-card table-section">
                <h3>3. Day-wise Itinerary</h3>
                {pkg.itinerary && pkg.itinerary.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Day Title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pkg.itinerary.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <span className="status-badge" style={{ background: 'var(--primary)', color: '#fff', minWidth: '60px', textAlign: 'center', display: 'inline-block' }}>
                                                Day {item.day_number}
                                            </span>
                                        </td>
                                        <td><strong>{item.day_title}</strong></td>
                                        <td style={{ lineHeight: '1.6' }}>{item.day_desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>No itinerary added.</p>
                )}
            </div>

            {/* ── 4. Departure Batches & Pricing ───────────────────────── */}
            <div className="form-card table-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0, border: 'none', paddingBottom: 0 }}>4. Departure Batches &amp; Pricing</h3>
                </div>
                {pkg.batches && pkg.batches.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Price</th>
                                    <th>Total Seats</th>
                                    <th>Available Seats</th>
                                    <th>Availability</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pkg.batches.map((batch, index) => {
                                    const isFull = batch.available_seats === 0;
                                    return (
                                        <tr key={index}>
                                            <td><strong>#{index + 1}</strong></td>
                                            <td>{formatDate(batch.start_date)}</td>
                                            <td>{formatDate(batch.end_date)}</td>
                                            <td><strong style={{ color: 'var(--primary)' }}>{formatPrice(batch.price)}</strong></td>
                                            <td>{batch.max_people}</td>
                                            <td><strong>{batch.available_seats}</strong></td>
                                            <td>
                                                <span className={`status-badge ${isFull ? 'status-inactive' : 'status-active'}`}>
                                                    {isFull ? 'Full' : 'Available'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>No batch dates added.</p>
                )}
            </div>

        </div>
    );
}

export default PackageDetails;