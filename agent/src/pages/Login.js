import React, { useState } from 'react';
import Swal from "sweetalert2";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

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

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      if (email !== "" && password !== "") {

        const response = await axios.post('http://localhost:5000/api/agency/agentLogin', { email, password });

        sessionStorage.setItem("token", response.data.token);

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
                              <h2 style="font-size:1.25rem;font-weight:700;color:#f0fdfa;margin:0">Welcome Back, Agent!</h2>
                              <p style="font-size:0.85rem;color:#94a3b8;margin:0">Redirecting you to your dashboard…</p>
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
                              <p style="font-size:0.85rem;color:#94a3b8;margin:0">Please enter both email and password.</p>
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
    } catch (error) {
      console.error("Error during login:", error);
      
      let errorMessage = "An unexpected error occurred. Please try again later.";
      let isAuthError = false;

      if (error.response) {
        isAuthError = true;
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data && error.response.data.errors && error.response.data.errors.length > 0) {
          errorMessage = error.response.data.errors.map(err => err.msg).join(", ");
        }
      }

      if (isAuthError) {
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
                              <p style="font-size:0.85rem;color:#94a3b8;margin:0">${errorMessage}</p>
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
      } else {
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
                            <p style="font-size:0.85rem;color:#94a3b8;margin:0">Unable to connect to the server. Please check if the backend is running.</p>
                        </div>`,
          showConfirmButton: true,
          confirmButtonText: "Okay",
          width: 360,
          padding: "1.75rem",
        });
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h2>Paradise <span>Agent</span></h2>
          <p>Enter your credentials to access the panel</p>
        </div>

        <form action="process-login.php" method="POST" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <i
                className="fa-regular fa-envelope"
                style={{ position: 'absolute', left: '15px', top: '12px', color: '#aaa' }}
              ></i>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="admin@paradise.com"
                style={{ paddingLeft: '40px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <i
                className="fa-solid fa-lock"
                style={{ position: 'absolute', left: '15px', top: '12px', color: '#aaa' }}
              ></i>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="••••••••"
                style={{ paddingLeft: '40px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-options">
            <div className="form-check">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" style={{ marginBottom: 0, fontWeight: 400 }}>
                Remember Me
              </label>
            </div>
            <NavLink to="/forgot-password" className="forgot-link">
              Forgot Password?
            </NavLink>
          </div>

          <button type="submit" className="btn btn-primary full-width" name="btnLogin" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;