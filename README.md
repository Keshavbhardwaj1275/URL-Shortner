# 🔗 URL Shortener

A modern full-stack URL Shortener web application built using **Node.js, Express.js, MongoDB, and Vanilla JavaScript**.

The application allows users to:

* generate shortened URLs
* create custom short links
* track analytics
* generate QR codes
* switch between dark/light themes

Deployed live using **Render** and connected with **MongoDB Atlas**.

---

# 🚀 Live Demo

🌐 Live Website:

https://url-shortner-lo53.onrender.com/

---

# ✨ Features

* 🔗 Shorten Long URLs
* ✍️ Custom Short URLs
* 📱 QR Code Generation
* 📋 One-Click Copy Button
* 📊 Click Analytics Tracking
* 🌙 Dark / Light Mode
* 📱 Fully Responsive Design
* ✅ URL Validation
* 🚫 Duplicate Custom URL Protection

---

# 🛠️ Tech Stack

## Frontend

* HTML5
* CSS3
* JavaScript

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Deployment

* Render

---

# 📂 Project Structure

```bash
URL-Shortner/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── index.js
├── package.json
├── .env
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Keshavbhardwaj1275/URL-Shortner.git
```

---

## 2️⃣ Navigate Into Project

```bash
cd URL-Shortner
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Configure Environment Variables

Create a `.env` file in the root directory.

```env
MONGO_URI=your_mongodb_connection_string

BASE_URL=http://localhost:1234
```

---

## 5️⃣ Start Development Server

```bash
node index.js
```

---

# 📊 Analytics Endpoint

Track URL analytics using:

```bash
/analytics/:code
```

Example:

```bash
http://localhost:1234/analytics/abc123
```

---

# 📸 Screenshots

Add screenshots of:

* Homepage
* Generated QR Code
* Analytics Section
* Dark Mode UI

---

# 🌐 Deployment

This project is deployed using:

* Render
* MongoDB Atlas

---

# 🚀 Future Enhancements

* User Authentication
* User Dashboard
* Link Expiration
* Download Analytics Reports
* Admin Panel
* Advanced Analytics

---

# 👨‍💻 Author

## Keshav Bhardwaj

GitHub:
https://github.com/Keshavbhardwaj1275

---

# ⭐ Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork this repository and submit pull requests.

---

# 📄 License

This project is licensed under the MIT License.
