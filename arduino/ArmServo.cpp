#include "ArmServo.h"


ArmServo::ArmServo()
: RubiServo() {
}

void ArmServo::init(bool reverse) {
  if(reverse) {
    this->ARM_OFF = 2200;
    this->ARM_HOLD = 1900;
    this->ARM_PUSH = 0;
  } else {
    this->ARM_OFF = 1000;
    this->ARM_HOLD = 1300;
    this->ARM_PUSH = 3200;
  }

  this->move_to(this->ARM_OFF);
  delay(1000);
}

void ArmServo::off() {
  this->reset_queue();
  this->queue_movement(750, this->ARM_OFF);
}

void ArmServo::hold() {
  this->reset_queue();
  this->queue_movement(1000, this->ARM_HOLD);
}

void ArmServo::push() {
  this->reset_queue();
  this->queue_movement(1000, this->ARM_PUSH);
}
