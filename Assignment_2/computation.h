/*
 * FILE: computation.h
 * Module: Result Computation
 * Purpose: Calculate grades, CGPA, totals
 */

#ifndef COMPUTATION_H
#define COMPUTATION_H

#include "student.h"

void calculateGrade(Student *s);
float calculateCGPA(float percentage);
void computeResults(Student *s);

#endif

