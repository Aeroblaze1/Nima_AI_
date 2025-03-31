import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import ScannerPage from "./components/ScannerPage";
import ProfilePage from "./components/ProfilePage";
import AboutPage from "./components/AboutPage";
import ContactForm from "./components/ContactForm";
function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [userProfile, setUserProfile] = useState({
    name: "Guest User",
    allergens: ["Peanuts", "Gluten"],
  });

  const updateAllergens = (allergens) => {
    setUserProfile((prev) => ({
      ...prev,
      allergens: allergens,
    }));
  };

  // Simple page navigation
  const renderPage = () => {
    switch (currentPage) {
      case "scanner":
        return <ScannerPage userProfile={userProfile} />;
      case "profile":
        return (
          <ProfilePage
            userProfile={userProfile}
            updateAllergens={updateAllergens}
          />
        );
      case "about":
        return <AboutPage />;
      case "contact":
        <ContactForm />;
      default:
        return <HomePage navigateTo={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <Header navigateTo={setCurrentPage} currentPage={currentPage} />
      <main>{renderPage()}</main>
      <footer>
        <div className="container">
          <ContactForm />
          <p>&copy; 2025 Nima AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
