import React from 'react';
import { ExternalLink, Linkedin, Github, Instagram, Code, GraduationCap } from 'lucide-react';
import './SocialContact.css';

const SocialContact = () => {
  const socialPlatforms = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      description: 'Professional network and career updates',
      preview: 'Connect with me professionally and see my career journey',
      stats: '500+ connections',
      link: 'https://linkedin.com/in/yourprofile',
      color: '#0077b5',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'GitHub',
      icon: Github,
      description: 'Code repositories and open source contributions',
      preview: 'Explore my code, projects, and contributions to open source',
      stats: '50+ repositories',
      link: 'https://github.com/yourusername',
      color: '#333',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      description: 'Behind the scenes and personal moments',
      preview: 'Get a glimpse into my daily life and tech adventures',
      stats: '1K+ followers',
      link: 'https://instagram.com/yourhandle',
      color: '#e4405f',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'LeetCode',
      icon: Code,
      description: 'Coding challenges and problem solving',
      preview: 'Check out my coding solutions and algorithm practice',
      stats: '200+ problems solved',
      link: 'https://leetcode.com/yourprofile',
      color: '#ffa116',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Springboard',
      icon: GraduationCap,
      description: 'Learning journey and certifications',
      preview: 'View my completed courses and learning achievements',
      stats: '5+ certifications',
      link: 'https://springboard.com/profile/yourprofile',
      color: '#00c851',
      image: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="social-contact">
      <div className="social-header">
        <h1 className="social-title">My Digital Presence</h1>
        <p className="social-subtitle">
          Connect with me across different platforms and get to know my professional and personal journey
        </p>
      </div>

      <div className="social-grid">
        {socialPlatforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <div key={index} className="social-card">
              <div className="social-preview">
                <img 
                  src={platform.image} 
                  alt={`${platform.name} preview`}
                  className="preview-image"
                />
                <div className="preview-overlay">
                  <Icon 
                    size={40} 
                    className="platform-icon"
                    style={{ color: platform.color }}
                  />
                </div>
              </div>
              
              <div className="social-content">
                <div className="social-header-info">
                  <h3 className="platform-name">{platform.name}</h3>
                  <div className="platform-stats">{platform.stats}</div>
                </div>
                
                <p className="platform-description">{platform.description}</p>
                <p className="platform-preview">{platform.preview}</p>
                
                <a 
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="platform-link"
                  style={{ 
                    background: `linear-gradient(45deg, ${platform.color}, ${platform.color}dd)` 
                  }}
                >
                  <ExternalLink size={16} />
                  Visit Profile
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="social-footer">
        <div className="footer-content">
          <h2>Let's Connect!</h2>
          <p>
            I'm always excited to connect with fellow developers, potential collaborators, 
            and anyone interested in technology. Feel free to reach out on any of these platforms!
          </p>
          <div className="quick-links">
            {socialPlatforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <a
                  key={index}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-link"
                  style={{ borderColor: platform.color }}
                >
                  <Icon size={20} style={{ color: platform.color }} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialContact;