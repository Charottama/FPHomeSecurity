import RPi.GPIO as GPIO
import time
import numpy as np
import cv2
from datetime import datetime
import os

import smtplib
import time
import requests

from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders

#backend sending photo to database
WebName1 = 'http://209.97.172.241:7000/home-security/user/sign-in'
Username = 'bc@gmail.com'
Password = 'H3h3h3?!'
LogIn = requests.post(WebName1, json = {'email': Username, 'password': Password}, headers = {'Content-Type': 'application/json'})
print(LogIn)
LogIn1 = LogIn.json()
ID = LogIn1['data']['id']
token = LogIn1['data']['token']
print(LogIn1['data']['token'])
print(LogIn1['data']['id'])
WebName = "http://209.97.172.241:7000/home-security/user"
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
#gmail_pwd = "H3ll0_world" #Sender email password
#to = "anonymousanon9182@gmail.com" #Receiver email address
to = "TO MAIL %s" % (email)
subject = "Security Alert"
text = "There is some activity in your home. See the attached picture."

url = 'http://209.97.172.241:7000/home-security/image'

sensor = 4

GPIO.setmode(GPIO.BCM)
GPIO.setup(sensor, GPIO.IN, GPIO.PUD_DOWN)

previous_state = False
current_state = False

def uploadimg(picname):
    files = {'capturedImage': open(picname, 'rb')}
    r = requests.post(url, files=files)

while True:

    previous_state = current_state
    current_state = GPIO.input(sensor)

    if current_state != previous_state:
        new_state = "HIGH" if current_state else "LOW"
        print("GPIO pin %s is %s" % (sensor, new_state))

    if current_state:
        cap = cv2.VideoCapture(0)
        ret, frame = cap.read()

        cap = cv2.VideoCapture(0)

        print ("Saving Photo")
    
        picname = datetime.now().strftime("%y-%m-%d-%H-%M")

        picname = picname+'.jpg'

        cv2.imwrite(picname, frame)

        print ("Sending image")

        uploadimg(picname)

        print ("Image sent")

        os.remove(picname)

        time.sleep(3)

        



