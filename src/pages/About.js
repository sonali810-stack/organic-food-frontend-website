import React from 'react';
import { FiStar, FiMapPin, FiUsers, FiPackage } from 'react-icons/fi';
import './About.css';

function About() {
  const farmers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      farm: "Green Valley Organic Farm",
      location: "Punjab",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      message: "We've been farming organically for 15 years. Our passion is to deliver the freshest produce directly to your table. Every vegetable is grown with love and care!",
      specialty: "Vegetables"
    },
    {
      id: 2,
      name: "Priya Sharma",
      farm: "Honey Hills Apiary",
      location: "Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
      message: "Producing pure, raw honey for the past 12 years. Our bees pollinate wildflowers in the mountains, creating the most delicious honey you'll ever taste!",
      specialty: "Honey & Bee Products"
    },
    {
      id: 3,
      name: "Vikram Patel",
      farm: "Nut Grove Plantation",
      location: "Gujarat",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
      message: "Our nut farms have been certified organic for over 10 years. We use traditional farming methods to ensure the best quality nuts for your family.",
      specialty: "Nuts & Seeds"
    },
    {
      id: 4,
      name: "Meera Singh",
      farm: "Spice Garden Organic Farm",
      location: "Kerala",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      message: "Growing spices and herbs organically since 1995. Our herbs are handpicked at their peak to ensure maximum flavor and nutrients!",
      specialty: "Herbs & Spices"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Anita Desai",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      feedback: "ORGAMIC has changed my family's eating habits! The quality is exceptional and prices are reasonable. Highly recommend!",
      verified: true
    },
    {
      id: 2,
      name: "Rohan Gupta",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      feedback: "Fast delivery, fresh products, and amazing customer service. I've been ordering for 6 months now. Never disappointed!",
      verified: true
    },
    {
      id: 3,
      name: "Priya Nair",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      feedback: "Love the variety and freshness. Started my organic journey with ORGAMIC. Best decision for my health!",
      verified: true
    },
    {
      id: 4,
      name: "Vikram Reddy",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      feedback: "The farmers' stories make each purchase meaningful. Supporting local agriculture has never been easier!",
      verified: true
    },
    {
      id: 5,
      name: "Neha Sharma",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      feedback: "Subscription box is a game-changer! I get fresh vegetables every week. Quality is consistently amazing!",
      verified: true
    },
    {
      id: 6,
      name: "Arjun Kumar",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      feedback: "Great initiative to support organic farming. Products taste so much better than supermarket stuff!",
      verified: true
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About ORGAMIC</h1>
        <p>Connecting you directly with organic farmers</p>
      </div>

      {/* Our Story */}
      <section className="about-section our-story">
        <div className="section-content">
          <h2>Our Story</h2>
          <p>
            ORGAMIC was founded with a simple mission: to bridge the gap between organic farmers and health-conscious consumers. 
            We believe that everyone deserves access to pure, chemical-free food. By working directly with certified organic farms 
            across India, we eliminate middlemen and ensure you get the freshest produce at fair prices.
          </p>
          <p>
            Our journey started in 2018 with just 5 partner farms. Today, we work with over 50 organic farms across 15 states, 
            serving thousands of happy customers. Every product you buy supports sustainable agriculture and fair wages for our farmers.
          </p>
        </div>
        <div className="story-image">
          <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=400&fit=crop" alt="Organic farming" />
        </div>
      </section>

      {/* Our Values */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <FiPackage className="value-icon" />
            <h3>100% Organic</h3>
            <p>All products are certified organic with zero pesticides or artificial chemicals.</p>
          </div>
          <div className="value-card">
            <FiUsers className="value-icon" />
            <h3>Fair Trade</h3>
            <p>We ensure fair prices for farmers while keeping costs affordable for consumers.</p>
          </div>
          <div className="value-card">
            <FiMapPin className="value-icon" />
            <h3>Local Support</h3>
            <p>Supporting Indian farmers and strengthening local agricultural communities.</p>
          </div>
          <div className="value-card">
            <FiStar className="value-icon" />
            <h3>Quality Assured</h3>
            <p>Every product goes through rigorous quality checks before delivery.</p>
          </div>
        </div>
      </section>

      {/* Meet Our Farmers */}
      <section className="farmers-section">
        <h2>Meet Our Farmers</h2>
        <p className="section-subtitle">Real farmers, real stories, real passion for organic farming</p>
        <div className="farmers-grid">
          {farmers.map(farmer => (
            <div key={farmer.id} className="farmer-card">
              <div className="farmer-image">
                <img src={farmer.image} alt={farmer.name} />
              </div>
              <div className="farmer-info">
                <h3>{farmer.name}</h3>
                <p className="farm-name">{farmer.farm}</p>
                <p className="farm-location">
                  <FiMapPin className="inline-icon" /> {farmer.location}
                </p>
                <p className="specialty">Specialty: {farmer.specialty}</p>
                <div className="farmer-message">
                  <p>"{farmer.message}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <p className="section-subtitle">Real feedback from real customers</p>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <img src={testimonial.image} alt={testimonial.name} className="customer-avatar" />
                <div className="customer-info">
                  <h4>{testimonial.name}</h4>
                  <div className="rating">
                    {'⭐'.repeat(Math.floor(testimonial.rating))}
                  </div>
                </div>
                {testimonial.verified && <span className="verified-badge">✓ Verified</span>}
              </div>
              <p className="testimonial-text">"{testimonial.feedback}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Why Choose ORGAMIC?</h2>
        <div className="benefits-grid">
          <div className="benefit">
            <h3>🌱 Farm Fresh</h3>
            <p>Harvested and delivered within 24-48 hours to ensure maximum freshness.</p>
          </div>
          <div className="benefit">
            <h3>💚 Health Benefits</h3>
            <p>No pesticides, no GMOs, no artificial preservatives. Just pure, natural goodness.</p>
          </div>
          <div className="benefit">
            <h3>🤝 Direct From Farmers</h3>
            <p>Eliminate middlemen. More money reaches the farmers, better prices for you.</p>
          </div>
          <div className="benefit">
            <h3>🚚 Fast Delivery</h3>
            <p>Free delivery on orders over ₹999. Same-day delivery available in select cities.</p>
          </div>
          <div className="benefit">
            <h3>♻️ Sustainable</h3>
            <p>Supporting eco-friendly farming practices and protecting our environment.</p>
          </div>
          <div className="benefit">
            <h3>💯 Quality Guarantee</h3>
            <p>100% satisfaction guaranteed. Easy returns if you're not happy.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat">
          <h3>50+</h3>
          <p>Partner Farms</p>
        </div>
        <div className="stat">
          <h3>15+</h3>
          <p>States Covered</p>
        </div>
        <div className="stat">
          <h3>10K+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="stat">
          <h3>1000+</h3>
          <p>Products Available</p>
        </div>
      </section>
    </div>
  );
}

export default About;
