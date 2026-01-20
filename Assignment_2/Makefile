CC = gcc
CFLAGS = -Wall -Wextra -std=c11
TARGET = student_system
OBJS = main.o validation.o computation.o filehandler.o display.o

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $(TARGET) $(OBJS)

main.o: main.c student.h filehandler.h display.h
	$(CC) $(CFLAGS) -c main.c

validation.o: validation.c validation.h student.h
	$(CC) $(CFLAGS) -c validation.c

computation.o: computation.c computation.h student.h
	$(CC) $(CFLAGS) -c computation.c

filehandler.o: filehandler.c filehandler.h student.h validation.h computation.h
	$(CC) $(CFLAGS) -c filehandler.c

display.o: display.c display.h student.h
	$(CC) $(CFLAGS) -c display.c

clean:
	rm -f $(OBJS) $(TARGET)

run: $(TARGET)
	./$(TARGET)

.PHONY: all clean run
