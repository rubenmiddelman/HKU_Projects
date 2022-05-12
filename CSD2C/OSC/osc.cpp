
#include "osc.h"


OSC::OSC()
{
}



int OSC::_wrap_callback(const char *path,const char *types,
          lo_arg **argv,int argc,void *data,void *user_data)
{
  return ((((OSC *) user_data)->realcallback(path,types,argv,argc)));
}


static void errorhandler(int num, const char* msg, const char* where)
{
   cout << "Error " << num <<
    msg << " " <<
    where << endl;

  exit(1);
}


/*
 * start a new server in its own thread, waiting for data on the specified port
 */
void OSC::init(string serverport)
{
  server = lo_server_thread_new(serverport.c_str(),errorhandler);
}


void OSC::set_callback(const char *path,const char *types)
{
  lo_server_thread_add_method(server,path,types,_wrap_callback,this);
}



void OSC::start()
{
  if(lo_server_thread_start(server) < 0)
  {
    cout << "Server failed to start" << endl;
    exit(1);
  }
}



int OSC::realcallback(const char *path,const char *types,lo_arg **argv,int argc)
{
 cout << "blah\n";
  return 0;
}
