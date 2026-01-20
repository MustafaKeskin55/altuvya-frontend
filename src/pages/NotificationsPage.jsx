import { useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import './NotificationsPage.css'

function NotificationsPage() {
    // Mock Notifications
    const [notifications] = useState([
        { id: 1, type: 'like', user: 'mert', action: 'gönderini beğendi', time: '2sa', unread: true, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
        { id: 2, type: 'follow', user: 'ayse.y', action: 'seni takip etmeye başladı', time: '4sa', unread: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { id: 3, type: 'comment', user: 'burak', action: 'gönderine yorum yaptı: "Harika!"', time: '1g', unread: false, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
        { id: 4, type: 'like', user: 'zeynep', action: 'gönderini beğendi', time: '2g', unread: false, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
    ])

    return (
        <div className="notifications-page">
            <div className="notifications-container">
                <h1 className="notifications-title">Bildirimler</h1>

                {/* Daily Summary Feature */}
                <div className="daily-summary-card">
                    <div className="summary-header">
                        <FaInfoCircle />
                        Günlük Özet (Beta)
                    </div>
                    <p className="summary-content">
                        Bugün kampüste <strong>3 yeni etkinlik</strong> paylaşıldı ve bölümünden <strong>12 kişi</strong> aktif. Ayrıca en çok etkileşim alan gönderin "Turan Modu" hakkında!
                    </p>
                </div>

                <div className="notification-list">
                    {notifications.map((noti) => (
                        <div key={noti.id} className={`notification-item ${noti.unread ? 'unread' : ''}`}>
                            <img src={noti.avatar} alt={noti.user} className="noti-avatar" />
                            <div className="noti-content">
                                <p className="noti-text">
                                    <strong>{noti.user}</strong> {noti.action}
                                </p>
                                <span className="noti-time">{noti.time}</span>
                            </div>
                            {noti.unread && <div className="noti-dot"></div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NotificationsPage
