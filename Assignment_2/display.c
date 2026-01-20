/*
 * FILE: display.c
 * Module: Output Display Implementation
 */

#include <stdio.h>
#include <string.h>
#include "display.h"

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
