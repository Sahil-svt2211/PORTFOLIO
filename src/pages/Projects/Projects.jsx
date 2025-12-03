import React, { useEffect } from 'react';
import { ExternalLink, Github, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLanguage from '../../hooks/useLanguage';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Scroll-triggered animations for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: t('ecommerceTitle'),
      description: t('ecommerceDesc'),
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveLink: "https://example-ecommerce.com",
      repoLink: "https://github.com/username/ecommerce-platform",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      suggestion: t('ecommerceSuggestion')
    },
    {
      id: 2,
      title: t('analyticsTitle'),
      description: t('analyticsDesc'),
      technologies: ["Python", "React", "D3.js", "Flask"],
      liveLink: "https://example-dashboard.com",
      repoLink: "https://github.com/username/analytics-dashboard",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
      suggestion: t('analyticsSuggestion')
    },
    {
      id: 3,
      title: t('taskTitle'),
      description: t('taskDesc'),
      technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
      liveLink: "https://example-tasks.com",
      repoLink: "https://github.com/username/task-manager",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
      suggestion: t('taskSuggestion')
    },
    {
      id: 4,
      title: t('weatherTitle'),
      description: t('weatherDesc'),
      technologies: ["JavaScript", "HTML", "CSS", "Weather API"],
      liveLink: "https://example-weather.com",
      repoLink: "https://github.com/username/weather-app",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      suggestion: t('weatherSuggestion')
    },
    {
      id: 5,
      title: t('mlTitle'),
      description: t('mlDesc'),
      technologies: ["Python", "Scikit-learn", "Flask", "Pandas"],
      liveLink: "https://example-ml.com",
      repoLink: "https://github.com/username/ml-model",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      suggestion: t('mlSuggestion')
    },
    {
      id: 6,
      title: t('socialTitle'),
      description: t('socialDesc'),
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      liveLink: "https://example-social.com",
      repoLink: "https://github.com/username/social-clone",
      image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
      suggestion: t('socialSuggestion')
    }
  ];

  return (
    <div className="projects">
      <div className="projects-header">
        <motion.h1 
          className="projects-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('projectsTitle')}
        </motion.h1>
        <motion.p 
          className="projects-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t('projectsSubtitle')}
        </motion.p>
      </div>

      <div className="projects-exhibition">
        {projects.map((project) => (
          <motion.div 
            key={project.id} 
            className="project-card"
            whileHover={{ scale: 1.03, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <div className="project-actions">
                  <a href={project.liveLink} className="action-btn live-btn" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={20} />
                    {t('liveDemo')}
                  </a>
                  <a href={project.repoLink} className="action-btn repo-btn" target="_blank" rel="noopener noreferrer">
                    <Github size={20} />
                    {t('repository')}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="project-content">
              <h3 className="project-name">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <div className="project-suggestion">
                <MessageCircle size={16} className="suggestion-icon" />
                <p className="suggestion-text">{project.suggestion}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;