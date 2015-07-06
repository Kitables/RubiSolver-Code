#include "BaseServo.h"

BaseServo::BaseServo()
: RubiServo() {
}

void BaseServo::init() {
    this->rotated = false;
    this->move_to(BASE_NO_TURN);
    delay(1000);
}

void BaseServo::turn() {
  this->reset_queue();
  
  if(!this->rotated) {
    this->queue_movement(700, BASE_QUARTER_TURN_OVER);
    this->queue_movement(500, BASE_QUARTER_TURN);
  } else {
    this->queue_movement(700, BASE_NO_TURN_OVER);
    this->queue_movement(500, BASE_NO_TURN);
  }

  this->rotated = !this->rotated;
}
