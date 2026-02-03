# Student Result Processing System

**MERN Stack** — MongoDB, Express, React, Node.js

---

## Prerequisites

Install these before running anything:

- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB](https://www.mongodb.com/products/tools/compass) (run locally, or use MongoDB Atlas and update `.env`)
- npm (ships with Node.js)

---

## Project Structure

```
Documents/
└── SE_Lab/
    └── Assignment_4/
        ├── README.md
        ├── server/
        │   ├── .env                    ← MongoDB URI
        │   ├── package.json
        │   ├── server.js               ← Express entry point
        │   ├── students.json           ← Input data file (edit this to change students)
        │   ├── middleware/
        │   │   └── validation.js       ← ID, name, marks validation logic
        │   ├── models/
        │   │   └── Student.js          ← Mongoose schema
        │   ├── routes/
        │   │   └── studentRoutes.js    ← Express API routes (load, students, stats)
        │   └── utils/
        │       └── compute.js          ← Total, percentage, grade, CGPA calculations
        └── client/
            ├── package.json
            ├── public/
            │   └── index.html
            └── src/
                ├── index.js                    ← React DOM entry
                ├── App.js                      ← Root component, state management
                ├── styles/
                │   └── global.css              ← CSS variables, fonts, reset
                ├── utils/
                │   └── api.js                  ← Axios API calls
                └── components/
                    ├── Header.js / .css        ← Top bar + Load button
                    ├── StatsRow.js / .css      ← 4 stat cards (avg, high, low, count)
                    ├── GradeBar.js / .css      ← Horizontal grade distribution bar
                    ├── ResultTable.js / .css   ← Main student results table
                    └── RejectedList.js / .css  ← Rejected entries with error reasons
```

---

## Setup

Run this once to create all directories:

```bash
mkdir -p Documents/SE_Lab/Assignment_4/{server/{middleware,models,routes,utils},client/{public,src/{styles,utils,components}}}
```

Then copy all files from the zip into `Documents/SE_Lab/Assignment_4/`.

---

## How to Run

### 1. Start MongoDB

Open MongoDB Compass or run `mongod` in your terminal. Default URI is `mongodb://localhost:27017`.

### 2. Start the Server

```bash
cd Documents/SE_Lab/Assignment_4/server
npm install
npm start
```

Server runs on `http://localhost:5000`.

### 3. Start the Client

Open a new terminal:

```bash
cd Documents/SE_Lab/Assignment_4/client
npm install
npm start
```

Client runs on `http://localhost:3000`.

### 4. Use the App

Open `http://localhost:3000` in your browser. Press **Load from File**. The system reads `students.json`, validates every entry, saves valid ones to MongoDB, and displays everything.

---

## API Endpoints

| Method | Endpoint         | What it does                                      |
|--------|------------------|---------------------------------------------------|
| POST   | /api/load        | Reads students.json, validates, saves to MongoDB  |
| GET    | /api/students    | Returns all valid students from the database      |
| GET    | /api/stats       | Returns class average, highest, lowest, grades    |

---

## Validation Rules

- **ID**: Must be alphanumeric. No special characters. No duplicates.
- **Name**: Only alphabets and spaces. No digits or symbols.
- **Marks**: Each mark must be in [0, 100]. Exactly 5 subjects.
- **Passing**: Each subject requires 50 or above.

## Grade Thresholds

| Percentage | Grade |
|------------|-------|
| >= 90      | O     |
| 85-90      | A+    |
| 75-85      | A     |
| 65-75      | B+    |
| 60-65      | B     |
| 55-60      | C     |
| 50-55      | D     |
| < 50       | F     |

---

## Input File

Edit `Documents/SE_Lab/Assignment_4/server/students.json` to add or change student records. The file contains both valid and invalid entries to show validation in action. Invalid entries appear in the **Rejected Entries** section on the UI with exact error messages.
