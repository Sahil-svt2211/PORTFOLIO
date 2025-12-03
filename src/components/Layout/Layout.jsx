import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="layout">
      {/* Mobile Menu Toggle Button */}
      <button 
        className="mobile-menu-toggle" 
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar-container ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <Sidebar onNavigate={closeMobileMenu} />
      </div>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;