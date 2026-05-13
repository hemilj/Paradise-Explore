import React from 'react'

function Blogs() {
    return (
        <div>
            <header className="page-header blog-header">
                <div className="header-overlay">
                    <div className="container">
                        <h1>Our Travel Stories</h1>
                        <p>Home <i className="fa-solid fa-chevron-right" style={{fontSize: "0.8rem;"}}></i> Blogs</p>
                    </div>
                </div>
            </header>

            <section className="section">
                <div className="container">

                    <div className="masonry-grid">

                        <div className="blog-item">
                            <div className="blog-img">
                                <a href="blog-detail.php">
                                    <img src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?w=600&amp;auto=format&amp;fit=crop&amp;q=60" alt="Paris" />
                                </a>
                                <span className="blog-cat">Lifestyle</span>
                            </div>
                            <div className="blog-info">
                                <div className="meta">
                                    <span><i className="fa-regular fa-calendar"></i> Oct 12, 2025</span>
                                </div>
                                <h3>10 Hidden Gems in Paris You Must Visit</h3>
                                <p>Discover the secret spots of the city of love that are away from the tourist crowds...</p>
                                <a href="#" className="read-more">Read More <i className="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <div className="blog-item">
                            <div className="blog-img">
                                <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600&amp;auto=format&amp;fit=crop&amp;q=60" alt="Hiking" />
                                <span className="blog-cat">Adventure</span>
                            </div>
                            <div className="blog-info">
                                <h3>Top 5 Hiking Trails</h3>
                                <p>Best trails for beginners.</p>
                                <a href="#" className="read-more">Read More <i className="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <div className="blog-item">
                            <div className="blog-img">
                                <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&amp;auto=format&amp;fit=crop&amp;q=60" alt="Switzerland" />
                                <span className="blog-cat">Travel Tips</span>
                            </div>
                            <div className="blog-info">
                                <div className="meta">
                                    <span><i className="fa-regular fa-calendar"></i> Sep 28, 2025</span>
                                </div>
                                <h3>Budget Travel in Switzerland? Yes, It's Possible!</h3>
                                <p>Switzerland is known for being expensive, but with these tips, you can save big...</p>
                                <a href="#" className="read-more">Read More <i className="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <div className="blog-item">
                            <div className="blog-img">
                                <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&amp;auto=format&amp;fit=crop&amp;q=60" alt="Santorini" />
                                <span className="blog-cat">Destinations</span>
                            </div>
                            <div className="blog-info">
                                <div className="meta">
                                    <span><i className="fa-regular fa-calendar"></i> Sep 15, 2025</span>
                                </div>
                                <h3>The Magic of Santorini Sunsets</h3>
                                <p>Why Oia is the best place on earth to watch the sun go down. A complete guide to the Greek
                                    Islands...</p>
                                <a href="#" className="read-more">Read More <i className="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <div className="blog-item">
                            <div className="blog-img">
                                <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&amp;auto=format&amp;fit=crop&amp;q=60" alt="Beach" />
                                <span className="blog-cat">Relax</span>
                            </div>
                            <div className="blog-info">
                                <h3>Best Beaches in Bali</h3>
                                <p>Sun, sand, and surf guide.</p>
                                <a href="#" className="read-more">Read More <i className="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <div className="blog-item">
                            <div className="blog-img">
                                <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&amp;auto=format&amp;fit=crop&amp;q=60" alt="Roadtrip" />
                                <span className="blog-cat">Road Trip</span>
                            </div>
                            <div className="blog-info">
                                <div className="meta">
                                    <span><i className="fa-regular fa-calendar"></i> Aug 10, 2025</span>
                                </div>
                                <h3>Ultimate Road Trip Playlist</h3>
                                <p>Songs that will keep you going for miles and miles.</p>
                                <a href="#" className="read-more">Read More <i className="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Blogs