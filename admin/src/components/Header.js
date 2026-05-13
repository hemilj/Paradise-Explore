import React from 'react';

const Header = () => {
    return (
        <header className="top-header">
            {/* Search Section */}
            <div className="header-search-wrapper">
                {/* 
                <span className="header-search-icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input 
                    type="text" 
                    placeholder="Search bookings, users..." 
                    className="header-search-input" 
                /> 
                */}
            </div>

            {/* Profile & Notifications Section */}
            <div className="header-profile-section">
                {/* 
                <button className="header-notification-btn">
                    <i className="fa-regular fa-bell"></i>
                    <span className="header-notification-dot"></span>
                </button> 
                */}
                <div className="header-avatar">A</div>
                <span className="header-username">Admin</span>
            </div>
        </header>
    );
};

export default Header;