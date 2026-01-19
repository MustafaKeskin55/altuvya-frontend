import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice'
import { authApi } from '../services/apiService'
import './AuthPages.css'

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        university: '',
        department: '',
        interests: ''
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
            const interestsArray = formData.interests.split(',').map(i => i.trim()).filter(i => i)

            const response = await authApi.register({
                ...formData,
                interests: interestsArray
            })

            dispatch(loginSuccess({
                user: {
                    userId: response.userId,
                    username: response.username
                },
                token: response.token
            }))
            navigate('/feed')
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Kayıt başarısız'
            setError(errorMsg)
            dispatch(loginFailure(errorMsg))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container fade-in">
                <div className="auth-logo">
                    <h1>Altuvya</h1>
                    <p>Hesap oluştur ve başla</p>
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="email@universite.edu.tr"
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
                            minLength="6"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="university">Üniversite</label>
                        <input
                            type="text"
                            id="university"
                            name="university"
                            className="input"
                            value={formData.university}
                            onChange={handleChange}
                            placeholder="İstanbul Teknik Üniversitesi"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="department">Bölüm</label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            className="input"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="Bilgisayar Mühendisliği"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="interests">İlgi Alanları (virgülle ayırın)</label>
                        <input
                            type="text"
                            id="interests"
                            name="interests"
                            className="input"
                            value={formData.interests}
                            onChange={handleChange}
                            placeholder="yazılım, müzik, spor"
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
                    </button>
                </form>

                <div className="auth-footer">
                    Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
