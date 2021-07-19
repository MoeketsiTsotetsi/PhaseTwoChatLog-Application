var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require("socket.io")(http);

var mongoose = require('mongoose');
var chatMessage = require('./models/chat');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

mongoose.connect('mongodb://localhost:27017/chalogdb',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('You are connected to Database'); })
    .catch((error) => { console.log(error); })


    io.on('connection', (socket) => {
        console.log('User  is Connected.')
    })

    app.post('/chats', (req, res) => {
        console.log(req.body)
        chatMessage.create(req.body, (err,data) => {
            if (err) throw err;
             io.emit('chat', req.body);
            // console.log('Chat Saved Successfully.')
            res.send(data);
        })
    })
    
    app.get('/chats', (req, res) => {
        chatMessage.find((err, chats) => {
            if (err) throw err;
            res.send(chats);
        })
    })

http.listen(3000, () => {
    console.log('Server is running at port 3000!!');
})