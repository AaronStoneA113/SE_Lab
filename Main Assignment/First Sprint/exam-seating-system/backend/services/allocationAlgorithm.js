class AllocationAlgorithm {
  constructor(students, halls, mode = 'same_paper') {
    this.students = students;
    this.halls = halls;
    this.mode = mode;
    this.allocations = [];
    this.unallocated = [];
    this.seatGrid = new Map();
  }

  check8WayConstraint(hallId, row, col, paperCode) {
    const gridKey = `${hallId}`;
    if (!this.seatGrid.has(gridKey)) return true;

    const grid = this.seatGrid.get(gridKey);
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      const posKey = `${newRow},${newCol}`;

      if (grid.has(posKey)) {
        const occupiedPaper = grid.get(posKey);
        if (occupiedPaper === paperCode) {
          return false;
        }
      }
    }

    return true;
  }

  markSeatOccupied(hallId, row, col, paperCode) {
    const gridKey = `${hallId}`;
    if (!this.seatGrid.has(gridKey)) {
      this.seatGrid.set(gridKey, new Map());
    }
    const grid = this.seatGrid.get(gridKey);
    grid.set(`${row},${col}`, paperCode);
  }

  async allocate() {
    const studentsByPaper = {};
    
    for (const student of this.students) {
      const paper = student.paper_code || 'DEFAULT';
      if (!studentsByPaper[paper]) {
        studentsByPaper[paper] = [];
      }
      studentsByPaper[paper].push(student);
    }

    for (const hall of this.halls) {
      const seats = hall.seats || [];
      let seatIndex = 0;

      for (const paperCode in studentsByPaper) {
        const studentsWithPaper = studentsByPaper[paperCode];

        for (const student of studentsWithPaper) {
          let allocated = false;

          while (seatIndex < seats.length && !allocated) {
            const seat = seats[seatIndex];

            if (!seat.is_blocked) {
              const canAllocate = this.check8WayConstraint(
                hall.hall_id,
                seat.row_num,
                seat.column_num,
                paperCode
              );

              if (canAllocate) {
                this.allocations.push({
                  student_id: student.student_id,
                  hall_id: hall.hall_id,
                  seat_id: seat.seat_id,
                  paper_code: paperCode,
                  student_name: student.name,
                  roll_number: student.roll_number,
                  hall_name: hall.name,
                  seat_number: seat.seat_number
                });

                this.markSeatOccupied(hall.hall_id, seat.row_num, seat.column_num, paperCode);
                allocated = true;

                const studentIndex = studentsWithPaper.indexOf(student);
                if (studentIndex > -1) {
                  studentsWithPaper.splice(studentIndex, 1);
                }
              }
            }

            seatIndex++;
          }

          if (!allocated) {
            this.unallocated.push({
              student_id: student.student_id,
              roll_number: student.roll_number,
              name: student.name,
              reason: 'No valid seat available (capacity or constraint)'
            });
          }
        }
      }
    }

    return {
      allocations: this.allocations,
      unallocated: this.unallocated,
      summary: {
        total_students: this.students.length,
        allocated: this.allocations.length,
        unallocated: this.unallocated.length,
        utilization: ((this.allocations.length / this.students.length) * 100).toFixed(2)
      }
    };
  }
}

module.exports = AllocationAlgorithm;
