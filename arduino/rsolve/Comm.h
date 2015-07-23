#ifndef COMM_H
#define COMM_H

#include <Arduino.h>
#include "ServoControl.h"

// HANDSHAKE COMMAND
// FORM = "H"
#define COMMAND_HANDSHAKE 'H'

// STOP COMMAND
// FORM = "S"
#define COMMAND_STOP 'S'

// INSTRUCTION COMMAND
// FORM = "I<len><T,F,H * len>"
#define COMMAND_INSTRUCTIONS 'I'

class Comm {
private:
  char buffer[256];
  int buffer_len;
public:
  Comm();

  bool has_data();

  char fake(const char *fake_data);
  char read_command();
  char execute_command(char command, ServoControl *servo_control);

  // command execs
  void handle_stop(ServoControl *servo_control);
  void handle_instructions(ServoControl *servo_control);
  void handle_handshake(ServoControl *servo_control);

  // outgoing
  void ack();
};

#endif
