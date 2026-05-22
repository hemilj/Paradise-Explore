import React from "react";
import Swal from "sweetalert2";

/* ── Paradise-themed Swal base ── */
const paradiseSwal = Swal.mixin({
    background: "#0f172a",
    color: "#e2e8f0",
    customClass: {
        popup:        "paradise-swal-popup",
        title:        "paradise-swal-title",
        htmlContainer:"paradise-swal-html",
        confirmButton:"paradise-swal-confirm",
        cancelButton: "paradise-swal-cancel",
    },
    buttonsStyling: false,
});

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);

        try {
            if (email === "admin@paradise.com" && password === "Admin123") {
                sessionStorage.setItem("token", "admin123");

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
                            <h2 style="font-size:1.25rem;font-weight:700;color:#f0fdfa;margin:0">Welcome Back, Admin!</h2>
                            <p style="font-size:0.85rem;color:#94a3b8;margin:0">Redirecting you to your dashboard…</p>
                        </div>`,
                    showConfirmButton: false,
                    timer: 1800,
                    timerProgressBar: true,
                    width: 360,
                    padding: "1.75rem",
                    showClass:  { popup: "animate__animated animate__fadeInDown animate__faster" },
                    hideClass:  { popup: "animate__animated animate__fadeOutUp animate__faster" },
                    didOpen: () => {
                        const bar = Swal.getTimerProgressBar();
                        if (bar) {
                            bar.style.background = "linear-gradient(90deg,#0d9488,#2dd4bf)";
                            bar.style.height = "3px";
                        }
                    },
                });

                window.location.href = "/";
                return;

            } else {
                await paradiseSwal.fire({
                    html: `
                        <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
                            <div style="
                                width:64px;height:64px;border-radius:18px;
                                background:linear-gradient(135deg,#7f1d1d,#991b1b);
                                display:flex;align-items:center;justify-content:center;
                                font-size:1.75rem;color:#fca5a5;
                                box-shadow:0 8px 24px rgba(239,68,68,0.35);">
                                <i class='fa-solid fa-shield-exclamation'></i>
                            </div>
                            <h2 style="font-size:1.2rem;font-weight:700;color:#fecaca;margin:0">Access Denied</h2>
                            <p style="font-size:0.85rem;color:#94a3b8;margin:0">The email or password you entered is incorrect.</p>
                        </div>`,
                    showConfirmButton: true,
                    confirmButtonText: '<i class="fa-solid fa-rotate-right"></i> &nbsp;Try Again',
                    width: 360,
                    padding: "1.75rem",
                    customClass: {
                        popup:         "paradise-swal-popup",
                        confirmButton: "paradise-swal-confirm paradise-swal-confirm--error",
                    },
                });
            }
        } catch (error) {
            console.error("Error during login:", error);
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
                        <h2 style="font-size:1.2rem;font-weight:700;color:#fde68a;margin:0">Something Went Wrong</h2>
                        <p style="font-size:0.85rem;color:#94a3b8;margin:0">An unexpected error occurred. Please try again later.</p>
                    </div>`,
                showConfirmButton: true,
                confirmButtonText: "Okay",
                width: 360,
                padding: "1.75rem",
            });
        } finally {
            setIsLoggingIn(false);
        }
    };

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
                    <form method="POST" onSubmit={handleLogin} action="">

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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn" disabled={isLoggingIn}>
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