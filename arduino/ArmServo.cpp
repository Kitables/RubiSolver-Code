#include "ArmServo.h"

ArmServo::ArmServo()
: RubiServo() {
}

void ArmServo::init() {
    this->move_to(ARM_OFF);
    delay(1000);
}

void ArmServo::off() {
  this->reset_queue();
  this->queue_movement(750, ARM_OFF);
}

void ArmServo::hold() {
  this->reset_queue();
  this->queue_movement(1000, ARM_HOLD);
}

void ArmServo::push() {
  this->reset_queue();
  this->queue_movement(1000, ARM_PUSH);
}
