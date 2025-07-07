import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext
} from 'react';

import { motion } from 'framer-motion';
import { AuthContext } from './AuthProvider';
import users from '../users';

const useAuth = () => useContext(AuthContext);

// -----------------------------------------------------------------------------
// 🧩 Lección 2 (useState) + useRef + useCallback | TweetComposer
// -----------------------------------------------------------------------------
const TweetComposer = ({ onTweet }) => {
    const [text, setText] = useState('');
    const { user, isAuthenticated } = useAuth();
    const inputRef = useRef(null);

    // Focus automático al autenticarse.
    useEffect(() => {
    if (isAuthenticated) inputRef.current?.focus();
    }, [isAuthenticated]);

    const remaining = 280 - text.length;

    const handleSubmit = useCallback(() => {
    if (!text.trim() || remaining < 0) return;
        onTweet(text.trim());
        setText('');
    }, [text, remaining, onTweet]);

    if (!isAuthenticated)
    return (
        <div className="border-b border-gray-200 p-6 bg-white text-center text-gray-500">
        Inicia sesión para crear un tweet
        </div>
    );

    return (
    <motion.div
        className="border-b border-gray-200 p-6 bg-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <div className="flex gap-3">
        <div className="text-3xl">{user.avatar}</div>
        <div className="flex-1">
            <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && handleSubmit()}
            maxLength={280}
            placeholder="¿Qué está pasando?"
            className="w-full resize-none outline-none text-lg bg-transparent"
            rows={3}
            />

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
                {/* contador dinámico */}
                {remaining < 20 && (
                <span className={`text-sm font-medium ${remaining < 0 ? 'text-red-500' : 'text-orange-500'}`}>
                    {remaining} caracteres restantes
                </span>
                )}
                <span className="text-xs text-gray-400">Ctrl+Enter para enviar</span>
            </div>
            <button
                disabled={!text.trim() || remaining < 0}
                onClick={handleSubmit}
                className="px-6 py-2 rounded-full font-bold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400"
            >
                Tweetear
            </button>
            </div>
        </div>
        </div>
    </motion.div>
    );
};

export default TweetComposer