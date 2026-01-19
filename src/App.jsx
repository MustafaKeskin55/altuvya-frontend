import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import FeedPage from './pages/FeedPage'
import SocialHubPage from './pages/SocialHubPage'
import GroupsPage from './pages/GroupsPage'
import GroupDetailPage from './pages/GroupDetailPage'
import ProfilePage from './pages/ProfilePage'

function App() {
    const { isAuthenticated } = useSelector((state) => state.auth)

    return (
        <div className="app">
            <Routes>
                <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/feed" />} />
                <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/feed" />} />

                <Route path="/feed" element={isAuthenticated ? <FeedPage /> : <Navigate to="/login" />} />
                <Route path="/social" element={isAuthenticated ? <SocialHubPage /> : <Navigate to="/login" />} />
                <Route path="/groups" element={<Navigate to="/social" />} />
                <Route path="/groups/:id" element={isAuthenticated ? <GroupDetailPage /> : <Navigate to="/login" />} />
                <Route path="/profile/:username" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />

                <Route path="/" element={<Navigate to={isAuthenticated ? "/feed" : "/login"} />} />
            </Routes>
        </div>
    )
}

export default App
