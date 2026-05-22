import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

/* ── Paradise-themed Swal base ── */
const paradiseSwal = Swal.mixin({
    background: '#0f172a',
    color: '#e2e8f0',
    customClass: {
        popup: 'paradise-swal-popup',
        confirmButton: 'paradise-swal-confirm',
        cancelButton: 'paradise-swal-cancel',
    },
    buttonsStyling: false,
});

const Agents = () => {
    const [agents, setAgents] = useState([]);

    const getAgents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/agency/agent');
            setAgents(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAgents();
    }, [])

    /* ── APPROVE ── */
    const handleApprove = async (id) => {
        const confirm = await paradiseSwal.fire({
            html: `
                <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
                    <div style="
                        width:64px;height:64px;border-radius:18px;
                        background:linear-gradient(135deg,#0d9488,#0e7490);
                        display:flex;align-items:center;justify-content:center;
                        font-size:1.75rem;color:#fff;
                        box-shadow:0 8px 24px rgba(13,148,136,0.45);">
                        <i class='fa-solid fa-user-check'></i>
                    </div>
                    <h2 style="font-size:1.2rem;font-weight:700;color:#f0fdfa;margin:0">Approve Agency?</h2>
                    <p style="font-size:0.85rem;color:#94a3b8;margin:0">This will grant the agency full login access to the platform.</p>
                </div>`,
            showCancelButton: true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> &nbsp;Yes, Approve',
            cancelButtonText: '<i class="fa-solid fa-xmark"></i> &nbsp;Cancel',
            width: 380,
            padding: '1.75rem',
        });

        if (!confirm.isConfirmed) return;

        try {
            await axios.put(`http://localhost:5000/api/agency/approval/${id}`, {}, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });

            await paradiseSwal.fire({
                html: `
                    <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
                        <div style="
                            width:64px;height:64px;border-radius:18px;
                            background:linear-gradient(135deg,#0d9488,#0e7490);
                            display:flex;align-items:center;justify-content:center;
                            font-size:1.75rem;color:#fff;
                            box-shadow:0 8px 24px rgba(13,148,136,0.45);">
                            <i class='fa-solid fa-plane-departure'></i>
                        </div>
                        <h2 style="font-size:1.25rem;font-weight:700;color:#f0fdfa;margin:0">Agency Approved!</h2>
                        <p style="font-size:0.85rem;color:#94a3b8;margin:0">The agency now has access to the platform.</p>
                    </div>`,
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true,
                width: 360,
                padding: '1.75rem',
                didOpen: () => {
                    const bar = Swal.getTimerProgressBar();
                    if (bar) {
                        bar.style.background = 'linear-gradient(90deg,#0d9488,#2dd4bf)';
                        bar.style.height = '3px';
                    }
                },
            });

            getAgents();
        } catch (error) {
            console.log(error);
            await paradiseSwal.fire({
                html: `
                    <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
                        <div style="
                            width:64px;height:64px;border-radius:18px;
                            background:linear-gradient(135deg,#78350f,#92400e);
                            display:flex;align-items:center;justify-content:center;
                            font-size:1.75rem;color:#fcd34d;
                            box-shadow:0 8px 24px rgba(251,191,36,0.3);">
                            <i class='fa-solid fa-triangle-exclamation'></i>
                        </div>
                        <h2 style="font-size:1.2rem;font-weight:700;color:#fde68a;margin:0">Approval Failed</h2>
                        <p style="font-size:0.85rem;color:#94a3b8;margin:0">Something went wrong. Please try again.</p>
                    </div>`,
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                width: 360,
                padding: '1.75rem',
            });
        }
    }

    /* ── REJECT ── */
    const handleReject = async (id) => {
        const confirm = await paradiseSwal.fire({
            html: `
                <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
                    <div style="
                        width:64px;height:64px;border-radius:18px;
                        background:linear-gradient(135deg,#7f1d1d,#991b1b);
                        display:flex;align-items:center;justify-content:center;
                        font-size:1.75rem;color:#fca5a5;
                        box-shadow:0 8px 24px rgba(239,68,68,0.35);">
                        <i class='fa-solid fa-user-xmark'></i>
                    </div>
                    <h2 style="font-size:1.2rem;font-weight:700;color:#fecaca;margin:0">Reject Agency?</h2>
                    <p style="font-size:0.85rem;color:#94a3b8;margin:0">This application will be marked as rejected and access will be denied.</p>
                </div>`,
            showCancelButton: true,
            confirmButtonText: '<i class="fa-solid fa-ban"></i> &nbsp;Yes, Reject',
            cancelButtonText: '<i class="fa-solid fa-xmark"></i> &nbsp;Cancel',
            width: 380,
            padding: '1.75rem',
            customClass: {
                popup: 'paradise-swal-popup',
                confirmButton: 'paradise-swal-confirm paradise-swal-confirm--error',
                cancelButton: 'paradise-swal-cancel',
            },
        });

        if (!confirm.isConfirmed) return;

        try {
            await axios.put(`http://localhost:5000/api/agency/rejection/${id}`, {}, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });

            await paradiseSwal.fire({
                html: `
                    <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
                        <div style="
                            width:64px;height:64px;border-radius:18px;
                            background:linear-gradient(135deg,#7f1d1d,#991b1b);
                            display:flex;align-items:center;justify-content:center;
                            font-size:1.75rem;color:#fca5a5;
                            box-shadow:0 8px 24px rgba(239,68,68,0.35);">
                            <i class='fa-solid fa-circle-xmark'></i>
                        </div>
                        <h2 style="font-size:1.25rem;font-weight:700;color:#fecaca;margin:0">Agency Rejected</h2>
                        <p style="font-size:0.85rem;color:#94a3b8;margin:0">The application has been declined successfully.</p>
                    </div>`,
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true,
                width: 360,
                padding: '1.75rem',
                didOpen: () => {
                    const bar = Swal.getTimerProgressBar();
                    if (bar) {
                        bar.style.background = 'linear-gradient(90deg,#dc2626,#f87171)';
                        bar.style.height = '3px';
                    }
                },
            });

            getAgents();
        } catch (error) {
            console.log(error);
            await paradiseSwal.fire({
                html: `
                    <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
                        <div style="
                            width:64px;height:64px;border-radius:18px;
                            background:linear-gradient(135deg,#78350f,#92400e);
                            display:flex;align-items:center;justify-content:center;
                            font-size:1.75rem;color:#fcd34d;
                            box-shadow:0 8px 24px rgba(251,191,36,0.3);">
                            <i class='fa-solid fa-triangle-exclamation'></i>
                        </div>
                        <h2 style="font-size:1.2rem;font-weight:700;color:#fde68a;margin:0">Rejection Failed</h2>
                        <p style="font-size:0.85rem;color:#94a3b8;margin:0">Something went wrong. Please try again.</p>
                    </div>`,
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                width: 360,
                padding: '1.75rem',
            });
        }
    }

    return (
        <main className="agents-main">

            {/* Page Header */}
            <div className="agents-header">
                <h1>Agent Approvals</h1>
                <p>Review and approve applications for travel agents.</p>
            </div>

            {/* Table Container */}
            <div className="agents-table-card">
                <div className="agents-table-responsive">
                    <table className="agents-table">
                        <thead>
                            <tr>
                                <th>Agency / Author</th>
                                <th>Contact Details</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {agents.map((agent, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="agency-name">{agent.nameAgency}</div>
                                        <div className="agent-subtext">
                                            <i className="fa-regular fa-user contact-icon"></i> {agent.authorName}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="contact-main">
                                            <i className="fa-regular fa-envelope contact-icon"></i> {agent.agencyEmail}
                                        </div>
                                        <div className="agent-subtext mt-1">
                                            <i className="fa-solid fa-phone contact-icon"></i> {agent.phoneNo}
                                        </div>
                                    </td>
                                    <td className="location-text">
                                        {agent.officeAdd}
                                    </td>
                                    <td>
                                        <span className={`status-badge-outline ${agent.status === 'pending' ? 'pending' : 'approved'}`}>
                                            <i className={`fa-solid ${agent.status === 'pending' ? 'fa-clock-rotate-left' : 'fa-check'}`}></i>
                                            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        {agent.status === 'pending' ? (
                                            <>
                                                <button
                                                    style={{ marginRight: '10px', border: 'none' }}
                                                    className="btn-action btn-approve"
                                                    onClick={() => handleApprove(agent._id)}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    style={{ marginRight: '10px', border: 'none' }}
                                                    className="btn-action btn-reject"
                                                    onClick={() => handleReject(agent._id)}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className="action-completed">Action Complete</span>
                                        )}
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

        </main>
    );
};

export default Agents;