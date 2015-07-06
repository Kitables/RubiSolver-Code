#include <Servo.h>
#include "Comm.h"
#include "ServoControl.h"

#define BASE_PIN 5
#define ARM_PIN 6

Comm comm;
ServoControl servo_control;

void setup() {
  Serial.begin(115200);
  servo_control.init(BASE_PIN, ARM_PIN);
}

void loop() {
    if(comm.has_data()) {      
        char command_char = comm.read_command();
        comm.execute_command(command_char, &servo_control);
    }

    servo_control.update();
}
