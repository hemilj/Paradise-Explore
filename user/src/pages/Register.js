import React, { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import register_bg from '../assets/register-bg.jpg';

function Register() {

    useEffect(() => {

        const handleLoad = () => {
            setTimeout(() => {
                const preloader = document.getElementById('preloader');

                if (preloader) {
                    preloader.style.opacity = '0';

                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }
            }, 1000);
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        console.log(JSON.stringify(formData, null, 2));
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Server Response:', response.data);

            await Swal.fire({
                title: '🎉 Welcome Aboard!',
                html: `
                    <div style="text-align:center; padding: 10px 0;">
                        <div style="
                            width: 80px; height: 80px;
                            background: linear-gradient(135deg, #4CAF50, #2E7D32);
                            border-radius: 50%;
                            display: flex; align-items: center; justify-content: center;
                            margin: 0 auto 16px;
                            box-shadow: 0 8px 25px rgba(76,175,80,0.45);
                            font-size: 2rem;
                        ">✓</div>
                        <p style="font-size:1.05rem; color:#333; margin:0 0 6px;">
                            Your account has been created successfully!
                        </p>
                        <p style="font-size:0.9rem; color:#888; margin:0;">
                            You can now log in and start exploring Paradise.
                        </p>
                    </div>
                `,
                showConfirmButton: true,
                confirmButtonText: 'Go to Login &nbsp; →',
                confirmButtonColor: '#4CAF50',
                background: '#ffffff',
                backdrop: `
                    rgba(0, 150, 80, 0.18)
                    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3C/svg%3E")
                    left top
                    no-repeat
                `,
                showClass: {
                    popup: 'animate__animated animate__zoomIn animate__faster'
                },
                hideClass: {
                    popup: 'animate__animated animate__zoomOut animate__faster'
                },
                customClass: {
                    title: 'swal-custom-title',
                    popup: 'swal-custom-popup'
                },
                timer: 5000,
                timerProgressBar: true,
                allowOutsideClick: false,
            });

            window.location.href = '/login';

        } catch (error) {
            console.error('Error submitting form:', error);

            const message =
                error?.response?.data?.message ||
                'Something went wrong. Please try again.';

            Swal.fire({
                title: '❌ Registration Failed',
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
                        <p style="font-size:0.85rem; color:#aaa; margin:0;">Please check your details and try again.</p>
                    </div>
                `,
                showConfirmButton: true,
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#f44336',
                background: '#ffffff',
                showClass: {
                    popup: 'animate__animated animate__shakeX animate__faster'
                },
            });
        }
    };

    const previewImage = (e) => {

        const file = e.target.files[0];

        if (file) {

            const reader = new FileReader();

            reader.onload = () => {

                const output = document.getElementById('imagePreview');

                output.style.backgroundImage = `url(${reader.result})`;
                output.style.backgroundSize = 'cover';
                output.style.backgroundPosition = 'center';
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div>

            <style>
                {`
                    .register-card {
                        margin-top: 30px !important;
                        background-color: white;
                        padding: 40px;
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    }

                    .register-card .logo {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: var(--secondary-color);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        margin-bottom: 30px;
                    }

                    .register-card .logo a {
                        text-decoration: none;
                        color: inherit;
                        text-align: center;
                    }

                    .image-circle {
                        width: 120px;
                        height: 120px;
                        border-radius: 50%;
                        border: 3px solid #ddd;
                        margin: 20px auto;
                        background-color: #f5f5f5;
                        background-size: cover;
                        background-position: center;
                    }
                `}
            </style>

            {/* PRELOADER */}
            <div id="preloader">
                <div className="loader-container">
                    <div className="plane-loader">
                        <i className="fa-solid fa-plane"></i>
                    </div>
                </div>
            </div>

            {/* BACKGROUND */}
            <div
                style={{
                    backgroundImage: `url(${register_bg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    minHeight: '100vh'
                }}
            >

                <section
                    className="section"
                    style={{
                        paddingTop: '50px',
                        backgroundColor: 'transparent'
                    }}
                >

                    <div className="container">

                        <div className="register-card">

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

                            <h2 className="text-center mb-30">
                                Create Your Account
                            </h2>

                            {/* FORM */}
                            <form
                                className="reg-form"
                                onSubmit={handleSubmit}
                                method="post"
                                encType="multipart/form-data"
                            >

                                <div className="form-row">

                                    <div className="form-group">
                                        <label>User Name</label>

                                        <input
                                            type="text"
                                            name="uname"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>

                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                </div>

                                <div className="form-row">

                                    <div className="form-group">
                                        <label>Password</label>

                                        <input
                                            type="password"
                                            name="pass"
                                            placeholder="Create a password"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Mobile Number</label>

                                        <input
                                            type="tel"
                                            name="mobno"
                                            placeholder="Enter mobile number"
                                            required
                                        />
                                    </div>

                                </div>

                                <div className="form-row">

                                    <div className="form-group">
                                        <label>Gender</label>

                                        <div className="radio-group">

                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="gen"
                                                    value="Male"
                                                    required
                                                />
                                                Male
                                            </label>

                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="gen"
                                                    value="Female"
                                                />
                                                Female
                                            </label>

                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="gen"
                                                    value="Other"
                                                />
                                                Other
                                            </label>

                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Date of Birth</label>

                                        <input
                                            type="date"
                                            name="dob"
                                            required
                                        />
                                    </div>

                                </div>

                                <div className="form-row">

                                    <div className="form-group">
                                        <label>State</label>

                                        <select
                                            id="stateSelect"
                                            name="state"
                                            required
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Select State
                                            </option>

                                            <option value="Gujarat">
                                                Gujarat
                                            </option>

                                            <option value="Maharashtra">
                                                Maharashtra
                                            </option>

                                            <option value="Delhi">
                                                Delhi
                                            </option>

                                            <option value="Rajasthan">
                                                Rajasthan
                                            </option>

                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>City</label>

                                        <select
                                            id="citySelect"
                                            name="city"
                                            required
                                            defaultValue=""
                                        >

                                            <option value="" disabled>
                                                Select City
                                            </option>

                                            <option value="Surat">
                                                Surat
                                            </option>

                                            <option value="Mumbai">
                                                Mumbai
                                            </option>

                                            <option value="Ahmedabad">
                                                Ahmedabad
                                            </option>

                                            <option value="Pune">
                                                Pune
                                            </option>

                                        </select>
                                    </div>

                                </div>

                                <div className="form-row">

                                    <div className="form-group">
                                        <label>Pin Code</label>

                                        <input
                                            type="text"
                                            name="pin"
                                            placeholder="Enter pin code"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Photo</label>

                                        <div className="file-input-wrapper">

                                            <input
                                                type="file"
                                                name="photo"
                                                id="photoUpload"
                                                accept="image/*"
                                                onChange={previewImage}
                                            />

                                        </div>
                                    </div>

                                </div>

                                {/* IMAGE PREVIEW */}
                                <div className="photo-preview-container">

                                    <div
                                        id="imagePreview"
                                        className="image-circle"
                                    ></div>

                                </div>

                                {/* SUBMIT BUTTON */}
                                <button
                                    type="submit"
                                    className="btn btn-primary full-width mt-20"
                                    style={{ border: 'none' }}
                                >
                                    Register
                                </button>

                                {/* FOOTER */}
                                <div className="form-footer text-center mt-20">

                                    <p>
                                        Already have an account?
                                        {' '}
                                        <a
                                            href="/login"
                                            style={{
                                                color: 'var(--primary-color)',
                                                fontWeight: '600'
                                            }}
                                        >
                                            Login
                                        </a>
                                    </p>

                                </div>

                            </form>

                        </div>

                    </div>

                </section>

            </div>

        </div>
    );
}

export default Register;