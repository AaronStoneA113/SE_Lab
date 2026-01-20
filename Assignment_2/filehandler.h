/*
 * FILE: filehandler.h
 * Module: File Operations
 * Purpose: Read student data from files
 */

#ifndef FILEHANDLER_H
#define FILEHANDLER_H

#include "student.h"

int readStudentsFromFile(char *filename, Student *students);

#endif

