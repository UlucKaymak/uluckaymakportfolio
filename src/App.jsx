import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import AboutMe from './pages/AboutMe.jsx';
import Collab from './pages/Collab.jsx';
import TermsOfCollab from './pages/TermsOfCollab.jsx';
import './style.css';
import './projects.css';

function App() {
  return (
    <Router>
      <div className="text-based-page">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/collab" element={<Collab />} />
            <Route path="/termsofcollab" element={<TermsOfCollab />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
