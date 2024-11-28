import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import History from './pages/History';
import Statistics from './pages/Statistics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* 네비게이션 바 */}
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto">
            <Navbar />
          </div>
        </header>
        
        {/* 메인 컨텐츠 */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/history" element={<History />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
