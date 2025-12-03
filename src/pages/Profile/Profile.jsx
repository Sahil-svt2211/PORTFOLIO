import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Download, Code, Database, Lightbulb, ArrowRight, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLanguage from '../../hooks/useLanguage';
import './Profile.css';

gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
  const characterRef = useRef(null);
  const profileRef = useRef(null);
  const { t } = useLanguage();

  const skills = [
    'Python', 'Java', 'React', 'Node.js', 'HTML', 'CSS', 'JavaScript','React Native', 'TypeScript', 'EXPO', 'Firebase', 'SQL', 'NoSQL', 'Git', 'Docker', 'Cloud run' , 'REST APIs'];

  useEffect(() => {
    // Animated character scroll effect
    if (characterRef.current) {
      gsap.to(characterRef.current, {
        scale: 0.3,
        rotation: 180,
        x: -20,
        scrollTrigger: {
          trigger: profileRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 2,
        }
      });
      
      // Floating animation for character
      gsap.to(characterRef.current, {
        y: "+=15",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    // Profile landing page zoom animation
    const profileElements = profileRef.current?.querySelectorAll('.intro-section, .skills-section, .mindset-section, .glimpse-sections');
    
    profileElements?.forEach((element, index) => {
      gsap.fromTo(element, 
        { 
          scale: 0.8, 
          opacity: 0,
          y: 50
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleDownloadCV = () => {
    // Create a dummy CV download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'CV_Software_Engineer.pdf';
    link.click();
  };

  return (
    <div className="profile" ref={profileRef}>
      <div className="social-links-header">
        <a 
          href="https://www.linkedin.com/in/sahil-shrivastav-4a39b5280" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link linkedin"
          title="LinkedIn Profile"
        >
          <Linkedin size={20} />
        </a>
        <a 
          href="https://github.com/sahil-svt-22" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link github"
          title="GitHub Profile"
        >
          <Github size={20} />
        </a>
      </div>
      
      <div className="profile-header-container">
        <div className="profile-header">
          <motion.div
            className="welcome-message"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="welcome-hey">{t('welcomeHey')}</h2>
            <h1 className="welcome-title">{t('welcomeTitle')}</h1>
            <h2 className="welcome-to">{t('welcomeTo')}</h2>
            <h3 className="welcome-name">{t('welcomeName')}</h3>
          </motion.div>
          <motion.p 
            className="profile-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {t('profileSubtitle')}
          </motion.p>
        </div>
        
        {/* Animated Character */}
        <div className="animated-character" ref={characterRef}>
          <img 
            src="/LS20250702135609.png" 
            alt="Animated Character" 
          />
        </div>
      </div>

      <div className="profile-content">
        <motion.div 
          className="intro-section"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2>{t('aboutMe')}</h2>
          <p>
            {t('aboutMeText')}
          </p>
          <button className="download-cv-btn" onClick={handleDownloadCV}>
            <Download size={20} />
            {t('downloadCV')}
          </button>
        </motion.div>

        <div className="skills-section">
          <h2>{t('technicalSkills')}</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div 
                key={index} 
                className="skill-tag"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Code size={16} />
                {skill}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mindset-section">
          <h2>{t('myMindset')}</h2>
          <div className="mindset-cards">
            <motion.div 
              className="mindset-card"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Lightbulb className="mindset-icon" />
              <h3>{t('alwaysLearning')}</h3>
              <p>{t('alwaysLearningText')}</p>
            </motion.div>
            <motion.div 
              className="mindset-card"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Database className="mindset-icon" />
              <h3>{t('innovationFocused')}</h3>
              <p>{t('innovationFocusedText')}</p>
            </motion.div>
            <motion.div 
              className="mindset-card"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Code className="mindset-icon" />
              <h3>{t('projectDriven')}</h3>
              <p>{t('projectDrivenText')}</p>
            </motion.div>
          </div>
        </div>

        <div className="glimpse-sections">
          <motion.div 
            className="glimpse-card"
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{t('myProjects')}</h3>
            <p>{t('myProjectsText')}</p>
            <Link to="/projects" className="glimpse-btn">
              {t('viewProjects')} <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div 
            className="glimpse-card"
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{t('currentMysteryProject')}</h3>
            <p>{t('currentMysteryProjectText')}</p>
            <Link to="/current-project" className="glimpse-btn">
              {t('learnMore')} <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div 
            className="glimpse-card"
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{t('getInTouch')}</h3>
            <p>{t('getInTouchText')}</p>
            <Link to="/contact" className="glimpse-btn">
              {t('contactMe')} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;