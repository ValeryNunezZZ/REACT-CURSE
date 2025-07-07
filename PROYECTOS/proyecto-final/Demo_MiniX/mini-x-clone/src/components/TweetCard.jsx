import React, {
  useState,
  useCallback,
  memo,
} from 'react';

import { motion} from 'framer-motion';

// -----------------------------------------------------------------------------
// 🧩 Lección 6 – useCallback + React.memo | TweetCard (presentacional)
// -----------------------------------------------------------------------------


const TweetCard = memo(({ tweet, onLike, onRetweet, onViewDetail }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isRetweeted, setIsRetweeted] = useState(false);

    // ⚠️ BEST PRACTICE: las dependencias incluyen sólo lo necesario.
    const handleLike = useCallback(
    (e) => {
        e.stopPropagation();
        setIsLiked((prev) => !prev);
        onLike(tweet.id, !isLiked);
    },
    [tweet.id, isLiked, onLike]
    );

    const handleRetweet = useCallback(
    (e) => {
        e.stopPropagation();
        setIsRetweeted((prev) => !prev);
        onRetweet(tweet.id, !isRetweeted);
    },
    [tweet.id, isRetweeted, onRetweet]
    );

    return (
    <motion.div
        className="border-b border-gray-200 p-6 bg-white hover:bg-gray-50 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => onViewDetail(tweet.id)}
    >
        <div className="flex gap-3">
        <div className="text-2xl">{tweet.avatar}</div>
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
            <span className="font-bold hover:underline">@{tweet.user}</span>
            <span className="text-gray-500 text-sm">
                {new Date(tweet.timestamp).toLocaleString()}
            </span>
            </div>
            <p className="text-gray-900 mb-3 leading-relaxed">{tweet.text}</p>
            <div className="flex items-center gap-6 text-gray-500">
            {/* Botones de interacción */}
            <button
                onClick={handleLike}
                className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
            >
                ❤️
                <span className="text-sm">{tweet.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <button
                onClick={handleRetweet}
                className={`flex items-center gap-1 ${isRetweeted ? 'text-green-500' : 'hover:text-green-500'}`}
            >
                🔄
                <span className="text-sm">{tweet.retweets + (isRetweeted ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
                💬 <span className="text-sm">{tweet.replies}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">📤</button>
            </div>
        </div>
        </div>
    </motion.div>
    );
});

export default TweetCard