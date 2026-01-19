import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import { groupApi, postApi } from '../services/apiService'
import { FaUsers } from 'react-icons/fa'
import './FeedPage.css'

function GroupDetailPage() {
    const { id } = useParams()
    const [group, setGroup] = useState(null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadGroupData()
    }, [id])

    const loadGroupData = async () => {
        try {
            const groupData = await groupApi.getGroup(id)
            setGroup(groupData)

            const postsData = await postApi.getPostsByGroup(id)
            setPosts(postsData)
        } catch (error) {
            console.error('Error loading group:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleJoinGroup = async () => {
        try {
            await groupApi.joinGroup(id)
            setGroup({ ...group, memberCount: (group.memberCount || 0) + 1 })
        } catch (error) {
            console.error('Error joining group:', error)
        }
    }

    if (loading) {
        return (
            <div className="feed-page">
                <Navbar />
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Yükleniyor...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="feed-page">
            <Navbar />

            <div className="feed-container">
                {group && (
                    <>
                        <div className="feed-header" style={{ marginBottom: '2rem' }}>
                            <h1>{group.name}</h1>
                            <p>{group.description}</p>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
                                <span className="badge badge-primary">
                                    <FaUsers /> {group.memberCount || 0} üye
                                </span>
                                <button onClick={handleJoinGroup} className="btn btn-primary">
                                    Gruba Katıl
                                </button>
                            </div>
                        </div>

                        <div className="posts-list">
                            {posts.length > 0 ? (
                                posts.map(post => (
                                    <PostCard key={post.id} post={post} />
                                ))
                            ) : (
                                <div className="empty-state">
                                    <h3>Henüz paylaşım yok</h3>
                                    <p>Bu grupta ilk paylaşımı sen yap!</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default GroupDetailPage
