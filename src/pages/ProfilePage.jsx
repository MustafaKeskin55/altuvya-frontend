import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import { FaGraduationCap, FaMapMarkerAlt, FaLink, FaCalendarAlt, FaCog } from 'react-icons/fa'
import { userApi, postApi } from '../services/apiService'
import './ProfilePage.css'

function ProfilePage() {
    const { username } = useParams()
    const { user: currentUser } = useSelector((state) => state.auth)
    const [profileUser, setProfileUser] = useState(null)
    const [userPosts, setUserPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [isFollowing, setIsFollowing] = useState(false)
    const [activeTab, setActiveTab] = useState('posts')

    const isOwnProfile = currentUser?.username === username

    useEffect(() => {
        loadProfileData()
    }, [username])

    const loadProfileData = async () => {
        try {
            setLoading(true)
            // Fetch user data from API
            const userData = await userApi.getUserByUsername(username)
            if (userData && userData.length > 0) {
                setProfileUser(userData[0])
            }

            // Fetch user's posts
            const allPosts = await postApi.getAllPosts()
            const filteredPosts = allPosts.filter(post => post.username === username)
            setUserPosts(filteredPosts)
        } catch (error) {
            console.error('Error loading profile:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleFollow = () => {
        setIsFollowing(!isFollowing)
        // TODO: API call to follow/unfollow
    }

    const handleMessage = () => {
        // TODO: Open message modal
        alert('Mesajlaşma özelliği yakında eklenecek!')
    }

    if (loading) {
        return (
            <div className="profile-page-wrapper">
                <Navbar />
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Yükleniyor...</p>
                </div>
            </div>
        )
    }

    if (!profileUser) {
        return (
            <div className="profile-page-wrapper">
                <Navbar />
                <div className="empty-state">
                    <h3>Kullanıcı bulunamadı</h3>
                </div>
            </div>
        )
    }

    return (
        <div className="profile-page-wrapper">
            <Navbar />

            <div className="profile-content">
                {/* Banner */}
                <div className="profile-banner-container">
                    <img
                        src={profileUser.banner || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"}
                        alt="Banner"
                        className="profile-banner"
                    />
                </div>

                {/* Header Info */}
                <div className="profile-header-section">
                    <div className="profile-avatar-container">
                        <img
                            src={profileUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                            alt="Avatar"
                            className="profile-avatar-img"
                        />
                    </div>

                    <div className="profile-actions">
                        {isOwnProfile ? (
                            <button className="btn-primary follow-btn">
                                <FaCog /> Profili Düzenle
                            </button>
                        ) : (
                            <>
                                <button
                                    className={`btn-primary follow-btn ${isFollowing ? 'following' : ''}`}
                                    onClick={handleFollow}
                                >
                                    {isFollowing ? 'Takipten Çık' : 'Takip Et'}
                                </button>
                                <button className="btn-secondary message-btn" onClick={handleMessage}>
                                    Mesaj
                                </button>
                            </>
                        )}
                    </div>

                    <div className="profile-text-info">
                        <h1 className="profile-fullname">{profileUser.username}</h1>
                        <span className="profile-username">@{profileUser.username}</span>

                        {profileUser.bio && <p className="profile-bio">{profileUser.bio}</p>}

                        <div className="profile-meta">
                            {profileUser.email && (
                                <span><FaLink /> {profileUser.email}</span>
                            )}
                        </div>

                        <div className="profile-stats">
                            <div className="stat-item">
                                <strong>{userPosts.length}</strong>
                                <span>Gönderi</span>
                            </div>
                            <div className="stat-item">
                                <strong>{profileUser.followers || 0}</strong>
                                <span>Takipçi</span>
                            </div>
                            <div className="stat-item">
                                <strong>{profileUser.following || 0}</strong>
                                <span>Takip</span>
                            </div>
                            <div className="stat-item">
                                <strong>{profileUser.karma || 0}</strong>
                                <span>Karma</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Tabs */}
                <div className="profile-tabs">
                    <button
                        className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('posts')}
                    >
                        Gönderiler
                    </button>
                    <button
                        className={`tab ${activeTab === 'media' ? 'active' : ''}`}
                        onClick={() => setActiveTab('media')}
                    >
                        Medya
                    </button>
                    <button
                        className={`tab ${activeTab === 'likes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('likes')}
                    >
                        Beğenilenler
                    </button>
                </div>

                {/* Posts List */}
                {activeTab === 'posts' && (
                    <div className="profile-posts-list">
                        {userPosts.length > 0 ? (
                            userPosts.map(post => (
                                <PostCard key={post.id} post={post} />
                            ))
                        ) : (
                            <div className="empty-state">
                                <h3>Henüz gönderi yok</h3>
                                <p>Bu kullanıcı henüz bir şey paylaşmadı.</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'media' && (
                    <div className="empty-state">
                        <h3>Medya gönderileri</h3>
                        <p>Yakında eklenecek!</p>
                    </div>
                )}

                {activeTab === 'likes' && (
                    <div className="empty-state">
                        <h3>Beğenilen gönderiler</h3>
                        <p>Yakında eklenecek!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfilePage
