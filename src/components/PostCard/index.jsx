import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowUp, FaArrowDown, FaComment, FaHeart, FaShare, FaBookmark } from 'react-icons/fa'
import { postApi } from '../../services/apiService'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import './styles.css'

function PostCard({ post }) {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [votes, setVotes] = useState({
        upvotes: post.upvoteCount || 0,
        downvotes: post.downvoteCount || 0,
        userVote: null
    })

    const handleVote = async (voteType) => {
        if (!user) return

        // 1. Optimistic Update (Immediate)
        if (voteType === 'remove') {
            setVotes(prev => ({
                ...prev,
                upvotes: prev.upvotes - 1,
                userVote: null
            }))
        } else if (voteType === 'upvote') {
            setVotes(prev => ({
                ...prev,
                upvotes: prev.upvotes + 1,
                userVote: 'upvote'
            }))
        }

        // 2. API Call (Background)
        try {
            await postApi.votePost(post.id, user.userId, voteType)
        } catch (error) {
            console.error('Vote error (Mock API fail ignored):', error)
            // Optional: Revert state if we really wanted strict consistency
            // For Demo: We keep the optimistic update so user sees it "working"
        }
    }

    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [isSaved, setIsSaved] = useState(false)

    const handleSave = () => {
        setIsSaved(!isSaved)
    }

    const handleComment = () => {
        setShowComments(!showComments)
    }

    const submitComment = (e) => {
        e.preventDefault()
        if (!newComment.trim()) return

        const commentObj = {
            id: Date.now(),
            user: user?.username || 'Ben',
            text: newComment,
            time: 'Şimdi'
        }
        setComments([...comments, commentObj])
        setNewComment('')
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Altuvya Gönderisi',
                text: post.content,
                url: window.location.href
            }).catch(console.error)
        } else {
            // Fallback
            navigator.clipboard.writeText(window.location.href)
            alert('Bağlantı kopyalandı!')
        }
    }

    const handleProfileClick = () => {
        if (post.username && !post.isAnonymous) {
            navigate(`/profile/${encodeURIComponent(post.username)}`)
        }
    }

    const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: tr })

    return (
        <div className="post-card slide-up">
            <div className="post-header">
                <div
                    className="post-avatar"
                    onClick={handleProfileClick}
                    style={{ cursor: post.isAnonymous ? 'default' : 'pointer' }}
                >
                    {post.isAnonymous ? '?' : (post.username?.[0] || 'U').toUpperCase()}
                </div>
                <div className="post-user-info">
                    <h4
                        onClick={handleProfileClick}
                        style={{ cursor: post.isAnonymous ? 'default' : 'pointer' }}
                    >
                        {post.isAnonymous ? 'Anonim' : post.username || 'Kullanıcı'}
                        {post.isSpotlight && <span className="post-badge">⭐ Spotlight</span>}
                    </h4>
                    <p>{timeAgo}</p>
                </div>
            </div>

            <div className="post-content">
                <p>{post.content}</p>
                {post.mediaUrl && (
                    <div className="post-media">
                        <img
                            src={post.mediaUrl}
                            alt="Post content"
                            className="post-image"
                        />
                    </div>
                )}
            </div>

            <div className="post-actions-bar">
                <div className="action-left">
                    <button
                        className={`icon-btn like-btn ${votes.userVote === 'upvote' ? 'active' : ''}`}
                        onClick={() => handleVote(votes.userVote === 'upvote' ? 'remove' : 'upvote')} // Toggle like
                        title="Beğen"
                    >
                        {votes.userVote === 'upvote' ? <FaHeart color="#e11d48" /> : <FaHeart />}
                    </button>
                    <button className="icon-btn comment-btn" onClick={handleComment} title="Yorum Yap">
                        <FaComment />
                    </button>
                    <button className="icon-btn share-btn" onClick={handleShare} title="Paylaş">
                        <FaShare />
                    </button>
                </div>

                <div className="action-right">
                    <button
                        className={`icon-btn save-btn ${isSaved ? 'active' : ''}`}
                        onClick={handleSave}
                        title="Kaydet"
                    >
                        <FaBookmark color={isSaved ? "#f59e0b" : "currentColor"} />
                    </button>
                </div>
            </div>

            {/* Stats Section */}
            <div className="post-stats">
                <span className="likes-count">{votes.upvotes} beğenme</span>
                <span className="comments-count" onClick={() => setShowComments(!showComments)}>
                    {comments.length} yorum
                </span>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="comments-section fade-in">
                    {comments.map(c => (
                        <div key={c.id} className="comment-item">
                            <strong>{c.user}</strong> <span>{c.text}</span>
                        </div>
                    ))}
                    <form onSubmit={submitComment} className="comment-form">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Yorum ekle..."
                        />
                        <button type="submit" disabled={!newComment.trim()}>Paylaş</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default PostCard
