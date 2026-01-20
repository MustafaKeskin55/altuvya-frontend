import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaImage, FaVideo, FaBolt, FaPoll, FaGlobe } from 'react-icons/fa'
import './styles.css'

function ComposeModal({ isOpen, onClose }) {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                className="compose-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="compose-modal"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close-compose" onClick={onClose}>
                        <FaTimes />
                    </button>

                    <h2 style={{ color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>Ne Paylaşmak İstersin?</h2>

                    <div className="compose-options">
                        <div className="compose-opt-card" onClick={() => alert('Post paylaşıma yönlendiriliyor...')}>
                            <FaImage className="opt-icon" />
                            <span className="opt-label">Fotoğraf / Video</span>
                        </div>
                        <div className="compose-opt-card" onClick={() => alert('Flash Post paylaşıma yönlendiriliyor...')}>
                            <FaBolt className="opt-icon" />
                            <span className="opt-label">Flash Post</span>
                        </div>
                        <div className="compose-opt-card" onClick={() => alert('Metin paylaşıma yönlendiriliyor...')}>
                            <span style={{ fontSize: '2rem', color: 'var(--primary-color)', fontWeight: 800 }}>Aa</span>
                            <span className="opt-label">Metin</span>
                        </div>
                        <div className="compose-opt-card" onClick={() => alert('Anket paylaşıma yönlendiriliyor...')}>
                            <FaPoll className="opt-icon" />
                            <span className="opt-label">Anket</span>
                        </div>
                    </div>

                    <button className="turan-post-btn" onClick={() => alert('Turan Modu Postu hazırlanıyor...')}>
                        <FaGlobe /> Turan Modunda Paylaş
                    </button>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginTop: '1.5rem' }}>
                        Turan Modunda paylaşılan gönderiler tüm Türk Dünyası ağında eşzamanlı yayınlanır.
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ComposeModal
