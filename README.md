# RubiSolver-Code
All Files Nesscary For Kitables RubiSolver
get a Rubisolver at kitables.co/kits
full instructions on Instructables under Kitables Rubisolver Rubik's Cube Solver
Open the arduino program
Open rsolve.ino
Tools>Board>Arduino Uno should be selected
Go to tools>serial port then select the Microcontroller USB port (Should look like "COM14" or "COM3")
IF THE SERIAL PORT MENU IS INACTIVE, then you're probably running one of the versions of Windows which doesn't play well with Microcontroller and you need to manually select a driver.
To do this type "Device Manager" in the start menu to open the Device Manager program
Expand the list labeled "Ports" OR "Other Devices"
You should see something that looks like "USB-Serial...". Right click and go to Properties
Driver>Update Driver>Browse my computer for driver software
Navigate to and select the drivers folder in the Arduino program install directory
Once installed you may need to restart the Arduino program and/or unplug the Rubisolver and try again
With the Rubisolver plugged in click the upload button (arrow icon) in the upper left corner of the Arduino program
If the process is successful you'll get a "Done Uploading" notification with no errors.
