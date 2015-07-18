#include "ServoControl.h"

ServoControl::ServoControl() {
    this->reset();
}

void ServoControl::init(unsigned short base_pin, unsigned short arm_pin, bool reverse) {
  this->reverse = reverse;

  this->attach(base_pin, arm_pin);
  
  this->base.init(reverse);
  this->arm.init(reverse);
  delay(1000);
}

void ServoControl::reset() { 
    this->status = STATUS_IDLE;
    this->ready = false;
    
    this->action_queue_length = 0;
    this->action_ptr = 0;
}

void ServoControl::attach(unsigned short base_pin, unsigned short arm_pin) {
    this->base.attach(base_pin);
    this->arm.attach(arm_pin);
}

void ServoControl::detach() {
    this->base.detach();
    this->arm.detach();
}

void ServoControl::set_instructions(char *instructions, int len) {
  for(int i = 0; i < len; i++) {
    switch(instructions[i]) {
    case 'F':
        this->queue_flip();
        break;
    case 'T':
        this->queue_turn();
        break;
    case 'H':
        this->queue_hold();
        break;
    default:
        break;
    }
  }
}

void ServoControl::start() {
    this->status = STATUS_SOLVING;
    this->ready = true;
}

void ServoControl::update() {
    if(this->status != STATUS_SOLVING) {
        return;
    }
    
    this->ready = this->arm.ready() && this->base.ready();

    if(this->ready && this->action_ptr < this->action_queue_length) {
      this->execute_action(this->action_queue[this->action_ptr++]);
    } else if (this->action_ptr == this->action_queue_length) {
      this->reset();
      this->arm.init(this->reverse);
      this->base.init(this->reverse);
    }

    this->base.update();
    this->arm.update();
}

/* ACTIONS */
void ServoControl::queue_action(ServoAction action) {
  if(this->action_queue_length >= MAX_ACTIONS) {
    return;
  }
  
  this->action_queue[this->action_queue_length++] = action;
}

void ServoControl::execute_action(ServoAction action) {
  
  switch(action) {
  case ACTION_BASE_TURN:
    this->base.turn();
    break;
  case ACTION_ARM_PUSH:
    this->arm.push();
    break;
  case ACTION_ARM_OFF:
    this->arm.off();
    break;
  case ACTION_ARM_HOLD:
    this->arm.hold();
    break;
  default:
    break;
  }
}

void ServoControl::queue_flip() {
    this->queue_action(ACTION_ARM_PUSH);
    this->queue_action(ACTION_ARM_OFF);
}

void ServoControl::queue_turn() {
  this->queue_action(ACTION_ARM_OFF);
  this->queue_action(ACTION_BASE_TURN);
}

void ServoControl::queue_hold() {
  this->queue_action(ACTION_ARM_HOLD);
  this->queue_action(ACTION_BASE_TURN);
  this->queue_action(ACTION_ARM_OFF);
}

void ServoControl::stop() {
    this->reset();
}
