import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHome, FaBell, FaUser, FaSearch } from 'react-icons/fa'
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
            <Link to="/anasayfa" className={`nav-item ${isActive('/anasayfa') ? 'active' : ''}`}>
                <FaHome className="nav-icon" />
                <span className="nav-label">Akış</span>
            </Link>

            <Link to="/kesfet" className={`nav-item ${isActive('/kesfet') ? 'active' : ''}`}>
                <FaSearch className="nav-icon" />
                <span className="nav-label">Keşfet</span>
            </Link>

            {/* Turan Mode Portal - Center Action */}
            <div
                className={`nav-item center-action ${turanMode ? 'turan-active' : ''}`}
                onClick={handleTuranClick}
                title="Turan Dünyası"
            >
                <div className="turan-button">
                    <img src={turanIcon} alt="Turan" className="turan-icon-img" />
                </div>
            </div>

            <Link to="/notifications" className={`nav-item ${isActive('/notifications') ? 'active' : ''}`}>
                <FaBell className="nav-icon" />
                <span className="nav-label">Bildirimler</span>
            </Link>

            <Link
                to={user ? `/profile/${encodeURIComponent(user.username)}` : '/login'}
                className={`nav-item ${isActive(user ? `/profile/${encodeURIComponent(user.username)}` : '/login') ? 'active' : ''}`}
            >
                <FaUser className="nav-icon" />
                <span className="nav-label">Profil</span>
            </Link>
        </nav>
    )
}

export default BottomNav
