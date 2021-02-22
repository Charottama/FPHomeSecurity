var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, 'frame.jpg')
  }
});
var upload = multer({}); //{storage: storage});
var uploading = 0;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

/**
 * NOTIFICATION
 */
app.post("/message-notification", function(req, res) {
    io.emit("FromAPI", req.body);
    console.log("Message Notification");
    res.send(req.body);
});

/**
 * WINDOW CAPTURE
 */
app.post('/command-capture-safe-window', function (req, res) {
    io.emit('capture-window', 'SAFE');
    console.log('Capture Window Safe');
    res.send({
      'message': 'successful'
  });
});

app.post('/command-capture-danger-window', function (req, res) {
    io.emit('capture-window', 'DANGER');
    console.log('Capture Window Danger');
    res.send({
      'message': 'successful'
  });
});

/**
 * DOOR CAPTURE
 */
app.post('/command-capture-safe-door', function (req, res) {
    io.emit('capture-door', 'SAFE');
    console.log('Capture Door Safe');
    res.send({
      'message': 'successful'
  });
});

app.post('/command-capture-stranger-door', function (req, res) {
    io.emit('capture-door', 'STRANGER');
    console.log('Capture Door Stranger');
    res.send({
      'message': 'successful'
  });
});

/**
 * DOOR
 */
app.post('/command-unlock-door', function (req, res) {
    io.emit('door', 'UNLOCK');
    // io.emit("FromAPI", req.body);
    console.log('Unlock Door');
    res.send({
      'message': 'successful'
  });
});

app.post('/command-lock-door', function (req, res) {
    io.emit('door', 'LOCK');
    console.log('Lock Door');
    res.send({
      'message': 'successful'
  });
});

/**
 * CCTV
 */
app.post('/cctv', upload.single('img'), function (req, res) {
    io.emit('cctv', req.body.img);
    console.log('CCTV Frame Sent');
    res.send({
      'message': 'successful'
  });
});

// app.get('/frame', function (req, res) {
//     console.log('CCTV Frame Get');
//     res.sendfile('uploads/frame.jpg');
// });

/**
 * SERVER SETUP
 */
io.on('connection', function(socket){
  console.log('A user has connected');
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Server Listening');
});
