import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { groupApi } from '../services/apiService'
import { setGroups } from '../store/slices/groupSlice'
import { FaUsers } from 'react-icons/fa'
import './GroupsPage.css'

function GroupsPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { groups } = useSelector((state) => state.groups)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadGroups()
    }, [])

    const loadGroups = async () => {
        try {
            setLoading(true)
            // Fetch groups from JSON API
            const data = await groupApi.getAllGroups()
            dispatch(setGroups(data))
        } catch (error) {
            console.error('Error loading groups:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleGroupClick = (groupId) => {
        navigate(`/groups/${groupId}`)
    }

    return (
        <div className="groups-page">
            <Navbar />

            <div className="groups-container">
                <div className="groups-header">
                    <h1>Gruplar</h1>
                    <p>İlgilendiğin gruplara katıl</p>
                </div>

                {loading ? (
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
        </div>
    )
}

export default GroupsPage
