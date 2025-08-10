# 📊 Expense Tracker

![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-darkblue)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-4.x-white)
![GraphQL](https://img.shields.io/badge/GraphQL-API-ff69b4)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen)
![Apollo Client](https://img.shields.io/badge/Apollo%20Client-GraphQL-blueviolet)

A simple and intuitive expense tracking application built with **React** (Typescript), **Apollo GraphQL** and **MongoDB** (Docker).  
It allows you to add expenses with title, category, amount, and date. 
The application displays all expenses in a list and also provides a **monthly summary bar chart** so you can easily see how much you’ve spent each month.


## ✨ Features

- **Add Expenses** – Enter title, category, amount and date.
- **Expense List** – View all expenses in a clear list.
- **Monthly Summary Chart** – Bar chart showing total expenses per month.
- **Persistent Storage** – Data stored in MongoDB (Docker container).
- **GraphQL API** – Efficient data querying and updating.


## 🛠 Tech Stack

**Frontend**
- React (Typescript)
- Apollo Client (GraphQL)
- Recharts (Charts & Graphs)

**Backend**
- Node.js
- Express
- Apollo Server (GraphQL)
- MongoDB (via Docker)


## ⚙️ Setup & Installation

1️⃣ Clone the repository
```
git clone https://github.com/your-username/expensetracker.git
cd expensetracker
```
2️⃣ Start MongoDB with Docker
```
docker compose up -d
```
3️⃣ Install backend dependencies
```
cd backend
npm install
```
4️⃣ Start backend server
```
npm run dev
```
5️⃣ Install frontend dependencies
```
cd frontend
npm install
```
6️⃣ Start frontend
```
npm start
```

Create a .env file in your backend folder
```
MONGO_URI=mongodb://localhost:27017/expenses
PORT=4000
