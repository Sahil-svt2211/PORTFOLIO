import React, { useState, useEffect } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLanguage from '../../hooks/useLanguage';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Scroll-triggered animations
    const contactElements = document.querySelectorAll('.info-card, .contact-form-container');
    
    contactElements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          y: 40,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="contact">
      <div className="contact-header">
        <motion.h1 
          className="contact-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('contactTitle')}
        </motion.h1>
        <motion.p 
          className="contact-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t('contactSubtitle')}
        </motion.p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <motion.div 
            className="info-card"
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <Mail className="info-icon" />
            <h3>{t('emailMe')}</h3>
            <p>{t('emailMeDesc')}</p>
            <a 
              href="mailto:sahil25shrivastav@gmail.com" 
              className="email-button"
            >
              <Mail size={16} />
              {t('sendEmail')}
            </a>
          </motion.div>
          
          <motion.div 
            className="info-card"
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <MessageSquare className="info-icon" />
            <h3>{t('letsDiscuss')}</h3>
            <p>{t('letsDiscussDesc')}</p>
          </motion.div>
          
          <motion.div 
            className="info-card"
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <User className="info-icon" />
            <h3>{t('availableFor')}</h3>
            <p>{t('availableForDesc')}</p>
          </motion.div>
        </div>

        <div className="contact-form-container">
          {isSubmitted && (
            <div className="success-message">
              <CheckCircle size={24} />
              <p>{t('messageSentSuccess')}</p>
            </div>
          )}
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t('fullName')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder={t('fullNamePlaceholder')}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t('emailAddress')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder={t('emailPlaceholder')}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">{t('subject')}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder={t('subjectPlaceholder')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">{t('messageLabel')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder={t('messagePlaceholder')}
              ></textarea>
            </div>
            
            <motion.button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  {t('sending')}
                </>
              ) : (
                <>
                  <Send size={20} />
                  {t('sendMessage')}
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;