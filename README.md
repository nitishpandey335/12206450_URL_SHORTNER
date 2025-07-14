# 🔗 LinkShrinker - Frontend-Only URL Shortener

A user-friendly, password-protected URL Shortener web application built with **React (TypeScript)** and **Vite**, developed as part of a campus hiring evaluation. This frontend-only application simulates a full URL shortening experience using in-memory data and interactive UI components.

---

## 🚀 Features

- 🔐 Password-protected short links
- 📊 Click analytics tracking (simulated)
- 📋 Copy-to-clipboard functionality
- ✅ Visual feedback on interactions (e.g., "Copied!")
- 📜 Display list of created links with metadata
- 🧠 Smart UX with loading spinners, error states
- 📱 Fully responsive design

---

## 📁 Folder Structure

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
Running App
After starting the dev server, open your browser and go to:

arduino
Copy
Edit
http://localhost:3000
💡 Usage
Enter any long URL to generate a short version.

(Optional) Add password protection.

View all shortened URLs in a list with click counts.

Use "Copy" button to copy the short URL easily.

If password protected, a modal will appear to unlock the URL.


🛠 Built With
React + TypeScript

Vite

CSS (custom)

Material UI Icons

Clipboard API

✍️ Author
Nitish Pandey
📧 Email: nitishkumarpandey05@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/nitishpandey335
