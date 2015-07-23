#include "Animation.h"

Animation::Animation() {
  this->complete = true;
}

void Animation::set(int duration, int start_pos, int end_pos) {
  this->duration = duration;
  this->start_pos = start_pos;
  this->end_pos = end_pos;
  this->delta = end_pos - start_pos;
  this->start_time = 0;
  this->complete = false;
}

int Animation::update() {
  if(this->start_time == 0) {
    this->start_time = millis();
  }
  
  return this->interpolate(millis() - this->start_time);
}

int Animation::interpolate(unsigned long t) {
  this->complete = t >= this->duration;
  if(this->complete) {
    return this->end_pos;
  }

  float pos = (float)t / ((float)this->duration / 2.0f);

  if(pos < 1.0f) {
    return (int)(this->delta / 2.0f * pos * pos * pos + this->start_pos);
  }
  
  pos -= 2;
  return (int)(this->delta / 2.0f * (pos * pos * pos + 2.0f) + this->start_pos);
}

bool Animation::done() {
  return this->complete;
}
