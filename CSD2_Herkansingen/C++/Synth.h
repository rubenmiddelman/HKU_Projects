#ifndef _SYNTH_H
#define _SYNTH_H
#include <iostream>
#include "jack_module.h"
#include "math.h"
#include "sine.h"
#include "Osc.h"

class Synth{
public:
  Synth();
  ~Synth();
  int MainSynthFunc(int freq);
};
#endif
