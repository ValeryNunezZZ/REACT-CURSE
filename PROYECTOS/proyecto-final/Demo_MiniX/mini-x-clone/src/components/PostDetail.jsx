import { motion } from 'framer-motion';

import users from '../users';
import { useEffect } from 'react';

// -----------------------------------------------------------------------------
// 🧩 PostDetail – detalle de un tweet
// -----------------------------------------------------------------------------
const PostDetail = ({ tweetId, onBack, onViewProfile }) => {
    
/*     useEffect(()=>{
        console.log(users[tweetId-1].avatar);

        //Buscar usuario 
    },[])
    const lookup = {
    1: {
        user: 'demo_user',
        avatar: '🚀',
        text: 'Bienvenido a MiniX! Este es un tweet de ejemplo…',
        timestamp: Date.now() - 3600000,
        likes: 15,
        retweets: 4,
        replies: 2,
    },
    2: {
        user: 'tech_lover',
        avatar: '💻',
        text: 'Acabo de terminar mi proyecto en React con hooks…',
        timestamp: Date.now() - 7200000,
        likes: 23,
        retweets: 7,
        replies: 5,
    },
    }; */

    const tweet = users[tweetId-1]

    return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl bg-white">
        <div className="p-4 border-b border-gray-200">
        <button onClick={onBack} className="text-blue-500 hover:underline text-sm">
            ← Volver
        </button>
        </div>
        <div className="p-6">
        <div className="flex gap-4">
            <div className="text-4xl">{tweet.avatar}</div>
            <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
                <button
                onClick={() => onViewProfile(tweet.user)}
                className="font-bold text-lg hover:underline"
                >
                @{tweet.user}
                </button>
                <span className="text-gray-500">
                {new Date(tweet.timestamp).toLocaleString()}
                </span>
            </div>
            <p className="text-xl leading-relaxed mb-6">{tweet.text}</p>
            <div className="flex items-center gap-8 text-gray-600 text-lg border-t border-gray-100 pt-4">
                <span className="flex items-center gap-2">❤️ {tweet.likes}</span>
                <span className="flex items-center gap-2">🔄 {tweet.retweets}</span>
                <span className="flex items-center gap-2">💬 {tweet.replies}</span>
                <span className="flex items-center gap-2">📤</span>
            </div>
            </div>
        </div>
        </div>
    </motion.div>
    );
};

export default PostDetail