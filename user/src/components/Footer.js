import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="new-footer">
                <div className="footer-wave">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#1d3557" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>

                <div className="container">
                    <div className="footer-content">

                        <div className="footer-col">
                            <div className="logo" style={{ "color": "white" }}>
                                <a href="index.php">
                                    <i className="fa-solid fa-location-dot"></i> Paradise Explore
                                    <span style={{ "fontSize": "0.8rem", "display": "block", "color": "#555" }}>TOURS &amp; TRAVELS</span>
                                </a>
                            </div>
                            <p className="footer-desc">
                                Making your travel dreams a reality since 2010. We specialize in creating unforgettable journeys to the world's most beautiful destinations.
                            </p>
                            <div className="social-links">
                                <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                                <a href="#"><i className="fa-brands fa-twitter"></i></a>
                                <a href="#"><i className="fa-brands fa-youtube"></i></a>
                            </div>
                        </div>

                        <div className="footer-col">
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                <li><a href="index.php"><i className="fa-solid fa-angle-right"></i> Home</a></li>
                                <li><a href="about.php"><i className="fa-solid fa-angle-right"></i> About Us</a></li>
                                <li><a href="package.php"><i className="fa-solid fa-angle-right"></i> Packages</a></li>
                                <li><a href="gallery.php"><i className="fa-solid fa-angle-right"></i> Gallery</a></li>
                                <li><a href="contact.php"><i className="fa-solid fa-angle-right"></i> Contact Us</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Get In Touch</h4>
                            <div className="contact-info">
                                <p><i className="fa-solid fa-location-arrow"></i> 123 Paradise Road, Travel City, NY 10012</p>
                                <p><i className="fa-solid fa-phone"></i> +1 234 567 8900</p>
                                <p><i className="fa-solid fa-envelope"></i> info@paradiseexplore.com</p>
                                <p><i className="fa-solid fa-clock"></i> Mon - Sat: 9:00 AM - 7:00 PM</p>
                            </div>
                        </div>

                        <div className="footer-col">
                            <h4>Newsletter</h4>
                            <p>Subscribe to get the latest travel offers and updates.</p>
                            <form className="newsletter-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    style={{
                                        backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAA...")`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "20px",
                                        backgroundPosition: "97% center",
                                        cursor: "auto"
                                    }}
                                    data-temp-mail-org="0"
                                />
                                <button type="submit"><i className="fa-solid fa-paper-plane"></i></button>
                            </form>
                        </div>

                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="container">
                        <p>© 2024 Paradise Explore. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer