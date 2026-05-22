import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {

    // NavLink automatically receives isActive from React Router.
    // We use it to apply the correct CSS class.
    const linkClass = ({ isActive }) =>
        isActive ? 'sidebar-link active' : 'sidebar-link';

    return (
        <aside className="sidebar">

            {/* Logo / Brand */}
            <div className="sidebar-header">
                <i className="fa-solid fa-plane-departure sidebar-logo-icon"></i>
                <span className="sidebar-brand">Paradise <span>Admin</span></span>
            </div>

            {/* Navigation Links */}
            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className={linkClass} end>
                    <i className="fa-solid fa-chart-pie sidebar-link-icon"></i> Dashboard
                </NavLink>

                <NavLink to="/users" className={linkClass}>
                    <i className="fa-solid fa-users sidebar-link-icon"></i> Users
                </NavLink>

                <NavLink to="/agents" className={linkClass}>
                    <i className="fa-solid fa-user-tie sidebar-link-icon"></i> Agents
                </NavLink>

                <NavLink to="/packages" className={linkClass}>
                    <i className="fa-solid fa-map-location-dot sidebar-link-icon"></i> Packages
                </NavLink>

                <NavLink to="/activities" className={linkClass}>
                    <i className="fa-solid fa-person-hiking sidebar-link-icon"></i> Activities
                </NavLink>

                <NavLink to="/bookings" className={linkClass}>
                    <i className="fa-solid fa-calendar-check sidebar-link-icon"></i> Bookings
                </NavLink>

                <NavLink to="/payments" className={linkClass}>
                    <i className="fa-solid fa-credit-card sidebar-link-icon"></i> Payments
                </NavLink>
            </nav>

            {/* Logout */}
            <div className="sidebar-footer">
                <NavLink to="/logout" className="sidebar-logout">
                    <i className="fa-solid fa-right-from-bracket sidebar-link-icon"></i> Logout
                </NavLink>
            </div>

        </aside>
    );
};

export default SideBar;