#Import for Camera
import cv2
import requests # BE
import time
import smtplib
import os

from datetime import datetime

from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders

from socketio_client.manager import Manager
import gevent
from gevent import monkey
monkey.patch_socket()

io = Manager('http', 'socket-fp-soft-eng.herokuapp.com', 80)
socket = io.socket('/')


url = 'http://178.128.214.101:7000/home-security/image/hardware' # POST url
url_put = 'http://178.128.214.101:7000/home-security/image/message/'

imgid = ''

# Ke BE
def uploadimg(picname):
    files = {'capturedImage': open(picname, 'rb')}
    r = requests.post(url, files=files)
    print(r)
    print(r.json()['data'])

    imgid = r.json()['data']['id']
    print(imgid)
    #################################################
    return imgid 
    # 

@socket.on_connect()
def connect():
    print 'Connected'

@socket.on('capture-door')
def door(msg):
        global url_put
        if msg == 'SAFE':
                messageType = 'safe'
                message = 'User unlocked door'
                command = 'UNLOCK'
                print("hai unlock door")
        elif msg == 'STRANGER':
                messageType = 'warning'
                message = 'Someone is trying to copy your face'
                command = 'capture'
                print("hai stranger")

        imgfile = capture_img()
        imgid = uploadimg(imgfile)

        url_send = url_put + imgid
        print(url_send)

        r = requests.put( url_send, json = {'messageType': messageType,
                                        'message': message,
                                        'command': command})

        print(r.json())
        os.remove(imgfile)

@socket.on('capture-window')
def window(msg):
        global url_put
        if msg == 'SAFE':
                messageType = 'safe'
                message = 'User opened window 1'
                command = 'capture'
                print("hai safe")
        elif msg == 'DANGER':
                messageType = 'warning'
                message = 'Someone is breaking into the house through window 1'
                command = 'capture'
                print("hai danger")
                
        imgfile = capture_img()
        imgid = uploadimg(imgfile)

        url_send = url_put + imgid
        print(url_send)
        
        r = requests.put( url_send , json = {'messageType': messageType,
                                        'message': message,
                                        'command': command})
        print(r.json())
        os.remove(imgfile)

def capture_img():
        cap = cv2.VideoCapture(0)
        ret, frame = cap.read()
        cap = cv2.VideoCapture(0)

        print ("Saving Photo")
    
        picname = datetime.now().strftime("%y-%m-%d-%H-%M-%s")
        picname = picname+'.jpg'
        cv2.imwrite(picname, frame)
        
        #print ("Sending image")

        #uploadimg(picname)

        #print ("Image sent")

       # os.remove(picname)

        return picname        

io.connect()
gevent.wait()
