#ifndef RUBI_SERVO_H
#define RUBI_SERVO_H

#include "Animation.h"

#define MAX_QUEUE 5

const int ZERO_PULSE = 544;

struct Movement {
  float duration;
  int end_pos;
};

class RubiServo {
protected:
  Servo servo;
  Animation animation;
  bool moving;
  
  void reset_queue();
  Movement movement_queue[MAX_QUEUE];
  int queue_len;
  int queue_ptr;
public:
  RubiServo();
  ~RubiServo();
  
  virtual void init(bool reverse) = 0;
  bool ready();

  void attach(unsigned short pin);
  void detach();
  
  void queue_movement(float duration, int end_pos);
  void start_movement(float duration, int end_pos);
  void move_to(int uSec);
  
  void update();
};

#endif
