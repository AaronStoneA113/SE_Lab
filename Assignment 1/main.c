#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_STUDENTS 100
#define NUM_SUBJECTS 5
#define MAX_ID_LEN 20
#define MAX_NAME_LEN 50

typedef struct {
    char id[MAX_ID_LEN];
    char name[MAX_NAME_LEN];
    float marks[NUM_SUBJECTS];
    float total;
    float percentage;
    char grade[3];
    float cgpa;
    int passed;
} Student;

int isValidID(char *id, Student *students, int count) {
    if (strlen(id) == 0) return 0;
    
    for (int i = 0; id[i]; i++) {
        if (!isalnum(id[i])) return 0;
    }
    
    for (int i = 0; i < count; i++) {
        if (strcmp(students[i].id, id) == 0) return 0;
    }
    
    return 1;
}

int isValidName(char *name) {
    if (strlen(name) == 0) return 0;
    
    for (int i = 0; name[i]; i++) {
        if (!isalpha(name[i]) && name[i] != ' ') return 0;
    }
    
    return 1;
}

int isValidMarks(float marks) {
    return marks >= 0 && marks <= 100;
}

void calculateGrade(Student *s) {
    if (s->percentage >= 90) strcpy(s->grade, "O");
    else if (s->percentage >= 85) strcpy(s->grade, "A+");
    else if (s->percentage >= 75) strcpy(s->grade, "A");
    else if (s->percentage >= 65) strcpy(s->grade, "B+");
    else if (s->percentage >= 60) strcpy(s->grade, "B");
    else if (s->percentage >= 55) strcpy(s->grade, "C");
    else if (s->percentage >= 50) strcpy(s->grade, "D");
    else strcpy(s->grade, "F");
}

float calculateCGPA(float percentage) {
    if (percentage >= 90) return 10.0;
    else if (percentage >= 85) return 9.0;
    else if (percentage >= 75) return 8.0;
    else if (percentage >= 65) return 7.0;
    else if (percentage >= 60) return 6.0;
    else if (percentage >= 55) return 5.5;
    else if (percentage >= 50) return 5.0;
    else return 0.0;
}

void computeResults(Student *s) {
    s->total = 0;
    s->passed = 1;
    
    for (int i = 0; i < NUM_SUBJECTS; i++) {
        s->total += s->marks[i];
        if (s->marks[i] < 50) {
            s->passed = 0;
        }
    }
    
    s->percentage = s->total / NUM_SUBJECTS;
    s->cgpa = calculateCGPA(s->percentage);
    calculateGrade(s);
}

int readStudentsFromFile(char *filename, Student *students) {
    FILE *fp = fopen(filename, "r");
    if (!fp) {
        printf("Error: Cannot open file %s\n", filename);
        return 0;
    }
    
    int count = 0;
    char line[256];
    
    while (fgets(line, sizeof(line), fp) && count < MAX_STUDENTS) {
        Student temp;
        char *token;
        int valid = 1;
        
        token = strtok(line, ",");
        if (!token) continue;
        strcpy(temp.id, token);
        
        for (int i = 0; temp.id[i]; i++) {
            if (temp.id[i] == '\n') temp.id[i] = '\0';
        }
        
        if (!isValidID(temp.id, students, count)) {
            printf("Invalid or duplicate ID: %s\n", temp.id);
            continue;
        }
        
        token = strtok(NULL, ",");
        if (!token) continue;
        strcpy(temp.name, token);
        
        for (int i = 0; temp.name[i]; i++) {
            if (temp.name[i] == '\n') temp.name[i] = '\0';
        }
        
        if (!isValidName(temp.name)) {
            printf("Invalid name: %s\n", temp.name);
            continue;
        }
        
        for (int i = 0; i < NUM_SUBJECTS; i++) {
            token = strtok(NULL, ",");
            if (!token) {
                valid = 0;
                break;
            }
            temp.marks[i] = atof(token);
            
            if (!isValidMarks(temp.marks[i])) {
                printf("Invalid marks for %s: %.2f\n", temp.id, temp.marks[i]);
                valid = 0;
                break;
            }
        }
        
        if (!valid) continue;
        
        computeResults(&temp);
        students[count++] = temp;
    }
    
    fclose(fp);
    return count;
}

void displayReport(Student *students, int count) {
    printf("\n");
    printf("================================================================================\n");
    printf("                        STUDENT RESULT REPORT                                   \n");
    printf("================================================================================\n");
    printf("%-10s %-20s ", "ID", "Name");
    for (int i = 0; i < NUM_SUBJECTS; i++) {
        printf("S%-2d   ", i + 1);
    }
    printf("Total  Percent Grade CGPA   Status\n");
    printf("--------------------------------------------------------------------------------\n");
    
    for (int i = 0; i < count; i++) {
        printf("%-10s %-20s ", students[i].id, students[i].name);
        for (int j = 0; j < NUM_SUBJECTS; j++) {
            printf("%-5.1f ", students[i].marks[j]);
        }
        printf("%-6.1f %-7.2f %-5s %-6.2f %s\n",
               students[i].total,
               students[i].percentage,
               students[i].grade,
               students[i].cgpa,
               students[i].passed ? "Pass" : "Fail");
    }
    printf("================================================================================\n");
}

void displayStatistics(Student *students, int count) {
    float totalPercentage = 0;
    float highest = students[0].percentage;
    float lowest = students[0].percentage;
    int gradeCount[8] = {0};
    
    for (int i = 0; i < count; i++) {
        totalPercentage += students[i].percentage;
        
        if (students[i].percentage > highest) {
            highest = students[i].percentage;
        }
        if (students[i].percentage < lowest) {
            lowest = students[i].percentage;
        }
        
        if (strcmp(students[i].grade, "O") == 0) gradeCount[0]++;
        else if (strcmp(students[i].grade, "A+") == 0) gradeCount[1]++;
        else if (strcmp(students[i].grade, "A") == 0) gradeCount[2]++;
        else if (strcmp(students[i].grade, "B+") == 0) gradeCount[3]++;
        else if (strcmp(students[i].grade, "B") == 0) gradeCount[4]++;
        else if (strcmp(students[i].grade, "C") == 0) gradeCount[5]++;
        else if (strcmp(students[i].grade, "D") == 0) gradeCount[6]++;
        else if (strcmp(students[i].grade, "F") == 0) gradeCount[7]++;
    }
    
    printf("\n");
    printf("CLASS STATISTICS\n");
    printf("--------------------------------------------------------------------------------\n");
    printf("Class Average Percentage: %.2f%%\n", totalPercentage / count);
    printf("Highest Percentage: %.2f%%\n", highest);
    printf("Lowest Percentage: %.2f%%\n", lowest);
    printf("\n");
    printf("GRADE DISTRIBUTION\n");
    printf("--------------------------------------------------------------------------------\n");
    printf("O:  %d students\n", gradeCount[0]);
    printf("A+: %d students\n", gradeCount[1]);
    printf("A:  %d students\n", gradeCount[2]);
    printf("B+: %d students\n", gradeCount[3]);
    printf("B:  %d students\n", gradeCount[4]);
    printf("C:  %d students\n", gradeCount[5]);
    printf("D:  %d students\n", gradeCount[6]);
    printf("F:  %d students\n", gradeCount[7]);
    printf("================================================================================\n");
}

int main() {
    Student students[MAX_STUDENTS];
    int count;
    char filename[100];
    
    printf("Student Result Processing System\n");
    printf("Enter input filename: ");
    scanf("%s", filename);
    
    count = readStudentsFromFile(filename, students);
    
    if (count == 0) {
        printf("No valid student records found.\n");
        return 1;
    }
    
    printf("\nSuccessfully loaded %d student records.\n", count);
    
    displayReport(students, count);
    displayStatistics(students, count);
    
    return 0;
}
