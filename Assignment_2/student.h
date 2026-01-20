/*
 * FILE: student.h
 * Module: Student Data Structure
 * Purpose: Define student structure and constants
 */

#ifndef STUDENT_H
#define STUDENT_H

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

#endif

