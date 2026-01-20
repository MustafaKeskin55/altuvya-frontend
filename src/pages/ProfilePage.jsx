import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
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

    const isOwnProfile = currentUser?.username === decodeURIComponent(username)

    useEffect(() => {
        const decodedUsername = decodeURIComponent(username)
        loadProfileData(decodedUsername)
    }, [username])

    const loadProfileData = async (targetUsername) => {
        try {
            setLoading(true)
            // Fetch user data from API
            const userData = await userApi.getUserByUsername(targetUsername)
            if (userData) {
                setProfileUser(userData)
            }

            // Fetch user's posts
            const allPosts = await postApi.getAllPosts()
            const filteredPosts = allPosts.filter(post => post.username === targetUsername)
            setUserPosts(filteredPosts)
        } catch (error) {
            console.error('Error loading profile:', error)
            setProfileUser(null)
        } finally {
            setLoading(false)
        }
    }

    const filteredContent = () => {
        if (activeTab === 'media') {
            return userPosts.filter(p => p.mediaUrl)
        }
        if (activeTab === 'text') {
            return userPosts.filter(p => !p.mediaUrl)
        }
        return userPosts
    }

    const handleFollow = () => {
        setIsFollowing(!isFollowing)
    }

    const handleMessage = () => {
        alert('Mesajlaşma özelliği yakında eklenecek!')
    }

    if (loading) {
        return (
            <div className="profile-page-wrapper">
                <div className="loading-container">
                    <motion.div
                        className="spinner"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    ></motion.div>
                    <p>Yükleniyor...</p>
                </div>
            </div>
        )
    }

    if (!profileUser) {
        return (
            <div className="profile-page-wrapper">
                <div className="empty-state">
                    <h3>Kullanıcı bulunamadı</h3>
                    <p>Aradığınız profil mevcut değil veya taşınmış olabilir.</p>
                </div>
            </div>
        )
    }

    const content = filteredContent()

    return (
        <motion.div
            className="profile-page-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="profile-content">
                {/* Banner */}
                <div className="profile-banner-container">
                    <img
                        src={profileUser.banner || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200"}
                        alt="Banner"
                        className="profile-banner"
                    />
                </div>

                {/* Header Info */}
                <div className="profile-header-section">
                    <motion.div
                        className="profile-avatar-container"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 15 }}
                    >
                        <img
                            src={profileUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileUser.username}`}
                            alt="Avatar"
                            className="profile-avatar-img"
                        />
                    </motion.div>

                    <div className="profile-actions">
                        {isOwnProfile ? (
                            <motion.button
                                className="btn-edit-profile"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaCog /> Düzenle
                            </motion.button>
                        ) : (
                            <>
                                <motion.button
                                    className={`btn-follow ${isFollowing ? 'following' : ''}`}
                                    onClick={handleFollow}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={false}
                                    animate={{
                                        backgroundColor: isFollowing ? 'rgba(255, 255, 255, 0.1)' : 'var(--primary-color)',
                                        color: isFollowing ? 'white' : 'white'
                                    }}
                                >
                                    {isFollowing ? 'Takipten Çık' : 'Takip Et'}
                                </motion.button>
                                <motion.button
                                    className="btn-msg"
                                    onClick={handleMessage}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Mesaj
                                </motion.button>
                            </>
                        )}
                    </div>

                    <div className="profile-text-info">
                        <h1 className="profile-fullname">{profileUser.username}</h1>
                        <span className="profile-username">@{profileUser.username}</span>

                        {profileUser.bio && <p className="profile-bio">{profileUser.bio}</p>}

                        <div className="profile-meta">
                            {profileUser.location && <span><FaMapMarkerAlt /> {profileUser.location}</span>}
                            <span><FaCalendarAlt /> Katıldı: Ocak 2024</span>
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
                        className={`tab ${activeTab === 'text' ? 'active' : ''}`}
                        onClick={() => setActiveTab('text')}
                    >
                        Metin
                    </button>
                    <button
                        className={`tab ${activeTab === 'career' ? 'active' : ''}`}
                        onClick={() => setActiveTab('career')}
                    >
                        CV/Kariyer
                    </button>
                </div>

                {/* Content Lists */}
                {activeTab !== 'career' ? (
                    <div className="profile-posts-list">
                        {content.length > 0 ? (
                            content.map(post => (
                                <PostCard key={post.id} post={post} />
                            ))
                        ) : (
                            <div className="empty-state">
                                <h3>Henüz içerik yok</h3>
                                <p>Bu sekmede gösterilecek bir şey bulunamadı.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="profile-career-section card-glass">
                        <h3>🎓 Öğrenci CV & Kariyer</h3>
                        <div className="cv-item">
                            <strong>Eğitim:</strong>
                            <p>Üniversite Öğrencisi @ Altuvya Kampüsü</p>
                        </div>
                        <div className="cv-item">
                            <strong>Bölüm:</strong>
                            <p>Bilgisayar Mühendisliği</p>
                        </div>
                        <div className="cv-item">
                            <strong>İlgi Alanları:</strong>
                            <p>Yazılım Geliştirme, Tasarım, Türk Dünyası</p>
                        </div>
                        <button className="btn-view-cv" style={{ marginTop: '1rem' }}>CV Görüntüle</button>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default ProfilePage
