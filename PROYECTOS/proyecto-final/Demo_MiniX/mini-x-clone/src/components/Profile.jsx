import { motion} from 'framer-motion';
import { useContext } from 'react';

import { AuthContext } from './AuthProvider';

// -----------------------------------------------------------------------------
// 🧩 Profile – vista de usuario
// -----------------------------------------------------------------------------

const useAuth = () => useContext(AuthContext);

const Profile = ({ username, onBack }) => {
    const { user: currentUser } = useAuth();
    const isOwnProfile = currentUser?.username === username;

    const avatarMap = {
    demo_user: '🚀',
    tech_lover: '💻',
    designer_pro: '🎨',
    };
    const statsMap = {
    demo_user: { tweets: 42, following: 127, followers: 89 },
    tech_lover: { tweets: 234, following: 56, followers: 341 },
    designer_pro: { tweets: 156, following: 78, followers: 203 },
    };

    const avatar = avatarMap[username] ?? '👤';
    const stats = statsMap[username] ?? { tweets: 0, following: 0, followers: 0 };

    return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-2xl">
        <div className="bg-white border-b border-gray-200">
        <div className="p-4 border-b border-gray-100">
            <button onClick={onBack} className="text-blue-500 hover:underline text-sm">
            ← Volver
            </button>
        </div>
        <div className="p-6">
            <div className="flex items-start gap-4">
            <div className="text-6xl">{avatar}</div>
            <div className="flex-1">
                <h1 className="text-2xl font-bold">@{username}</h1>
                <p className="text-gray-500 mb-3">
                {isOwnProfile ? 'Tu perfil' : `Perfil de ${username}`}
                </p>
                <div className="flex gap-6 text-sm">
                <span>
                    <strong>{stats.tweets}</strong>{' '}
                    <span className="text-gray-600">Tweets</span>
                </span>
                <span>
                    <strong>{stats.following}</strong>{' '}
                    <span className="text-gray-600">Siguiendo</span>
                </span>
                <span>
                    <strong>{stats.followers}</strong>{' '}
                    <span className="text-gray-600">Seguidores</span>
                </span>
                </div>
                {!isOwnProfile && (
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                    Seguir
                </button>
                )}
            </div>
            </div>
        </div>
        </div>
        <div className="p-8 bg-white text-center text-gray-500">
        <div className="text-4xl mb-3">📝</div>
        <p className="text-lg">Los tweets de @{username} aparecerían aquí</p>
        <p className="text-sm mt-2">
            En una implementación real, aquí se cargarían los tweets del usuario
        </p>
        </div>
    </motion.div>
    );
};

export default Profile