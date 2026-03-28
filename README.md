# 🚗 Rentic – Customer PWA (Car Rental Platform)

A high-performance, mobile-first Progressive Web App (PWA) that delivers a seamless and app-like car rental experience directly from the browser.

Rentic enables users to discover premium vehicles, book rentals effortlessly, and manage trips with a smooth, responsive UI built for modern devices.

---

## ✨ Key Features

### 📱 Mobile-First App Experience
- App-shell architecture for instant loading  
- Optimized 100dvh viewport handling (iOS + Android safe)  
- Smooth scrolling and touch-friendly UI  

### 📡 Progressive Web App (PWA)
- Offline-ready via Service Worker  
- Installable ("Add to Home Screen")  
- Fast caching & background updates  

### 🔍 Smart Vehicle Discovery
- Real-time search experience  
- Brand-based filtering  
- Horizontal scroll optimization  

### 📅 Booking & Trip Management
- Easy booking flow  
- Trip status tracking:
  - Active  
  - Completed  
  - Cancelled  
- Firebase Timestamp integration  

### 👤 Secure User Onboarding
- Firebase Authentication  
- Profile management  

### ⚡ Performance Focused
- Vite-powered lightning-fast dev environment  
- TypeScript for type safety  
- Optimized rendering  

---


## 🚀 Getting Started

### ✅ Prerequisites

- Node.js v24+  
- npm 
- Firebase Project  

---

### 📦 Installation

```bash
git clone https://github.com/nobinsj/rentic-pwa.git
cd rentic-pwa
npm install
```

---

### 🔐 Environment Variables

Create a `.env` file in the root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MSG_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

### ▶️ Run the App

```bash
npm run dev
```

---

### 📦 Build for Production

```bash
npm run build
```

---

## 📱 PWA Capabilities

- Installable on mobile & desktop  
- Offline support  
- Service Worker caching  
- Native-like experience  

---

## 🔥 Firebase Integration

- Authentication (Login / Register)  
- Firestore (Users, Cars, Bookings)  
- Real-time updates  
- Secure rules  

---

## 🎯 Future Enhancements

- Payment Integration (Stripe / Razorpay)  
- Location-based search (Maps)  
- Push Notifications  
- Vehicle availability calendar  

---

## 👨‍💻 Author

**Nobin S Johns**  
Frontend Engineer (React + TypeScript)

---

## 📄 License

MIT License
