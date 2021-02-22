from socketio_client.manager import Manager

import gevent
from gevent import monkey
monkey.patch_socket()

io = Manager('http', 'socket-fp-soft-eng.herokuapp.com', 80)
socket = io.socket('/')

@socket.on_connect()
def connect():
    print 'Connected'
    socket.emit()

@socket.on('capture')
def chat_welcome(msg):
    print 'Opened Door!'

io.connect()
gevent.wait()
