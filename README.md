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

## Vizyon & Misyon
**Vizyonumuz:** Dünyanın en özgün ve çok yönlü sosyal medya platformu olarak, Türk dünyasındaki öğrencileri ortak kültürel, akademik ve sosyal bir çatı altında birleştirmek. Geleceğin dijital kampüsü olmak.

**Misyonumuz:** 
- Üniversiteleri, kampüsleri ve gençleri tek dijital ağda buluşturmak.
- Instagram, X, Facebook ve WhatsApp’ın güçlü yanlarını tek çatı altında sunmak.
- Kültürel ve sosyal çeşitliliği destekleyen, global görünümlü ama kökleri güçlü bir marka yaratmak.
- Dil öğrenme, kültürel paylaşımlar ve topluluk odaklı yapılarla ortak kimlik bilincini güçlendirmek.

## Tasarım Dili
- **Estetik:** Minimalist, Premium, Glassmorphism
- **Renk Paleti:** Lacivert (#003466), Turuncu (#FFA500), Beyaz
- **Tipografi:** Modern, net ve okunabilir
- **Animasyon:** Yumuşak geçişler ve mikro hareketler

## Öne Çıkan Özellikler

🚀 **Flash Posts:** Hızlı ve etkileyici anlık paylaşımlar
🤖 **Dil Öğrenme Botu:** Kültürel etkileşimi artıran akıllı asistanlar
📡 **Yakın Çevre Radar:** Kampüs ve çevrendeki etkinlikleri keşfetme
🎮 **Oyunlaştırma:** Rozetler, ilerleme barları ve karma sistemi
⭕ **Live Circles:** Topluluklar içi canlı etkileşim alanları
🌍 **Türk Dünyası Portalı:** Özel içerikler ve kültürel bağlar

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
