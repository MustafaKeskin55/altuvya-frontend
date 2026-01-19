import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { FaComments, FaUsers, FaPaperPlane, FaPhone, FaVideo, FaTimes } from 'react-icons/fa'
import { groupApi } from '../services/apiService'
import { setGroups } from '../store/slices/groupSlice'
import './SocialHubPage.css'
import './GroupsPage.css' // Reuse groups styling
import '../components/ChatModal/styles.css' // Reuse chat styling

function SocialHubPage() {
    const [activeTab, setActiveTab] = useState('messages')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // --- GROUPS LOGIC ---
    const { groups } = useSelector((state) => state.groups)
    const [loadingGroups, setLoadingGroups] = useState(true)

    useEffect(() => {
        if (activeTab === 'groups') {
            loadGroups()
        }
    }, [activeTab])

    const loadGroups = async () => {
        try {
            setLoadingGroups(true)
            const data = await groupApi.getAllGroups()
            dispatch(setGroups(data))
        } catch (error) {
            console.error('Error loading groups:', error)
        } finally {
            setLoadingGroups(false)
        }
    }

    const handleGroupClick = (groupId) => {
        navigate(`/groups/${groupId}`)
    }

    // --- MESSAGES LOGIC ---
    const [activeChat, setActiveChat] = useState(null)
    const [messageInput, setMessageInput] = useState('')

    // Mock Chats (Same as ChatModal)
    const chats = [
        { id: 1, name: 'Ayşe Yılmaz', lastMsg: 'Yarın notları getirebilir misin?', time: '14:30', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse', unread: 2 },
        { id: 2, name: 'Proje Grubu', lastMsg: 'Ahmet: Dosyayı yükledim.', time: '12:15', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=PG', unread: 0 },
        { id: 3, name: 'Mehmet K.', lastMsg: 'Tamamdır, haberleşiriz.', time: 'Dün', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet', unread: 0 },
        { id: 4, name: 'Zeynep Tasarım', lastMsg: 'Logo renkleri nasıl olsun?', time: 'Dün', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynep', unread: 5 },
    ]

    const messages = [
        { id: 1, text: 'Selam, nasılsın?', sender: 'them', time: '14:28' },
        { id: 2, text: 'İyiyim teşekkürler, sen?', sender: 'me', time: '14:29' },
        { id: 3, text: 'Yarın notları getirebilir misin? Sınav için lazım da.', sender: 'them', time: '14:30' },
    ]

    return (
        <div className="social-hub-page">
            <Navbar />

            {/* Tab Header */}
            <div className="social-tabs-header">
                <div className="social-tabs-container">
                    <button
                        className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
                        onClick={() => setActiveTab('messages')}
                    >
                        <FaComments /> Mesajlar
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
                        onClick={() => setActiveTab('groups')}
                    >
                        <FaUsers /> Gruplar
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'messages' ? (
                    <div className="social-chat-view">
                        <div className="social-chat-container">
                            {/* Chat Sidebar */}
                            <div className={`social-chat-sidebar ${activeChat ? 'mobile-hidden' : ''}`}>
                                <div className="chat-list">
                                    {chats.map(chat => (
                                        <div key={chat.id} className="chat-item" onClick={() => setActiveChat(chat)}>
                                            <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
                                            <div className="chat-info">
                                                <div className="chat-name-row">
                                                    <span className="chat-name">{chat.name}</span>
                                                    <span className="chat-time">{chat.time}</span>
                                                </div>
                                                <div className="chat-msg-row">
                                                    <span className="chat-preview">{chat.lastMsg}</span>
                                                    {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Chat Main */}
                            <div className={`social-chat-main ${!activeChat ? 'mobile-hidden' : ''}`}>
                                {activeChat ? (
                                    <>
                                        <div className="chat-main-header">
                                            <button className="back-btn mobile-only" onClick={() => setActiveChat(null)}>←</button>
                                            <img src={activeChat.avatar} alt="active" className="header-avatar" />
                                            <div className="header-info">
                                                <h4>{activeChat.name}</h4>
                                                <span>Çevrimiçi</span>
                                            </div>
                                            <div className="header-actions">
                                                <button><FaPhone /></button>
                                                <button><FaVideo /></button>
                                            </div>
                                        </div>

                                        <div className="chat-messages">
                                            {messages.map(msg => (
                                                <div key={msg.id} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                                                    <p>{msg.text}</p>
                                                    <span className="msg-time">{msg.time}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="chat-input-area">
                                            <input
                                                type="text"
                                                placeholder="Bir mesaj yazın..."
                                                value={messageInput}
                                                onChange={(e) => setMessageInput(e.target.value)}
                                            />
                                            <button className="send-btn">
                                                <FaPaperPlane />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="no-chat-selected">
                                        <div className="empty-chat-icon">💬</div>
                                        <h3>Mesajlaşmaya Başla</h3>
                                        <p>Soldaki listeden bir sohbet seçin.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Groups View */
                    <div className="groups-container">
                        {loadingGroups ? (
                            <div className="loading">
                                <div className="spinner"></div>
                                <p>Yükleniyor...</p>
                            </div>
                        ) : (
                            <div className="groups-grid">
                                {groups && groups.map(group => (
                                    <div
                                        key={group.id}
                                        className="group-card slide-up"
                                        onClick={() => handleGroupClick(group.id)}
                                    >
                                        <div className="group-card-image">
                                            <img src={group.image || `https://source.unsplash.com/random/800x600?sig=${group.id}`} alt={group.name} />
                                            <span className="group-category-badge">
                                                {group.type === 'university' ? '🎓 Üniversite' :
                                                    group.type === 'interest' ? '💡 İlgi Alanı' :
                                                        group.type === 'department' ? '📚 Bölüm' : '⭐ Hobi'}
                                            </span>
                                        </div>

                                        <div className="group-card-content">
                                            <h3>{group.name}</h3>
                                            <p>{group.description || 'Açıklama yok'}</p>

                                            <div className="group-meta">
                                                <span className="group-members">
                                                    <FaUsers /> {group.memberCount || 0} üye
                                                </span>
                                                <button className="join-mini-btn">Katıl</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SocialHubPage
