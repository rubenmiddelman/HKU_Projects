#pragma once
#include "math.h"
#include <iostream>

class LPF {
public:
    LPF(float cutoff, float resonance, float samplerate);
    ~LPF();


    // update
    float update(float input);

    inline void setCutoff(float cutoff) {
        this->cutoff = cutoff;
        c = pow(0.5, (128 - (cutoff / 24000 * 128)) / 16.0);
    };
    inline void setRes(float res) {
        this->resonance = res;
        r = pow(0.5, ((resonance * 128) + 24) / 16.0);
    };


private:
    float cutoff;
    float resonance;
    float c, r; //converted formula values
    float output;

    float v0, v1 = 0;

};
