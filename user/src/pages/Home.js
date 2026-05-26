import React, { useState, useEffect } from 'react'
import axios from 'axios';
function Home() {

    const [allPackages, setAllPackages] = useState([]);
    const fetchAllPackages = async () => {
        const res = await axios.get('http://localhost:5000/all/packages');
        setAllPackages(res.data);
    }
    useEffect(() => {
        fetchAllPackages();
    }, []);
    return (
        <div>
            <header id="home" className="hero">
                <div className="hero-slider">
                    <div className="slide slide-1"></div>
                    <div className="slide slide-2"></div>
                    <div className="slide slide-3"></div>
                </div>

                <div className="hero-overlay">
                    <div className="container hero-content">
                        <h1>EXPLORE YOUR WORLD</h1>
                        <p>Adventure Awaits Beyond the Horizon</p>
                        <a href="#packages" className="btn btn-primary">Book Now</a>
                    </div>
                </div>
            </header>

            <section id="packages" className="section">
                <div className="container">
                    <div className="section-header-row">
                        <h2 className="section-title">Our BestSeller Packages</h2>
                        <div className="slider-nav">
                            <button id="slideLeft" className="nav-btn"><i className="fa-solid fa-chevron-left"></i></button>
                            <button id="slideRight" className="nav-btn"><i className="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>

                    <div className="packages-slider" id="packageSlider">

                        {allPackages.map(pkg => (
                            <div className="package-card" key={pkg._id}>
                                <div className="card-image">
                                    <img src={`http://localhost:5000/uploads/${pkg.images[0]}`} alt="Package Image" />
                                    <span className="price-tag">{pkg.batches && pkg.batches.length > 0
                                        ? `₹${pkg.batches[0].price + (pkg.batches[0].price * (pkg.commission / 100))}`
                                        : 'N/A'}</span>
                                </div>

                                <div className="card-content">
                                    <span className="pkg-type">{pkg.type_id?.type_name || 'N/A'}</span>

                                    <h3>{pkg.package_title}</h3>

                                    <div className="pkg-author">
                                        <i className="fa-regular fa-circle-user"></i>
                                        Posted by <strong>{pkg.agentID?.nameAgency}</strong>
                                    </div>

                                    <div className="card-info">
                                        <span>
                                            <i className="fa-regular fa-clock"></i>
                                            {pkg.duration}
                                        </span>
                                    </div>

                                    <a href="package-details.php?id=1" className="btn btn-secondary">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            <section className="section bg-light">
                <div className="container">
                    <h2 className="section-title">Packages By City</h2>
                    <div className="city-flex">
                        <a href="package.php?destination=Manali&amp;duration=&amp;category=" className="city-item">
                            <div className="city-img" style={{ backgroundImage: "url('../agent/uploads/Manali.jfif');" }}>
                            </div>
                            <span>Manali</span>
                        </a>
                        <a href="package.php?destination=Goa&amp;duration=&amp;category=" className="city-item">
                            <div className="city-img" style={{ backgroundImage: "url('../agent/uploads/Goa.jpg');" }}>
                            </div>
                            <span>Goa</span>
                        </a>
                        <a href="package.php?destination=Dwarka&amp;duration=&amp;category=" className="city-item">
                            <div className="city-img" style={{ backgroundImage: "url('../agent/uploads/dwarka.jpg');" }}>
                            </div>
                            <span>Dwarka</span>
                        </a>
                        <a href="package.php?destination=Ujjain&amp;duration=&amp;category=" className="city-item">
                            <div className="city-img" style={{ backgroundImage: "url('../agent/uploads/ujjain.jpg');" }}>
                            </div>
                            <span>Ujjain</span>
                        </a>
                        <a href="package.php?destination=Kedarnath, Badrinath&amp;duration=&amp;category=" className="city-item">
                            <div className="city-img" style={{ backgroundImage: "url('../agent/uploads/Rishikesh.jfif');" }}>
                            </div>
                            <span>Kedarnath, Badrinath</span>
                        </a>
                        <a href="package.php?destination=Rishikesh&amp;duration=&amp;category=" className="city-item">
                            <div className="city-img" style={{ backgroundImage: "url('../agent/uploads/p1.jfif');" }}>
                            </div>
                            <span>Rishikesh</span>
                        </a>
                        <a href="package.php?destination=Dwarka, Somnath, Salangpur (Gujarat)&amp;duration=&amp;category=" className="city-item">
                            <div className="city-img" style={{ backgroundImage: "url('../agent/uploads/5a016abc1aaf8db14582c033661f11bf.jpg');" }}>
                            </div>
                            <span>Dwarka, Somnath, Salangpur (Gujarat)</span>
                        </a>
                    </div>
                </div>
            </section>

            <section id="counter" className="section counter-section">
                <div className="container">
                    <h2 className="section-title">Our Achievements</h2>

                    <div className="counter-wrapper">

                        <div className="counter-box">
                            <div className="counter-icon-circle">
                                <i className="fa-solid fa-route"></i>
                            </div>
                            <div className="counter-content">
                                <h2 className="counter-value" data-target="250">0</h2>
                                <p>Tour Packages</p>
                            </div>
                        </div>

                        <div className="counter-box">
                            <div className="counter-icon-circle">
                                <i className="fa-solid fa-earth-americas"></i>
                            </div>
                            <div className="counter-content">
                                <h2 className="counter-value" data-target="50">0</h2>
                                <p>Destinations</p>
                            </div>
                        </div>

                        <div className="counter-box">
                            <div className="counter-icon-circle">
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <div className="counter-content">
                                <h2 className="counter-value" data-target="10000">0</h2>
                                <p>Happy Travelers</p>
                            </div>
                        </div>

                        <div className="counter-box">
                            <div className="counter-icon-circle">
                                <i className="fa-solid fa-passport"></i>
                            </div>
                            <div className="counter-content">
                                <h2 className="counter-value" data-target="15">0</h2>
                                <p>Years Experience</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id="categories" className="section">
                <div className="container">
                    <h2 className="section-title">Packages By Category</h2>
                    <div className="category-grid">
                        <div className="cat-card">
                            <a href="package.php?destination=&amp;duration=&amp;category=Adventure" className="cat-card-link">
                                <img src="../agent/uploads/category/1773069835_Adventure.jpg" alt="1" />
                                <div className="cat-overlay">Adventure</div>
                            </a>
                        </div>
                        <div className="cat-card">
                            <a href="package.php?destination=&amp;duration=&amp;category=Honeymoon" className="cat-card-link">
                                <img src="../agent/uploads/category/1773069796_Honeymoon.jpg" alt="3" />
                                <div className="cat-overlay">Honeymoon</div>
                            </a>
                        </div>
                        <div className="cat-card">
                            <a href="package.php?destination=&amp;duration=&amp;category=Family" className="cat-card-link">
                                <img src="../agent/uploads/category/1773069743_family.jpg" alt="4" />
                                <div className="cat-overlay">Family</div>
                            </a>
                        </div>
                        <div className="cat-card">
                            <a href="package.php?destination=&amp;duration=&amp;category=Religious" className="cat-card-link">
                                <img src="../agent/uploads/category/1773070001_dwarka.jpg" alt="6" />
                                <div className="cat-overlay">Religious</div>
                            </a>
                        </div>
                        <div className="cat-card">
                            <a href="package.php?destination=&amp;duration=&amp;category=Spiritual" className="cat-card-link">
                                <img src="../agent/uploads/9726b49e745c99a4654d5601955f036c.jpg" alt="8" />
                                <div className="cat-overlay">Spiritual</div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="testimonials" className="section bg-light">
                <div className="container">
                    <h2 className="section-title">What Our Clients Say</h2>
                    <div className="testimonial-grid">
                        <div className="testimonial-card">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                            <h3>Sarah Chen</h3>
                            <p>"The trip was absolutely magical! Every detail was taken care of, from the flights to the hotels.
                                I couldn't have asked for a better experience."</p>
                            <div className="stars">★★★★★</div>
                        </div>
                        <div className="testimonial-card">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                            <h3>David Lee</h3>
                            <p>"Professional service and great prices. The guided tour in Rome was the highlight of our summer.
                                Highly recommended for family trips."</p>
                            <div className="stars">★★★★★</div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default Home