import React from 'react';

function Header({ navigateTo, currentPage }) {
  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo" onClick={() => navigateTo('home')}>Nima AI</div>
          <ul className="nav-links">
            <li className={currentPage === 'home' ? 'active' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a>
            </li>
            <li className={currentPage === 'scanner' ? 'active' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('scanner'); }}>Scanner</a>
            </li>
            <li className={currentPage === 'profile' ? 'active' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('profile'); }}>My Profile</a>
            </li>
            <li className={currentPage === 'about' ? 'active' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;