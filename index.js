var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');
const mongoose = require('mongoose');

let dataQuestions = fs.readFileSync('./assets/data/data-question.json');
let questions = JSON.parse(dataQuestions);

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
    country: String,
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
let allAnswer = []
let countryName;
let dataSectionQuestions = [];
let totalAnswer;

app.use('/assets', express.static('assets'))
app.set('views', './views')
app.set('view engine', 'ejs')

// Set route
app.get('/', function (req, res) {
    res.render('index')
});

app.get('/quiz-phone/:id', function (req, res) {
    const idPage = req.params.id
    res.render('quiz-phone', { idPage })
});

app.get('/country/:country/:id', function (req, res) {
    countryName = req.params.country
    const idPage = req.params.id
    res.render('quiz', { countryName: countryName, datas: questions, idPage })
});

// Listen connect
io.on('connection', (socket, data) => {
    socket.on('answerQuestion', (data)  => {
        console.log(data, allAnswer)
        if (allAnswer.length != 10 && data.value) {
            allAnswer = [...allAnswer, data.value]
            console.log('lol', data)
        } else  {    
            const finalAnswer = new Answer({
                idSocket: data.idSocket,
                country: countryName,
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
                if (err) {
                    console.log(err)
                } else {
                    console.log('success save')
                    
                    Answer.countDocuments({ country: countryName }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            totalAnswer = result;
                            console.log(result)
                        }
                    })

                    // Yes = 2
                    // No = 1

                    Answer.countDocuments({ country: countryName, question_10: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let newStats = {
                                idQuestion: 10,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            dataSectionQuestions = [newStats, ...dataSectionQuestions]
                        }
                    })

                    Answer.countDocuments({ country: countryName, question_9: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let newStats = {
                                idQuestion: 9,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            
                            dataSectionQuestions = [newStats, ...dataSectionQuestions]
                        }
                    })

                    Answer.countDocuments({ country: countryName, question_8: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let newStats = {
                                idQuestion: 8,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            dataSectionQuestions = [newStats, ...dataSectionQuestions]
                        }
                    })

                    Answer.countDocuments({ country: countryName, question_7: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let newStats = {
                                idQuestion: 7,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            dataSectionQuestions = [newStats, ...dataSectionQuestions]
                        }
                    })

                    Answer.countDocuments({ country: countryName, question_6: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let newStats = {
                                idQuestion: 6,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            dataSectionQuestions = [newStats, ...dataSectionQuestions]
                        }
                    })

                    Answer.countDocuments({ country: countryName, question_5: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let newStats = {
                                idQuestion: 5,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            dataSectionQuestions = [newStats, ...dataSectionQuestions]
                        }
                    })

                    Answer.countDocuments({ country: countryName, question_4: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let newStats = {
                                idQuestion: 4,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            dataSectionQuestions = [newStats, ...dataSectionQuestions]
                        }
                    })

                    Answer.countDocuments({ country: countryName, question_3: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let newStats = {
                                idQuestion: 3,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            dataSectionQuestions = [newStats, ...dataSectionQuestions]
                        }
                    })

                    Answer.countDocuments({ country: countryName, question_2: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let newStats = {
                                idQuestion: 2,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            dataSectionQuestions = [newStats, ...dataSectionQuestions]
                        }
                    })

                    Answer.countDocuments({ country: countryName, question_1: 2 }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let newStats = {
                                idQuestion: 1,
                                totalAnswer: totalAnswer,
                                yesAnswer: result,
                                noAnswer: totalAnswer - result
                            }
                            newValue = [newStats, ...dataSectionQuestions]
                            io.sockets.emit('questionValue', { data, newValue, allAnswer, questions} )
                        }
                    })
                }
            })
        }
        if(allAnswer.length < 10) {
            io.sockets.emit('questionValue', { data, allAnswer, questions} )
        }
    })

    socket.on('clickInformation', _id => {
        io.sockets.emit('showInformation', _id - 1)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
});



http.listen(3000 || 5000, function () {
    console.log('listening on *' + process.env.PORT)
});


