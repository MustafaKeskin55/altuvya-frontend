import { useState } from 'react'
import { FaTimes, FaPaperPlane, FaPhone, FaVideo, FaEllipsisV } from 'react-icons/fa'
import './styles.css'

function ChatModal({ isOpen, onClose }) {
    if (!isOpen) return null

    const [activeChat, setActiveChat] = useState(null)
    const [messageInput, setMessageInput] = useState('')

    // Mock Chats
    const chats = [
        { id: 1, name: 'Ayşe Yılmaz', lastMsg: 'Yarın notları getirebilir misin?', time: '14:30', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse', unread: 2 },
        { id: 2, name: 'Proje Grubu', lastMsg: 'Ahmet: Dosyayı yükledim.', time: '12:15', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=PG', unread: 0 },
        { id: 3, name: 'Mehmet K.', lastMsg: 'Tamamdır, haberleşiriz.', time: 'Dün', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet', unread: 0 },
        { id: 4, name: 'Zeynep Tasarım', lastMsg: 'Logo renkleri nasıl olsun?', time: 'Dün', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynep', unread: 5 },
    ]

    // Mock Messages for Active Chat
    const messages = [
        { id: 1, text: 'Selam, nasılsın?', sender: 'them', time: '14:28' },
        { id: 2, text: 'İyiyim teşekkürler, sen?', sender: 'me', time: '14:29' },
        { id: 3, text: 'Yarın notları getirebilir misin? Sınav için lazım da.', sender: 'them', time: '14:30' },
    ]

    return (
        <div className="chat-modal-overlay">
            <div className="chat-window card-glass">
                {/* Sidebar - Chat List */}
                <div className={`chat-sidebar ${activeChat ? 'mobile-hidden' : ''}`}>
                    <div className="chat-header">
                        <h3>Mesajlar</h3>
                        <div className="chat-actions">
                            <button onClick={onClose} className="close-btn mobile-only"><FaTimes /></button>
                        </div>
                    </div>
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

                {/* Main Chat Area */}
                <div className={`chat-main ${!activeChat ? 'mobile-hidden' : ''}`}>
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
                                    <button onClick={onClose}><FaTimes /></button>
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
                            <button className="close-btn-desktop" onClick={onClose}><FaTimes /> Kapat</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatModal
