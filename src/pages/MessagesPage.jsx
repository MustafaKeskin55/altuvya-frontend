import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPaperPlane, FaPhone, FaVideo } from 'react-icons/fa'
import { groupApi } from '../services/apiService'
import './MessagesPage.css'
import '../components/ChatModal/styles.css'

function MessagesPage() {
    const [chats, setChats] = useState([])
    const [activeChat, setActiveChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [messageInput, setMessageInput] = useState('')

    useEffect(() => {
        loadChats()
    }, [])

    const loadChats = async () => {
        try {
            const data = await groupApi.getAllChats?.() || []
            setChats(data)
        } catch (error) {
            console.error('Error loading chats:', error)
        }
    }

    useEffect(() => {
        if (activeChat) {
            loadMessages(activeChat.id)
        }
    }, [activeChat])

    const loadMessages = async (chatId) => {
        try {
            const data = await groupApi.getMessagesByChat?.(chatId) || []
            setMessages(data)
        } catch (error) {
            console.error('Error loading messages:', error)
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!messageInput.trim() || !activeChat) return

        try {
            const newMessage = {
                chatId: activeChat.id,
                text: messageInput,
                sender: 'me',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            setMessages([...messages, { id: Date.now(), ...newMessage }])
            setMessageInput('')
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }

    return (
        <div className="social-hub-page messages-page" style={{ paddingBottom: '80px' }}>

            <div className="messages-container-full">
                <div className="social-chat-view">
                    <div className="social-chat-container">
                        {/* Chat Sidebar */}
                        <div className={`social-chat-sidebar ${activeChat ? 'mobile-hidden' : ''}`}>
                            <div className="sidebar-header">
                                <h3>Mesajlar</h3>
                            </div>
                            <div className="chat-list">
                                {chats.map(chat => (
                                    <div key={chat.id} className={`chat-item ${activeChat?.id === chat.id ? 'active' : ''}`} onClick={() => setActiveChat(chat)}>
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

                                    <form className="chat-input-area" onSubmit={handleSendMessage}>
                                        <input
                                            type="text"
                                            placeholder="Bir mesaj yazın..."
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                        />
                                        <button className="send-btn" type="submit">
                                            <FaPaperPlane />
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="no-chat-selected">
                                    <div className="empty-chat-icon">💬</div>
                                    <h3>Mesajlaşmaya Başla</h3>
                                    <p>Sohbet etmek için bir kişi seçin.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagesPage
