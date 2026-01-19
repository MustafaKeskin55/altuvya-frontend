import { useState, useEffect } from 'react'
import { FaPlus, FaTimes, FaHeart, FaPaperPlane } from 'react-icons/fa'
import { postApi } from '../../services/apiService'
import '../../pages/FeedPage.css'

function StoriesBar() {
    // State for story interactions
    const [isPaused, setIsPaused] = useState(false)
    const [isHolding, setIsHolding] = useState(false)
    const [stories, setStories] = useState([])
    const [seenStories, setSeenStories] = useState(() => {
        const saved = localStorage.getItem('seenStories')
        return saved ? JSON.parse(saved) : []
    })

    const [selectedStory, setSelectedStory] = useState(null)
    const [progress, setProgress] = useState(0)

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    // Fetch stories from API
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const data = await postApi.getStories()
                setStories(Array.isArray(data) ? data : [])
                setError(null)
            } catch (error) {
                console.error('Error fetching stories:', error)
                setError(error.message)
                setStories([])
            } finally {
                setLoading(false)
            }
        }
        fetchStories()
    }, [])

    // Mark story as seen when opened or completed
    useEffect(() => {
        if (selectedStory && Array.isArray(seenStories) && !seenStories.includes(selectedStory.id)) {
            const newSeen = [...seenStories, selectedStory.id]
            setSeenStories(newSeen)
            localStorage.setItem('seenStories', JSON.stringify(newSeen))
        }
    }, [selectedStory, seenStories])

    const openStory = (story) => {
        setSelectedStory(story)
        setProgress(0)
        setIsPaused(false)
    }

    const closeStory = () => {
        setSelectedStory(null)
        setProgress(0)
        setIsPaused(false)
        setIsHolding(false)
    }

    // Navigation Logic
    const nextStory = () => {
        if (!selectedStory) return
        const currentIndex = stories.findIndex(s => s.id === selectedStory.id)
        if (currentIndex < stories.length - 1) {
            openStory(stories[currentIndex + 1])
        } else {
            closeStory()
        }
    }

    const prevStory = () => {
        if (!selectedStory) return
        const currentIndex = stories.findIndex(s => s.id === selectedStory.id)
        if (currentIndex > 0) {
            openStory(stories[currentIndex - 1])
        } else {
            // Restart current story if it's the first one
            setProgress(0)
        }
    }

    // Interaction Handlers (Instagram Style)
    const handlePointerDown = (e) => {
        // Only pause if clicking/touching the main content area (not controls)
        if (e.target.closest('.story-main-image') || e.target.closest('.story-image-container')) {
            setIsHolding(true)
            setIsPaused(true)
        }
    }

    const handlePointerUp = (e) => {
        if (!isHolding) return // If not holding, ignore

        setIsHolding(false)
        setIsPaused(false)

        // Calculate tap zones for navigation
        // Get width of container
        const container = e.currentTarget
        const rect = container.getBoundingClientRect()
        const x = e.clientX - rect.left // x position within the element.
        const width = rect.width

        // Left 30% -> Previous
        if (x < width * 0.3) {
            prevStory()
        }
        // Right 30% -> Next
        else if (x > width * 0.7) {
            nextStory()
        }
        // Middle -> Just pause/resume (already handled by hold logic, no nav)
    }

    const handlePointerLeave = () => {
        if (isHolding) {
            setIsHolding(false)
            setIsPaused(false)
        }
    }

    // Timer Logic - 5 seconds per story
    useEffect(() => {
        let interval;
        if (selectedStory && !isPaused && !isHolding) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        nextStory() // Auto advance to next story
                        return 0
                    }
                    return prev + 1 // 50ms * 1 = 5000ms (5 seconds) total duration
                })
            }, 50)
        }
        return () => clearInterval(interval)
    }, [selectedStory, isPaused, isHolding])

    const handleMessageFocus = () => setIsPaused(true)
    const handleMessageBlur = () => setIsPaused(false)

    // Like Logic
    const [likedStories, setLikedStories] = useState([])

    const toggleLike = (e) => {
        e.stopPropagation()
        if (!selectedStory) return

        if (likedStories.includes(selectedStory.id)) {
            setLikedStories(prev => prev.filter(id => id !== selectedStory.id))
        } else {
            setLikedStories(prev => [...prev, selectedStory.id])
        }
    }

    const isLiked = selectedStory && likedStories.includes(selectedStory.id)

    if (error) return <div className="stories-error">Hikayeler yüklenemedi</div>
    if (loading) return <div className="stories-loading">Yükleniyor...</div>

    return (
        <>
            <div className="stories-container card-glass">
                <div className="stories-scroll">
                    {/* My Story Node */}
                    <div className="story-node my-story">
                        <div className="story-avatar-wrapper">
                            <img
                                src="https://i.pravatar.cc/150?u=1"
                                alt="Hikayen"
                                className="story-avatar"
                            />
                            <div className="add-story-btn">
                                <FaPlus size={10} color="white" />
                            </div>
                        </div>
                        <span className="story-username">Hikayen</span>
                    </div>

                    {/* Other Stories */}
                    {Array.isArray(stories) && stories.map(story => {
                        const isSeen = Array.isArray(seenStories) && seenStories.includes(story.id)
                        return (
                            <div
                                key={story.id}
                                className={`story-node ${isSeen ? 'seen' : 'new'}`}
                                onClick={() => openStory(story)}
                            >
                                <div className={`story-avatar-wrapper ${isSeen ? 'seen-ring' : 'new-ring'}`}>
                                    <img
                                        src={story.avatar}
                                        alt={story.username}
                                        className="story-avatar"
                                    />
                                </div>
                                <span className="story-username">
                                    {story.username.length > 10 ? story.username.slice(0, 8) + '...' : story.username}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* FULL SCREEN STORY VIEWER OVERLAY */}
            {selectedStory && (
                <div className="story-viewer-overlay fade-in">
                    <div
                        className="story-content-wrapper"
                        onPointerDown={handlePointerDown}
                        onPointerUp={handlePointerUp}
                        onPointerLeave={handlePointerLeave}
                    >
                        {/* Progress Bar */}
                        <div className="story-progress-container">
                            <div className="story-progress-bar">
                                <div
                                    className="story-progress-fill"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Header */}
                        <div className="story-header">
                            <div className="story-user-details">
                                <img src={selectedStory.avatar} alt="user" className="story-header-avatar" />
                                <span className="story-header-username">{selectedStory.username}</span>
                                <span className="story-time">
                                    {new Date(selectedStory.createdAt).getHours()}:{String(new Date(selectedStory.createdAt).getMinutes()).padStart(2, '0')}
                                </span>
                            </div>
                            <button className="story-close-btn" onClick={(e) => { e.stopPropagation(); closeStory(); }}>
                                <FaTimes />
                            </button>
                        </div>

                        {/* Main Image */}
                        <div className="story-image-container">
                            <img src={selectedStory.contentUrl} alt="Story" className="story-main-image" />
                        </div>

                        {/* Footer */}
                        <div className="story-footer" onPointerDown={(e) => e.stopPropagation()}>
                            <div className="story-reply-input">
                                <input
                                    type="text"
                                    placeholder={`Metin...`}
                                    onFocus={handleMessageFocus}
                                    onBlur={handleMessageBlur}
                                />
                            </div>
                            <button className="story-like-btn" onClick={toggleLike}>
                                <FaHeart color={isLiked ? "#ff3040" : "white"} />
                            </button>
                            <button className="story-send-btn">
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default StoriesBar
