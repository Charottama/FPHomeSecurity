# Import for Motion Sensor
import RPi.GPIO as GPIO
import time
import numpy as np
from datetime import datetime
import os
import requests

'''WebName1 = 'http://209.97.172.241:7000/home-security/user/sign-in'
Username = 'string'
Password = 'H3h3h3?!'
LogIn = requests.post(WebName1, json = {'email': Username, 'password': Password}, headers = {'Content-Type': 'application/json'})
LogIn1 = LogIn.json()
ID = LogIn1['data']['id']
token = LogIn1['data']['token']
print(LogIn1['data']['token'])
print(LogIn1['data']['id'])
WebName = "http://209.97.172.241:7000//home-security/user"
get = requests.get(WebName, headers = {'accessToken': token})
loader = get.json()
email = ""

while True:
    i = 0
    if loader['data'][i]['email'] == Username:
        email = loader['data'][i]['email']
        break
    i = i + 1
print(email)


#gmail_user = "anonymousanon9182@gmail.com"
#gmail_pwd = "H3ll0_world"
to = "TO MAIL %s" % (email)
subject = "Security Alert"
text = "There is some activity. See the attached picture."
'''

url = 'http://192.168.1.128:3000/ir'

sensor = 4

GPIO.setmode(GPIO.BCM)
GPIO.setup(sensor, GPIO.IN, GPIO.PUD_DOWN)

previous_state = "LOW"
current_state = False
new_state = "LOW"
while True:
    
    current_state = GPIO.input(sensor)
    

    #if current_state != previous_state:
        #new_state = "HIGH" if current_state else "LOW"
        #print("GPIO pin %s is %s" % (sensor, new_state))
        
    if current_state and previous_state != "HIGH":
        new_state = "HIGH"
        toApp = 1

        print(toApp)
        # Trs post ke App
        requests.post(url, json = {'status': toApp}, headers = {'Content-Type': 'application/json'})

    elif current_state == 0 and previous_state != "LOW":
        new_state = "LOW"
        toApp = 0
        
        print(toApp)
        # Trs post ke App
        requests.post(url, json = {'status': toApp}, headers = {'Content-Type': 'application/json'})
    print(previous_state)
    # requests.post(url, json = {'status': toApp}, headers = {'Content-Type': 'application/json'})  
    print("Detected" if new_state == 'HIGH' else "Not Detected", new_state)

    time.sleep(1)
    previous_state = new_state
    print("p",previous_state)
