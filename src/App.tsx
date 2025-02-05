import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import QuerySection from './pages/Query';
import DiagramGenerator from './pages/Diagram';
import AudioSection from './pages/Audio';



const styles = `
  /* Your existing styles here */
`;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <style>{styles}</style>
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/query" element={<QuerySection />} />
            <Route path="/diagram" element={<DiagramGenerator />} />
            <Route path="/audio" element={<AudioSection />} />
            
            
            {/* Add more routes as needed */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;