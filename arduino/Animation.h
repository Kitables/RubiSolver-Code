#ifndef ANIMATION_H
#define ANIMATION_H

#include <Arduino.h>

class Animation {
private:
  unsigned long duration;
  int start_pos;
  int end_pos;
  float delta;
  unsigned long start_time;

  bool complete;
public:
  Animation();

  void set(int duration, int start_pos, int end_pos);
  int update();
  int interpolate(unsigned long t);

  bool done();
};

#endif
