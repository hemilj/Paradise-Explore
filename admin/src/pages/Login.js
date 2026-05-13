import React from "react";

function Login() {
    return (
        <div className="login-wrapper">

            {/* ── LEFT PANEL — Branding ── */}
            <div className="login-left">
                <div className="brand-logo">
                    <div className="logo-icon">
                        <i className="fa-solid fa-plane-departure"></i>
                    </div>
                    <span>Paradise</span>
                </div>

                <div className="brand-hero">
                    <h2>Manage Your Travel<br />Empire with Ease</h2>
                    <p>
                        Your all-in-one admin dashboard for packages,
                        bookings, agencies, and travelers.
                    </p>

                    <div className="feature-list">
                        <div className="feature-item">
                            <i className="fa-solid fa-check-circle"></i>
                            <span>Manage packages &amp; destinations</span>
                        </div>
                        <div className="feature-item">
                            <i className="fa-solid fa-check-circle"></i>
                            <span>Review &amp; approve travel agencies</span>
                        </div>
                        <div className="feature-item">
                            <i className="fa-solid fa-check-circle"></i>
                            <span>Track bookings in real time</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── RIGHT PANEL — Form ── */}
            <div className="login-right">
                <div className="login-box">

                    {/* Header */}
                    <div className="login-box-header">
                        <div className="plane-icon">
                            <i className="fa-solid fa-plane-departure"></i>
                        </div>
                        <h1>Paradise <span>Admin</span></h1>
                        <p>Sign in to manage the platform</p>
                    </div>

                    <div className="form-sep">
                        <span>Enter your credentials</span>
                    </div>

                    {/* Form */}
                    <form method="POST" action="">

                        <div className="input-group">
                            <label htmlFor="email">Admin Email</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <i className="fa-regular fa-envelope"></i>
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="admin@gmail.com"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <i className="fa-solid fa-lock"></i>
                                </span>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">
                            Sign in to Dashboard
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>

                    </form>

                    <p className="login-footer-note">
                        <i className="fa-solid fa-shield-halved"></i>
                        Secured &amp; encrypted connection
                    </p>

                </div>
            </div>

        </div>
    );
};

export default Login;