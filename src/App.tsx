import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import News from './News';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="App-nav">
            <h1>My Awesome Website</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href={process.env.PUBLIC_URL + '/news.html'}>News</a></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
        </Routes>
        <footer className="App-footer">
          <p>&copy; 2025 My Awesome Website</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
