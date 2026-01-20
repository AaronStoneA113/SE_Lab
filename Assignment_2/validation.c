/*
 * FILE: validation.c
 * Module: Input Validation Implementation
 */

#include <string.h>
#include <ctype.h>
#include "validation.h"

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

