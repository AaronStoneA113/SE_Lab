/*
 * FILE: validation.h
 * Module: Input Validation
 * Purpose: Validate student data
 */

#ifndef VALIDATION_H
#define VALIDATION_H

#include "student.h"

int isValidID(char *id, Student *students, int count);
int isValidName(char *name);
int isValidMarks(float marks);

#endif

