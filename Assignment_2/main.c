/*
 * FILE: main.c
 * Module: Main Program
 * Purpose: Entry point and orchestration
 */

#include <stdio.h>
#include "student.h"
#include "filehandler.h"
#include "display.h"

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
