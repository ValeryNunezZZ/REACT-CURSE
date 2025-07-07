import React, {
    useState,
    useContext
} from 'react';

import LoginModal from './LoginModal';
import { AuthContext } from './AuthProvider';
import { AnimatePresence } from 'framer-motion';


const useAuth = () => useContext(AuthContext);


// -----------------------------------------------------------------------------
// 🧩 Lección 1+2 – Props, Estado, Eventos | Navigation
// -----------------------------------------------------------------------------
const Navigation = ({ currentView, setCurrentView }) => {
    const { user, isAuthenticated, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
    <>
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <nav className="max-w-4xl mx-auto flex items-center justify-between p-4">
            {/* Botón logo */}
            <button
            onClick={() => setCurrentView('home')}
            className="text-2xl font-extrabold text-blue-500 hover:text-blue-600"
            >
            MiniX
            </button>

            {/* Menú derecho */}
            <div className="flex items-center gap-6">
            <button
                onClick={() => setCurrentView('home')}
                className={`hover:text-blue-500 ${currentView === 'home' ? 'font-bold text-blue-500' : 'text-gray-700'
                }`}
            >
                Inicio
            </button>
            {isAuthenticated ? (
                <div className="flex items-center gap-3">
                <button
                    onClick={() => setCurrentView(`profile-${user.username}`)}
                    className={`hover:text-blue-500 ${currentView.startsWith('profile')
                    ? 'font-bold text-blue-500'
                    : 'text-gray-700'
                    }`}
                >
                    {user.avatar} {user.username}
                </button>
                <button
                    onClick={logout}
                    className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                    Salir
                </button>
                </div>
            ) : (
                <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                Iniciar Sesión
                </button>
            )}
            </div>
        </nav>
        </header>

        {/* Modal de login controlado por estado */}
        <AnimatePresence>
        {showLoginModal && (
            <LoginModal isOpen onClose={() => setShowLoginModal(false)} />
        )}
        </AnimatePresence>
    </>
    );
};

export default Navigation