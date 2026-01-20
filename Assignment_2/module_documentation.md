# Module Specifications

## Module 1: Student Data Structure

**Module Name:** student.h

**Purpose:** Define core data structures and constants

**Input:** None (Header file)

**Pre-condition:** None

**Logic:**
```
DEFINE MAX_STUDENTS = 100
DEFINE NUM_SUBJECTS = 5
DEFINE MAX_ID_LEN = 20
DEFINE MAX_NAME_LEN = 50

STRUCTURE Student:
    id: character array[MAX_ID_LEN]
    name: character array[MAX_NAME_LEN]
    marks: float array[NUM_SUBJECTS]
    total: float
    percentage: float
    grade: character array[3]
    cgpa: float
    passed: integer
```

**Output:** Data structure definitions available to other modules

**Coupling:** Low (No dependencies)

**Cohesion:** High (Single responsibility: data definition)

---

## Module 2: Input Validation

**Module Name:** validation.c/validation.h

**Purpose:** Validate student data for correctness

### Function 2.1: isValidID

**Input:**
- id: character pointer (student ID)
- students: Student array (existing records)
- count: integer (number of existing students)

**Pre-condition:** id is not NULL, students array is initialized

**Logic:**
```
FUNCTION isValidID(id, students, count):
    IF length(id) == 0 THEN
        RETURN 0
    END IF
    
    FOR each character c in id DO
        IF c is not alphanumeric THEN
            RETURN 0
        END IF
    END FOR
    
    FOR i = 0 to count-1 DO
        IF students[i].id == id THEN
            RETURN 0
        END IF
    END FOR
    
    RETURN 1
END FUNCTION
```

**Output:** 1 if valid, 0 if invalid

### Function 2.2: isValidName

**Input:** name (character pointer)

**Pre-condition:** name is not NULL

**Logic:**
```
FUNCTION isValidName(name):
    IF length(name) == 0 THEN
        RETURN 0
    END IF
    
    FOR each character c in name DO
        IF c is not alphabet AND c is not space THEN
            RETURN 0
        END IF
    END FOR
    
    RETURN 1
END FUNCTION
```

**Output:** 1 if valid, 0 if invalid

### Function 2.3: isValidMarks

**Input:** marks (float)

**Pre-condition:** None

**Logic:**
```
FUNCTION isValidMarks(marks):
    RETURN (marks >= 0 AND marks <= 100)
END FUNCTION
```

**Output:** 1 if valid, 0 if invalid

**Coupling:** Low (Depends only on student.h)

**Cohesion:** High (All functions related to validation)

---

## Module 3: Result Computation

**Module Name:** computation.c/computation.h

**Purpose:** Calculate student results, grades, and CGPA

### Function 3.1: calculateGrade

**Input:** s (Student pointer)

**Pre-condition:** s->percentage is calculated

**Logic:**
```
FUNCTION calculateGrade(s):
    IF s->percentage >= 90 THEN
        s->grade = "O"
    ELSE IF s->percentage >= 85 THEN
        s->grade = "A+"
    ELSE IF s->percentage >= 75 THEN
        s->grade = "A"
    ELSE IF s->percentage >= 65 THEN
        s->grade = "B+"
    ELSE IF s->percentage >= 60 THEN
        s->grade = "B"
    ELSE IF s->percentage >= 55 THEN
        s->grade = "C"
    ELSE IF s->percentage >= 50 THEN
        s->grade = "D"
    ELSE
        s->grade = "F"
    END IF
END FUNCTION
```

**Output:** s->grade is set

### Function 3.2: calculateCGPA

**Input:** percentage (float)

**Pre-condition:** percentage is between 0 and 100

**Logic:**
```
FUNCTION calculateCGPA(percentage):
    IF percentage >= 90 THEN RETURN 10.0
    ELSE IF percentage >= 85 THEN RETURN 9.0
    ELSE IF percentage >= 75 THEN RETURN 8.0
    ELSE IF percentage >= 65 THEN RETURN 7.0
    ELSE IF percentage >= 60 THEN RETURN 6.0
    ELSE IF percentage >= 55 THEN RETURN 5.5
    ELSE IF percentage >= 50 THEN RETURN 5.0
    ELSE RETURN 0.0
END FUNCTION
```

**Output:** CGPA value (float)

### Function 3.3: computeResults

**Input:** s (Student pointer)

**Pre-condition:** s->marks array is filled

**Logic:**
```
FUNCTION computeResults(s):
    s->total = 0
    s->passed = 1
    
    FOR i = 0 to NUM_SUBJECTS-1 DO
        s->total = s->total + s->marks[i]
        IF s->marks[i] < 50 THEN
            s->passed = 0
        END IF
    END FOR
    
    s->percentage = s->total / NUM_SUBJECTS
    s->cgpa = calculateCGPA(s->percentage)
    calculateGrade(s)
END FUNCTION
```

**Output:** s->total, s->percentage, s->cgpa, s->grade, s->passed are set

**Coupling:** Low (Depends only on student.h)

**Cohesion:** High (All computation functions)

---

## Module 4: File Handler

**Module Name:** filehandler.c/filehandler.h

**Purpose:** Read and parse student data from files

### Function 4.1: readStudentsFromFile

**Input:**
- filename: character pointer (file path)
- students: Student array (to store records)

**Pre-condition:** students array has space for MAX_STUDENTS

**Logic:**
```
FUNCTION readStudentsFromFile(filename, students):
    OPEN file with filename
    IF file cannot be opened THEN
        PRINT error message
        RETURN 0
    END IF
    
    count = 0
    
    WHILE reading line from file AND count < MAX_STUDENTS DO
        PARSE line: id, name, marks[0-4]
        
        IF NOT isValidID(id, students, count) THEN
            PRINT error
            CONTINUE
        END IF
        
        IF NOT isValidName(name) THEN
            PRINT error
            CONTINUE
        END IF
        
        valid = 1
        FOR each mark in marks DO
            IF NOT isValidMarks(mark) THEN
                PRINT error
                valid = 0
                BREAK
            END IF
        END FOR
        
        IF NOT valid THEN
            CONTINUE
        END IF
        
        computeResults(temp)
        students[count] = temp
        count = count + 1
    END WHILE
    
    CLOSE file
    RETURN count
END FUNCTION
```

**Output:** Number of successfully loaded students (integer)

**Coupling:** Medium (Uses validation and computation modules)

**Cohesion:** High (File operations only)

---

## Module 5: Display

**Module Name:** display.c/display.h

**Purpose:** Display results and statistics

### Function 5.1: displayReport

**Input:**
- students: Student array
- count: integer (number of students)

**Pre-condition:** students array is populated, count > 0

**Logic:**
```
FUNCTION displayReport(students, count):
    PRINT table header
    
    FOR i = 0 to count-1 DO
        PRINT students[i].id
        PRINT students[i].name
        FOR j = 0 to NUM_SUBJECTS-1 DO
            PRINT students[i].marks[j]
        END FOR
        PRINT students[i].total
        PRINT students[i].percentage
        PRINT students[i].grade
        PRINT students[i].cgpa
        PRINT students[i].passed status
    END FOR
    
    PRINT table footer
END FUNCTION
```

**Output:** Formatted table printed to console

### Function 5.2: displayStatistics

**Input:**
- students: Student array
- count: integer (number of students)

**Pre-condition:** students array is populated, count > 0

**Logic:**
```
FUNCTION displayStatistics(students, count):
    totalPercentage = 0
    highest = students[0].percentage
    lowest = students[0].percentage
    gradeCount[8] = {0}
    
    FOR i = 0 to count-1 DO
        totalPercentage = totalPercentage + students[i].percentage
        
        IF students[i].percentage > highest THEN
            highest = students[i].percentage
        END IF
        
        IF students[i].percentage < lowest THEN
            lowest = students[i].percentage
        END IF
        
        INCREMENT gradeCount for students[i].grade
    END FOR
    
    PRINT average = totalPercentage / count
    PRINT highest
    PRINT lowest
    PRINT gradeCount distribution
END FUNCTION
```

**Output:** Statistics printed to console

**Coupling:** Low (Depends only on student.h)

**Cohesion:** High (Display functions only)

---

## Module 6: Main Program

**Module Name:** main.c

**Purpose:** Entry point and orchestration

**Input:** User input for filename

**Pre-condition:** None

**Logic:**
```
FUNCTION main():
    DECLARE students array[MAX_STUDENTS]
    DECLARE count: integer
    DECLARE filename: character array
    
    PRINT welcome message
    INPUT filename from user
    
    count = readStudentsFromFile(filename, students)
    
    IF count == 0 THEN
        PRINT error message
        RETURN 1
    END IF
    
    PRINT success message with count
    
    displayReport(students, count)
    displayStatistics(students, count)
    
    RETURN 0
END FUNCTION
```

**Output:** Program exit code

**Coupling:** Medium (Uses filehandler and display modules)

**Cohesion:** High (Program orchestration only)

---

## Quality Characteristics

### Usability
- Clear prompts and error messages
- Tabular output format for easy reading
- Simple file input mechanism

### Efficiency
- Single file read pass
- Minimal memory usage (static arrays)
- O(n) time complexity for most operations
- No unnecessary data copies

### Reusability
- Independent modules can be used in other applications
- Validation functions reusable for any student system
- Computation logic separated from I/O
- Generic data structures

### Interoperability
- Standard C file I/O (works across platforms)
- CSV input format (standard data exchange)
- Can be called from Python using ctypes
- Can be compiled as shared library for use in other programs

---

## Module Dependency Graph

```
main.c
  ├── filehandler.h
  │     ├── student.h
  │     ├── validation.h
  │     └── computation.h
  └── display.h
        └── student.h

validation.h
  └── student.h

computation.h
  └── student.h
```

**Characteristics:**
- Low coupling: Modules depend only on necessary headers
- High cohesion: Each module has single, well-defined purpose
- Can be separately compiled
- Clear interfaces through header files