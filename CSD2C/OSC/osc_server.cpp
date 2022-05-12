

#include "osc.h"


// subclass OSC into a local class so we can provide our own callback
class localOSC : public OSC
{
  int realcallback(const char *path,const char *types,lo_arg **argv,int argc)
  {
  string msgpath=path;
// recieves the message with path and prints it
    cout << "path: " << msgpath << endl;
    if(!msgpath.compare("/x")){
      float x = argv[0]->f;
      cout << x << endl;
    }
    if(!msgpath.compare("/y")){
      float y = argv[0]->f;
      cout << y << endl;
    }

    return 0;
  } // realcallback()
};



int main()
{
int done = 0;
localOSC osc;
string serverport="7777";

  osc.init(serverport);
<<<<<< HEAD
=======
  osc.set_callback("/effect","iii");
>>>>>>> e5f99208afbf2d60d2a034b751394378866f7318
  osc.set_callback("/x","f");
  osc.set_callback("/y","f");

  osc.start();
  cout << "Listening on port " << serverport << endl;

  while (!done)
  {
    usleep(1000);
  }

  return 0;
}
