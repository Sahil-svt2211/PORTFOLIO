import { useState, useEffect } from 'react';

const useColorTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return parseInt(localStorage.getItem('selectedTheme') || '0');
  });
  const [isAutoChange, setIsAutoChange] = useState(() => {
    return localStorage.getItem('autoChangeTheme') !== 'false';
  });
  
  const themes = [
    {
      name: 'red',
      primary: '#ff6b6b',
      secondary: '#ee5a52',
      tertiary: '#d63384',
      gradient: 'linear-gradient(180deg, #ff6b6b 0%, #ee5a52 20%, #d63384 40%, #2d2d2d 70%, #1a1a1a 100%)',
      sidebarGradient: 'linear-gradient(180deg, rgba(255, 107, 107, 0.4) 0%, rgba(238, 90, 82, 0.4) 20%, rgba(214, 51, 132, 0.4) 40%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.7) 100%)',
      borderColor: 'rgba(255, 107, 107, 0.4)',
      shadowColor: 'rgba(255, 107, 107, 0.3)',
      lightColor: '#ff9999'
    },
    {
      name: 'blue',
      primary: '#667eea',
      secondary: '#764ba2',
      tertiary: '#4c63d2',
      gradient: 'linear-gradient(180deg, #667eea 0%, #764ba2 20%, #4c63d2 40%, #2d2d2d 70%, #1a1a1a 100%)',
      sidebarGradient: 'linear-gradient(180deg, rgba(102, 126, 234, 0.4) 0%, rgba(118, 75, 162, 0.4) 20%, rgba(76, 99, 210, 0.4) 40%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.7) 100%)',
      borderColor: 'rgba(102, 126, 234, 0.4)',
      shadowColor: 'rgba(102, 126, 234, 0.3)',
      lightColor: '#99b3ff'
    },
    {
      name: 'grey',
      primary: '#6c757d',
      secondary: '#5a6268',
      tertiary: '#495057',
      gradient: 'linear-gradient(180deg, #6c757d 0%, #5a6268 20%, #495057 40%, #2d2d2d 70%, #1a1a1a 100%)',
      sidebarGradient: 'linear-gradient(180deg, rgba(108, 117, 125, 0.4) 0%, rgba(90, 98, 104, 0.4) 20%, rgba(73, 80, 87, 0.4) 40%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.7) 100%)',
      borderColor: 'rgba(108, 117, 125, 0.4)',
      shadowColor: 'rgba(108, 117, 125, 0.3)',
      lightColor: '#adb5bd'
    }
  ];

  // Auto-change theme functionality
  useEffect(() => {
    let interval;
    if (isAutoChange) {
      interval = setInterval(() => {
        setCurrentTheme((prev) => {
          const nextTheme = (prev + 1) % themes.length;
          localStorage.setItem('selectedTheme', nextTheme.toString());
          return nextTheme;
        });
      }, 5000); // Change every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoChange, themes.length]);

  const theme = themes[currentTheme];

  // Apply theme to CSS variables with smooth transitions
  useEffect(() => {
    const root = document.documentElement;
    
    // Use requestAnimationFrame to ensure smooth transitions
    requestAnimationFrame(() => {
      root.style.setProperty('--primary-color', theme.primary);
      root.style.setProperty('--secondary-color', theme.secondary);
      root.style.setProperty('--tertiary-color', theme.tertiary);
      root.style.setProperty('--gradient-bg', theme.gradient);
      root.style.setProperty('--sidebar-gradient', theme.sidebarGradient);
      root.style.setProperty('--border-color', theme.borderColor);
      root.style.setProperty('--shadow-color', theme.shadowColor);
      root.style.setProperty('--light-color', theme.lightColor);
    });
  }, [theme]);

  const setTheme = (themeIndex) => {
    setCurrentTheme(themeIndex);
    localStorage.setItem('selectedTheme', themeIndex.toString());
  };

  const toggleAutoChange = (enabled) => {
    setIsAutoChange(enabled);
    localStorage.setItem('autoChangeTheme', enabled.toString());
  };

  return { 
    theme, 
    currentTheme, 
    themes, 
    setTheme, 
    isAutoChange, 
    toggleAutoChange 
  };
};

export default useColorTheme;