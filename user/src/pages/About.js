import React from 'react'

function About() {
    return (
        <div>
            <header className="page-header">
                <div className="header-overlay">
                    <div className="container">
                        <h1>About Us</h1>
                        <p>Home <i className="fa-solid fa-chevron-right" style={{fontSize: "0.8rem"}}></i> About Us</p>
                    </div>
                </div>
            </header>

            <section className="section about-text-section">
                <div className="container text-center">
                    <h2 className="section-title">Why Paradise Explore Tours &amp; Travel Pvt Ltd ?</h2>
                    <p className="lead-text">
                        Experience the contrasting flavours of this fascinating and diverse country with Sumit Tours &amp; Travels, Best travel agency in Surat. We are a small, family run travel company with our head office located in Surat. We have been providing expert travel solutions to our domestic and overseas clients for over five years. Our diverse range of destinations covers India's top tourist spots as well as World's Best Locations.
                    </p>
                </div>
            </section>

            <section className="section no-padding-top">
                <div className="container">
                    <div className="video-placeholder">
                        <div className="play-button">
                            <i className="fa-solid fa-play"></i>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="text-center mb-50">
                        <p>
                            Experience the contrasting flavours of this fascinating and diverse country with Sumit Tours &amp; Travels. We have been providing expert travel solutions to our domestic and overseas clients for over five years.
                        </p>
                    </div>

                    <div className="info-table-container">
                        <div className="info-row">
                            <div className="info-label">Contact Person</div>
                            <div className="info-value">Mr. Keyur Hiral Kakadiya</div>
                        </div>
                        <div className="info-row">
                            <div className="info-label">Services We Offer</div>
                            <div className="info-value">Airline Ticketing Agents, Hotel Booking Agents, Passport &amp; Visa Services, Travel Insurance Agents, Tour Operators</div>
                        </div>
                        <div className="info-row no-border">
                            <div className="info-label">GST No</div>
                            <div className="info-value">24ASKPK5512D1ZG</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title">Why Choose Us ?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="icon-circle">
                                <i className="fa-solid fa-headset"></i>
                            </div>
                            <h3>24 Hours Support</h3>
                            <p>Sumit Tours &amp; Travels always tries to provide you with a hassle-free experience. Our guides are handpicked and the same goes for our transporters.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-circle">
                                <i className="fa-solid fa-user-shield"></i>
                            </div>
                            <h3>Trusted Advisor</h3>
                            <p>Over 5+ years of expertise in travel industry. Our travel experts cumulatively have vast experience in offering meticulously planned tours.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-circle">
                                <i className="fa-regular fa-face-smile"></i>
                            </div>
                            <h3>10000+ Happy Travellers</h3>
                            <p>Join the Sumit Tours &amp; Travels family – Over 10,000+ customers have created their unforgettable &amp; the most beautiful experience with us!</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About