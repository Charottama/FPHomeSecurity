Sersor-controller

Logic App that handles the changes each sensor is detecting. Whenever a sensor detects anything, it will send its status to this application. This app will then take necessary actions if needed.

Run:
npm start

----------

POST

/ir
Route for infrared motion sensor to send its status.

/fr 
Route for face recognition sensor to send its status.

/bt
Route for bluetooth sensor.


Functions:

verify_fr()
Logic method for the front door:
 - fr == 1 && bt == 1 -> user gets into the house; unlock the door; safe
 - fr == 1 && bt == 0 -> someone is trying to get into the house (using printed picture to copy your face, for example); warning

verify_ir()
Logic method for the windows:
 - ir == 1 && bt == 1 -> user opens window; safe
 - ir == 1 && bt == 0 -> intruder tries to breakin through window; warning
 
 