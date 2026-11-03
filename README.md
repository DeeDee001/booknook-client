# BookNook – A Small Online Library

**Live Application URL**: [https://booknook-library.vercel.app](https://booknook-library.vercel.app) *(or your deployed production link)*

BookNook is a cozy, modern community web application designed around a timeless philosophy: **"Add a book, borrow a book, return a book."** It empowers book enthusiasts to explore diverse genres, contribute titles from their own collections, manage borrowing periods responsibly, and track reading milestones in an elegant single-page application experience.

---

## Key Website Features

- **Dynamic Catalog & Real-Time Stock Management**: Explore the entire library catalog with instant keyword search, genre filtering (Fiction, Science, History, Kids, Others), and sorting. Inventory decrement (`$inc: -1`) upon borrowing and restore (`$inc: +1`) upon return are tracked accurately in real time.
- **Robust Authentication & Protected Routes**: Powered by BetterAuth with MongoDB Adapter, featuring email/password sign-in with live uppercase/lowercase/length password validation badges, Google Social Login, and persistent sessions that never prematurely redirect users upon page reloads.
- **Interactive Swiper.js Banner & Engaging Home Layout**: Responsive multi-slide hero carousel with smooth transitions, showcasing newest arrivals from the MongoDB database, alongside "How Borrowing Works" and authentic reader community reviews.
- **Double Borrow Guard & Return Scheduling**: Intelligent borrowing modal allowing readers to set return schedules with validation guards preventing duplicate concurrent borrows of the exact same title.
- **Full Contributor Management (CRUD)**: Contributors can add books, edit their book metadata in real-time modals, and safely delete listings using custom accessible confirmation dialogs (no native browser alerts).
- **Tailored Modern Aesthetic with Dark & Light Themes**: Harmonious literary color palette, seamless dark/light theme switching with Next Themes, branded typography, and the official updated X social icon.

---

## Technologies Used

- **Framework**: Next.js 14 / 15 (App Router, Server & Client Components)
- **Styling**: Tailwind CSS, Next Themes
- **Authentication**: BetterAuth, MongoDB Adapter, JWT Validation
- **Icons & UI Enhancements**: Lucide React, React Icons (official X icon), Sonner Toast Notifications
- **Sliders & Motion**: Swiper.js, Framer Motion
- **Language**: TypeScript

---

## Local Setup & Development

1. Navigate to the client directory:
   ```bash
   cd client-side
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root of `client-side` (this file is strictly ignored by Git to protect your secret credentials):
   - `NEXT_PUBLIC_API_URL`: Your Express backend server URL (e.g. `http://localhost:5000`)
   - `NEXT_PUBLIC_APP_URL`: Your Next.js frontend URL (e.g. `http://localhost:3000`)
   - `MONGODB_URI`: Your MongoDB connection string for BetterAuth
   - `BETTER_AUTH_SECRET`: Secret key for BetterAuth session encryption
   - `BETTER_AUTH_URL`: Canonical URL for BetterAuth callbacks (`http://localhost:3000`)
   - `GOOGLE_CLIENT_ID`: (Optional) Google OAuth Client ID for social login
   - `GOOGLE_CLIENT_SECRET`: (Optional) Google OAuth Client Secret

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.
