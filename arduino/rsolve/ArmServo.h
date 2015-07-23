#ifndef ARM_SERVO_H
#define ARM_SERVO_H

#include <Servo.h>
#include "RubiServo.h"

class ArmServo : public RubiServo {
private:
  int ARM_OFF;
  int ARM_HOLD;
  int ARM_PUSH;
public:
  ArmServo();

  virtual void init(bool reverse);
  void off();
  void hold();
  void push();

};

#endif
