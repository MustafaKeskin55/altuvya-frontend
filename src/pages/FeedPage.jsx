import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import StoriesBar from '../components/StoriesBar'
import { FaImage, FaVideo, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import { postApi, groupApi } from '../services/apiService'
import { setPosts, setSpotlightPosts, addPost } from '../store/slices/postSlice'
import { setGroups } from '../store/slices/groupSlice'
import './FeedPage.css'

function FeedPage() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { posts, spotlightPosts } = useSelector((state) => state.posts)
    const { groups } = useSelector((state) => state.groups)

    const [loading, setLoading] = useState(true)
    const [newPost, setNewPost] = useState('')
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState(null)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)

            // Fetch all posts from API (mock backend)
            const allPosts = await postApi.getAllPosts()
            // Sort by date descending
            allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

            // Separate spotlight posts (e.g., those with many likes/flag, here just filtering or taking subset)
            // In a real app backend would handle this, but for now we filter client side or backend parameter
            const spotlights = await postApi.getSpotlightPosts()

            dispatch(setPosts(allPosts))
            dispatch(setSpotlightPosts(spotlights))

            const groupsData = await groupApi.getAllGroups()
            dispatch(setGroups(groupsData))

        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreatePost = async (e) => {
        e.preventDefault()
        if (!newPost.trim() || !selectedGroup) return

        try {
            const postData = {
                userId: user.userId,
                groupId: selectedGroup,
                content: newPost,
                isAnonymous: isAnonymous
            }

            const created = await postApi.createPost(postData)
            dispatch(addPost(created))
            setNewPost('')
            setIsAnonymous(false)
        } catch (error) {
            console.error('Error creating post:', error)
        }
    }

    return (
        <div className="feed-page">
            <div className="feed-container">
                {/* Stories Section */}
                <StoriesBar />

                {/* Create Post - Rich Style */}
                <div className="create-post-box card-glass">
                    <div className="create-post-top">
                        <div className="cp-avatar">
                            {user?.username?.[0] || 'U'}
                        </div>
                        <form onSubmit={handleCreatePost} className="cp-form">
                            <input
                                type="text"
                                placeholder={`Ne düşünüyorsun, ${user?.username || 'Ziyaretçi'}?`}
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                className="cp-input"
                            />
                            <button type="submit" className="cp-submit-btn" disabled={!newPost.trim()}>
                                <FaPaperPlane />
                            </button>
                        </form>
                    </div>
                    <div className="cp-divider"></div>
                    <div className="create-post-actions">
                        <button className="cp-action-btn photo-btn">
                            <FaImage /> Fotoğraf
                        </button>
                        <button className="cp-action-btn video-btn">
                            <FaVideo /> Video
                        </button>
                        <button className="cp-action-btn location-btn">
                            <FaMapMarkerAlt /> Konum
                        </button>
                    </div>
                </div>

                {/* Spotlight Section - Moved below create post as per flow */}
                {spotlightPosts && spotlightPosts.length > 0 && (
                    <div className="spotlight-section">
                        <h2 className="spotlight-title">
                            ⭐ Bu Haftanın Spotlight Paylaşımları
                        </h2>
                        {spotlightPosts.slice(0, 3).map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                {/* Posts List */}
                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Yükleniyor...</p>
                    </div>
                ) : posts && posts.length > 0 ? (
                    <div className="posts-list">
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <h3>Henüz paylaşım yok</h3>
                        <p>İlk paylaşımı sen yap!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FeedPage
