import React, { useState } from 'react';
import { FiMapPin, FiCalendar, FiArrowRight } from 'react-icons/fi';
import './Chester.css';

function Chester() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      name: "Farm to Table Dinner Experience",
      date: "Every Saturday",
      time: "6:00 PM - 9:00 PM",
      location: "Green Valley Organic Farm, Punjab",
      price: "₹1,999",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
      description: "Experience authentic farm-to-table dining with organic produce fresh from the fields. Meet local farmers and enjoy a 5-course organic meal prepared by our chef.",
      highlights: ["Fresh organic meal", "Meet farmers", "Farm tour", "Wine pairing"]
    },
    {
      id: 2,
      name: "Organic Farming Workshop",
      date: "Every Sunday",
      time: "9:00 AM - 12:00 PM",
      location: "Honey Hills Apiary, Himachal Pradesh",
      price: "₹899",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2lBUQjwo8xK9EZqNq6c3_ipGxYvhkYn5bfg&s",
      description: "Learn organic farming techniques directly from experienced farmers. Hands-on workshop includes planting, harvesting, and organic pest management.",
      highlights: ["Expert training", "Hands-on practice", "Certification", "Lunch included"]
    },
    {
      id: 3,
      name: "Honey Tasting & Beekeeping Tour",
      date: "First Sunday of each month",
      time: "10:00 AM - 1:00 PM",
      location: "Honey Hills Apiary, Himachal Pradesh",
      price: "₹799",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAPj5S1BtgvF_6_IfguBKUWyZOO_PnEbHS-A&s",
      description: "Discover the fascinating world of bees and learn about honey production. Taste different varieties of raw honey and understand their unique properties.",
      highlights: ["Hive tour", "Honey tasting", "Educational talk", "Take-home honey jar"]
    },
    {
      id: 4,
      name: "Spice Garden Experience",
      date: "Weekends",
      time: "2:00 PM - 5:00 PM",
      location: "Spice Garden Farm, Kerala",
      price: "₹599",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLEJGE0AsbkZF7sLeDzBko91ZShJj6cknmHQ&s",
      description: "Explore Kerala's famous spice gardens. Learn about cultivation and uses of organic spices, participate in spice blending workshop, and take home your custom blend.",
      highlights: ["Garden walk", "Spice blending", "Tasting session", "Recipe book"]
    },
    {
      id: 5,
      name: "Fruit Picking Day",
      date: "Seasonal",
      time: "7:00 AM - 10:00 AM",
      location: "Fruit Grove Plantation, Karnataka",
      price: "₹499",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdOVH0zVHYJex7GhtuROLlHWqEZJ2-TyNKVg&s",
      description: "Pick your own fresh fruits directly from trees. Learn about seasonal fruits and their nutritional benefits. Perfect family outing!",
      highlights: ["Fruit picking", "Farm breakfast", "Educational session", "Fruit basket"]
    },
    {
      id: 6,
      name: "Vegetable Market Tour",
      date: "Every Thursday",
      time: "5:00 AM - 7:00 AM",
      location: "Green Valley Market, Punjab",
      price: "₹399",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop",
      description: "Join us at the early morning organic vegetable market. Learn how to select fresh produce, understand seasonal vegetables, and get exclusive early access.",
      highlights: ["Early access", "Quality selection tips", "Direct from farmers", "Breakfast included"]
    }
  ];

  return (
    <div className="chester-page">
      <div className="chester-hero">
        <h1>🌾 CHESTER Premium Experiences</h1>
        <p>Farm experiences, organic workshops & farm-to-table dining</p>
      </div>

      <section className="chester-intro">
        <h2>What is CHESTER?</h2>
        <p>
          CHESTER is our premium experiential platform that brings you closer to organic farming.
          From farm-to-table dinners to hands-on workshops, experience the real farm life and connect
          with the farmers who grow your food. Every experience is curated to give you authentic insights
          into organic agriculture and sustainable living.
        </p>
      </section>

      <section className="events-section">
        <h2>Upcoming Experiences</h2>
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.name} />
                <span className="event-price">{event.price}</span>
              </div>
              <div className="event-content">
                <h3>{event.name}</h3>
                <div className="event-details">
                  <p><FiCalendar /> {event.date} • {event.time}</p>
                  <p><FiMapPin /> {event.location}</p>
                </div>
                <p className="event-description">{event.description}</p>
                <div className="event-highlights">
                  {event.highlights.map((highlight, idx) => (
                    <span key={idx} className="highlight">{highlight}</span>
                  ))}
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => setSelectedEvent(event)}
                >
                  Book Now <FiArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="why-chester">
        <h2>Why Choose CHESTER?</h2>
        <div className="reasons-grid">
          <div className="reason-card">
            <h3>🌱 Authentic Experiences</h3>
            <p>Direct connection with real organic farmers and their stories</p>
          </div>
          <div className="reason-card">
            <h3>🤝 Learn & Connect</h3>
            <p>Gain practical knowledge about organic farming and sustainable living</p>
          </div>
          <div className="reason-card">
            <h3>🍽️ Farm Fresh Meals</h3>
            <p>Enjoy delicious organic meals prepared from farm produce</p>
          </div>
          <div className="reason-card">
            <h3>📸 Memorable Moments</h3>
            <p>Create lasting memories with family and friends on the farm</p>
          </div>
          <div className="reason-card">
            <h3>🏆 Quality Assurance</h3>
            <p>All experiences conducted by certified farmers and experts</p>
          </div>
          <div className="reason-card">
            <h3>💚 Support Farmers</h3>
            <p>Your participation directly supports local organic farmers</p>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedEvent && (
        <div className="booking-modal" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedEvent(null)}>✕</button>
            <h2>{selectedEvent.name}</h2>
            <div className="booking-details">
              <div className="detail-row">
                <FiCalendar /> <span><strong>Date:</strong> {selectedEvent.date} • {selectedEvent.time}</span>
              </div>
              <div className="detail-row">
                <FiMapPin /> <span><strong>Location:</strong> {selectedEvent.location}</span>
              </div>
              <div className="detail-row">
                <strong>Price:</strong> <span>{selectedEvent.price}</span>
              </div>
            </div>
            <form className="booking-form">
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
              <input type="number" placeholder="Number of Participants" min="1" required />
              <textarea placeholder="Special requirements or notes" rows="3"></textarea>
              <button type="submit" className="btn btn-primary btn-full">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chester;
