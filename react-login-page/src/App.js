import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navigation from './components/Navigation';
import Login from './components/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />

        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />

            <Routes>
              <Route
                path="/"
                element={
                  <p>
                    Edit <code>src/App.js</code> and save to reload.
                  </p>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>

            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;