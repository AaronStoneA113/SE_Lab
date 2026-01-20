# Student Result Processing System - Task 2

**Student:** Abhishek Roy  
**Roll Number:** 24MCMB07  
**University:** University of Hyderabad  
**Course:** MTech IT, 2nd Semester

---

## Project Structure

```
student-result-system/
├── student.h           (Data structures and constants)
├── validation.h        (Validation module header)
├── validation.c        (Validation implementation)
├── computation.h       (Computation module header)
├── computation.c       (Computation implementation)
├── filehandler.h       (File operations header)
├── filehandler.c       (File operations implementation)
├── display.h           (Display module header)
├── display.c           (Display implementation)
├── main.c              (Main program)
├── Makefile            (Build configuration)
├── students.txt        (Sample input data)
├── MODULE_SPECS.md     (Module specifications)
├── TEST_PLAN.md        (Test plan document)
└── README.md           (This file)
```

---

## File Descriptions

### Header Files

**student.h**
- Defines Student structure
- Constants: MAX_STUDENTS, NUM_SUBJECTS, string lengths
- No dependencies

**validation.h**
- Function declarations for input validation
- Depends on: student.h

**computation.h**
- Function declarations for grade and CGPA calculation
- Depends on: student.h

**filehandler.h**
- Function declaration for file reading
- Depends on: student.h

**display.h**
- Function declarations for output display
- Depends on: student.h

### Implementation Files

**validation.c**
- isValidID: Validates student ID (alphanumeric, unique)
- isValidName: Validates name (alphabets only)
- isValidMarks: Validates marks (0-100 range)

**computation.c**
- calculateGrade: Assigns grade based on percentage
- calculateCGPA: Calculates CGPA from percentage
- computeResults: Orchestrates all calculations

**filehandler.c**
- readStudentsFromFile: Reads CSV file, validates data, loads students

**display.c**
- displayReport: Shows tabular student report
- displayStatistics: Shows class statistics and grade distribution

**main.c**
- Entry point
- Orchestrates file reading and display

---

## How to Compile

### Method 1: Using Makefile (Recommended)

```bash
make
```

This compiles all modules and creates the executable `student_system`.

### Method 2: Manual Compilation

```bash
gcc -Wall -Wextra -std=c11 -c validation.c
gcc -Wall -Wextra -std=c11 -c computation.c
gcc -Wall -Wextra -std=c11 -c filehandler.c
gcc -Wall -Wextra -std=c11 -c display.c
gcc -Wall -Wextra -std=c11 -c main.c
gcc -Wall -Wextra -std=c11 -o student_system main.o validation.o computation.o filehandler.o display.o
```

### Clean Build

```bash
make clean
```

Removes all object files and executable.

---

## How to Run

### Step 1: Create Input File

Create `students.txt` with this format (comma-separated):

```
ID,Name,Subject1,Subject2,Subject3,Subject4,Subject5
```

**Example (students.txt):**

```
24MCMB07,Abhishek Roy,85,90,78,88,92
ST001,Priya Sharma,67,72,65,70,68
ST002,Rahul Kumar,45,55,60,50,48
ST003,Anita Patel,92,95,88,90,94
ST004,Vijay Singh,78,82,75,80,85
```

### Step 2: Run Program

```bash
./student_system
```

### Step 3: Enter Filename

When prompted:
```
Student Result Processing System
Enter input filename: students.txt
```

### Expected Output

```
Successfully loaded 5 student records.

================================================================================
                        STUDENT RESULT REPORT                                   
================================================================================
ID         Name                 S1    S2    S3    S4    S5    Total  Percent Grade CGPA   Status
--------------------------------------------------------------------------------
24MCMB07   Abhishek Roy         85.0  90.0  78.0  88.0  92.0  433.0  86.60   A+    9.00   Pass
ST001      Priya Sharma         67.0  72.0  65.0  70.0  68.0  342.0  68.40   B+    7.00   Pass
ST002      Rahul Kumar          45.0  55.0  60.0  50.0  48.0  258.0  51.60   D     5.00   Fail
ST003      Anita Patel          92.0  95.0  88.0  90.0  94.0  459.0  91.80   O     10.00  Pass
ST004      Vijay Singh          78.0  82.0  75.0  80.0  85.0  400.0  80.00   A     8.00   Pass
================================================================================

CLASS STATISTICS
--------------------------------------------------------------------------------
Class Average Percentage: 75.68%
Highest Percentage: 91.80%
Lowest Percentage: 51.60%

GRADE DISTRIBUTION
--------------------------------------------------------------------------------
O:  1 students
A+: 1 students
A:  1 students
B+: 1 students
B:  0 students
C:  0 students
D:  1 students
F:  0 students
================================================================================
```

---

## Input Validation Rules

### Student ID
- Must be alphanumeric only
- No special characters allowed
- Must be unique
- Cannot be empty

### Name
- Alphabets and spaces only
- No digits or special characters
- Cannot be empty

### Marks
- Range: 0 to 100
- Decimal values allowed
- Must provide exactly 5 subjects

---

## Grading System

| Percentage Range | Grade | CGPA |
|-----------------|-------|------|
| >= 90           | O     | 10.0 |
| 85 - 90         | A+    | 9.0  |
| 75 - 85         | A     | 8.0  |
| 65 - 75         | B+    | 7.0  |
| 60 - 65         | B     | 6.0  |
| 55 - 60         | C     | 5.5  |
| 50 - 55         | D     | 5.0  |
| < 50            | F     | 0.0  |

**Pass Criteria:** Minimum 50 marks in each subject (50%)

---

## Module Characteristics

### Low Coupling
- Each module has minimal dependencies
- Modules interact through well-defined interfaces
- Changes in one module minimally affect others

### High Cohesion
- Each module has single, well-defined purpose
- Related functions grouped together
- Clear separation of concerns

### Separate Compilation
- Each module can be compiled independently
- Object files can be linked together
- Supports incremental builds

### Reusability
- Validation functions work for any student system
- Computation logic independent of I/O
- Display functions can show any student data
- Modules can be used in other applications

---

## Quality Characteristics

### Usability
- Clear user prompts
- Informative error messages
- Readable tabular output
- Simple file input mechanism

### Efficiency
- Single file read pass: O(n) time complexity
- Minimal memory footprint: static arrays
- No unnecessary data copies
- Fast computation algorithms

### Reusability
- Independent modules
- Generic data structures
- Standard interfaces
- No hard-coded dependencies

### Interoperability
- Standard C file I/O (cross-platform)
- CSV format (universal data exchange)
- Can compile as shared library
- Callable from other languages (Python ctypes)

---

## Interoperability Example

### Using from Python

```python
import ctypes

lib = ctypes.CDLL('./student_system.so')

lib.isValidMarks.argtypes = [ctypes.c_float]
lib.isValidMarks.restype = ctypes.c_int

result = lib.isValidMarks(85.5)
print(f"Is valid: {result}")
```

### Compile as Shared Library

```bash
gcc -shared -fPIC -o student_system.so validation.c computation.c
```

---

## Error Handling

The system handles:
- Missing input files
- Invalid file format
- Duplicate student IDs
- Invalid names with digits/symbols
- Marks outside valid range
- Incomplete data records

Invalid records are skipped with error messages. Valid records are processed normally.

---

## Testing

Comprehensive test plan covers:
- 13 validation tests
- 11 computation tests
- 7 file handling tests
- 9 display tests
- 2 integration tests

**Total:** 42 test cases with 100% pass rate

See `TEST_PLAN.md` for detailed test cases.

---

## Module Specifications

Complete module specifications available in `MODULE_SPECS.md`:
- Module names and purposes
- Input/output specifications
- Pre-conditions and post-conditions
- Algorithms and logic
- Coupling and cohesion analysis

---

## Common Issues and Solutions

### Issue: "Cannot open file"
**Solution:** Ensure `students.txt` exists in the same directory as executable

### Issue: "Invalid or duplicate ID"
**Solution:** Check ID contains only alphanumeric characters and is unique

### Issue: "Invalid name"
**Solution:** Ensure name contains only alphabets and spaces

### Issue: "Invalid marks"
**Solution:** Verify all marks are between 0 and 100

### Issue: Compilation errors
**Solution:** Ensure all header and source files are in same directory

---

## Make Commands

```bash
make          # Compile all modules
make clean    # Remove object files and executable
make run      # Compile and run
```

---

## Git Repository Structure

```
repository/
├── task1/
│   └── main.c (original monolithic version)
├── task2/
│   ├── student.h
│   ├── validation.h
│   ├── validation.c
│   ├── computation.h
│   ├── computation.c
│   ├── filehandler.h
│   ├── filehandler.c
│   ├── display.h
│   ├── display.c
│   ├── main.c
│   ├── Makefile
│   ├── MODULE_SPECS.md
│   ├── TEST_PLAN.md
│   └── README.md
└── students.txt
```

---

## Author Information

**Name:** Abhishek Roy  
**Roll Number:** 24MCMB07  
**Institution:** University of Hyderabad  
**Program:** MTech IT (2nd Semester)  
**Course:** Software Engineering Lab  
**Submission Date:** January 22, 2026

---

## License

This project is submitted as academic coursework for Software Engineering Lab at University of Hyderabad.