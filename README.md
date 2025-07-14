# 🔗 LinkShrinker - URL Shortener App

A user-friendly, password-protected URL Shortener web application built with **React (TypeScript)** and **Vite**, designed as part of a campus hiring evaluation. This frontend-only application simulates the behavior of a full-stack URL shortener using mock data and advanced UI components.

## 🚀 Features

- 🔐 Password-protected shortened links
- 📊 Click analytics tracking
- 📋 Copy-to-clipboard functionality
- ✅ Visual feedback on interactions
- 🧾 List of created links with status and metadata
- 🧠 Intelligent UX handling (loading spinners, error states)
- 🌐 Mobile-responsive UI

---

## 📁 Project Structure

frontend/
├── public/
├── src/
│ ├── components/
│ │ ├── Navbar.tsx
│ │ ├── UrlShortener.tsx
│ │ ├── UrlList.tsx
│ │ ├── PasswordModal.tsx
│ │ └── UrlAccess.tsx
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
├── package.json
├── tsconfig.json
└── vite.config.ts

yaml
Copy
Edit

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js (>= 18)
- npm (>= 9)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/url-shortener-frontend.git

# Navigate into the project folder
cd url-shortener-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
🔧 Configuration
You can set environment variables (e.g., backend URL) in a .env file:

ini
Copy
Edit
VITE_BACKEND_URL=http://localhost:5000
Update API endpoints in components accordingly to match backend behavior.

🧪 Testing the App
This frontend simulates behavior using in-memory state. For full integration:

Connect to a real backend with API routes like:

POST /api/shorten

GET /api/:shortUrl

POST /api/verify-password

📸 Screenshots
Home (URL Input)	Shortened Link	Password Modal

🛠 Technologies Used
React (TypeScript)

Vite

Material UI Icons

Custom SVG Icons & Styling

Clipboard API

Local state management

✍️ Author
Nitish Pandey
🔗 LinkedIn
📧 Email
