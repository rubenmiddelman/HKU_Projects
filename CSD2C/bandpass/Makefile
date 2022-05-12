CC = g++
CFLAGS = -I/usr/local/include -Wall -std=c++17
LDFLAGS= -ljack

all: example

example : jack_module.o Butterworth.o main_original.o Biquad.o Cascade.o ChebyshevI.o ChebyshevII.o Custom.o PoleFilter.o RBJ.o State.o
	$(CC) -o $@ $(CFLAGS) jack_module.o Butterworth.o main_original.o Biquad.o Cascade.o ChebyshevI.o ChebyshevII.o Custom.o PoleFilter.o RBJ.o State.o $(LDFLAGS)

.cpp.o:
	$(CC) -c $< $(CFLAGS)

clean:
	rm -f *.o
	rm -f example
