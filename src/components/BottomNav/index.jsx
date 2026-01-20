import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHome, FaBell, FaUser, FaSearch, FaComment, FaUsers } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import turanIcon from '../../images/icon.png'
import './styles.css'

function BottomNav() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { turanMode } = useSelector(state => state.ui)

    const isActive = (path) => location.pathname === path

    const handleTuranClick = () => {
        navigate('/portal')
    }

    return (
        <nav className="bottom-nav">
            {/* 1. Akış */}
            <Link to="/anasayfa" className={`nav-item ${isActive('/anasayfa') ? 'active' : ''}`}>
                <FaHome className="nav-icon" />
            </Link>

            {/* 2. Keşfet */}
            <Link to="/kesfet" className={`nav-item ${isActive('/kesfet') ? 'active' : ''}`}>
                <FaSearch className="nav-icon" />
            </Link>

            {/* 3. Mesajlar (Right of Explore) */}
            <Link to="/messages" className={`nav-item ${isActive('/messages') ? 'active' : ''}`}>
                <FaComment className="nav-icon" />
            </Link>

            {/* 4. Turan Portal - Center Action */}
            <div
                className={`nav-item center-action ${turanMode ? 'turan-active' : ''}`}
                onClick={handleTuranClick}
                title="Turan Dünyası"
            >
                <div className="turan-button">
                    <img src={turanIcon} alt="Turan" className="turan-icon-img" />
                </div>
            </div>

            {/* 5. Gruplar (Right of Turan) */}
            <Link to="/groups" className={`nav-item ${isActive('/groups') ? 'active' : ''}`}>
                <FaUsers className="nav-icon" />
            </Link>

            {/* 6. Bildirimler */}
            <Link to="/notifications" className={`nav-item ${isActive('/notifications') ? 'active' : ''}`}>
                <FaBell className="nav-icon" />
            </Link>

            {/* 7. Profil */}
            <Link
                to={user ? `/profile/${encodeURIComponent(user.username)}` : '/login'}
                className={`nav-item ${isActive(user ? `/profile/${encodeURIComponent(user.username)}` : '/login') ? 'active' : ''}`}
            >
                <FaUser className="nav-icon" />
            </Link>
        </nav>
    )
}

export default BottomNav
