#include "Comm.h"

Comm::Comm() {
  memset(this->buffer, 0, sizeof(this->buffer));
  this->buffer_len = 0;
}

bool Comm::has_data() {
  return Serial.available() > 0;
}

char Comm::fake(const char *fake_data) {
  this->buffer_len = (int)fake_data[1];
  memcpy(this->buffer, fake_data, this->buffer_len);

  return fake_data[0];
}

char Comm::read_command() {
  return (char)Serial.read();
}

char Comm::execute_command(char command_char, ServoControl *servo_control) {
  switch(command_char) {
  case COMMAND_HANDSHAKE:
    this->handle_handshake(servo_control);
    break;
  case COMMAND_STOP:
    this->handle_stop(servo_control);
    break;
  case COMMAND_INSTRUCTIONS:
    this->handle_instructions(servo_control);
    break;
  default:
    this->handle_handshake(servo_control);
    break;
  }
}

void Comm::handle_handshake(ServoControl *servo_control) {
  this->ack();
}

void Comm::handle_stop(ServoControl *servo_control) { 
  servo_control->stop();
  this->ack();
}

void Comm::handle_instructions(ServoControl *servo_control) {
  while(Serial.available() == 0);
  
  this->buffer_len = Serial.read();
  int bytes_read = Serial.readBytes(this->buffer, this->buffer_len);
  
  if(bytes_read == this->buffer_len) {  
    this->ack();
  } else {
    Serial.print(this->buffer_len);
  }
  
  servo_control->reset();
  servo_control->set_instructions(this->buffer, this->buffer_len);
  servo_control->start();
}

void Comm::ack() {
  Serial.print('A');
}
