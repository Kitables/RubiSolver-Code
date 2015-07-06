#ifndef BASE_SERVO_H
#define BASE_SERVO_H

#include <Servo.h>
#include "RubiServo.h"

const int BASE_NO_TURN = 1240;
const int BASE_NO_TURN_OVER = 1200;
const int BASE_QUARTER_TURN = 2100;
const int BASE_QUARTER_TURN_OVER = 2165;

class BaseServo : public RubiServo {
private:
  bool rotated;
public:
  BaseServo();

  virtual void init();
  void turn();
};

#endif
