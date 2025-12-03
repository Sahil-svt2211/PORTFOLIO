import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useColorTheme from './hooks/useColorTheme';
import Layout from './components/Layout/Layout';
import Profile from './pages/Profile/Profile';
import Projects from './pages/Projects/Projects';
import CurrentProject from './pages/CurrentProject/CurrentProject';
import Contact from './pages/Contact/Contact';
import Settings from './pages/Settings/Settings';
import './App.css';

function App() {
  const { theme } = useColorTheme();

  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/current-project" element={<CurrentProject />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;