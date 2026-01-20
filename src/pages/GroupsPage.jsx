import { useNavigate } from 'react-router-dom'
import { FaUsers } from 'react-icons/fa'
import './GroupsPage.css'

function GroupsPage() {
    const navigate = useNavigate()

    // Static data for JSX-only rendering
    const groups = [
        {
            id: 1,
            name: "Yazılım Topluluğu",
            description: "Kodlama, algoritmalar ve teknoloji üzerine sohbetler.",
            memberCount: 1250,
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
            type: "interest"
        },
        {
            id: 2,
            name: "Kampüs Etkinlikleri",
            description: "Üniversite içi konserler, festivaller ve buluşmalar.",
            memberCount: 3400,
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
            type: "university"
        },
        {
            id: 3,
            name: "Girişimcilik Kulübü",
            description: "Startup fikirleri, yatırım süreçleri ve networking.",
            memberCount: 890,
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
            type: "interest"
        },
        {
            id: 4,
            name: "Müzik Grubu",
            description: "Enstrüman çalanlar ve müzikseverler buraya!",
            memberCount: 560,
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
            type: "hobby"
        },
        {
            id: 5,
            name: "Bilgisayar Mühendisliği",
            description: "Ders notları, projeler ve bölüm duyuruları.",
            memberCount: 120,
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
            type: "department"
        },
        {
            id: 6,
            name: "Fotoğrafçılık",
            description: "Kadrajı sevenler, fotoğraflarını paylaşanlar.",
            memberCount: 430,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
            type: "hobby"
        }
    ]

    const handleGroupClick = (groupId) => {
        navigate(`/groups/${groupId}`)
    }

    return (
        <div className="groups-page" style={{ paddingBottom: '80px' }}>
            <div className="groups-container">
                <div className="groups-header">
                    <h1>Gruplar</h1>
                    <p>İlgilendiğin gruplara katıl</p>
                </div>

                <div className="groups-grid">
                    {groups.map(group => (
                        <div
                            key={group.id}
                            className="group-card slide-up"
                            onClick={() => handleGroupClick(group.id)}
                        >
                            <div className="group-card-image">
                                <img src={group.image} alt={group.name} />
                                <span className="group-category-badge">
                                    {group.type === 'university' ? '🎓 Üniversite' :
                                        group.type === 'interest' ? '💡 İlgi Alanı' :
                                            group.type === 'department' ? '📚 Bölüm' : '⭐ Hobi'}
                                </span>
                            </div>

                            <div className="group-card-content">
                                <h3>{group.name}</h3>
                                <p>{group.description}</p>

                                <div className="group-meta">
                                    <span className="group-members">
                                        <FaUsers /> {group.memberCount} üye
                                    </span>
                                    <button className="join-mini-btn">Katıl</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GroupsPage
