import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import FeedPage from './pages/FeedPage'
import GroupsPage from './pages/GroupsPage'
import MessagesPage from './pages/MessagesPage'
import TurkDunyasiPortal from './pages/TurkDunyasiPortal'
import GroupDetailPage from './pages/GroupDetailPage'
import ProfilePage from './pages/ProfilePage'
import ExplorePage from './pages/ExplorePage'
import NotificationsPage from './pages/NotificationsPage'
import BottomNav from './components/BottomNav'
import ComposeModal from './components/ComposeModal'

function App() {
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector((state) => state.auth)
    const [isComposeOpen, setIsComposeOpen] = useState(false)

    return (
        <div className="app">
            <Routes>
                <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/anasayfa" />} />
                <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/anasayfa" />} />

                <Route path="/anasayfa" element={isAuthenticated ? <FeedPage /> : <Navigate to="/login" />} />
                <Route path="/kesfet" element={isAuthenticated ? <ExplorePage /> : <Navigate to="/login" />} />
                <Route path="/notifications" element={isAuthenticated ? <NotificationsPage /> : <Navigate to="/login" />} />
                <Route path="/portal" element={isAuthenticated ? <TurkDunyasiPortal /> : <Navigate to="/login" />} />
                <Route path="/messages" element={isAuthenticated ? <MessagesPage /> : <Navigate to="/login" />} />
                <Route path="/groups" element={isAuthenticated ? <GroupsPage /> : <Navigate to="/login" />} />
                <Route path="/social" element={<Navigate to="/messages" />} />
                <Route path="/groups/:id" element={isAuthenticated ? <GroupDetailPage /> : <Navigate to="/login" />} />
                <Route path="/profile/:username" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />

                <Route path="/" element={<Navigate to={isAuthenticated ? "/anasayfa" : "/login"} />} />
            </Routes>

            {isAuthenticated && <BottomNav />}

            <ComposeModal
                isOpen={isComposeOpen}
                onClose={() => setIsComposeOpen(false)}
            />
        </div>
    )
}

export default App
