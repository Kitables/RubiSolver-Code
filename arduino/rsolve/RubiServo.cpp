#include <Servo.h>
#include <Arduino.h>
#include "RubiServo.h"

RubiServo::RubiServo() {
    this->moving = false;
    this->reset_queue();
}

RubiServo::~RubiServo() {

}

bool RubiServo::ready() {
    return !this->moving;
}

void RubiServo::attach(unsigned short pin) {
    this->servo.attach(pin);
}

void RubiServo::detach() {
    this->servo.detach();
}

void RubiServo::reset_queue() {
  this->queue_len = 0;
  this->queue_ptr = 0;
}

void RubiServo::update() {
    if(this->animation.done() && this->queue_ptr < this->queue_len) {
      Movement movement = this->movement_queue[this->queue_ptr++];
      this->start_movement(movement.duration, movement.end_pos);
    } else if(this->animation.done()) {
      this->moving = false;
    }
  
    if(this->moving) {
        this->move_to(this->animation.update());
    }
}

void RubiServo::queue_movement(float duration, int end_pos) {
  if(this->queue_len >= MAX_QUEUE) {
    return;
  }
  
  Movement movement = {duration, end_pos};
  
  this->movement_queue[this->queue_len++] = movement;
}

void RubiServo::start_movement(float duration, int end_pos) {
    int current = this->servo.readMicroseconds();
    
    if(current != end_pos) {  
      this->moving = true;
      this->animation.set(duration, current, end_pos);
    }
}

void RubiServo::move_to(int uSec) {
    this->servo.writeMicroseconds(uSec);
}
