const pool = require('../config/database');
const AllocationAlgorithm = require('../services/allocationAlgorithm');

const generateAllocation = async (req, res) => {
  const { exam_id, mode } = req.body;

  if (!exam_id) {
    return res.status(400).json({ error: 'Exam ID is required' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const hallsResult = await client.query(`
      SELECT h.*, 
             json_agg(
               json_build_object(
                 'seat_id', s.seat_id,
                 'seat_number', s.seat_number,
                 'row_num', s.row_num,
                 'column_num', s.column_num,
                 'is_blocked', s.is_blocked
               ) ORDER BY s.row_num, s.column_num
             ) as seats
      FROM halls h
      LEFT JOIN seats s ON h.hall_id = s.hall_id
      GROUP BY h.hall_id
    `);

    if (hallsResult.rows.length === 0) {
      return res.status(400).json({ error: 'No halls configured' });
    }

    const studentsResult = await client.query(`
      SELECT student_id, roll_number, name, course, paper_code, special_requirements
      FROM students
      ORDER BY paper_code, roll_number
    `);

    if (studentsResult.rows.length === 0) {
      return res.status(400).json({ error: 'No students found' });
    }

    const totalCapacity = hallsResult.rows.reduce((sum, hall) => {
      const availableSeats = hall.seats.filter(s => !s.is_blocked).length;
      return sum + availableSeats;
    }, 0);

    if (totalCapacity < studentsResult.rows.length) {
      console.warn(`Warning: Capacity (${totalCapacity}) < Students (${studentsResult.rows.length})`);
    }

    const algorithm = new AllocationAlgorithm(
      studentsResult.rows,
      hallsResult.rows,
      mode || 'same_paper'
    );

    const result = await algorithm.allocate();

    await client.query('DELETE FROM seat_allocations WHERE exam_id = $1', [exam_id]);

    for (const allocation of result.allocations) {
      await client.query(`
        INSERT INTO seat_allocations (exam_id, student_id, hall_id, seat_id, paper_code, status)
        VALUES ($1, $2, $3, $4, $5, 'allocated')
      `, [exam_id, allocation.student_id, allocation.hall_id, allocation.seat_id, allocation.paper_code]);
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Allocation generated successfully',
      data: result
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Allocation error:', error);
    res.status(500).json({ error: 'Allocation failed', details: error.message });
  } finally {
    client.release();
  }
};

const getAllocation = async (req, res) => {
  const { exam_id } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        sa.allocation_id,
        s.roll_number,
        s.name as student_name,
        s.paper_code,
        h.name as hall_name,
        se.seat_number,
        se.row_num,
        se.column_num,
        sa.status
      FROM seat_allocations sa
      JOIN students s ON sa.student_id = s.student_id
      JOIN halls h ON sa.hall_id = h.hall_id
      JOIN seats se ON sa.seat_id = se.seat_id
      WHERE sa.exam_id = $1
      ORDER BY h.name, se.row_num, se.column_num
    `, [exam_id]);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    console.error('Get allocation error:', error);
    res.status(500).json({ error: 'Failed to retrieve allocation' });
  }
};

const searchSeat = async (req, res) => {
  const { roll_number, exam_id } = req.query;

  if (!roll_number || !exam_id) {
    return res.status(400).json({ error: 'Roll number and exam ID are required' });
  }

  try {
    const result = await pool.query(`
      SELECT 
        s.roll_number,
        s.name,
        h.name as hall_name,
        h.building,
        se.seat_number,
        sa.paper_code,
        e.exam_date,
        e.exam_time,
        e.course_name
      FROM seat_allocations sa
      JOIN students s ON sa.student_id = s.student_id
      JOIN halls h ON sa.hall_id = h.hall_id
      JOIN seats se ON sa.seat_id = se.seat_id
      JOIN exams e ON sa.exam_id = e.exam_id
      WHERE s.roll_number = $1 AND sa.exam_id = $2
    `, [roll_number, exam_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No seat allocation found' });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Search seat error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};

module.exports = {
  generateAllocation,
  getAllocation,
  searchSeat
};
