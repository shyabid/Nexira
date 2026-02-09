# 👩‍💻 Nexira

> **Where talent meets opportunity** - A modern freelance job marketplace
> connecting skilled professionals with clients worldwide.

<div align="center">

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-4F46E5?style=for-the-badge&logoColor=white)](https://labora-7a232.web.app/)

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.5.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

## 📋 Overview

Nexira is a full-stack freelance job platform that enables users to post job
opportunities, browse available tasks, and accept projects. Built with modern
web technologies, it offers a seamless experience with real-time updates, secure
authentication, and an intuitive interface.

## ✨ Key Features

### 🎨 User Experience

- **Dark/Light Mode** - Seamless theme switching for comfortable viewing
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
  devices
- **Interactive Animations** - Smooth transitions with Lottie animations and
  Motion
- **Modern UI** - Clean interface built with Tailwind CSS and DaisyUI

### 🔐 Authentication & Security

- **Firebase Authentication** - Secure user registration and login
- **Google OAuth** - Quick sign-in with Google accounts
- **Protected Routes** - Private routes for authenticated users only
- **JWT Token Management** - Secure session handling

### 💼 Job Management

- **Post Jobs** - Create new job listings with detailed information
- **Browse Jobs** - View all available opportunities with filtering options
- **Job Details** - Access comprehensive information for each listing
- **Update & Delete** - Full CRUD operations for job owners
- **Accept Tasks** - Apply for jobs posted by other users
- **My Jobs** - Manage your posted jobs
- **Accepted Tasks** - Track jobs you've accepted

### 🛠️ Technical Features

- **Real-time Updates** - Dynamic data synchronization
- **API Integration** - RESTful API communication with Axios
- **Date Formatting** - Human-readable dates with date-fns
- **Toast Notifications** - User feedback with React Toastify
- **Sweet Alerts** - Beautiful confirmation dialogs
- **Image Sliders** - Engaging carousels with Swiper

## 🏗️ Tech Stack

### Frontend

- **React 19.1.1** - Modern UI library with latest features
- **React Router 7.9.5** - Client-side routing
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **DaisyUI 5.4.7** - Tailwind CSS component library
- **Vite 7.1.7** - Next-generation frontend tooling

### Backend Integration

- **Node.js & Express.js** - Server-side runtime and framework
- **MongoDB** - NoSQL database for data persistence
- **Axios 1.13.2** - HTTP client for API requests

### Authentication & Hosting

- **Firebase 12.5.0** - Authentication and hosting platform
- **Firebase Hosting** - Fast and secure web hosting

### UI/UX Libraries

- **Motion 12.23.24** - Animation library
- **Lottie React 2.4.1** - Lightweight animations
- **React Icons 5.5.0** - Icon library
- **Swiper 12.0.3** - Modern slider component
- **React Spinners 0.17.0** - Loading indicators
- **SweetAlert2 11.26.3** - Beautiful popup boxes

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- MongoDB database (for backend)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/CyberXCore/Nexira-client.git
   cd Nexira-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   VITE_APP_apiKey=your_firebase_api_key
   VITE_APP_authDomain=your_firebase_auth_domain
   VITE_APP_projectId=your_firebase_project_id
   VITE_APP_storageBucket=your_firebase_storage_bucket
   VITE_APP_messagingSenderId=your_firebase_messaging_sender_id
   VITE_APP_appId=your_firebase_app_id
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
Nexira-client/
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React contexts
│   ├── firebase/        # Firebase configuration
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components
│   ├── providers/       # Context providers
│   ├── routes/          # Route configuration
│   ├── utilities/       # Helper functions
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── lotties/             # Lottie animation files
├── public/              # Public assets
├── .env.local           # Environment variables
├── firebase.json        # Firebase configuration
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## 🎯 Core Pages

- **Homepage** - Landing page with featured jobs and categories
- **All Jobs** - Browse all available job listings
- **Job Details** - Detailed view of individual jobs
- **Add Job** - Create new job postings (authenticated)
- **My Jobs** - Manage your posted jobs (authenticated)
- **My Accepted Tasks** - View jobs you've accepted (authenticated)
- **Update Job** - Edit job details (authenticated)
- **Login/Register** - User authentication pages

## 🔒 Environment Variables

| Variable                     | Description                  |
| ---------------------------- | ---------------------------- |
| `VITE_APP_apiKey`            | Firebase API key             |
| `VITE_APP_authDomain`        | Firebase auth domain         |
| `VITE_APP_projectId`         | Firebase project ID          |
| `VITE_APP_storageBucket`     | Firebase storage bucket      |
| `VITE_APP_messagingSenderId` | Firebase messaging sender ID |
| `VITE_APP_appId`             | Firebase app ID              |

## 🌐 Deployment

The project is configured for Firebase Hosting:

```bash
npm run build
firebase deploy
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/CyberXCore">CyberXCore</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
