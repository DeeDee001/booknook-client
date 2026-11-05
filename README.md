# 📚 BookNook – Online Community Library

> A warm, community-driven online library built on the philosophy: **"Add a book, borrow a book, return a book."**

**Live Website**: [https://booknook-client-dee-dee2.vercel.app](https://booknook-client-dee-dee2.vercel.app)  
**Backend API**: [https://booknook-server-dee-dee2.vercel.app](https://booknook-server-dee-dee2.vercel.app)

---

## 📖 About The Project

**BookNook** is a modern full-stack web application designed to make reading and community sharing simple, enjoyable, and accessible. It connects readers together by allowing them to discover literary titles across various genres, borrow books with a click, schedule return dates, and contribute their own cherished books to the library shelves.

Whether you're searching for your next weekend read, looking to lend your books to fellow readers, or keeping track of your borrowed titles, BookNook provides a seamless, clutter-free reading haven with instant inventory tracking and a fully responsive experience across mobile and desktop.

---

## ✨ Features

- **Dynamic Book Catalog & Discovery**:
  - Browse books with real-time text search (by title or author).
  - Filter books easily by genre/category (*Fiction, Science, History, Kids, and others*).
  - View real-time availability badges and remaining stock copies.

- **Seamless Borrow & Return System**:
  - **One-Click Borrowing**: Readers can pick a return date and borrow instantly.
  - **Automatic Inventory Updates**: Available copies decrement automatically when borrowed (`-1`) and restore when returned (`+1`).
  - **Duplicate Borrow Guard**: Prevents a reader from borrowing the same book multiple times simultaneously.
  - **My Borrows Dashboard**: View all currently borrowed books and return them with a single click.

- **Personal Bookshelf & Contributor Management (CRUD)**:
  - Add new books to the library with cover image, category, copies, and description.
  - **My Books Page**: Manage titles you have contributed to the library.
  - Edit book metadata in real-time using clean interactive modals.
  - Delete books safely with accessible custom confirmation dialogs (no native browser popups).

- **Secure Authentication & User Experience**:
  - Email & Password registration and login powered by **BetterAuth**.
  - **Google Social Sign-in** for fast 1-click access.
  - Real-time password validation indicators (*Uppercase, Lowercase, Minimum 6 characters*).
  - Persistent user sessions across page reloads without unwanted redirects.

- **Responsive & Modern UI**:
  - Interactive hero banner carousel powered by **Swiper.js**.
  - **Dark & Light Mode** toggle with persistent theme preference.
  - Fully mobile-responsive layout optimized for smartphones, tablets, and desktop screens.
  - Toast feedback notifications powered by **Sonner**.

---

## 🛠️ Technologies Used

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Theme Support**: [next-themes](https://github.com/pacocoursey/next-themes) (Dark & Light Mode)

### UI & Utilities
- **Slider**: [Swiper.js](https://swiperjs.com/) (Hero Banner Carousel)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) (Toast notifications)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Authentication & Database Integration
- **Auth Provider**: [BetterAuth](https://www.better-auth.com/) with MongoDB Adapter & JWT sessions
- **Database**: [MongoDB](https://www.mongodb.com/) (Atlas)
- **Backend API**: Express.js REST API with CORS & token verification

---

## 🚀 How to Run Locally

Follow these steps to set up and run the client-side application locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.17.0 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A running instance of the BookNook Express backend or the deployed backend API URL

### 1. Clone the Repository

```bash
git clone https://github.com/DeeDee001/booknook-client.git
cd booknook-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root of the project:

```bash
touch .env.local
```

Add the following environment variables to `.env.local`:

```env
# Backend API URL (Local or Deployed Express Server)
NEXT_PUBLIC_API_URL=http://localhost:5000

# Next.js Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# BetterAuth Configuration
BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000

# MongoDB Connection String (for BetterAuth user & session storage)
MONGODB_URI=your_mongodb_connection_string_here

# (Optional) Google OAuth Credentials for Social Login
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Open the Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📄 License & Credits

Developed with ❤️ by **DeeDee** for book lovers everywhere.
