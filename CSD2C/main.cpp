#include <iostream>
#include <thread>
#include <cstdlib> //for rand()
#include "Jack/jack_module.h"
#include "math.h"
#include "filter/lpf.h"
#include "OSC/osc.h"
#include "tremelo/Osc.h"
#include "tremelo/sine.h"
#include "bandpass/Iir.h"

#define PI_2 6.28318530717959

float x;
float y;
float fx;
int effect = 1;

class localOSC : public OSC
{
  int realcallback(const char *path,const char *types,lo_arg **argv,int argc)
  {
  string msgpath=path;
  if(!msgpath.compare("/effect")){
    fx = argv[0]->f;
    effect = argv[0]->i;
    std::cout << "effect set to: " << effect << '\n';
  }
    if(!msgpath.compare("/x")){
      x = argv[0]->f;
    }
    if(!msgpath.compare("/y")){
        y = argv[0]->f;
    }

    return 0;
  } // realcallback()
};


int main(int argc, char ** argv) {
	// create a JackModule instance
	JackModule jack;

	// init the jack, use program name as JACK client name
	jack.init(argv[0]);
	double samplerate = jack.getSamplerate();
	localOSC osc;
	string serverport="7777";
  std::cout << fx << '\n';
  osc.init(serverport);
    osc.set_callback("/effect","i");
    osc.set_callback("/x","f");
    osc.set_callback("/y","f");
	osc.start();
	cout << "Listening on port " << serverport << endl;


	float c = 800;

	// cutoff, res, sr
	LPF lpf(c, 0.0, samplerate);
  Sine sine(20, samplerate);
  sine.setAmp(1.0);

  const int order = 8; // 4th order (=2 biquads)
  Iir::Butterworth::BandPass<order> f;
  f.setup (samplerate, 1000, 1200);


	//assign a function to the JackModule::onProces
	jack.onProcess = [&](jack_default_audio_sample_t * inBuf,
		jack_default_audio_sample_t * outBuf, jack_nframes_t nframes) {

			for (unsigned int i = 0; i < nframes; i++) {
        float oscCut;
        //
        if(effect == 1){
				   float sample = lpf.update(inBuf[i]);
				   outBuf[i] = sample * y;
           oscCut = x *20000;
           lpf.setCutoff(oscCut);
        }
        if(effect == 3){
          float sample = ((sine.getSample()*0.5)+0.5)* inBuf[i];
          sine.tick();
          outBuf[i] = sample;
          sine.setFrequency(x*50);
          //std::cout << sample << '\n';
        }
        if(effect == 2){
          float sample = f.filter(inBuf[i]);
          outBuf[i] = sample;
          f.setup (samplerate, x*15000, x*15000+200);
        }
			}

			return 0;
	};

	jack.autoConnect();

	//keep the program running and listen for user input, q = quit
	bool running = true;
	while (running) {
		switch (std::cin.get()) {
			case 'q':
				running = false;
				jack.end();
				break;
        case '2':
  				effect = 2;
          break;
        case '1':
          effect = 1;
          break;
          case '3':
            effect = 3;
            break;
		}
	}

	//end the program
	return 0;
} // main()
