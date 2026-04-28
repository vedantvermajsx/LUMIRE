import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './styles/global.css';

import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import JewelryDetailPage from './pages/JewelryDetailPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {

  return (
    <Router>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#0D0D0D',
            color: '#D4AF37',
            border: '1px solid rgba(212,175,55,0.15)',
            fontFamily: "'Jost', sans-serif",
            fontSize: '14px',
            letterSpacing: '1px',
            borderRadius: '0',
          },
          success: {
            iconTheme: {
              primary: '#D4AF37',
              secondary: '#0D0D0D',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4b4b',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="bg-[#0B0B0B] min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:id" element={<JewelryDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}