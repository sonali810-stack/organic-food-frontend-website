import React from 'react';
import { Link } from 'react-router-dom';
import { FiTruck, FiShield, FiHeart, FiPackage } from 'react-icons/fi';
import './Home.css';

const heroBackdrop = 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=1600&h=1000&fit=crop';

const highlightMetrics = [
  { icon: <FiPackage />, title: 'Certified Organic', detail: 'Every harvest meets strict residue-free standards.' },
  { icon: <FiTruck />, title: '12-Hour Delivery', detail: 'Picked at dawn, delivered to your door before sundown.' },
  { icon: <FiShield />, title: 'Cold-Chain Fresh', detail: 'Temperature controlled vans seal in flavour and nutrients.' },
  { icon: <FiHeart />, title: 'Farmer First', detail: 'Direct sourcing puts fair pay back into local communities.' },
];

const seasonalCollections = [
  {
    title: 'Leafy Greens Crate',
    blurb: 'Spinach, kale, and microgreens bundled for smoothies & salads.',
    image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=800&h=600&fit=crop',
  },
  {
    title: 'Citrus Grove Picks',
    blurb: 'Sweet-smelling oranges, tangerines, and pomelos juiced today.',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=800&h=600&fit=crop',
  },
  {
    title: 'Root Veg Medley',
    blurb: 'Carrots, beets, and sweet potatoes for hearty roasts.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&h=600&fit=crop',
  },
  {
    title: 'Breakfast Fruit Bowl',
    blurb: 'Papaya, berries, and bananas ready for the morning table.',
    image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&h=600&fit=crop',
  },
];

const promisePoints = [
  'Weekly lab testing keeps produce clean and residue-free.',
  'Reusable crates and cotton bags replace single-use plastics.',
  'Transparent sourcing tells you the farm, grower, and harvest date.',
  'Greater than 70% of revenue goes straight back to farming families.',
];

function Home() {
  return (
    <div className="home">
      <section className="hero hero-simple" style={{ '--hero-image': `url(${heroBackdrop})` }}>
        <div className="hero-overlay" />
        <div className="hero-inner">
          <span className="hero-tagline">Seasonal produce • Delivered in kilos</span>
          <h1>Fresh. Local. Organic.</h1>
          <p>
            Discover vibrant, pesticide-free produce straight from partner farms. Pick a curated box or customise your own kilo packs for the week ahead.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">Shop Fresh Produce</Link>
            <Link to="/shop" className="btn btn-outline">Build Weekly Farm Box</Link>
          </div>
          <span className="hero-footnote">Zero middlemen • Transparent pricing • Sustainable packaging</span>
        </div>
      </section>

      <section className="home-highlights">
        <div className="section-heading">
          <h2>Why Choose Orgamic</h2>
          <p>Matching the care you expect from a neighbourhood farmer&apos;s market.</p>
        </div>
        <div className="metrics-grid">
          {highlightMetrics.map((item) => (
            <article key={item.title} className="metric-card">
              <div className="metric-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="seasonal-showcase">
        <div className="section-heading">
          <h2>Seasonal Kilo Collections</h2>
          <p>Balanced bundles crafted for meals, snacks, and juicing.</p>
        </div>
        <div className="seasonal-grid">
          {seasonalCollections.map((collection) => (
            <article key={collection.title} className="category-card">
              <div className="category-image">
                <img src={collection.image} alt={collection.title} />
              </div>
              <div className="category-body">
                <h3>{collection.title}</h3>
                <p>{collection.blurb}</p>
                <Link to="/shop" className="link-inline">Shop this bundle →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="promise-section">
        <div className="promise-image" role="presentation">
          <img src="https://images.unsplash.com/photo-1506086679524-493c64fdfaa6?w=900&h=900&fit=crop" alt="Farmers harvesting fresh produce" />
        </div>
        <div className="promise-details">
          <span className="promise-badge">Farm-to-Family Promise</span>
          <h2>Grown with Integrity. Packed with Care.</h2>
          <p>
            We work shoulder to shoulder with smallholders to plan crops, monitor soil health, and harvest only when flavour peaks. Every crate is cooled, sorted, and labelled before it leaves the farm gate.
          </p>
          <ul className="promise-list">
            {promisePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Link to="/about" className="btn btn-primary">Meet Our Growers</Link>
        </div>
      </section>

      <section className="cta-panel">
        <div className="cta-content">
          <h2>Ready for fresher staples?</h2>
          <p>Start with a curated box or pick your own kilo quantities from the shop.</p>
        </div>
        <div className="cta-actions">
          <Link to="/shop" className="btn btn-primary">Browse the Shop</Link>
          <Link to="/cart" className="btn btn-outline">View Your Basket</Link>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Get Fresh Updates</h2>
          <p>Seasonal tips, storage guides, and harvest alerts land in your inbox once a week.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
