# Exam Hall Seating Allocation System - Sprint 1
## Setup and Run Guide for Linux (VS Code)

**Developed by:** Abhishek Roy (24MCMB07)
**Course:** Software Engineering Lab, MTech IT, University of Hyderabad

---

## Prerequisites

### 1. Install Node.js and npm
```bash
sudo apt update
sudo apt install nodejs npm -y
node --version  # Should be v14 or higher
npm --version
```

### 2. Install PostgreSQL
```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 3. Configure PostgreSQL
```bash
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE exam_seating_db;
CREATE USER postgres WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE exam_seating_db TO postgres;
\q
```

---

## Project Setup

### Step 1: Navigate to Project Directory
```bash
cd ~/exam-seating-system
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Update .env file with your PostgreSQL password
nano .env
# Change: DB_PASSWORD=your_password_here

# Initialize database (creates tables and sample data)
npm run init-db

# Start backend server
npm run dev
# Server will run on http://localhost:5000
```

**Expected output:**
```
Database connected successfully
All tables created successfully
Sample data inserted successfully
Server running on port 5000
```

### Step 3: Frontend Setup (Open NEW terminal)

```bash
cd ~/exam-seating-system/frontend

# Install dependencies
npm install

# Start React development server
npm start
# Frontend will open at http://localhost:3000
```

**Expected output:**
```
Compiled successfully!
You can now view exam-seating-frontend in the browser.
Local: http://localhost:3000
```

---

## Running in VS Code

### Open Project in VS Code
```bash
code ~/exam-seating-system
```

### VS Code Terminal Setup

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- PostgreSQL (for database management)

---

## Testing the Application

### 1. Test Backend API

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Generate Allocation:**
```bash
curl -X POST http://localhost:5000/api/allocation/generate \
  -H "Content-Type: application/json" \
  -d '{"exam_id": 1, "mode": "same_paper"}'
```

**Search Seat:**
```bash
curl "http://localhost:5000/api/allocation/search?roll_number=24MCMB01&exam_id=1"
```

### 2. Test Frontend
1. Open http://localhost:3000 in browser
2. Click "Generate Allocation" tab
3. Select exam and mode
4. Click "Generate Allocation" button
5. View results (allocated students, summary stats)
6. Switch to "Search Seat" tab
7. Enter roll number (e.g., 24MCMB01)
8. Click "Search Seat" button
9. View seat allocation details

---

## Database Verification

### Check Created Tables
```bash
sudo -u postgres psql exam_seating_db

# List all tables
\dt

# View sample data
SELECT * FROM halls;
SELECT * FROM students LIMIT 10;
SELECT * FROM exams;

# Exit
\q
```

---

## File Structure

```
exam-seating-system/
├── backend/
│   ├── config/
│   │   └── database.js          # PostgreSQL connection
│   ├── controllers/
│   │   └── allocationController.js  # API logic
│   ├── routes/
│   │   └── allocation.js        # API routes
│   ├── scripts/
│   │   └── initDatabase.js      # DB initialization
│   ├── services/
│   │   └── allocationAlgorithm.js   # 8-way constraint logic
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Main server file
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── GenerateAllocation.js
    │   │   └── SearchSeat.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

---

## API Endpoints

### POST /api/allocation/generate
Generate seating allocation for an exam

**Request Body:**
```json
{
  "exam_id": 1,
  "mode": "same_paper"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Allocation generated successfully",
  "data": {
    "allocations": [...],
    "unallocated": [...],
    "summary": {
      "total_students": 50,
      "allocated": 50,
      "unallocated": 0,
      "utilization": "100.00"
    }
  }
}
```

### GET /api/allocation/exam/:exam_id
Get all allocations for an exam

**Response:**
```json
{
  "success": true,
  "count": 50,
  "data": [...]
}
```

### GET /api/allocation/search?roll_number=X&exam_id=Y
Search seat allocation for a student

**Response:**
```json
{
  "success": true,
  "data": {
    "roll_number": "24MCMB01",
    "name": "Student 1",
    "hall_name": "Hall A",
    "seat_number": "A1",
    "paper_code": "SET-B",
    ...
  }
}
```

---

## Common Issues and Solutions

### Issue 1: PostgreSQL Connection Failed
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start if not running
sudo systemctl start postgresql

# Verify password in .env matches database
```

### Issue 2: Port Already in Use
```bash
# Backend (port 5000)
sudo lsof -i :5000
kill -9 <PID>

# Frontend (port 3000)
sudo lsof -i :3000
kill -9 <PID>
```

### Issue 3: npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: CORS Error
Verify backend server is running on port 5000
Check CORS is enabled in server.js

---

## Sprint 1 Features Implemented

✅ UC1.0: Manage Hall Data (Sample halls created)
✅ UC2.0: Upload Student List (Sample students created)
✅ UC4.0: Generate Seating Allocation (8-way constraint algorithm)
✅ UC5.0: Search Seat (Roll number search)
✅ Database schema with 6 tables
✅ RESTful API with 3 endpoints
✅ React frontend with 2 main components
✅ 8-way adjacency constraint enforcement
✅ Hall capacity validation
✅ Allocation summary statistics

---

## Next Steps (Sprint 2)

- UC6.0: Download Admit Card (PDF generation)
- UC7.0: Publish Allocation (Status management)
- Email/SMS notifications
- Manual seat adjustment
- Advanced hall shape support (L-shaped, T-shaped)
- Authentication and authorization

---

## Development Commands

**Backend:**
```bash
npm run dev     # Run with auto-restart (nodemon)
npm start       # Run production mode
npm run init-db # Reinitialize database
```

**Frontend:**
```bash
npm start       # Development server
npm run build   # Production build
npm test        # Run tests
```

---

## Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend opens in browser
- [ ] Database connection successful
- [ ] Generate allocation works
- [ ] Search seat returns correct results
- [ ] 8-way constraint is enforced
- [ ] Unallocated students are flagged
- [ ] Summary statistics are accurate

---

## Contact

**Developer:** Abhishek Roy
**Roll Number:** 24MCMB07
**Course:** MTech IT, 2nd Semester
**University:** University of Hyderabad

For issues or questions, check the error logs in terminal.
