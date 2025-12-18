# 🏆 ContestHub – Full Stack Contest Management Platform

ContestHub is a **complete full-stack web application** that allows users to participate in contests, submit tasks, and compete for prizes.  
It is designed to test and demonstrate skills in **React, Node.js/Express, MongoDB, authentication, secure APIs, role-based access, payment flow, and deployment**.

---

## 🚀 Live Links
- **Client:** https://your-client-link.com  
- **Server:** https://your-server-link.com  

---

## 📌 Project Type
**Full-Stack MERN Application**

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- TanStack Query (React Query)
- React Hook Form
- Tailwind CSS + DaisyUI
- Axios
- Firebase Authentication
- React Toastify / React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Firebase Admin SDK
- JWT Authentication
- Stripe (Payment Integration)

---

## 🔐 Authentication & Authorization
- Email & Password login
- Google Social Login
- Firebase Authentication
- JWT token verification
- Secure API routes
- Role-based access control

### Roles
- **User**
- **Creator**
- **Admin**

Each role has its **own dashboard** and **restricted permissions**.

---

## 👥 Role-Based Dashboards

### 👤 User Dashboard
- View available contests
- Submit contest tasks (before deadline)
- View submission status
- View wins in profile
- Payment before task submission (Stripe)

### ✍️ Creator Dashboard
- Create contests
- View own contests
- Track submissions
- Cannot declare winners

### 🛡️ Admin Dashboard
- View all users
- Manage roles (User / Creator / Admin)
- Approve or reject contests
- Declare contest winners (after deadline)
- Access admin-only routes

> ✅ **All admins can access the Admin Dashboard (multiple admin supported)**

---

## 🏁 Contest Features
- Contest creation with:
  - Title
  - Description
  - Deadline
  - Prize money
  - Contest type
- Admin approval required before publishing
- Deadline-based task submission
- Secure winner declaration after deadline
- Winner marked using `isWinner` flag

---

## 🏆 Winner Declaration Logic
- Winner **can only be declared after contest deadline**
- Prevents early winner selection
- Only **one winner per contest**
- Contest marked as completed after winner declaration

---

## 🥇 Leaderboard (Challenge Feature)
- Dynamic leaderboard
- Users ranked by **number of contest wins**
- Automatically updates when winners are declared
- Sorted from highest to lowest wins

---

## 💳 Payment System
- Stripe payment integration
- Users must pay before submitting a task
- Secure server-side payment intent
- Payment validation handled on backend

---

## 📄 Extra Pages (Requirement)
- **How It Works / Contest Rules**
- **User Profile Page**

Both pages are:
- Added to the navbar
- Explained in this README

---

## 📑 Pagination
- Backend pagination using `page` and `limit`
- Frontend pagination with:
  - Next / Previous buttons
  - Disabled state handling
- Improves performance and UX

---

## 🔒 Security Measures
- Firebase token verification
- JWT-based API protection
- Admin-only route protection
- Server-side role verification
- No sensitive logic handled on frontend

---

## 📱 Responsive Design
- Fully responsive layout
- Mobile, tablet, and desktop friendly
- Clean UI with consistent components

---

## 🔔 User Feedback
- Toast notifications for:
  - Login / Logout
  - Success actions
  - Errors
- Loading spinners while fetching data

---

## 🧪 Error Handling
- Form validation using React Hook Form
- API error handling
- Proper HTTP status codes
- User-friendly error messages

---

## 📂 Folder Structure
```bash
client/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── hooks/
 │   ├── context/
 │   ├── routes/
