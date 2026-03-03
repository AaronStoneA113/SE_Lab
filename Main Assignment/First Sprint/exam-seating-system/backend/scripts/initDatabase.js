const pool = require('../config/database');

const createTables = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    await client.query(`
      CREATE TABLE IF NOT EXISTS halls (
        hall_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        building VARCHAR(100),
        total_seats INTEGER NOT NULL,
        rows INTEGER NOT NULL,
        columns INTEGER NOT NULL,
        shape_type VARCHAR(50) DEFAULT 'rectangular',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS seats (
        seat_id SERIAL PRIMARY KEY,
        hall_id INTEGER REFERENCES halls(hall_id) ON DELETE CASCADE,
        seat_number VARCHAR(10) NOT NULL,
        row_num INTEGER NOT NULL,
        column_num INTEGER NOT NULL,
        is_blocked BOOLEAN DEFAULT FALSE,
        UNIQUE(hall_id, row_num, column_num)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS exams (
        exam_id SERIAL PRIMARY KEY,
        exam_date DATE NOT NULL,
        exam_time TIME NOT NULL,
        course_code VARCHAR(20) NOT NULL,
        course_name VARCHAR(200) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS students (
        student_id SERIAL PRIMARY KEY,
        roll_number VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(200) NOT NULL,
        course VARCHAR(100),
        paper_code VARCHAR(50),
        special_requirements TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS seat_allocations (
        allocation_id SERIAL PRIMARY KEY,
        exam_id INTEGER REFERENCES exams(exam_id) ON DELETE CASCADE,
        student_id INTEGER REFERENCES students(student_id) ON DELETE CASCADE,
        hall_id INTEGER REFERENCES halls(hall_id) ON DELETE CASCADE,
        seat_id INTEGER REFERENCES seats(seat_id) ON DELETE CASCADE,
        paper_code VARCHAR(50),
        status VARCHAR(50) DEFAULT 'allocated',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(exam_id, student_id),
        UNIQUE(exam_id, seat_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        email VARCHAR(200),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('COMMIT');
    console.log('All tables created successfully');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating tables:', error);
    throw error;
  } finally {
    client.release();
  }
};

const insertSampleData = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    await client.query(`
      INSERT INTO halls (name, building, total_seats, rows, columns, shape_type)
      VALUES 
        ('Hall A', 'Main Building', 100, 10, 10, 'rectangular'),
        ('Hall B', 'Science Block', 80, 8, 10, 'rectangular'),
        ('Hall C', 'Engineering Block', 60, 10, 8, 'L-shaped')
      ON CONFLICT DO NOTHING;
    `);

    const hallResult = await client.query('SELECT hall_id, rows, columns FROM halls LIMIT 3');
    
    for (const hall of hallResult.rows) {
      for (let r = 0; r < hall.rows; r++) {
        for (let c = 0; c < hall.columns; c++) {
          const seatNumber = `${String.fromCharCode(65 + r)}${c + 1}`;
          await client.query(`
            INSERT INTO seats (hall_id, seat_number, row_num, column_num, is_blocked)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT DO NOTHING
          `, [hall.hall_id, seatNumber, r, c, false]);
        }
      }
    }

    await client.query(`
      INSERT INTO exams (exam_date, exam_time, course_code, course_name)
      VALUES 
        ('2026-04-15', '10:00:00', 'CS101', 'Data Structures'),
        ('2026-04-16', '14:00:00', 'CS201', 'Algorithms')
      ON CONFLICT DO NOTHING;
    `);

    for (let i = 1; i <= 50; i++) {
      const paperCode = i % 2 === 0 ? 'SET-A' : 'SET-B';
      await client.query(`
        INSERT INTO students (roll_number, name, course, paper_code, special_requirements)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT DO NOTHING
      `, [`24MCMB${String(i).padStart(2, '0')}`, `Student ${i}`, 'MTech IT', paperCode, null]);
    }

    await client.query('COMMIT');
    console.log('Sample data inserted successfully');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error inserting sample data:', error);
    throw error;
  } finally {
    client.release();
  }
};

const initializeDatabase = async () => {
  try {
    console.log('Starting database initialization...');
    await createTables();
    await insertSampleData();
    console.log('Database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

initializeDatabase();
