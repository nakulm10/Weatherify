import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Prediction from './components/Weatherbg';
import Login from './components/Login';
import About from './components/About';
import Register from './components/Register';
import Home from './components/Home';
import News from './components/News';
import LogOut from './components/logout';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/news" element={<News />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
