import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Agents = () => {
    const [agents, setAgents] = useState([]);

    // Helper function for the confirmation dialogs
    const handleConfirm = (e, message) => {
        if (!window.confirm(message)) {
            e.preventDefault();
        }
    };

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
                                                <a
                                                    href={`approve_agent.php?id=${agent._id}`}
                                                    className="btn-action btn-approve"
                                                    onClick={(e) => handleConfirm(e, 'Approve this agent and grant login access?')}
                                                >
                                                    Approve
                                                </a>
                                                <a
                                                    href={`delete_application.php?id=${agent._id}`}
                                                    className="btn-action btn-reject"
                                                    onClick={(e) => handleConfirm(e, 'Reject and delete this application?')}
                                                >
                                                    Reject
                                                </a>
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