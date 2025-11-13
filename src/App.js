// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import './App.css';
import HybridDashboard from './components/HybridDashboard';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route shows login/signup based on currentForm state */}
          <Route 
            path="/" 
            element={
              currentForm === 'login' ? (
                <Login onFormSwitch={toggleForm} />
              ) : (
                <Signup onFormSwitch={toggleForm} />
              )
            } 
          />
          {/* About route */}
          <Route path="/About" element={<About />} />
          <Route path="/dashboard" element={<HybridDashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;