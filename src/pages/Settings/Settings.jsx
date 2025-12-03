import React, { useState, useRef } from 'react';
import { Palette, Globe, Bug, Upload, Send, CheckCircle, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import useColorTheme from '../../hooks/useColorTheme';
import useLanguage from '../../hooks/useLanguage';
import './Settings.css';

const Settings = () => {
  const { currentTheme, isAutoChange, setTheme, toggleAutoChange, themes } = useColorTheme();
  const { currentLanguage, setLanguage, languages, t } = useLanguage();
  
  const [bugReport, setBugReport] = useState({
    screenshot: null,
    details: '',
    timestamp: ''
  });
  const [isSubmittingBug, setIsSubmittingBug] = useState(false);
  const [bugSubmitted, setBugSubmitted] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleThemeChange = (themeIndex) => {
    if (themeIndex === 'auto') {
      toggleAutoChange(true);
    } else {
      toggleAutoChange(false);
      setTheme(themeIndex);
    }
  };

  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
  };

  const handleScreenshotUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBugReport(prev => ({
          ...prev,
          screenshot: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBugDetailsChange = (event) => {
    setBugReport(prev => ({
      ...prev,
      details: event.target.value
    }));
  };

  const handleBugSubmit = async (event) => {
    event.preventDefault();
    setIsSubmittingBug(true);

    // Simulate API call
    setTimeout(() => {
      const timestamp = new Date().toLocaleString();
      setBugReport(prev => ({
        ...prev,
        timestamp
      }));
      
      setIsSubmittingBug(false);
      setBugSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setBugSubmitted(false);
        setBugReport({ screenshot: null, details: '', timestamp: '' });
      }, 3000);
    }, 1500);
  };

  const triggerScreenshotUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <motion.h1 
          className="settings-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('settingsTitle')}
        </motion.h1>
        <motion.p 
          className="settings-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t('settingsSubtitle')}
        </motion.p>
      </div>

      <div className="settings-content">
        {/* Theme Settings */}
        <motion.div 
          className="settings-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="section-header">
            <Palette className="section-icon" />
            <h2>{t('themeSettings')}</h2>
          </div>
          <div className="section-content">
            <div className="theme-options">
              <div 
                className={`theme-option theme-auto ${isAutoChange ? 'active' : ''}`}
                onClick={() => handleThemeChange('auto')}
              >
                <div className="theme-preview"></div>
                <div className="theme-name">{t('autoChange')}</div>
                <div className="theme-description">{t('autoChangeDesc')}</div>
              </div>
              
              <div 
                className={`theme-option theme-blue ${!isAutoChange && currentTheme === 1 ? 'active' : ''}`}
                onClick={() => handleThemeChange(1)}
              >
                <div className="theme-preview"></div>
                <div className="theme-name">{t('blueTheme')}</div>
                <div className="theme-description">{t('blueThemeDesc')}</div>
              </div>
              
              <div 
                className={`theme-option theme-red ${!isAutoChange && currentTheme === 0 ? 'active' : ''}`}
                onClick={() => handleThemeChange(0)}
              >
                <div className="theme-preview"></div>
                <div className="theme-name">{t('redTheme')}</div>
                <div className="theme-description">{t('redThemeDesc')}</div>
              </div>
              
              <div 
                className={`theme-option theme-grey ${!isAutoChange && currentTheme === 2 ? 'active' : ''}`}
                onClick={() => handleThemeChange(2)}
              >
                <div className="theme-preview"></div>
                <div className="theme-name">{t('greyTheme')}</div>
                <div className="theme-description">{t('greyThemeDesc')}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Language Settings */}
        <motion.div 
          className="settings-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="section-header">
            <Globe className="section-icon" />
            <h2>{t('languageSettings')}</h2>
          </div>
          <div className="section-content">
            <div className="language-grid">
              {languages.map((language) => (
                <div
                  key={language.code}
                  className={`language-option ${currentLanguage === language.code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(language.code)}
                >
                  <div className="language-flag">{language.flag}</div>
                  <div className="language-name">{language.name}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bug Report */}
        <motion.div 
          className="settings-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="section-header">
            <Bug className="section-icon" />
            <h2>{t('bugReport')}</h2>
          </div>
          <div className="section-content">
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '20px' }}>
              {t('bugReportDesc')}
            </p>
            
            {bugSubmitted && (
              <div className="success-message">
                <CheckCircle size={24} />
                <p>{t('bugReportSuccess')}</p>
              </div>
            )}
            
            <form className="bug-report-form" onSubmit={handleBugSubmit}>
              <div className="form-group">
                <label>{t('bugScreenshot')}</label>
                <div 
                  className={`screenshot-upload ${bugReport.screenshot ? 'has-file' : ''}`}
                  onClick={triggerScreenshotUpload}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotUpload}
                    style={{ display: 'none' }}
                  />
                  {bugReport.screenshot ? (
                    <div>
                      <img 
                        src={bugReport.screenshot} 
                        alt="Bug screenshot" 
                        className="screenshot-preview"
                      />
                      <p className="upload-text">Screenshot uploaded</p>
                      <p className="upload-subtext">Click to change</p>
                    </div>
                  ) : (
                    <div>
                      <Camera className="upload-icon" size={40} />
                      <p className="upload-text">Upload Screenshot</p>
                      <p className="upload-subtext">Click to select an image</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label>{t('bugDetails')}</label>
                <textarea
                  value={bugReport.details}
                  onChange={handleBugDetailsChange}
                  placeholder={t('bugDetailsPlaceholder')}
                  rows="6"
                  required
                />
              </div>
              
              <motion.button 
                type="submit" 
                className="submit-bug-btn"
                disabled={isSubmittingBug || !bugReport.details.trim()}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmittingBug ? (
                  <>
                    <div className="spinner"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    {t('submitBugReport')}
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;