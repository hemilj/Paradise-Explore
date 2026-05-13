import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Header() {

    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Read user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                setUser(null);
            }
        }
    }, []);

    // Preloader fade-out
    useEffect(() => {
        window.addEventListener('load', function () {
            setTimeout(function () {
                var preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(function () {
                        preloader.style.display = 'none';
                    }, 500);
                }
            }, 1000);
        });
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.user-menu')) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout?',
            html: `<p style="color:#555;">Are you sure you want to log out, <strong>${user?.uname}</strong>?</p>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Logout',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#e53935',
            cancelButtonColor: '#1976D2',
            background: '#ffffff',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
                window.location.href = '/';
            }
        });
    };

    // Generate avatar initials from username
    const getInitials = (name = '') => {
        return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div>
            <style>{`
                /* ── USER MENU ── */
                .user-menu {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                }

                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #1976D2, #0D47A1);
                    color: #fff;
                    font-size: 0.85rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    letter-spacing: 0.5px;
                    box-shadow: 0 4px 14px rgba(25,118,210,0.4);
                    border: 2px solid rgba(255,255,255,0.25);
                    transition: transform 0.2s, box-shadow 0.2s;
                    flex-shrink: 0;
                }

                .user-avatar:hover {
                    transform: scale(1.08);
                    box-shadow: 0 6px 20px rgba(25,118,210,0.55);
                }

                .user-greeting {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.2;
                }

                .user-greeting .greeting-text {
                    font-size: 0.7rem;
                    color: #888;
                    font-weight: 400;
                }

                .user-greeting .user-name {
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: var(--secondary-color, #1d3557);
                    max-width: 120px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .user-chevron {
                    font-size: 0.65rem;
                    color: #999;
                    transition: transform 0.25s;
                }

                .user-chevron.open {
                    transform: rotate(180deg);
                }

                /* ── DROPDOWN ── */
                .user-dropdown {
                    position: absolute;
                    top: calc(100% + 12px);
                    right: 0;
                    min-width: 220px;
                    background: #fff;
                    border-radius: 14px;
                    box-shadow: 0 12px 40px rgba(0,0,0,0.14);
                    padding: 6px 0;
                    z-index: 9999;
                    animation: dropFadeIn 0.2s ease;
                    border: 1px solid rgba(0,0,0,0.06);
                }

                @keyframes dropFadeIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Profile card at top of dropdown */
                .dropdown-profile {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 16px 12px;
                    border-bottom: 1px solid #f0f0f0;
                    margin-bottom: 4px;
                }

                .dropdown-profile .dp-avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #1976D2, #0D47A1);
                    color: #fff;
                    font-weight: 700;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .dropdown-profile .dp-info .dp-name {
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: #1d3557;
                }

                .dropdown-profile .dp-info .dp-email {
                    font-size: 0.75rem;
                    color: #999;
                    word-break: break-all;
                }

                /* Dropdown items */
                .dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 11px 18px;
                    font-size: 0.875rem;
                    color: #444;
                    text-decoration: none;
                    cursor: pointer;
                    border: none;
                    border-left: 3px solid transparent;
                    background: none;
                    width: 100%;
                    text-align: left;
                    position: relative;
                    transition:
                        background 0.25s ease,
                        color 0.25s ease,
                        border-left-color 0.25s ease,
                        padding-left 0.25s ease,
                        box-shadow 0.25s ease;
                }

                .dropdown-item:hover {
                    background: linear-gradient(90deg, #eef4ff 0%, #f8fbff 100%);
                    color: #1565C0;
                    border-left-color: #1976D2;
                    padding-left: 22px;
                    box-shadow: inset 0 0 0 0 transparent, 0 2px 8px rgba(25,118,210,0.07);
                }

                .dropdown-item i {
                    width: 20px;
                    text-align: center;
                    font-size: 0.88rem;
                    color: #1976D2;
                    transition:
                        transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                        color 0.25s ease;
                    flex-shrink: 0;
                }

                .dropdown-item:hover i {
                    transform: scale(1.28) rotate(-4deg);
                    color: #0D47A1;
                }

                .dropdown-divider {
                    height: 1px;
                    background: #f0f0f0;
                    margin: 4px 0;
                }

                .dropdown-item.logout-item {
                    color: #e53935;
                }

                .dropdown-item.logout-item i {
                    color: #e53935;
                    transition:
                        transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                        color 0.25s ease;
                }

                .dropdown-item.logout-item:hover {
                    background: linear-gradient(90deg, #fff0f0 0%, #fff7f7 100%);
                    color: #b71c1c;
                    border-left-color: #e53935;
                    padding-left: 22px;
                }

                .dropdown-item.logout-item:hover i {
                    transform: scale(1.28) rotate(8deg);
                    color: #b71c1c;
                }
            `}</style>

            {/* PRELOADER */}
            <div id="preloader">
                <div className="loader-container">
                    <div className="plane-loader">
                        <i className="fa-solid fa-plane"></i>
                    </div>
                </div>
            </div>

            {/* NAVBAR */}
            <nav className="navbar">
                <div className="container nav-container">

                    {/* LOGO */}
                    <div className="logo">
                        <a href="/">
                            <i className="fa-solid fa-location-dot"></i> Paradise Explore
                            <span style={{ fontSize: '0.8rem', display: 'block', color: '#555' }}>
                                TOURS &amp; TRAVELS
                            </span>
                        </a>
                    </div>

                    {/* NAV LINKS */}
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/packages">Packages</a></li>
                        <li><a href="/blogs">Blog</a></li>
                        <li><a href="/activity">Activity</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>

                    {/* AUTH SECTION */}
                    <div className="nav-btn-log">
                        {user ? (
                            /* ── LOGGED IN: show user avatar + dropdown ── */
                            <div
                                className="user-menu"
                                onClick={() => setDropdownOpen(prev => !prev)}
                            >
                                {/* Avatar */}
                                <div className="user-avatar">
                                    {getInitials(user.uname)}
                                </div>

                                {/* Name & greeting */}
                                <div className="user-greeting">
                                    <span className="greeting-text">Welcome back,</span>
                                    <span className="user-name">{user.uname}</span>
                                </div>

                                {/* Chevron */}
                                <i className={`fa-solid fa-chevron-down user-chevron ${dropdownOpen ? 'open' : ''}`}></i>

                                {/* Dropdown */}
                                {dropdownOpen && (
                                    <div className="user-dropdown" onClick={e => e.stopPropagation()}>

                                        {/* Profile card */}
                                        <div className="dropdown-profile">
                                            <div className="dp-avatar">{getInitials(user.uname)}</div>
                                            <div className="dp-info">
                                                <div className="dp-name">{user.uname}</div>
                                                <div className="dp-email">{user.email}</div>
                                            </div>
                                        </div>

                                        {/* Menu items */}
                                        <a className="dropdown-item" href="/profile">
                                            <i className="fa-solid fa-user"></i> My Profile
                                        </a>
                                        <a className="dropdown-item" href="/my-bookings">
                                            <i className="fa-solid fa-suitcase-rolling"></i> My Bookings
                                        </a>
                                        <a className="dropdown-item" href="/settings">
                                            <i className="fa-solid fa-gear"></i> Settings
                                        </a>

                                        <div className="dropdown-divider"></div>

                                        <button
                                            className="dropdown-item logout-item"
                                            onClick={handleLogout}
                                        >
                                            <i className="fa-solid fa-right-from-bracket"></i> Logout
                                        </button>

                                    </div>
                                )}
                            </div>
                        ) : (
                            /* ── NOT LOGGED IN: show Login button ── */
                            <button className="btn btn-primary logBtn" style={{ border: 'none' }}>
                                <a href="/login">Login</a>
                            </button>
                        )}
                    </div>

                </div>
            </nav>
        </div>
    );
}

export default Header;