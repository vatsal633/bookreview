# 📚 Book Review Platform

A full-stack MERN application where users can browse books, view detailed information, write and read reviews, and rate books.  
Built for the Full Stack Developer Assignment using **MongoDB, Express, React, Node.js**.

---

## 🛠️ Tech Stack

### Frontend:
- React.js + Vite
- React Router
- React Context API (for state management)
- Axios (API calls)
- Tailwind CSS (styling)

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose


## 📄 Features

### ✅ Core Features
- 🏠 Home Page with featured books
- 🔍 Book Listing Page with search and filter
- 📖 Individual Book Page with details, reviews, and average ratings
- 🧑‍💼 User Profile Page
- ✍️ Review Submission Form with star rating

### ⚙️ Backend API Routes
| Route | Method | Description |
|-------|--------|-------------|
| `/books` | GET | Get all books (supports pagination) |
| `/books/:id` | GET | Get individual book details |
| `/books` | POST | Add a new book (admin only) |
| `/reviews?bookId=xxx` | GET | Get reviews for a specific book |
| `/reviews` | POST | Submit a new review |
| `/users/:id` | GET | Get user profile |
| `/users/:id` | PUT | Update user profile |

### 💬 Bonus Feature
- ✨ AI-Powered Review Refinement using GPT (grammar fix + tone polish)

---

## 🧑‍💻 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-review-platform.git
cd book-review-platform

cd backend
npm install

PORT=3000
MONGO_URI=your_mongodb_connection_string

node server.js

cd frontend
npm install

VITE_BACKEND_URL=http://localhost:3000
