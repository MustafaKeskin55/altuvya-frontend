# Altuvya Frontend

Premium sosyal medya platformu frontend - React ile geliştirilmiştir.

## Teknolojiler

- React 18
- Redux Toolkit
- React Router v6
- Axios
- SockJS + STOMP (WebSocket)
- Vanilla CSS
- Vite

## Özellikler

🎨 **Premium Dark Theme** - Glassmorphism ve gradient tasarım
💡 **Karma Sistemi** - Reddit tarzı upvote/downvote
😊 **Emoji Reactions** - Hızlı tepki verme
🕶️ **Anonim Mod** - Anonim paylaşım yapma
⭐ **Spotlight** - En iyi içerikler öne çıkar
📱 **Mobil-First** - Responsive tasarım
🔐 **JWT Auth** - Güvenli kimlik doğrulama

## Kurulum

### Gereksinimler

- Node.js 16+
- npm veya yarn

### Adımlar

1. **Bağımlılıkları yükleyin:**
```bash
cd altuvya-frontend
npm install
```

2. **Development server başlatın:**
```bash
npm run dev
```

3. **Tarayıcıda açın:**
```
http://localhost:5173
```

## Proje Yapısı

```
src/
├── components/         # Yeniden kullanılabilir componentler
│   ├── Navbar.jsx
│   └── PostCard.jsx
├── pages/             # Sayfalar
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── FeedPage.jsx
│   ├── GroupsPage.jsx
│   ├── GroupDetailPage.jsx
│   └── ProfilePage.jsx
├── services/          # API servisleri
│   ├── api.js
│   └── apiService.js
├── store/             # Redux store
│   ├── store.js
│   └── slices/
│       ├── authSlice.js
│       ├── userSlice.js
│       ├── groupSlice.js
│       └── postSlice.js
├── App.jsx            # Ana uygulama
├── main.jsx           # Entry point
└── index.css          # Global CSS
```

## Önemli Notlar

- Backend'in `http://localhost:8080` adresinde çalışıyor olması gerekir
- WebSocket bağlantısı backend URL'sine proxy ile yapılır
- Tüm API istekleri otomatik olarak JWT token ile yapılır (interceptor)

## Build

Production build oluşturmak için:

```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulur.

## Lisans

MIT
