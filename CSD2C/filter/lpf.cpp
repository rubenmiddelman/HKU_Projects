#include "lpf.h"
#include <cmath>
#include <iostream>

LPF::LPF(float cutoff, float resonance, float samplerate) {
    this->cutoff = cutoff;
    this->resonance = resonance;
    // convert cutoff and res to formula values
    c = pow(0.5, (128 - (cutoff / 24000 * 128)) / 16.0);
    r = pow(0.5, ((resonance * 128) + 24) / 16.0);
};

LPF::~LPF() {};

// algoritm with resonance, a lot of it
float LPF::update(float input) {

    // v0 = (1 - r * c) * v0 - (c) * v1 + (c) * input;
    v0 = (1 - r * c) * v0 - (c) * v1 + sqrt(c) * input;
    v1 = (1 - r * c) * v1 + (c) * v0;

    return output = tanh(v1); //added tanh() saturation as a form of limiting, the resonance can be VERY loud

    // based on: https://www.musicdsp.org/en/latest/Filters/185-1-rc-and-c-filter.html
}