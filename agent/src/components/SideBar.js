import React from 'react';
import { NavLink } from 'react-router-dom';

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <a href="dashboard.php" style={{ textDecoration: 'none', color: '#fff' }}>
          Paradise <span>Agent</span>
        </a>
      </div>
      <ul className="nav-links">
        <li>
          <a href="dashboard.php" className="active">
            <i className="fa-solid fa-gauge"></i> Dashboard
          </a>
        </li>
        <li>
          <a href="package-types.php" className="">
            <i className="fa-solid fa-tags"></i> Package Types
          </a>
        </li>
        <li>
          <a href="view-packages.php" className="">
            <i className="fa-solid fa-map-location-dot"></i> Manage Packages
          </a>
        </li>
        <li>
          <a href="view_activities.php" className="">
            <i className="fa-solid fa-person-walking"></i> Manage Activity
          </a>
        </li>
        <li>
          <a href="agent-inquiries.php" className="">
            <i className="fa-solid fa-comments"></i> Customer Inquiries
          </a>
        </li>
        <li>
          <a href="agent-bookings.php" className="">
            <i className="fa-solid fa-calendar-check"></i> Bookings
          </a>
        </li>
        <li>
          <a href="agent-activity-bookings.php" className="">
            <i className="fa-solid fa-person-hiking"></i> Activity Bookings
          </a>
        </li>
        <li>
          {/* Logout */}
          <div className="sidebar-footer">
            <NavLink to="/logout" className="sidebar-logout">
              <i className="fa-solid fa-right-from-bracket sidebar-link-icon"></i> Logout
            </NavLink>
          </div>
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;