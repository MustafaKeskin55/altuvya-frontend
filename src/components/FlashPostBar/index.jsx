import { FaPlus } from 'react-icons/fa'
import './styles.css'

function FlashPostBar() {
    // Mock data for Flash Posts (formerly Stories)
    const flashPosts = [
        { id: 1, user: 'mert', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
        { id: 2, user: 'ayse.y', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { id: 3, user: 'burak', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
        { id: 4, user: 'zeynep', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
        { id: 5, user: 'can', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    ]

    return (
        <div className="flash-post-bar">
            <div className="flash-post-container">
                <div className="add-flash-btn">
                    <FaPlus />
                </div>

                {flashPosts.map(post => (
                    <div key={post.id} className="flash-item">
                        <img src={post.avatar} alt={post.user} className="flash-avatar" />
                        <span className="flash-username">{post.user}</span>
                        <div className="flash-ring"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FlashPostBar
