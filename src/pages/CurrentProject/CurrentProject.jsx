import React, { useState, useEffect, useCallback } from 'react';
import { Zap, Target, AlertTriangle, Bug, Clock, Users, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLanguage from '../../hooks/useLanguage';
import './CurrentProject.css';

gsap.registerPlugin(ScrollTrigger);

const CurrentProject = () => {
  const { t } = useLanguage();
  const [showContributeForm, setShowContributeForm] = useState(false);
  const [contributorData, setContributorData] = useState({
    name: '',
    email: '',
    skills: '',
    interest: ''
  });

  // Add debugging to track modal state
  useEffect(() => {
    console.log('Modal state changed:', showContributeForm);
  }, [showContributeForm]);

  useEffect(() => {
    // Only initialize animations if modal is not open
    if (!showContributeForm) {
      // Scroll-triggered animations for project sections
      const sections = document.querySelectorAll('.report-section');
      
      sections.forEach((section, index) => {
        gsap.fromTo(section,
          {
            opacity: 0,
            y: 50,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Ensure body scroll is restored on component unmount
      document.body.style.overflow = 'unset';
    };
  }, [showContributeForm]);

  const handleContributeClick = () => {
    setShowContributeForm(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    // Force scroll to top to ensure modal is in viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setContributorData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmitContribution = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert(t('thankYouMessage'));
    setShowContributeForm(false);
    setContributorData({ name: '', email: '', skills: '', interest: '' });
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const handleCloseModal = () => {
    setShowContributeForm(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="current-project">
      <div className="project-header">
        <motion.div 
          className="project-icon"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Zap size={60} />
        </motion.div>
        <motion.h1 
          className="project-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {t('mysteryProjectTitle')}
        </motion.h1>
        <motion.p 
          className="project-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {t('mysteryProjectSubtitle')}
        </motion.p>
      </div>

      <div className="project-report">
        <motion.div 
          className="report-section"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="section-header">
            <Target className="section-icon" />
            <h2>{t('projectAim')}</h2>
          </div>
          <div className="section-content">
            <p>
              {t('projectAimDescription')}
            </p>
            <ul>
              <li>{t('realtimeAnalysis')}</li>
              <li>{t('contextAwareCompletion')}</li>
              <li>{t('bugDetection')}</li>
              <li>{t('codeOptimization')}</li>
              <li>{t('multiLanguageSupport')}</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="report-section"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="section-header">
            <AlertTriangle className="section-icon" />
            <h2>{t('currentDrawbacks')}</h2>
          </div>
          <div className="section-content">
            <ul>
              <li>{t('highComputationalReq')}</li>
              <li>{t('accuracyVaries')}</li>
              <li>{t('contextLimited')}</li>
              <li>{t('integrationChallenges')}</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="report-section"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="section-header">
            <Bug className="section-icon" />
            <h2>{t('technicalLimitations')}</h2>
          </div>
          <div className="section-content">
            <ul>
              <li>{t('modelSizeConstraints')}</li>
              <li>{t('limitedTrainingData')}</li>
              <li>{t('complexArchitecture')}</li>
              <li>{t('performanceBottlenecks')}</li>
              <li>{t('crossPlatformIssues')}</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="report-section"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="section-header">
            <AlertTriangle className="section-icon" />
            <h2>{t('currentIssues')}</h2>
          </div>
          <div className="section-content">
            <ul>
              <li>{t('memoryLeaks')}</li>
              <li>{t('inconsistentSuggestions')}</li>
              <li>{t('extensionCrashes')}</li>
              <li>{t('slowResponseTimes')}</li>
              <li>{t('authenticationIssues')}</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="report-section"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="section-header">
            <Clock className="section-icon" />
            <h2>{t('developmentPhase')}</h2>
          </div>
          <div className="section-content">
            <div className="phase-indicator">
              <div className="phase-progress">
                <div className="progress-bar" style={{width: '65%'}}></div>
              </div>
              <span className="phase-text">{t('phaseText')}</span>
            </div>
            <p>
              {t('phaseDescription')}
            </p>
            <div className="phase-milestones">
              <div className="milestone completed">✓ {t('phaseResearchPlanning')}</div>
              <div className="milestone completed">✓ {t('phaseCoreDevlopment')}</div>
              <div className="milestone current">🔄 {t('phaseBetaTesting')}</div>
              <div className="milestone">{t('phaseProductionRelease')}</div>
              <div className="milestone">{t('phaseFeatureEnhancement')}</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="contribute-section"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="section-header">
            <Users className="section-icon" />
            <h2>{t('wantToContribute')}</h2>
          </div>
          <div className="section-content">
            <p>
              {t('contributeDescription')}
            </p>
            <motion.button 
              className="contribute-btn" 
              onClick={handleContributeClick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users size={20} />
              {t('joinProject')}
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showContributeForm && (
          <motion.div 
            className="contribute-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.7, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
            <h3>{t('joinMysteryProject')}</h3>
            <form onSubmit={handleSubmitContribution}>
              <div className="form-group">
                <label>{t('fullName')}</label>
                <input
                  type="text"
                  name="name"
                  value={contributorData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('emailAddress')}</label>
                <input
                  type="email"
                  name="email"
                  value={contributorData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('yourSkills')}</label>
                <input
                  type="text"
                  name="skills"
                  value={contributorData.skills}
                  onChange={handleInputChange}
                  placeholder={t('skillsPlaceholder')}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('whyInterested')}</label>
                <textarea
                  name="interest"
                  value={contributorData.interest}
                  onChange={handleInputChange}
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="cancel-btn">
                  {t('cancel')}
                </button>
                <motion.button 
                  type="submit" 
                  className="submit-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={16} />
                  {t('sendApplication')}
                </motion.button>
              </div>
            </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrentProject;