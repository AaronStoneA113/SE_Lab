/*
 * FILE: filehandler.c
 * Module: File Operations Implementation
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "filehandler.h"
#include "validation.h"
#include "computation.h"

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
