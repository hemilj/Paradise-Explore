import React, { useEffect } from 'react'
import login_bg from '../assets/login-bg.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login() {

    useEffect(() => {
        // Wait for window load, then wait 3 seconds
        window.addEventListener('load', function () {
            setTimeout(function () {
                var preloader = document.getElementById('preloader');
                preloader.style.opacity = '0'; // Fade out effect
                setTimeout(function () {
                    preloader.style.display = 'none'; // Remove from layout
                }, 500); // Wait for fade out to finish
            }, 1000); // 1000ms = 1 Seconds Delay
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                data,                            // send as JSON object
                { headers: { 'Content-Type': 'application/json' } }
            );

            // Save token + basic user info to localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({
                _id:   response.data._id,
                uname: response.data.uname,
                email: response.data.email,
            }));

            await Swal.fire({
                title: '🌍 Welcome Back!',
                html: `
                    <div style="text-align:center; padding: 10px 0;">
                        <div style="
                            width: 80px; height: 80px;
                            background: linear-gradient(135deg, #1976D2, #0D47A1);
                            border-radius: 50%;
                            display: flex; align-items: center; justify-content: center;
                            margin: 0 auto 16px;
                            box-shadow: 0 8px 25px rgba(25,118,210,0.4);
                            font-size: 2rem; color: #fff;
                        ">✓</div>
                        <p style="font-size:1.05rem; color:#333; margin:0 0 6px;">
                            You have successfully logged in!
                        </p>
                        <p style="font-size:0.9rem; color:#888; margin:0;">
                            Welcome back, <strong>${response.data.uname}</strong>. Let’s explore Paradise.
                        </p>
                    </div>
                `,
                showConfirmButton: true,
                confirmButtonText: 'Continue →',
                confirmButtonColor: '#1976D2',
                background: '#ffffff',
                backdrop: 'rgba(25, 118, 210, 0.15)',
                timer: 4000,
                timerProgressBar: true,
                allowOutsideClick: false,
            });

            window.location.href = '/';

        } catch (error) {
            console.error('Login error:', error);

            const message =
                error?.response?.data?.message ||
                'Something went wrong. Please try again.';

            Swal.fire({
                title: '❌ Login Failed',
                html: `
                    <div style="text-align:center; padding: 10px 0;">
                        <div style="
                            width: 70px; height: 70px;
                            background: linear-gradient(135deg, #f44336, #b71c1c);
                            border-radius: 50%;
                            display: flex; align-items: center; justify-content: center;
                            margin: 0 auto 14px;
                            box-shadow: 0 8px 25px rgba(244,67,54,0.35);
                            font-size: 1.8rem; color: #fff;
                        ">✕</div>
                        <p style="font-size:1rem; color:#333; margin:0 0 6px;">${message}</p>
                        <p style="font-size:0.85rem; color:#aaa; margin:0;">Please check your credentials and try again.</p>
                    </div>
                `,
                showConfirmButton: true,
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#f44336',
                background: '#ffffff',
            });
        }
    };

    return (
        <div>
            <style>
                {`
                    .login-card {
                         max-width: 500px;
                        /* Narrower than registration page */
                        margin-top: 160px !important;
                        /* Pull up slightly more */
                        background-color: white;
                    }

                    .login-card .logo,
                    h1 {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: var(--secondary-color);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        margin-bottom: 30px;
                    }
            `}
            </style>

            <div id="preloader">
                <div className="loader-container">
                    <div className="plane-loader">
                        <i className="fa-solid fa-plane"></i>
                    </div>
                </div>
            </div>

            <div style={{
                backgroundImage: `url(${login_bg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                minHeight: "100vh"
            }}>
                <section className="section" style={{ paddingTop: "50px", backgroundColor: "transparent" }}>
                    <div className="container">
                        <div className="register-card login-card">

                            {/* LOGO */}
                            <div className="logo">
                                <a href="/">
                                    <i className="fa-solid fa-location-dot"></i>
                                    {' '}Paradise Explore
                                    <span
                                        style={{
                                            fontSize: '0.8rem',
                                            display: 'block',
                                            color: '#555'
                                        }}
                                    >
                                        TOURS & TRAVELS
                                    </span>
                                </a>
                            </div>

                            <h1 style={{ color: "black" }}>Login</h1>

                            <form className="reg-form" method="post" onSubmit={handleSubmit}>

                                <div className="form-group mb-20">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div className="form-group mb-20">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="pass"
                                        placeholder="Enter your password"
                                        required />
                                </div>

                                <div className="login-options">
                                    <div className="form-check">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember" style={{ marginBottom: "0", fontWeight: "400" }}>Remember Me</label>
                                    </div>
                                    <a href="forgot_password.php" className="forgot-link">Forgot Password?</a>
                                </div>

                                <button type="submit" name="btn_login" className="btn btn-primary full-width mt-20" style={{ border: "none" }}>Login</button>

                                <div className="form-footer text-center mt-20">
                                    <p>Don't have an account? <a href="/register" style={{ color: "var(--primary-color)", fontWeight: "600" }}>Register Here</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default Login