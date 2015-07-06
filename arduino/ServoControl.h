#ifndef SERVO_CONTROL_H
#define SERVO_CONTROL_H

#include "BaseServo.h"
#include "ArmServo.h"

#define MAX_ACTIONS 256

enum ServoControlStatus {
    STATUS_IDLE,
    STATUS_SOLVING
};

enum ServoAction {
  ACTION_BASE_TURN,
  ACTION_ARM_PUSH,
  ACTION_ARM_OFF,
  ACTION_ARM_HOLD
};

class ServoControl {
private:
    BaseServo base;
    ArmServo arm;
    
    int action_queue_length;
    int action_ptr;
    ServoAction action_queue[MAX_ACTIONS];

    ServoControlStatus status;
    bool ready;
public:
    ServoControl();
    void init(unsigned short base_pin, unsigned short arm_pin);
    void reset();

    void attach(unsigned short base_pin, unsigned short arm_pin);
    void detach();

    void set_instructions(char *instructions, int len);

    void start();

    void update();
    
    void queue_action(ServoAction action);
    void execute_action(ServoAction action);
    
    void queue_flip();
    void queue_turn();
    void queue_hold();
    void stop();
};

#endif
