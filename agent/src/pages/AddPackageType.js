import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

/* ── Paradise-themed Swal base ── */
const paradiseSwal = Swal.mixin({
    background: "#0f172a",
    color: "#e2e8f0",
    customClass: {
        popup: "paradise-swal-popup",
        title: "paradise-swal-title",
        htmlContainer: "paradise-swal-html",
        confirmButton: "paradise-swal-confirm",
        cancelButton: "paradise-swal-cancel",
    },
    buttonsStyling: false,
});

function AddPackageType() {

    const handleSubmit = async (event) => {
        event.preventDefault();

        const agentID = localStorage.getItem('agentID') || sessionStorage.getItem('agentID');

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
                padding: "1.75rem",
                customClass: {
                    popup: "paradise-swal-popup",
                    confirmButton: "paradise-swal-confirm paradise-swal-confirm--error",
                },
            });
            window.location.href = '/login';
            return;
        }

        const formData = new FormData(event.target);

        formData.append("agentID", agentID);

        try {
            const res = await axios.post(
                'http://localhost:5000/api/package-types/add',
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            await paradiseSwal.fire({
                html: `
                    <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
                        <div style="
                            width:64px;height:64px;border-radius:18px;
                            background:linear-gradient(135deg,#0d9488,#10b981);
                            display:flex;align-items:center;justify-content:center;
                            font-size:1.75rem;color:#fff;
                            box-shadow:0 8px 24px rgba(13,148,136,0.45);">
                            <i class="fa-solid fa-tags"></i>
                        </div>
                        <h2 style="font-size:1.25rem;font-weight:700;color:#f0fdfa;margin:0">Package Type Created!</h2>
                        <p style="font-size:0.85rem;color:#94a3b8;margin:0">Saving your new category to Paradise Explore…</p>
                    </div>`,
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true,
                width: 360,
                padding: "1.75rem",
                showClass: { popup: "animate__animated animate__fadeInDown animate__faster" },
                hideClass: { popup: "animate__animated animate__fadeOutUp animate__faster" },
                didOpen: () => {
                    const bar = Swal.getTimerProgressBar();
                    if (bar) {
                        bar.style.background = "linear-gradient(90deg,#0d9488,#10b981)";
                        bar.style.height = "3px";
                    }
                },
            });

            window.location.href = '/package-types';
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.message || 'Error adding package type';

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
                        <h2 style="font-size:1.2rem;font-weight:700;color:#fecaca;margin:0">Failed to Add</h2>
                        <p style="font-size:0.85rem;color:#94a3b8;margin:0;text-align:center">${errMsg}</p>
                    </div>`,
                showConfirmButton: true,
                confirmButtonText: '<i class="fa-solid fa-rotate-right"></i> &nbsp;Try Again',
                width: 360,
                padding: "1.75rem",
                customClass: {
                    popup: "paradise-swal-popup",
                    confirmButton: "paradise-swal-confirm paradise-swal-confirm--error",
                },
            });
        }
    }

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
                <h1 className="page-title" style={{ marginBottom: 0 }}>Add Package Type</h1>

                {/* If using React Router, you can swap this <a> for a <Link to="/package-types"> */}
                <a href="/package-types" className="btn btn-secondary">
                    <i className="fa-solid fa-arrow-left"></i> Back to List
                </a>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-card" style={{ maxWidth: '800px' }}>
                    <h3>Category Details</h3>

                    <div className="form-row">
                        <div className="form-group" style={{ flex: 2 }}>
                            <label>Type Name</label>
                            <input
                                type="text"
                                name="type_name"
                                className="form-control"
                                placeholder="e.g., Adventure, Honeymoon, Religious"
                                required
                            />
                        </div>

                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Status</label>
                            <select name="status" className="form-control">
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description (Optional)</label>
                        <textarea
                            name="description"
                            className="form-control"
                            rows="4"
                            placeholder="Briefly describe what this type of package includes..."
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Upload Image</label>
                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            accept="image/*"
                            required
                        />
                    </div>

                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        <button
                            type="reset"
                            className="btn btn-secondary"
                            style={{ marginRight: '10px' }}
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            name="btnSave"
                        >
                            Save Package Type
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddPackageType;