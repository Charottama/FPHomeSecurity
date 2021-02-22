const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');
const port =  8000;
const index = require("./index");
const app = express();
// app.use(index);
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
const server = http.createServer(app);
const io = socketIo(server);
var router = express.Router();

var text = "testing"

router.get("/hi", (req, res) => {
  res.send({ response: "Hello" }).status(200);
});

/*
install node dlu
npm install express
npm install socket.io
buat yang client npm install socket.io-client*/
// app.use(function(req, res, next) {
//   req.io = io;
//   next();
// });

router.post("/message-notification", function(req, res, next) {
    io.sockets.emit("FromAPI", req.body);
    console.log("jalan")
    res.send(req.body)
});

app.use(router);

//Give the emit(data) to the front to be shown
io.on("connection", socket => {
  console.log("New client connected"), socket.emit('Start', text)
  socket.on("disconnect", () => console.log("Client disconnected"));
});
//Listen to a certain port
server.listen(port, () => console.log(`Listening on port ${port}`));