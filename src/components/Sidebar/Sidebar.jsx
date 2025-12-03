import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, FolderOpen, Zap, Mail, Settings } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import './Sidebar.css';

const Sidebar = ({ onNavigate }) => {
  const location = useLocation();
  const { t } = useLanguage();

  const handleNavClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  const menuItems = [
    { path: '/profile', icon: User, label: t('profile') },
    { path: '/projects', icon: FolderOpen, label: t('projects') },
    { path: '/current-project', icon: Zap, label: t('mysteryProject') },
    { path: '/contact', icon: Mail, label: t('contact') },
    { path: '/settings', icon: Settings, label: t('settings') }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="avatar-container">
          <img 
            src="/Profileimage2.jpg" 
            alt="Profile Avatar" 
            className="avatar"
          />
        </div>
        <h2 className="sidebar-title">Sahil Shrivastav</h2>
        <p className="sidebar-subtitle">Software Engineer & Data Analyst</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p className="footer-text">Always learning, always building</p>
      </div>
    </div>
  );
};

export default Sidebar;