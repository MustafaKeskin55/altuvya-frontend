import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { FaHome, FaUsers, FaUser, FaFacebookMessenger, FaSignOutAlt, FaEllipsisH, FaFlag } from 'react-icons/fa'
import './styles.css'

function Navbar({ onChatClick }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useSelector((state) => state.auth)
    const [isMoreOpen, setIsMoreOpen] = useState(false)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    const toggleMore = () => setIsMoreOpen(!isMoreOpen)

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/anasayfa" className="navbar-logo">
                    Altuvya
                </Link>

                <ul className="navbar-menu">
                    <li>
                        <Link to="/anasayfa" className={`navbar-link ${location.pathname === '/anasayfa' ? 'active' : ''}`}>
                            <FaHome /> <span>Anasayfa</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/portal" className={`navbar-link ${location.pathname === '/portal' ? 'active' : ''}`}>
                            <FaFlag /> <span>Türk Dünyası</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/messages" className={`navbar-link ${location.pathname === '/messages' ? 'active' : ''}`}>
                            <FaFacebookMessenger /> <span>Mesajlar</span>
                        </Link>
                    </li>
                    {user && (
                        <li>
                            <Link to={`/profile/${user.username}`} className={`navbar-link ${location.pathname.startsWith('/profile') ? 'active' : ''}`}>
                                <FaUser /> <span>Profil</span>
                            </Link>
                        </li>
                    )}
                    <li className="navbar-more-container">
                        <button className={`navbar-link more-trigger ${isMoreOpen ? 'active' : ''}`} onClick={toggleMore}>
                            <FaEllipsisH /> <span>Daha Fazla</span>
                        </button>

                        {isMoreOpen && (
                            <div className="more-dropdown card-glass slide-up">
                                <Link to="/groups" className="dropdown-item" onClick={() => setIsMoreOpen(false)}>
                                    <FaUsers /> Gruplar
                                </Link>
                                <Link to="/pages" className="dropdown-item" onClick={() => setIsMoreOpen(false)}>
                                    <FaFlag /> Sayfalar
                                </Link>
                                <div className="dropdown-divider"></div>
                                <button onClick={handleLogout} className="dropdown-item logout-item">
                                    <FaSignOutAlt /> Çıkış Yap
                                </button>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
