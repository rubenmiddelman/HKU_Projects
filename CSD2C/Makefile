CC = g++
CFLAGS = -I/usr/local/include -Wall -std=c++1z
LDFLAGS= -ljack

all: example

example : Jack/jack_module.o filter/lpf.o osc.o tremelo/sine.o tremelo/Osc.o bandpass/Biquad.o bandpass/Cascade.o bandpass/ChebyshevI.o bandpass/ChebyshevII.o bandpass/Custom.o bandpass/PoleFilter.o bandpass/RBJ.o bandpass/State.o bandpass/Butterworth.o main.o
	$(CC) -o $@ $(CFLAGS) jack_module.o lpf.o osc.o tremelo/sine.o tremelo/Osc.o bandpass/Biquad.o bandpass/Cascade.o bandpass/ChebyshevI.o bandpass/ChebyshevII.o bandpass/Custom.o bandpass/PoleFilter.o bandpass/RBJ.o bandpass/State.o bandpass/Butterworth.o main.o $(LDFLAGS) -llo


.cpp.o:folders
	$(CC) -c $< $(CFLAGS)

clean:
	rm -f *.o
	rm -f example
