var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/assets', express.static('assets'))

app.set('views', './views')
app.set('view engine', 'ejs')


app.get('/', function(req, res){
    res.render('quiz-phone')
});

app.get('/country', function(req, res){
    res.render('index')
});

io.on('connection', function(socket){
    console.log('a user connected')
    socket.on('answerQuestion', function(data) {
        console.log(data)
        io.sockets.emit('questionValue')
    })
    socket.on('disconnect', function(){
        console.log('user disconnected')
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000')
});


