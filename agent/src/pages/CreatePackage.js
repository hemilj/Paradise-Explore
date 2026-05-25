import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

/* ── Paradise-themed Swal base ── */
const paradiseSwal = Swal.mixin({
    background: '#0f172a',
    color: '#e2e8f0',
    customClass: {
        popup: 'paradise-swal-popup',
        title: 'paradise-swal-title',
        htmlContainer: 'paradise-swal-html',
        confirmButton: 'paradise-swal-confirm',
        cancelButton: 'paradise-swal-cancel',
    },
    buttonsStyling: false,
});

// Default empty row shapes
const emptyItineraryRow = () => ({ id: Date.now(), day_title: '', day_desc: '' });
const emptyBatchRow     = () => ({
    id: Date.now(),
    start_date: '', end_date: '',
    price: '', max_people: '', available_seats: ''
});

function CreatePackage() {

    // ── State ────────────────────────────────────────────────────────────────
    const [itinerary, setItinerary]       = useState([emptyItineraryRow()]);
    const [batches, setBatches]           = useState([emptyBatchRow()]);
    const [packageTypes, setPackageTypes] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ── Fetch package categories on mount ────────────────────────────────────
    useEffect(() => {
        axios.get('http://localhost:5000/all/package-types')
            .then(res => setPackageTypes(res.data))
            .catch(err => console.error('Failed to load package types:', err));
    }, []);

    // ── Itinerary helpers ─────────────────────────────────────────────────────
    const addItineraryRow = () =>
        setItinerary(prev => [...prev, emptyItineraryRow()]);

    const removeItineraryRow = (id) =>
        setItinerary(prev => prev.filter(i => i.id !== id));

    const updateItinerary = (id, field, value) =>
        setItinerary(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));

    // ── Batch helpers ─────────────────────────────────────────────────────────
    const addBatchRow = () =>
        setBatches(prev => [...prev, emptyBatchRow()]);

    const removeBatchRow = (id) =>
        setBatches(prev => prev.filter(b => b.id !== id));

    const updateBatch = (id, field, value) =>
        setBatches(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));

    // ── Submit handler ────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const agentID = localStorage.getItem('agentID') || sessionStorage.getItem('agentID');

        // Guard: no agent session
        if (!agentID) {
            await paradiseSwal.fire({
                html: `
                    <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
                        <div style="
                            width:64px;height:64px;border-radius:18px;
                            background:linear-gradient(135deg,#7f1d1d,#b91c1c);
                            display:flex;align-items:center;justify-content:center;
                            font-size:1.75rem;color:#fca5a5;
                            box-shadow:0 8px 24px rgba(239,68,68,0.35);">
                            <i class="fa-solid fa-user-slash"></i>
                        </div>
                        <h2 style="font-size:1.2rem;font-weight:700;color:#fecaca;margin:0">Session Expired</h2>
                        <p style="font-size:0.85rem;color:#94a3b8;margin:0">Please log in to continue.</p>
                    </div>`,
                showConfirmButton: true,
                confirmButtonText: 'Log In',
                width: 360,
                padding: '1.75rem',
                customClass: {
                    popup: 'paradise-swal-popup',
                    confirmButton: 'paradise-swal-confirm paradise-swal-confirm--error',
                },
            });
            window.location.href = '/login';
            setIsSubmitting(false);
            return;
        }

        try {
            // ── Build FormData from the native form (for scalar + file fields) ──
            const formData = new FormData(e.target);
            formData.append('agentID', agentID);

            // ── Serialize itinerary & batches from React state as JSON ─────────
            // This is the reliable approach — state always reflects current values
            const itineraryData = itinerary.map((item, index) => ({
                day_number: index + 1,
                day_title:  item.day_title,
                day_desc:   item.day_desc,
            }));

            const batchesData = batches.map(b => ({
                start_date:      b.start_date,
                end_date:        b.end_date,
                price:           Number(b.price),
                max_people:      Number(b.max_people),
                available_seats: Number(b.available_seats),
            }));

            formData.append('itinerary', JSON.stringify(itineraryData));
            formData.append('batches',   JSON.stringify(batchesData));

            // Let axios auto-detect multipart boundary (do NOT set Content-Type manually)
            await axios.post('http://localhost:5000/api/packages/add', formData);

            // Success notification
            await paradiseSwal.fire({
                html: `
                    <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
                        <div style="
                            width:64px;height:64px;border-radius:18px;
                            background:linear-gradient(135deg,#0d9488,#10b981);
                            display:flex;align-items:center;justify-content:center;
                            font-size:1.75rem;color:#fff;
                            box-shadow:0 8px 24px rgba(13,148,136,0.45);">
                            <i class="fa-solid fa-map-location-dot"></i>
                        </div>
                        <h2 style="font-size:1.25rem;font-weight:700;color:#f0fdfa;margin:0">Package Created!</h2>
                        <p style="font-size:0.85rem;color:#94a3b8;margin:0">Your package has been saved successfully.</p>
                    </div>`,
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true,
                width: 360,
                padding: '1.75rem',
                didOpen: () => {
                    const bar = Swal.getTimerProgressBar();
                    if (bar) {
                        bar.style.background = 'linear-gradient(90deg,#0d9488,#10b981)';
                        bar.style.height = '3px';
                    }
                },
            });

            window.location.href = '/my-packages';

        } catch (error) {
            console.error('Package save error:', error);
            const errMsg = error.response?.data?.message
                || (error.response?.data?.errors?.[0]?.msg)
                || 'Failed to save the package. Please try again.';

            await paradiseSwal.fire({
                html: `
                    <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
                        <div style="
                            width:64px;height:64px;border-radius:18px;
                            background:linear-gradient(135deg,#7f1d1d,#b91c1c);
                            display:flex;align-items:center;justify-content:center;
                            font-size:1.75rem;color:#fca5a5;
                            box-shadow:0 8px 24px rgba(239,68,68,0.35);">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <h2 style="font-size:1.2rem;font-weight:700;color:#fecaca;margin:0">Save Failed</h2>
                        <p style="font-size:0.85rem;color:#94a3b8;margin:0;text-align:center">${errMsg}</p>
                    </div>`,
                showConfirmButton: true,
                confirmButtonText: '<i class="fa-solid fa-rotate-right"></i> &nbsp;Try Again',
                width: 360,
                padding: '1.75rem',
                customClass: {
                    popup: 'paradise-swal-popup',
                    confirmButton: 'paradise-swal-confirm paradise-swal-confirm--error',
                },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="page-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h1 className="page-title" style={{ marginBottom: 0 }}>Create New Package</h1>
                <NavLink to="/my-packages" className="btn btn-secondary">
                    <i className="fa-solid fa-arrow-left"></i> Back to Packages
                </NavLink>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">

                {/* 1. Basic Information */}
                <div className="form-card">
                    <h3>1. Basic Information</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Package Title</label>
                            <input type="text" name="package_title" className="form-control" placeholder="e.g., Manali Adventure Tour" required />
                        </div>
                        <div className="form-group">
                            <label>Package Type</label>
                            <select name="type_id" className="form-control" required>
                                <option value="">Select Category</option>
                                {packageTypes.map(type => (
                                    <option key={type._id} value={type._id}>
                                        {type.type_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Destination</label>
                            <input type="text" name="destination" className="form-control" placeholder="e.g., Manali, Himachal Pradesh" required />
                        </div>
                        <div className="form-group">
                            <label>Duration</label>
                            <input type="text" name="duration" className="form-control" placeholder="e.g., 5 Days / 4 Nights" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Overview</label>
                        <textarea name="overview" className="form-control" rows="4" placeholder="Write an engaging description of the package..."></textarea>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Inclusions (Comma separated)</label>
                            <textarea name="inclusions" className="form-control" rows="3" placeholder="Hotel, Breakfast, Cab..."></textarea>
                        </div>
                        <div className="form-group">
                            <label>Exclusions (Comma separated)</label>
                            <textarea name="exclusions" className="form-control" rows="3" placeholder="Flight tickets, Personal expenses..."></textarea>
                        </div>
                    </div>
                </div>

                {/* 2. Package Images */}
                <div className="form-card">
                    <h3>2. Package Images</h3>
                    <div className="form-group">
                        <label>Upload Images (Select multiple)</label>
                        <input type="file" name="package_images[]" className="form-control" multiple accept="image/*" required />
                    </div>
                </div>

                {/* 3. Day-wise Itinerary — fully controlled via state */}
                <div className="form-card">
                    <h3>3. Day-wise Itinerary</h3>
                    <div id="itinerary-container">
                        {itinerary.map((item, index) => (
                            <div className="dynamic-row" key={item.id}>

                                {itinerary.length > 1 && (
                                    <button
                                        type="button"
                                        className="remove-row"
                                        onClick={() => removeItineraryRow(item.id)}
                                        title="Remove this day"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                )}

                                <div className="form-row">
                                    <div className="form-group" style={{ flex: 0.2 }}>
                                        <label>Day</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={index + 1}
                                            readOnly
                                            style={{ background: '#f4f7f6' }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Day Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g., Arrival in Manali"
                                            value={item.day_title}
                                            onChange={(e) => updateItinerary(item.id, 'day_title', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        placeholder="Describe the day's activities..."
                                        value={item.day_desc}
                                        onChange={(e) => updateItinerary(item.id, 'day_desc', e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="btn-outline" onClick={addItineraryRow}>
                        + Add Another Day
                    </button>
                </div>

                {/* 4. Departure Batches & Pricing — fully controlled via state */}
                <div className="form-card">
                    <h3>4. Departure Batches &amp; Pricing</h3>
                    <div id="batch-container">
                        {batches.map((batch) => (
                            <div className="dynamic-row" key={batch.id}>

                                {batches.length > 1 && (
                                    <button
                                        type="button"
                                        className="remove-row"
                                        onClick={() => removeBatchRow(batch.id)}
                                        title="Remove this batch"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                )}

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Start Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={batch.start_date}
                                            onChange={(e) => updateBatch(batch.id, 'start_date', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>End Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={batch.end_date}
                                            onChange={(e) => updateBatch(batch.id, 'end_date', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Price (₹)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="12999"
                                            min="0"
                                            value={batch.price}
                                            onChange={(e) => updateBatch(batch.id, 'price', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Total Seats</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="20"
                                            min="1"
                                            value={batch.max_people}
                                            onChange={(e) => updateBatch(batch.id, 'max_people', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Available Seats</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="20"
                                            min="0"
                                            value={batch.available_seats}
                                            onChange={(e) => updateBatch(batch.id, 'available_seats', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="btn-outline" onClick={addBatchRow}>
                        + Add Another Batch Date
                    </button>
                </div>

                <div style={{ textAlign: 'right', marginBottom: '50px' }}>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ fontSize: '1.1rem', padding: '14px 40px' }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</>
                            : <><i className="fa-solid fa-floppy-disk"></i> Save Package to Database</>
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePackage;