# MOTOR 

import requests
import time
import json
import l293d

from socketio_client.manager import Manager
import gevent
from gevent import monkey
monkey.patch_socket()

io = Manager('http', 'socket-fp-soft-eng.herokuapp.com', 80)
socket = io.socket('/')

motor1 = l293d.DC(22,18,16)
message = ''


@socket.on_connect()
def connect():
    print('Connected')

@socket.on('door')
def chat_welcome(msg):
    if (msg == 'UNLOCK'):   
     
        #print ("Your phone is on the perimeter")
                
        # motor1.clockwise()
        # time.sleep(1)
        # motor1.stop()
        
        print ("Door unlocked")
        
    elif msg == 'LOCK':
                
        #print ("Your phone is not on the perimeter")
                
        # motor1.anticlockwise()            
        # time.sleep(1)
        # motor1.stop()
        
        print ("Door locked")

@socket.on('lock')
def lock_door():
    #print ("Your phone is not on the perimeter")
                
        # motor1.anticlockwise()            
        # time.sleep(1)
        # motor1.stop()
        
        print ("Door locked")

io.connect()
gevent.wait()
