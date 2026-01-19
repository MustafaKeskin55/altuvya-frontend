import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { FaHome, FaUsers, FaUser, FaFacebookMessenger, FaSignOutAlt } from 'react-icons/fa'
import './styles.css'

function Navbar({ onChatClick }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/feed" className="navbar-logo">
                    Altuvya
                </Link>

                <ul className="navbar-menu">
                    <li>
                        <Link to="/feed" className="navbar-link">
                            <FaHome /> Feed
                        </Link>
                    </li>
                    <li>
                        <Link to="/social" className="navbar-link">
                            <FaFacebookMessenger /> Sohbetler
                        </Link>
                    </li>
                    {user && (
                        <li>
                            <Link to={`/profile/${user.username}`} className="navbar-link">
                                <FaUser /> Profil
                            </Link>
                        </li>
                    )}
                    <li>
                        <button onClick={handleLogout} className="navbar-link">
                            <FaSignOutAlt /> Çıkış
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
