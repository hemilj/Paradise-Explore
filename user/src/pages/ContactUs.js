import React, { useEffect, useState } from 'react'
import axios from 'axios';

function ContactUs() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                setUser(null);
            }
        }
    }, []);

    const handleAgentSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const formData = {
            nameAgency: form.nameAgency.value,
            gstNumber: form.gstNumber.value,
            authorName: form.authorName.value,
            designation: form.designation.value,
            agencyEmail: form.agencyEmail.value,
            phoneNo: form.phoneNo.value,
            officeAdd: form.officeAdd.value,
        };

        console.log(formData);
        try {
            const response = await axios.post('http://localhost:5000/api/agency/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200 || response.status === 201) {
                alert('Registration Successfull');
            } else {
                alert('Registration Failed');
            }
        } catch (error) {

        }

        alert('Thank you for contacting us! We will get back to you soon.');
        form.reset();
    }

    return (
        <div>
            <header className="page-header contact-header">
                <div className="header-overlay">
                    <div className="container">
                        <h1>Contact Us</h1>
                        <p>
                            <a href="index.php">Home</a>{' '}
                            <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.8rem' }}></i>{' '}
                            Contact
                        </p>
                    </div>
                </div>
            </header>

            {/* ── Contact Info Cards ── */}
            <section className="section">
                <div className="container">
                    <div className="contact-info-grid">
                        <div className="contact-card">
                            <div className="icon-box"><i className="fa-solid fa-phone-volume"></i></div>
                            <h3>Call Us</h3>
                            <p>+91 98980 98989</p>
                            <p>+91 98980 12345</p>
                        </div>
                        <div className="contact-card">
                            <div className="icon-box"><i className="fa-solid fa-envelope"></i></div>
                            <h3>Email Us</h3>
                            <p>info@sumit.com</p>
                            <p>support@sumit.com</p>
                        </div>
                        <div className="contact-card">
                            <div className="icon-box"><i className="fa-solid fa-map-location-dot"></i></div>
                            <h3>Visit Us</h3>
                            <p>785 15th Street, Office 478</p>
                            <p>Berlin, DE 81566</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Get In Touch Form ── */}
            <section className="section bg-light">
                <div className="container">
                    <div className="form-container-box">
                        <div className="form-text">
                            <h2 className="section-title text-left">Get In Touch</h2>
                            <p>
                                Have a question about a package? Want to plan a custom trip? Fill out
                                the form below and our team will get back to you within 24 hours.
                            </p>
                            <img
                                src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=600&auto=format&fit=crop&q=60"
                                alt="Support team"
                                style={{ borderRadius: '12px', marginTop: '22px' }}
                            />
                        </div>

                        <form className="main-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Your Name</label>
                                    <input type="text" placeholder="John Doe" required />
                                </div>
                                <div className="form-group">
                                    <label>Your Email</label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        name="contactEmail"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" placeholder="Inquiry about..." required />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea rows="5" placeholder="How can we help you?" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* ── Agent Registration ── */}
            <section className="section agent-section" id="agent_section">
                <div className="container">
                    <div className="agent-header text-center">
                        <span className="badge-agent">B2B Partner</span>
                        <h2 style={{ color: 'white', marginTop: '15px', marginBottom: '10px' }}>
                            Are you a Travel Agent?
                        </h2>
                        <p style={{ color: '#ccc', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                            Join our network to list your packages and reach thousands of travelers.
                            Register your agency below.
                        </p>
                    </div>

                    <div className="agent-form-wrapper">
                        <form className="agent-form" onSubmit={handleAgentSubmit}>
                            <h3><i className="fa-solid fa-briefcase"></i> Agent Registration</h3>

                            <h4 className="form-section-title">Agency Details</h4>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Travel Agency Name *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Dream World Travels"
                                        name="nameAgency"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>License / GST Number</label>
                                    <input
                                        type="text"
                                        placeholder="Registration No."
                                        name="gstNumber"
                                    />
                                </div>
                            </div>

                            <h4 className="form-section-title">Author / Contact Person</h4>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Author Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        name='authorName'
                                        defaultValue={user?.uname || ''}
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Designation</label>
                                    <input
                                        type="text"
                                        defaultValue="Owner"
                                        name="designation"
                                        readOnly
                                    />
                                    <span>We are assuming you are the owner of the agency.</span>
                                </div>
                            </div>

                            <h4 className="form-section-title">Contact Information</h4>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Agency Email *</label>
                                    <input
                                        type="email"
                                        placeholder="agency@company.com"
                                        name="agencyEmail"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number *</label>
                                    <input
                                        type="tel"
                                        placeholder="+91 XXXXX XXXXX"
                                        name="phoneNo"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Office Address</label>
                                <textarea
                                    rows="2"
                                    placeholder="Full Office Address"
                                    name="officeAdd"
                                ></textarea>
                            </div>

                            <div className="form-check">
                                <input type="checkbox" id="agentTerms" required />
                                <label htmlFor="agentTerms">
                                    I agree to the <a href="#">Terms &amp; Conditions</a> for partners.
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary full-width">
                                Register Agency
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* ── Google Map ── */}
            <div className="map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7439.796748992383!2d72.76547604480895!3d21.196195675015172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04db4c81cd611%3A0x214de747e1e958c2!2sPal%20Gam%2C%20Surat%2C%20Gujarat%20394510!5e0!3m2!1sen!2sin!4v1768026100723!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location Map"
                ></iframe>
            </div>
        </div>
    )
}

export default ContactUs