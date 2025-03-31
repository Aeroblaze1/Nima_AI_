import React from 'react';

function HomePage({ navigateTo }) {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Nima AI: AI-Powered Allergen Detection</h1>
          <p>
            Every year, millions of people worldwide suffer from food allergies. 
            Nima AI is a revolutionary AI-powered application designed to 
            empower individuals with food allergies by providing real-time 
            allergen detection and personalized dietary insights.
          </p>
          
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Key Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Instant Allergen Detection</h3>
              <p>Identifies allergens from scanned food labels in real-time</p>
            </div>
            <div className="feature-card">
              <h3>Cross-Contamination Warnings</h3>
              <p>Alerts about potential contamination risks in food</p>
            </div>
            <div className="feature-card">
              <h3>Personalized Allergy Profiles</h3>
              <p>Customize settings for your specific allergies</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
