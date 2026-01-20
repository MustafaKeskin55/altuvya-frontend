import './styles.css'

function MoodSelector({ activeMood, onMoodChange }) {
    const moods = [
        { id: 'all', label: 'Tümü', icon: '🌐' },
        { id: 'popular', label: 'Gündem', icon: '🔥' },
        { id: 'chill', label: 'Keyif', icon: '☕' },
        { id: 'learning', label: 'Ders', icon: '📚' },
        { id: 'party', label: 'Eğlence', icon: '🎉' },
        { id: 'sad', label: 'Moodsuz', icon: '🌧️' },
    ]

    return (
        <div className="mood-selector">
            {moods.map(mood => (
                <button
                    key={mood.id}
                    className={`mood-chip ${activeMood === mood.id ? 'active' : ''}`}
                    onClick={() => onMoodChange(mood.id)}
                >
                    <span className="mood-icon">{mood.icon}</span>
                    {mood.label}
                </button>
            ))}
        </div>
    )
}

export default MoodSelector
