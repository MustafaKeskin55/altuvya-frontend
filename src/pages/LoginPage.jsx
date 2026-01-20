import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { SiGoogle } from 'react-icons/si'
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice'
import { authApi } from '../services/apiService'
import './AuthPages.css'

function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        dispatch(loginStart())

        try {
            const response = await authApi.login(formData)
            dispatch(loginSuccess({
                user: {
                    userId: response.userId,
                    username: response.username
                },
                token: response.token
            }))
            navigate('/anasayfa')
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Giriş başarısız'
            setError(errorMsg)
            dispatch(loginFailure(errorMsg))
        } finally {
            setLoading(false)
        }
    }


    const handleDemoLogin = async () => {
        setLoading(true)
        // Demo login credentials
        const demoData = {
            username: 'demo_user',
            password: 'demo_password'
        }

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800))

            // For now, we'll try to login with these credentials
            // In a real app, you might have a specific endpoint or mock this entirely
            // If the backend doesn't have this user, we might need to handle it differently
            // But for now let's try to just set the form and submit, or simulate success

            dispatch(loginSuccess({
                user: {
                    userId: 999,
                    username: 'Demo Öğrenci'
                },
                token: 'demo-token-123'
            }))
            navigate('/anasayfa')
        } catch (err) {
            setError('Demo girişi başarısız')
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        // Simulation for now
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            alert('Google girişi yakında aktif olacak! (Bu bir demosu)')
        }, 1000)
    }

    return (
        <div className="auth-page">
            <div className="auth-container fade-in">
                <div className="auth-logo">
                    <h1>Altuvya</h1>
                    <p>Öğrenci sosyal platformu</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="username">Kullanıcı Adı</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="input"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="kullaniciadi"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Şifre</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </button>
                    <div className="auth-divider">
                        <span>veya</span>
                    </div>

                    <div className="social-login">
                        <button
                            type="button"
                            className="social-btn google-btn"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            <FcGoogle size={22} />
                            Google ile Giriş Yap
                        </button>

                        <button
                            type="button"
                            className="social-btn demo-btn"
                            onClick={handleDemoLogin}
                            disabled={loading}
                        >
                            <SiGoogle size={18} style={{ opacity: 0 }} /> {/* Spacer for alignment */}
                            Deneme Girişi
                        </button>
                    </div>
                </form>

                <div className="auth-footer">
                    Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
