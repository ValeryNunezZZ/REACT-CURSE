import React, {
  useState,
  useCallback,
  useContext,
  useEffect
} from 'react';

import { motion} from 'framer-motion';
import { AuthContext } from './AuthProvider';
import TweetComposer from './TweetComposer';
import TweetFeed from './TweetFeed';
import users from '../users';


// Hook de conveniencia – evitamos repetir useContext(AuthContext) en todos lados.
const useAuth = () => useContext(AuthContext);

// -----------------------------------------------------------------------------
// 🧩 Home – integra TweetComposer + TweetFeed
// -----------------------------------------------------------------------------
const Home = ({ onViewDetail, onViewProfile }) => {
const { user, isAuthenticated } = useAuth();
const [tweets, setTweets] = useState(JSON.parse(localStorage.getItem('tweets')));


const publishTweet = useCallback(
    (text) => {
    if (!isAuthenticated || !user) return;
    console.log(user.username)


    const newTweet = {
        id: Date.now(),
        user: user.username,
        avatar: user.avatar,
        text,
        timestamp: Date.now(),
        likes: 0,
        retweets: 0,
        replies: 0,
    };

// Guardar en localStorage
    const updatedTweets = [newTweet, ...tweets];
    localStorage.setItem('tweets', JSON.stringify(updatedTweets));
    setTweets(updatedTweets);

    setTweets((prev) => [newTweet, ...prev]);
    },
    [isAuthenticated, user]
);

const handleLike = useCallback((id, isLiking) => {
    setTweets((prev) =>
    prev.map((t) =>
        t.id === id ? { ...t, likes: Math.max(0, t.likes + (isLiking ? 1 : -1)) } : t
    )
    );
}, []);

const handleRetweet = useCallback((id, isRetweeting) => {
    setTweets((prev) =>
    prev.map((t) =>
        t.id === id ? { ...t, retweets: Math.max(0, t.retweets + (isRetweeting ? 1 : -1)) } : t
    )
    );
}, []);

return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
    <TweetComposer onTweet={publishTweet} />
    <TweetFeed
        tweets={tweets}
        onLike={handleLike}
        onRetweet={handleRetweet}
        onViewDetail={onViewDetail}
    />
    </motion.div>
);
};

export default Home