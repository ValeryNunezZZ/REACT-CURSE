import React, {
  useState,
  useCallback
} from 'react';

import AuthProvider from './components/AuthProvider'
import Home from './components/Home';
import Navigation from './components/Navigation';
import PostDetail from './components/PostDetail';
import Profile from './components/Profile';

import { AnimatePresence } from 'framer-motion';

/* ============================================================================
COMPONENTE PRINCIPAL <App/> – Une todo y demuestra react-router (semana 4).
============================================================================ */
export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedTweetId, setSelectedTweetId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Handlers memorizados (useCallback) – evitan renders innecesarios aguas abajo.
  const handleViewDetail = useCallback((id) => {
    setSelectedTweetId(id);
    setCurrentView('detail');
  }, []);

  const handleViewProfile = useCallback((username) => {
    setSelectedUser(username);
    setCurrentView('profile');
  }, []);

  const handleBack = useCallback(() => {
    setCurrentView('home');
    setSelectedTweetId(null);
    setSelectedUser(null);
  }, []);

  // Renderiza la vista según el estado – reemplazar por react-router-dom en la
  // Semana 4 para mostrar la navegación real con rutas.
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Home onViewDetail={handleViewDetail} onViewProfile={handleViewProfile} />;
      case 'detail':
        return (
          <PostDetail tweetId={selectedTweetId} onBack={handleBack} onViewProfile={handleViewProfile} />
        );
      case 'profile':
        return <Profile username={selectedUser} onBack={handleBack} />;
      default:
        return <Home onViewDetail={handleViewDetail} onViewProfile={handleViewProfile} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex justify-center py-4">
          <AnimatePresence mode="wait">{renderCurrentView()}</AnimatePresence>
        </main>
        <footer className="bg-white border-t border-gray-200 py-6 mt-12 text-center text-gray-500 text-sm">
          <p>MiniX – Clon educativo de Twitter con React Hooks</p>
        </footer>
      </div>
    </AuthProvider>
  );
}
