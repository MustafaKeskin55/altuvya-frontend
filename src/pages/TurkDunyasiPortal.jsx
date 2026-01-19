import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaFlag, FaChevronRight } from 'react-icons/fa'
import './TurkDunyasiPortal.css'

function TurkDunyasiPortal() {
    const navigate = useNavigate()

    const handleExplore = () => {
        navigate('/anasayfa')
    }

    return (
        <div className="portal-page">
            <div className="portal-overlay"></div>

            {/* Animated Background Elements */}
            <div className="portal-bg-stars"></div>
            <div className="portal-nebula"></div>

            <motion.div
                className="portal-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <motion.div
                    className="portal-icon-wrapper"
                    animate={{
                        boxShadow: ["0 0 20px rgba(52, 152, 219, 0.3)", "0 0 50px rgba(52, 152, 219, 0.6)", "0 0 20px rgba(52, 152, 219, 0.3)"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <FaFlag className="portal-main-icon" />
                </motion.div>

                <motion.h1
                    className="portal-title"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Türk Dünyasına Adım At
                </motion.h1>

                <motion.p
                    className="portal-subtitle"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    Yeni bir dünyaya kapı açılıyor. Keşfetmeye ve paylaşmaya hazır mısın?
                </motion.p>

                <motion.div
                    className="portal-meta-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >
                    Kadim coğrafyalar, ortak kültür, tek bir platformda buluşuyor.
                </motion.div>

                <motion.button
                    className="portal-explore-btn"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 255, 255, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleExplore}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                >
                    Dünyayı Keşfet <FaChevronRight />
                </motion.button>
            </motion.div>

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="portal-particle"
                    animate={{
                        y: [-20, -100],
                        opacity: [0, 0.5, 0],
                        x: Math.random() * 100 - 50
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        bottom: "0"
                    }}
                />
            ))}
        </div>
    )
}

export default TurkDunyasiPortal
