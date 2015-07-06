#ifndef ARM_SERVO_H
#define ARM_SERVO_H

#include <Servo.h>
#include "RubiServo.h"

const int ARM_OFF = 1000;
const int ARM_HOLD = 1300;
const int ARM_PUSH = 3200;

class ArmServo : public RubiServo {
private:
public:
  ArmServo();

  virtual void init();
  void off();
  void hold();
  void push();

};

#endif
