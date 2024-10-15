import React from 'react';


const Header = () => {
  return (
    <header className="header">
      <div className="logo">Eczema Diagnosis</div>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="login-btn">Login</button>
    </header>
  );
};

export default Header;
