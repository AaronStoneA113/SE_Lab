/*
 * FILE: computation.c
 * Module: Result Computation Implementation
 */

#include <string.h>
#include "computation.h"

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

