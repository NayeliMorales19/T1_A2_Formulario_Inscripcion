import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navigation from './components/Navigation';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />

        <div className="App">
          {/* SOLO el contenido va aquí */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;