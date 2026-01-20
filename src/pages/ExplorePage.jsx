import { useSelector } from 'react-redux'
import MoodSelector from '../components/MoodSelector'
import './ExplorePage.css'

function ExplorePage() {
    const { turanMode } = useSelector(state => state.ui || {})
    const [activeMood, setActiveMood] = useState('all')

    // Mock Grid Data
    const exploreItems = [
        { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400', large: true }, // Large item
        { id: 2, type: 'video', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400', large: false },
        { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', large: false },
        { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400', large: false },
        { id: 5, type: 'album', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400', large: false },
        { id: 6, type: 'image', src: 'https://images.unsplash.com/photo-1501854140884-074cf2b21d25?w=400', large: false },
        { id: 7, type: 'video', src: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=400', large: true }, // Large item
        { id: 8, type: 'image', src: 'https://images.unsplash.com/photo-1488161628813-99c974fc5b76?w=400', large: false },
        { id: 9, type: 'image', src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400', large: false },
        { id: 10, type: 'album', src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', large: false },
        { id: 11, type: 'image', src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', large: false },
        { id: 12, type: 'video', src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400', large: false },
    ]

    return (
        <div className="explore-page" style={{ paddingBottom: '80px' }}>
            <div className="explore-container">
                {/* Header: Search Only (Turan Toggle moved to BottomNav) */}
                <div className="explore-header">
                    <div className="search-bar-container">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Keşfet..."
                            className="search-input"
                        />
                    </div>
                </div>

                {/* Mood Selector (Moved from Feed) */}
                <div className="mood-section">
                    <MoodSelector activeMood={activeMood} onMoodChange={setActiveMood} />
                </div>

                {/* Masonry Grid */}
                <motion.div
                    className="explore-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {exploreItems.map((item) => (
                        <div
                            key={item.id}
                            className={`explore-item ${item.large ? 'large' : ''}`}
                        >
                            <img src={item.src} alt="Explore" className="explore-image" />
                            <div className="explore-type-icon">
                                {item.type === 'video' && <FaVideo />}
                                {item.type === 'album' && <FaClone />}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {turanMode && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="turan-mode-indicator"
                        style={{
                            textAlign: 'center',
                            marginTop: '20px',
                            padding: '10px',
                            background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
                            borderRadius: '12px',
                            color: 'white'
                        }}
                    >
                        <h3>🌍 Turan Modu Aktif</h3>
                        <p>Türk dünyasından içerikler burada gösterilecek.</p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default ExplorePage
