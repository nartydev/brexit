var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const mongoose = require('mongoose');

// Connect to db
mongoose.connect('mongodb://root:rootadmin123@ds157422.mlab.com:57422/brexit', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => console.log('error'))
db.once('open', () => {
    console.log('db connected')
})

// Schema Questions

const answerSchema = mongoose.Schema({
    idSocket: String,
    question_1: Number,
    question_2: Number,
    question_3: Number,
    question_4: Number,
    question_5: Number,
    question_6: Number,
    question_7: Number,
    question_8: Number,
    question_9: Number,
    question_10: Number
})

const Answer = mongoose.model('Answer', answerSchema)
var allAnswer = []


app.use('/assets', express.static('assets'))
app.set('views', './views')
app.set('view engine', 'ejs')

// Set route
app.get('/', function(req, res){
    res.render('quiz-phone')
});

app.get('/country/:country', function(req, res){
    const countryName = req.params.countryName
    res.render('quiz', {countryName})
});

app.get('/country', function(req, res){
    res.render('index')
});

// Listen connect
io.on('connection', function(socket){
    
    console.log('a user connected')
    socket.on('answerQuestion', function(data) {
        data.idSocket = socket.id
        if(allAnswer.length != 10) {
            allAnswer = [...allAnswer, data.value]
        } else {
            data.success = true
            const finalAnswer = new Answer({ idSocket: data.idSocket, 
                question_1: allAnswer[0],
                question_2: allAnswer[1],
                question_3: allAnswer[2],
                question_4: allAnswer[3],
                question_5: allAnswer[4],
                question_6: allAnswer[5],
                question_7: allAnswer[6],
                question_8: allAnswer[7],
                question_9: allAnswer[8],
                question_10: allAnswer[9]
            })
            finalAnswer.save((err, answerSave) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log(answerSave)
                }
            })
        }
        io.sockets.emit('questionValue', data)
        console.log(allAnswer)
    })
    socket.on('disconnect', function(){
        console.log('user disconnected')
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000')
});


